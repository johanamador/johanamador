import { ArrowUpRight, Download } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { GitHubProfileCard } from "@/components/github-profile-card";

export function AboutSection() {
  return (
    <section id="about" className="portfolio-section about-section">
      <div className="site-container">
        <SectionTitle
          index="02"
          eyebrow="Behind the work"
          title="A little about me."
        />
        <div className="about-layout">
          <div className="about-copy">
            <p className="large-copy">
              I’m Johan, a software developer based in Lima. I like
              understanding how things work — and making them work better.
            </p>
            <p>
              A Computer Science graduate from PUCP, I build web applications,
              ERPs and CRMs with a focus on practical, reliable solutions. My
              work spans full-stack development, deployment and the details that
              make a product useful.
            </p>
            <p>
              For my thesis, I built an OpenMRS module that connects with Peru’s
              National Electronic Health Records Registry using HL7 FHIR R4 and
              Dyaku profiles. It brought together two things I enjoy: complex
              systems and work with a real-world impact.
            </p>
            <p>
              Outside of development, you’ll find me exploring game jams,
              drawing illustrations or designing logos. Making things is the
              common thread.
            </p>
            <div className="about-facts">
              <div>
                <span className="eyebrow">Based in</span>
                <span>
                  Lima, Peru <ArrowUpRight size={14} />
                </span>
              </div>
              <div>
                <span className="eyebrow">Languages</span>
                <span>Spanish · Native</span>
                <span className="muted">English · B2, Cambridge FCE</span>
              </div>
            </div>
            <a className="text-link" href="/johan-amador-cv.pdf" download>
              Download my résumé <Download size={15} />
            </a>
          </div>
          <GitHubProfileCard />
        </div>
      </div>
    </section>
  );
}
