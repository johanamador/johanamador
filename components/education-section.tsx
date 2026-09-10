import { education } from "@/lib/profile";

export function EducationSection() {
  return (
    <section id="education" className="education-section">
      <div className="site-container compact-section">
        <div>
          <p className="eyebrow">Always learning</p>
          <h2 className="subsection-title">Education.</h2>
        </div>
        <div className="education-list">
          {education.map((item) => (
            <div className="education-item" key={item.institution}>
              <img
                src={item.icon}
                width={28}
                height={28}
                alt=""
                loading="lazy"
              />
              <div>
                <h3>{item.institution}</h3>
                <p className="muted">
                  {item.degree} · {item.location}
                </p>
              </div>
              <span className="mono muted">{item.period}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
