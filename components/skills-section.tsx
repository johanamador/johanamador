import { skillCategories } from "@/lib/profile";

export function SkillsSection() {
  return (
    <section id="skills" className="skills-section">
      <div className="site-container compact-section">
        <div>
          <p className="eyebrow">Tools of the trade</p>
          <h2 className="subsection-title">My toolkit.</h2>
        </div>
        <dl className="toolkit-list">
          {skillCategories.map((category) => (
            <div key={category.name}>
              <dt>{category.name}</dt>
              <dd>{category.skills.join(" / ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
