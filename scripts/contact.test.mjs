import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { handleContact, isResendConfigured, renderContactEmail } from "../lib/contact.ts";

const template = await readFile(new URL("../emails/contact-notification.html", import.meta.url), "utf8");
const env = {
  NODE_ENV: "production", CONTACT_PROVIDER: "resend", RESEND_API_KEY: "test-secret",
  CONTACT_FROM_EMAIL: "Johan Amador <contacto@johanamador.com>",
  CONTACT_TO_EMAIL: "johan.amador@pucp.edu.pe", TURNSTILE_SECRET: "test-secret",
  TURNSTILE_SITE_KEY: "test-sitekey", TURNSTILE_HOSTNAMES: "johanamador.com,www.johanamador.com",
};
const valid = {
  name: "Alex García", email: "alex@example.com", message: "Hola\n\nUna propuesta.",
  website: "", token: "test-token", requestId: "1c746f4a-b4e5-48f7-99ab-34dc6f74261b",
};
const request = (body = valid, headers = {}) => new Request("https://johanamador.com/api/contact", {
  method: "POST", headers: { origin: "https://johanamador.com", "content-type": "application/json", ...headers },
  body: typeof body === "string" ? body : JSON.stringify(body),
});
function dependencies(overrides = {}) {
  const calls = [];
  return {
    calls, env, template: async () => template,
    fetch: async (url, options) => {
      calls.push({ url, options });
      return Response.json(url.includes("siteverify")
        ? { success: true, action: "contact", hostname: "johanamador.com" }
        : { id: "email-test-id" });
    }, ...overrides,
  };
}

test("unconfigured deployments retain Formspree and the new endpoint is closed", async () => {
  const deps = dependencies({ env: {} });
  assert.equal(isResendConfigured({}), false);
  assert.equal((await handleContact(request(), deps)).status, 503);
  assert.equal(deps.calls.length, 0);
});
test("validated messages use a fixed recipient and the visitor as Reply-To", async () => {
  const deps = dependencies();
  const response = await handleContact(request({ ...valid, to: "attacker@example.com" }), deps);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(deps.calls.length, 2);
  const sent = JSON.parse(deps.calls[1].options.body);
  assert.deepEqual(sent.to, [env.CONTACT_TO_EMAIL]);
  assert.equal(sent.from, env.CONTACT_FROM_EMAIL);
  assert.equal(sent.reply_to, valid.email);
  assert.match(sent.html, /Hola<br><br>Una propuesta\./);
  assert.ok(sent.text.includes(valid.message));
  assert.ok(!sent.html.includes("{{"));
});
test("HTML and template-like visitor content remain text", () => {
  const html = renderContactEmail(template, {
    name: '{{message}} <img src=x onerror="alert(1)">',
    email: "alex@example.com", message: "<script>alert(1)</script>\r\nHola & adiós",
  });
  assert.ok(html.includes("{{message}} &lt;img"));
  assert.ok(!html.includes("<script>"));
  assert.ok(html.includes("&lt;/script&gt;<br>Hola &amp; adiós"));
});
for (const [label, change] of [
  ["blank name", { name: "  " }], ["header injection", { name: "Alex\r\nBcc: other@example.com" }],
  ["invalid email", { email: "a@example.com,other@example.com" }],
  ["blank message", { message: "\n " }], ["long message", { message: "a".repeat(5001) }],
  ["missing challenge", { token: "" }], ["honeypot", { website: "spam" }],
  ["invalid request ID", { requestId: "arbitrary" }],
]) {
  test(`rejects ${label} before calling providers`, async () => {
    const deps = dependencies();
    assert.equal((await handleContact(request({ ...valid, ...change }), deps)).status, 400);
    assert.equal(deps.calls.length, 0);
  });
}
test("malformed and oversized JSON are rejected", async () => {
  for (const body of ["{", "null", "[]", JSON.stringify({ ...valid, message: "a".repeat(40001) })]) {
    const deps = dependencies();
    assert.equal((await handleContact(request(body), deps)).status, 400);
    assert.equal(deps.calls.length, 0);
  }
});
test("untrusted origins and unsupported bodies are rejected", async () => {
  for (const [headers, status] of [
    [{ origin: "https://attacker.example" }, 403], [{ origin: "" }, 403],
    [{ origin: "http://johanamador.com" }, 403], [{ "content-type": "text/plain" }, 415],
  ]) {
    const deps = dependencies();
    assert.equal((await handleContact(request(valid, headers), deps)).status, status);
    assert.equal(deps.calls.length, 0);
  }
});
test("production does not accept development hostnames", async () => {
  const deps = dependencies({ env: { ...env, TURNSTILE_HOSTNAMES: "johanamador.com,localhost" } });
  assert.equal((await handleContact(request(), deps)).status, 503);
  assert.equal(deps.calls.length, 0);
});
for (const [label, verification] of [
  ["failed or replayed token", { success: false, "error-codes": ["timeout-or-duplicate"] }],
  ["wrong action", { success: true, action: "signup", hostname: "johanamador.com" }],
  ["wrong hostname", { success: true, action: "contact", hostname: "attacker.example" }],
  ["wrong origin binding", { success: true, action: "contact", hostname: "www.johanamador.com" }],
]) {
  test(`does not send after ${label}`, async () => {
    let calls = 0;
    const deps = dependencies({ fetch: async () => { calls++; return Response.json(verification); } });
    assert.equal((await handleContact(request(), deps)).status, 403);
    assert.equal(calls, 1);
  });
}
test("provider failures never report success or expose credentials", async () => {
  for (const failure of ["challenge-timeout", "email-timeout", "email-rejected", "email-invalid-json", "email-missing-id"]) {
    let calls = 0;
    const deps = dependencies({ fetch: async () => {
      calls++;
      if (failure === "challenge-timeout" || (calls === 2 && failure === "email-timeout")) throw new Error("test-secret");
      if (calls === 1) return Response.json({ success: true, action: "contact", hostname: "johanamador.com" });
      if (failure === "email-rejected") return Response.json({ error: "test-secret" }, { status: 429 });
      if (failure === "email-invalid-json") return new Response("not-json");
      return Response.json({});
    } });
    const response = await handleContact(request(), deps);
    assert.ok(response.status >= 400);
    assert.deepEqual(await response.json(), { ok: false });
  }
});
test("retries with a fresh challenge retain the same idempotency key", async () => {
  const deps = dependencies();
  await handleContact(request(), deps);
  await handleContact(request({ ...valid, token: "fresh-token" }), deps);
  assert.equal(deps.calls[1].options.headers["Idempotency-Key"], deps.calls[3].options.headers["Idempotency-Key"]);
  await handleContact(request({ ...valid, message: "Different message" }), deps);
  assert.notEqual(deps.calls[1].options.headers["Idempotency-Key"], deps.calls[5].options.headers["Idempotency-Key"]);
});
