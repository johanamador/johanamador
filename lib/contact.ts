import { createHash } from "node:crypto";

type ContactData = { name: string; email: string; message: string };
type ContactEnvironment = Record<string, string | undefined>;
type ContactDependencies = {
  env: ContactEnvironment;
  fetch: typeof fetch;
  template: () => Promise<string>;
};

export function isResendConfigured(env: ContactEnvironment) {
  return env.CONTACT_PROVIDER === "resend" && [
    env.RESEND_API_KEY, env.CONTACT_FROM_EMAIL, env.CONTACT_TO_EMAIL,
    env.TURNSTILE_SECRET, env.TURNSTILE_SITE_KEY, env.TURNSTILE_HOSTNAMES,
  ].every((value) => Boolean(value?.trim()));
}

export function renderContactEmail(template: string, data: ContactData) {
  const escape = (value: string) => value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]!);
  // Replace once: visitor text must never be interpreted as another variable.
  return template.replace(/{{\s*(name|email|message)\s*}}/g, (_, key: keyof ContactData) => {
    const value = escape(data[key]);
    return key === "message" ? value.replace(/\r\n|\r|\n/g, "<br>") : value;
  });
}

const reply = (status: number) => Response.json({ ok: status === 200 }, {
  status, headers: { "Cache-Control": "no-store" },
});

async function readBody(request: Request) {
  const limit = 40_000;
  if (Number(request.headers.get("content-length")) > limit) return null;
  const reader = request.body?.getReader();
  if (!reader) return null;
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } finally {
    reader.releaseLock();
  }
}

export async function handleContact(request: Request, dependencies: ContactDependencies) {
  const { env, fetch: send, template } = dependencies;
  if (!isResendConfigured(env)) return reply(503);
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return reply(415);

  const hostnames = new Set(env.TURNSTILE_HOSTNAMES!.split(",").map((value) => value.trim()).filter(Boolean));
  // Never allow development hosts to validate a production challenge.
  if (env.NODE_ENV === "production" && (hostnames.has("localhost") || hostnames.has("127.0.0.1"))) return reply(503);
  let origin: URL;
  try {
    origin = new URL(request.headers.get("origin") ?? "");
    if (!hostnames.has(origin.hostname) ||
        (origin.protocol !== "https:" && !(env.NODE_ENV !== "production" &&
          origin.protocol === "http:" && ["localhost", "127.0.0.1"].includes(origin.hostname)))) return reply(403);
  } catch {
    return reply(403);
  }

  let body;
  try { body = await readBody(request); } catch { return reply(400); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return reply(400);
  const { name, email, message, token, requestId, website } = body;
  if (typeof name !== "string" || !name.trim() || name.length > 120 || /[\r\n\x00-\x1f\x7f]/.test(name) ||
      typeof email !== "string" || email.length > 254 || !/^[^\s<>@,;"\\]+@[^\s<>@,;"\\]+\.[^\s<>@,;"\\]+$/.test(email) || /[\x00-\x1f\x7f]/.test(email) ||
      typeof message !== "string" || !message.trim() || message.length > 5000 || /[\x00]/.test(message) ||
      typeof token !== "string" || !token || token.length > 2048 ||
      typeof requestId !== "string" || !/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(requestId) ||
      (website !== undefined && website !== "")) return reply(400);

  try {
    const verification = await send("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET!, response: token }),
      signal: AbortSignal.timeout(8000),
    });
    if (!verification.ok) return reply(503);
    const result = await verification.json();
    if (result.success !== true || result.action !== "contact" || result.hostname !== origin.hostname || !hostnames.has(result.hostname)) return reply(403);
  } catch {
    return reply(503);
  }

  const data: ContactData = { name: name.trim(), email: email.trim(), message: message.trim() };
  try {
    const html = renderContactEmail(await template(), data);
    // A retry after a timeout uses the same key and cannot send a second copy.
    const key = createHash("sha256").update(JSON.stringify({ requestId, ...data })).digest("hex");
    const response = await send("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `contact/${key}`,
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: data.email,
        subject: `Nuevo contacto — ${data.name}`,
        html,
        text: `Nuevo mensaje desde johanamador.com\n\nNombre: ${data.name}\nCorreo: ${data.email}\n\n${data.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return reply(response.status === 429 ? 429 : 502);
    const sent = await response.json();
    return reply(typeof sent.id === "string" && sent.id.length > 0 ? 200 : 502);
  } catch {
    return reply(502);
  }
}
