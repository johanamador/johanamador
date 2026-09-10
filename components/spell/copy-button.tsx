// Adapted from Spell UI (MIT). See THIRD_PARTY_NOTICES.md.
"use client";

import { useLanguage } from "@/components/language-provider";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2500);
  }
  return (
    <span className={cn("copy-control", className)}>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={
          status === "copied" ? t("Email copied") : t("Copy email address")
        }
        disabled={status === "copied"}
        className="icon-button relative"
      >
        <span
          aria-hidden="true"
          className={cn(
            "copy-icon",
            status === "copied" ? "copy-icon-visible" : "copy-icon-hidden",
          )}
        >
          <CheckIcon size={17} />
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "copy-icon",
            status === "copied" ? "copy-icon-hidden" : "copy-icon-visible",
          )}
        >
          <CopyIcon size={17} />
        </span>
      </button>
      <span
        role="status"
        className={status === "error" ? "copy-error" : "sr-only"}
      >
        {status === "copied"
          ? t("Email address copied.")
          : status === "error"
            ? t("Couldn’t copy. Select the email address to copy it manually.")
            : ""}
      </span>
    </span>
  );
}
