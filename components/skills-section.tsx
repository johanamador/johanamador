"use client"

import React, { useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode, faDatabase, faLeaf, faLaptopCode, faNoteSticky, faUsers, faUserGroup, faCodeBranch, faPenRuler, faFileLines, faPlug, faDiagramProject, faMobileScreen, faGamepad, faLayerGroup, faToolbox, faPuzzlePiece } from "@fortawesome/free-solid-svg-icons"
import { faJava, faPython, faSquareJs, faReact, faNodeJs, faGitAlt, faAws, faFigma, faJira, faLinux, faDocker, faJenkins, faMicrosoft } from "@fortawesome/free-brands-svg-icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionTitle } from "@/components/section-title"

const skillIcons: Record<string, React.ReactNode> = {
  Java: <FontAwesomeIcon icon={faJava} className="h-3.5 w-3.5" />,
  "C/C++": <FontAwesomeIcon icon={faCode} className="h-3.5 w-3.5" />,
  "C#": <FontAwesomeIcon icon={faCode} className="h-3.5 w-3.5" />,
  Python: <FontAwesomeIcon icon={faPython} className="h-3.5 w-3.5" />,
  JavaScript: <FontAwesomeIcon icon={faSquareJs} className="h-3.5 w-3.5" />,
  TypeScript: <FontAwesomeIcon icon={faCode} className="h-3.5 w-3.5" />,
  SQL: <FontAwesomeIcon icon={faDatabase} className="h-3.5 w-3.5" />,
  React: <FontAwesomeIcon icon={faReact} className="h-3.5 w-3.5" />,
  "Next.js": <FontAwesomeIcon icon={faReact} className="h-3.5 w-3.5" />,
  "ASP.NET": <FontAwesomeIcon icon={faMicrosoft} className="h-3.5 w-3.5" />,
  "Spring Boot": <FontAwesomeIcon icon={faLeaf} className="h-3.5 w-3.5" />,
  "Express.js": <FontAwesomeIcon icon={faNodeJs} className="h-3.5 w-3.5" />,
  "Git/GitHub": <FontAwesomeIcon icon={faGitAlt} className="h-3.5 w-3.5" />,
  "AWS (RDS)": <FontAwesomeIcon icon={faAws} className="h-3.5 w-3.5" />,
  Figma: <FontAwesomeIcon icon={faFigma} className="h-3.5 w-3.5" />,
  Jira: <FontAwesomeIcon icon={faJira} className="h-3.5 w-3.5" />,
  "VS Code": <FontAwesomeIcon icon={faLaptopCode} className="h-3.5 w-3.5" />,
  NetBeans: <FontAwesomeIcon icon={faLaptopCode} className="h-3.5 w-3.5" />,
  Linux: <FontAwesomeIcon icon={faLinux} className="h-3.5 w-3.5" />,
  Notion: <FontAwesomeIcon icon={faNoteSticky} className="h-3.5 w-3.5" />,
  Scrum: <FontAwesomeIcon icon={faUsers} className="h-3.5 w-3.5" />,
  "Collaborative Work": <FontAwesomeIcon icon={faUserGroup} className="h-3.5 w-3.5" />,
  "Version Control": <FontAwesomeIcon icon={faCodeBranch} className="h-3.5 w-3.5" />,
  Prototyping: <FontAwesomeIcon icon={faPenRuler} className="h-3.5 w-3.5" />,
  "Technical Documentation": <FontAwesomeIcon icon={faFileLines} className="h-3.5 w-3.5" />,
  "SQL Server": <FontAwesomeIcon icon={faDatabase} className="h-3.5 w-3.5" />,
  MySQL: <FontAwesomeIcon icon={faDatabase} className="h-3.5 w-3.5" />,
  PostgreSQL: <FontAwesomeIcon icon={faDatabase} className="h-3.5 w-3.5" />,
  "Oracle SQL": <FontAwesomeIcon icon={faDatabase} className="h-3.5 w-3.5" />,
  MongoDB: <FontAwesomeIcon icon={faDatabase} className="h-3.5 w-3.5" />,
  "REST APIs": <FontAwesomeIcon icon={faPlug} className="h-3.5 w-3.5" />,
  GraphQL: <FontAwesomeIcon icon={faDiagramProject} className="h-3.5 w-3.5" />,
  Docker: <FontAwesomeIcon icon={faDocker} className="h-3.5 w-3.5" />,
  "CI/CD": <FontAwesomeIcon icon={faJenkins} className="h-3.5 w-3.5" />,
  "Responsive Design": <FontAwesomeIcon icon={faMobileScreen} className="h-3.5 w-3.5" />,
  "Game Development": <FontAwesomeIcon icon={faGamepad} className="h-3.5 w-3.5" />,
}

const skillCategories = [
  {
    name: "Languages",
    icon: <FontAwesomeIcon icon={faCode} className="h-5 w-5" />,
    skills: ["Java", "C/C++", "C#", "Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    name: "Frameworks",
    icon: <FontAwesomeIcon icon={faLayerGroup} className="h-5 w-5" />,
    skills: ["React", "Next.js", "ASP.NET", "Spring Boot", "Express.js"],
  },
  {
    name: "Tools",
    icon: <FontAwesomeIcon icon={faToolbox} className="h-5 w-5" />,
    skills: ["Git/GitHub", "AWS (RDS)", "Figma", "Jira", "Bizagi (BPMN)", "VS Code", "NetBeans", "Linux", "Notion"],
  },
  {
    name: "Methodologies",
    icon: <FontAwesomeIcon icon={faUsers} className="h-5 w-5" />,
    skills: ["Scrum", "Collaborative Work", "Version Control", "Prototyping", "Technical Documentation"],
  },
  {
    name: "Databases",
    icon: <FontAwesomeIcon icon={faDatabase} className="h-5 w-5" />,
    skills: ["SQL Server", "MySQL", "PostgreSQL", "Oracle SQL", "MongoDB"],
  },
  {
    name: "Other",
    icon: <FontAwesomeIcon icon={faPuzzlePiece} className="h-5 w-5" />,
    skills: ["REST APIs", "GraphQL", "Docker", "CI/CD", "Responsive Design", "Game Development"],
  },
]

export function SkillsSection() {
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
    <section id="skills" ref={sectionRef} className="py-12 md:py-20 bg-muted/30 fade-in-section">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[58rem]">
          <SectionTitle title="Skills" className="mb-8" />
          <div className="grid gap-6 md:grid-cols-2">
            {skillCategories.map((category, index) => (
              <Card key={index} className="bg-background">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="text-primary">{category.icon}</div>
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="gap-1.5 px-3 py-1 text-sm transition-colors hover:bg-primary/10 hover:text-primary cursor-default"
                      >
                        <span className="text-primary">
                          {skillIcons[skill] || <FontAwesomeIcon icon={faCode} className="h-3.5 w-3.5" />}
                        </span>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
