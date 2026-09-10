import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { SonarGrid } from "@/components/ui/sonar-grid";

export function HeroSection() {
  return (
    <section id="home" aria-labelledby="hero-title">
      <SonarGrid
        className="hero-grid"
        spacing={30}
        dotRadius={1}
        baseOpacity={0.13}
        color="#b8b8b8"
        pingEvery={4.8}
        speed={180}
        ringWidth={70}
        amplitude={1.4}
        maxRings={3}
      >
        <div className="hero-wash" aria-hidden="true" />
        <div className="hero-content site-container">
          <span className="hero-availability mono">
            <span className="availability-dot" aria-hidden="true" />
            Available for work
          </span>
          <h1 id="hero-title">Johan Amador<span>.</span></h1>
          <p className="hero-role">Software developer, based in Lima.</p>
          <p className="hero-description">
            I build thoughtful digital experiences with clean code
            and attention to detail.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="pill-button">
              View selected work <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href="/johan-amador-cv.pdf" download className="hero-cv">
              Download CV <Download size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-footnote site-container mono">
          <span>Lima, Peru</span>
          <a href="#projects">
            Scroll to explore <ArrowDown size={13} aria-hidden="true" />
          </a>
        </div>
      </SonarGrid>
    </section>
  );
}
