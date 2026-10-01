"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

type Turnstile = {
  render: (element: HTMLElement, options: {
    sitekey: string;
    action: string;
    theme: "auto";
    appearance: "interaction-only";
    callback: (token: string) => void;
    "expired-callback": () => void;
    "error-callback": () => void;
  }) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: Turnstile } }

export function ContactVerification({ siteKey, attempt, onToken, onError }: {
  siteKey: string;
  attempt: number;
  onToken: (token: string) => void;
  onError: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const callbacks = useRef({ onToken, onError });
  callbacks.current = { onToken, onError };
  const render = useCallback(() => {
    if (!container.current || !window.turnstile || widget.current !== null) return;
    widget.current = window.turnstile.render(container.current, {
      sitekey: siteKey, action: "contact", theme: "auto", appearance: "interaction-only",
      callback: (token) => callbacks.current.onToken(token),
      "expired-callback": () => callbacks.current.onToken(""),
      "error-callback": () => { callbacks.current.onToken(""); callbacks.current.onError(); },
    });
  }, [siteKey]);
  useEffect(() => {
    render();
    return () => {
      if (widget.current !== null) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, [render]);
  useEffect(() => {
    if (attempt > 0 && widget.current !== null) window.turnstile?.reset(widget.current);
  }, [attempt]);
  return <>
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
      strategy="lazyOnload" onReady={render} onError={() => callbacks.current.onError()} />
    <div ref={container} className="contact-verification" />
  </>;
}
