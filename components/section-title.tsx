"use client";

import { useLanguage } from "@/components/language-provider";

import { BlurReveal } from "@/components/spell/blur-reveal";

export function SectionTitle({
  title,
  index,
  eyebrow,
  description,
  className = "",
}: {
  title: string;
  index?: string;
  eyebrow?: string;
  description?: string;
  className?: string;
}) {
  const { t } = useLanguage();
  return (
    <div className={`section-heading ${className}`}>
      {(index || eyebrow) && (
        <p className="eyebrow">
          <span>{index}</span>
          {t(String(eyebrow ?? ""))}
        </p>
      )}
      <div className="section-heading-row">
        <BlurReveal as="h2" inView className="section-title">
          {t(title)}
        </BlurReveal>
        {description && (
          <p className="section-description">{t(String(description ?? ""))}</p>
        )}
      </div>
    </div>
  );
}
