"use client";

import { useLanguage } from "@/components/language-provider";

import { ArrowUpRight, Download } from "lucide-react";
import { SonarGrid } from "@/components/ui/sonar-grid";
import { HeroBrand } from "@/components/hero-brand";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

export function HeroSection() {
  const { t, locale } = useLanguage();
  return (
    <section id="home" aria-labelledby="hero-title">
      <SonarGrid
        className="hero-grid"
        spacing={30}
        dotRadius={1.25}
        baseOpacity={0.2}
        color="var(--sonar-color)"
        pingEvery={1.8}
        speed={260}
        ringWidth={110}
        amplitude={2.6}
        maxRings={4}
      >
        <div className="hero-wash" aria-hidden="true" />
        <div className="hero-content site-container">
          <HeroBrand />
          <p className="hero-role">{t("Software developer, based in Lima.")}</p>
          <p className="hero-description">
            {t(
              "Developing web applications, APIs and healthcare systems, from requirements to production and ongoing improvements.",
            )}
          </p>
          <div className="hero-actions">
            <a href="#projects" className="pill-button">
              {t("View selected work")}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a
              href={`/johan-amador-cv-${locale}.pdf`}
              download
              className="hero-cv"
            >
              {t("Download CV")}
              <Download size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-footnote site-container mono">
          <span>{t("Lima, Perú")}</span>
          <div className="hero-socials">
            <a
              href="https://github.com/johanamador"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <FaGithub size={19} aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/johanamadordev/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedinIn size={19} aria-hidden="true" />
            </a>
          </div>
        </div>
      </SonarGrid>
    </section>
  );
}
