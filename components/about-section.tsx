"use client";

import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SectionTitle } from "@/components/section-title";
import { GitHubProfileCard } from "@/components/github-profile-card";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 md:py-24 bg-muted/30 fade-in-section"
    >
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-[58rem] flex-col items-start justify-center gap-4">
          <SectionTitle title="About Me" />
          <div className="mt-4 grid gap-6 md:grid-cols-[1.5fr_1fr]">
            <div className="space-y-4">
              <p className="text-foreground leading-relaxed">
                Computer Science student in my final semester at PUCP{" "}
                <Badge variant="secondary" className="ml-1">
                  No. 1 university in Peru – Ranking QS
                </Badge>
                . I'm focused on software development and motivated to build
                efficient solutions with modern technologies like Java, React,
                SQL, and .NET. Self-taught and passionate about participating in
                projects that pose real technical challenges.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently developing my thesis on healthcare systems
                interoperability, learning about standards like HL7 FHIR and
                service-oriented architectures. This experience has brought me
                closer to designing scalable and connected systems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Outside of academics, I enjoy exploring game development,
                participating in game jams, and designing illustrations or logos
                as a hobby. These activities strengthen my creative thinking and
                practical approach.
              </p>

              <Separator className="my-4" />

              <div>
                <h3 className="text-lg font-semibold mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">English: B2 – FCE Cambridge</Badge>
                  <Badge variant="default">Spanish: Native</Badge>
                </div>
              </div>
            </div>

            <GitHubProfileCard />
          </div>
        </div>
      </div>
    </section>
  );
}
