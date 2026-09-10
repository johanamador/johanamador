"use client";

import { useLanguage } from "@/components/language-provider";

import { ArrowUpRight, Download } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { GitHubProfileCard } from "@/components/github-profile-card";

export function AboutSection() {
  const { t, locale } = useLanguage();
  return (
    <section id="about" className="portfolio-section about-section">
      <div className="site-container">
        <SectionTitle
          index="02"
          eyebrow={t("Behind the work")}
          title={t("A little about me.")}
        />
        <div className="about-layout">
          <div className="about-copy">
            <div className="about-intro">
              <p className="large-copy">
                {t(
                  "I’m Johan, a software developer based in Lima. I like understanding how things work, and making them work better.",
                )}
              </p>
              <p>
                {t(
                  "A Computer Science graduate from PUCP, I build web applications, ERPs and CRMs with a focus on practical, reliable solutions. My work spans full-stack development, deployment and the details that make a product useful.",
                )}
              </p>
            </div>
            <div className="about-details">
              <p>
                {t(
                  "For my thesis, I built an OpenMRS module that connects with Perú’s National Electronic Health Records Registry using HL7 FHIR and Dyaku profiles. It brought together two things I enjoy: complex systems and work with a real-world impact.",
                )}
              </p>
              <p>
                {t(
                  "I work across frontend, backend and deployment, with a focus on reliable systems, integrations and maintainable code.",
                )}
              </p>
            </div>
            <div className="about-meta">
              <div className="about-facts">
                <div>
                  <span className="eyebrow">{t("Based in")}</span>
                  <span>
                    {t("Lima, Perú")}
                    <ArrowUpRight size={14} />
                  </span>
                </div>
                <div>
                  <span className="eyebrow">{t("Spoken languages")}</span>
                  <span>{t("Spanish · Native")}</span>
                  <span className="muted">
                    {t("English · B2, Cambridge FCE")}
                  </span>
                </div>
              </div>
              <a
                className="pill-button"
                href={`/johan-amador-cv-${locale}.pdf`}
                download
              >
                {t("Download my résumé")}
                <Download size={15} />
              </a>
            </div>
          </div>
          <GitHubProfileCard />
        </div>
      </div>
    </section>
  );
}
