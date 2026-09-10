import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { EducationSection } from "@/components/education-section";
import { ExperienceSection } from "@/components/experience-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { ProjectsSection } from "@/components/projects-section";
import { GallerySection } from "@/components/gallery-section";
import { SkillsSection } from "@/components/skills-section";
import { PageLoader } from "@/components/page-loader";

export default function Home() {
  return (
    <PageLoader>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main id="main-content" className="flex-1">
          <HeroSection />
          <ProjectsSection />
          <AboutSection />
          <ExperienceSection />
          <EducationSection />
          <SkillsSection />
          <GallerySection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </PageLoader>
  );
}
