import { Plus } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { experience } from "@/lib/profile";

export function ExperienceSection() {
  return (
    <section id="experience" className="portfolio-section">
      <div className="site-container">
        <SectionTitle
          index="03"
          eyebrow="The journey"
          title="Experience."
          description="Independent work, collaborative teams, and a lot of learning along the way."
        />
        <div className="experience-list">
          {experience.map((item, index) => (
            <details
              key={item.title}
              className="experience-item"
              open={index === 0}
            >
              <summary>
                <span className="experience-date mono">
                  {item.period
                    .replace("November", "Nov")
                    .replace("December", "Dec")
                    .replace("August", "Aug")
                    .replace("March", "Mar")}
                </span>
                <span className="experience-name">
                  <span>{item.title}</span>
                  <span className="muted">{item.role}</span>
                </span>
                <Plus size={18} className="details-plus" />
              </summary>
              <div className="experience-detail">
                <p>{item.description}</p>
                <p className="tech-line">{item.technologies.join(" · ")}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
