"use client";

import { useLanguage } from "@/components/language-provider";

import { education } from "@/lib/profile";

export function EducationSection() {
  const { t } = useLanguage();
  return (
    <section id="education" className="portfolio-section education-section">
      <div className="site-container compact-section">
        <div>
          <p className="eyebrow">{t("Always learning")}</p>
          <h2 className="subsection-title">{t("Education.")}</h2>
        </div>
        <div className="education-list">
          {education.map((item) => (
            <div className="education-item" key={item.institution}>
              <img
                src={item.icon}
                width={72}
                height={72}
                alt=""
                loading="lazy"
              />
              <div>
                <h3>{item.institution}</h3>
                <p className="muted">
                  {t(item.degree)} · {t(item.location)}
                </p>
              </div>
              <span className="mono muted">{t(item.period)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
