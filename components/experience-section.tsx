"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SectionTitle } from "@/components/section-title"

const projects = [
  {
    title: "Freelance Web Developer",
    period: "November 2024 - Present",
    role: "Full Stack Developer",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "NestJS", "shadcn/ui"],
    description:
      "Self-managed end-to-end delivery of web solutions for multiple clients: requirements analysis, full-stack development, deployment tailored to each client's budget and hosting capabilities, client training, and ongoing maintenance. Projects include Grupo Sercom (corporate B2B landing page), Prosedain (B2B catalog with 385+ products synced via Google Sheets and Gmail API), Farmasalud Inversiones (pharmacy e-commerce with admin panel, SEO 98/100), Nebu (real-time video platform with LiveKit, AI embeddings, and Culqi payments), and Mora (Technical Artist portfolio). Handled iterative feedback cycles, bug fixes, and feature enhancements post-launch.",
  },
  {
    title: "Academic Thesis Management System",
    period: "March 2025 - July 2025",
    role: "Full Stack Developer",
    technologies: ["React", "Spring Boot", "PostgreSQL"],
    description:
      "Final career project developed with 38 members, simulating a real professional environment. Developed the review module, integrating the GoWinston API to analyze similarity and detect possible thesis plagiarism. Participated in the technical management of the system with quality control, CI/CD, and collaborative code review.",
  },
  {
    title: "Logistics Operations Platform",
    period: "August 2024 - December 2024",
    role: "Full Stack Developer",
    technologies: ["Java", "React", "Figma"],
    description:
      "Delivery route planning system with restrictions and blockages. Backend with optimization algorithm in Java. Modular interface in React + UI system design in Figma.",
  },
  {
    title: "Academic Tutoring System",
    period: "March 2024 - July 2024",
    role: "Full Stack Developer",
    technologies: ["React", "ASP.NET"],
    description:
      "Platform to coordinate advising between students and teachers. Implementation of schedules, notifications, and session management. Agile development with Scrum and interactive prototyping in Figma.",
  },
  {
    title: "Banking Risk Management System",
    period: "August 2023 - December 2023",
    role: "Full Stack Developer",
    technologies: ["Java", "C#", "Figma"],
    description:
      "Academic prototype for comprehensive risk management in digital banking entities. Implementation of registration, analysis, hierarchy, and reporting modules with filters. Coordination of a multidisciplinary team, flow design, and prototyping in Figma.",
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    const section = sectionRef.current
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-16 md:py-24 fade-in-section">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[58rem]">
          <SectionTitle title="Project Experience" className="mb-8" />
          <div className="relative space-y-6 pl-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-border">
            {projects.map((project, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-8 top-6 flex h-6 w-6 items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <Badge variant="secondary" className="w-fit text-xs">
                        {project.period}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2 pt-1">
                      <span className="text-primary font-medium">{project.role}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
