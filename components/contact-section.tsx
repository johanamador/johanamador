"use client";

import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useLanguage } from "@/components/language-provider";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, ArrowRight, Loader2 } from "lucide-react";
import { CopyButton } from "@/components/spell/copy-button";
import { SectionTitle } from "@/components/section-title";
import { ContactVerification } from "@/components/contact-verification";

const email = "johan.amador@pucp.edu.pe";

export function ContactSection({ useResend = false, siteKey = "" }: { useResend?: boolean; siteKey?: string }) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const submitting = useRef(false);
  const [token, setToken] = useState("");
  const [attempt, setAttempt] = useState(0);
  const submission = useRef({ payload: "", id: "" });
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    if (useResend && !token) { setStatus("error"); return; }
    submitting.current = true;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const fields = { name: data.get("name"), email: data.get("email"), message: data.get("message") };
      if (useResend && submission.current.payload !== JSON.stringify(fields)) {
        submission.current = { payload: JSON.stringify(fields), id: crypto.randomUUID() };
      }
      const response = await fetch(useResend ? "/api/contact" : "https://formspree.io/f/xldlblvl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...fields,
          ...(useResend ? { token, requestId: submission.current.id, website: data.get("website") ?? "" } : {}),
        }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Message could not be sent");
      if (useResend && (await response.json()).ok !== true) throw new Error("Message could not be sent");
      setStatus("success");
      form.reset();
      submission.current = { payload: "", id: "" };
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timeout);
      if (useResend) { setToken(""); setAttempt((value) => value + 1); }
      submitting.current = false;
    }
  }
  return (
    <section id="contact" className="portfolio-section contact-section">
      <div className="site-container">
        <SectionTitle
          index="05"
          eyebrow={t("Get in touch")}
          title={t("Let’s make something good.")}
        />
        <div className="contact-layout">
          <div className="contact-copy">
            <p className="large-copy">
              {t("Have a project in mind,")}
              <br />
              {t("or just want to say hello?")}
            </p>
            <p className="muted">
              {t(
                "I’m open to software development opportunities and interesting collaborations. Let’s talk.",
              )}
            </p>
            <div className="email-line">
              <a href={`mailto:${email}`}>{email}</a>
              <CopyButton value={email} />
            </div>
            <div className="contact-socials">
              <a
                className="text-link"
                href="https://github.com/johanamador"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={17} aria-hidden="true" />
                {t("GitHub")}
                <ArrowUpRight size={15} />
              </a>
              <a
                className="text-link"
                href="https://www.linkedin.com/in/johanamadordev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={17} aria-hidden="true" />
                {t("LinkedIn")}
                <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="contact-location">
              <span className="availability-dot" />
              <span>{t("Lima, Perú")}</span>
              <a href="tel:+51951665323">+51 951 665 323</a>
            </div>
          </div>
          <form
            className="contact-form"
            onSubmit={submit}
            aria-label={t("Contact Johan")}
            aria-busy={status === "sending"}
          >
            {useResend && <div hidden aria-hidden="true">
              <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>}
            <div className="form-row">
              <label>
                {t("Your name")}
                <input
                  name="name"
                  autoComplete="name"
                  placeholder={t("Alex Smith")}
                  required
                  maxLength={120}
                />
              </label>
              <label>
                {t("Email address")}
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("alex@example.com")}
                  required
                  maxLength={254}
                />
              </label>
            </div>
            <label>
              {t("What are you working on?")}
              <textarea
                name="message"
                placeholder={t(
                  "A little about your project, idea, or opportunity…",
                )}
                required
                rows={4}
                maxLength={5000}
              />
            </label>
            {useResend && <ContactVerification siteKey={siteKey} attempt={attempt}
              onToken={setToken} onError={() => setStatus("error")} />}
            <div className="form-bottom">
              <span className="muted">{t("A conversation starts here.")}</span>
              <button
                className="pill-button"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    {t("Sending")}
                    <Loader2 size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    {t("Send message")}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
            <p
              role="status"
              className={`form-status ${status === "error" ? "form-error" : ""}`}
            >
              {status === "success"
                ? t(
                    "Thanks! Your message is on its way. I’ll get back to you soon.",
                  )
                : status === "error"
                  ? t(
                      "Your message couldn’t be sent. Please try again, or email me directly.",
                    )
                  : ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
