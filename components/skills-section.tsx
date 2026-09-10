"use client";

import { useLanguage } from "@/components/language-provider";

import { skillCategories } from "@/lib/profile";

export function SkillsSection() {
  const { t } = useLanguage();
  return (
    <section id="skills" className="portfolio-section skills-section">
      <div className="site-container compact-section">
        <div>
          <p className="eyebrow">{t("Tools of the trade")}</p>
          <h2 className="subsection-title">{t("My toolkit.")}</h2>
        </div>
        <dl className="toolkit-list">
          {skillCategories.map((category) => (
            <div key={category.name}>
              <dt>{t(category.name)}</dt>
              <dd>{category.skills.map(t).join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
