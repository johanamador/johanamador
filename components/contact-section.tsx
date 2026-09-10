"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, ArrowRight, Loader2 } from "lucide-react";
import { CopyButton } from "@/components/spell/copy-button";
import { SectionTitle } from "@/components/section-title";

const email = "johan.amador@pucp.edu.pe";

export function ContactSection() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const submitting = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("https://formspree.io/f/xldlblvl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Message could not be sent");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timeout);
      submitting.current = false;
    }
  }
  return (
    <section id="contact" className="portfolio-section contact-section">
      <div className="site-container">
        <SectionTitle
          index="05"
          eyebrow="Get in touch"
          title="Let’s make something good."
        />
        <div className="contact-layout">
          <div className="contact-copy">
            <p className="large-copy">
              Have a project in mind,
              <br />
              or just want to say hello?
            </p>
            <p className="muted">
              I’m open to software development opportunities and interesting
              collaborations. Let’s talk.
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
                GitHub
                <ArrowUpRight size={15} />
              </a>
              <a
                className="text-link"
                href="https://linkedin.com/in/cosmodev"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="contact-location">
              <span className="availability-dot" />
              <span>Lima, Peru</span>
              <a href="tel:+51951665323">+51 951 665 323</a>
            </div>
          </div>
          <form
            className="contact-form"
            onSubmit={submit}
            aria-label="Contact Johan"
            aria-busy={status === "sending"}
          >
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Alex Smith"
                  required
                  maxLength={120}
                />
              </label>
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="alex@example.com"
                  required
                  maxLength={254}
                />
              </label>
            </div>
            <label>
              What are you working on?
              <textarea
                name="message"
                placeholder="A little about your project, idea, or opportunity…"
                required
                rows={4}
                maxLength={5000}
              />
            </label>
            <div className="form-bottom">
              <span className="muted">A conversation starts here.</span>
              <button
                className="pill-button"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    Sending <Loader2 size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Send message <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
            <p
              role="status"
              className={`form-status ${status === "error" ? "form-error" : ""}`}
            >
              {status === "success"
                ? "Thanks! Your message is on its way. I’ll get back to you soon."
                : status === "error"
                  ? "Your message couldn’t be sent. Please try again, or email me directly."
                  : ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
