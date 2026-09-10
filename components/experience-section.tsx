"use client";

import { useLanguage } from "@/components/language-provider";

import { Plus } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { experience } from "@/lib/profile";

export function ExperienceSection() {
  const { t } = useLanguage();
  return (
    <section id="experience" className="portfolio-section">
      <div className="site-container">
        <SectionTitle
          index="03"
          eyebrow={t("The journey")}
          title={t("Experience.")}
          description={t(
            "Independent work, collaborative teams, and a lot of learning along the way.",
          )}
        />
        <div className="experience-list">
          {experience.map((item) => (
            <details key={item.title} className="experience-item">
              <summary>
                <span className="experience-date mono">
                  {t(item.period)
                    .replace("November", "Nov")
                    .replace("December", t("Dec"))
                    .replace("August", t("Aug"))
                    .replace("March", "Mar")}
                </span>
                <span className="experience-name">
                  <span>{t(item.title)}</span>
                  <span className="muted">{t(item.role)}</span>
                </span>
                <Plus size={18} className="details-plus" />
              </summary>
              <div className="experience-detail">
                <p>{t(item.description)}</p>
                {item.highlights && (
                  <ul className="experience-highlights">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{t(highlight)}</li>
                    ))}
                  </ul>
                )}
                <p className="tech-line">{item.technologies.join(" · ")}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
