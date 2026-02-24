"use client"

import React, { useEffect, useRef } from "react"
import { Code } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Importaciones de react-icons
import { FaJava, FaReact, FaNodeJs, FaGitAlt, FaAws, FaFigma, FaDocker, FaDatabase, FaCodeBranch } from "react-icons/fa"
import { RiJavaLine } from "react-icons/ri"
import { SiCplusplus, SiSharp, SiPython, SiJavascript, SiTypescript, SiNextdotjs, SiDotnet, SiSpring, SiExpress, SiNotion, SiOracle, SiMongodb, SiGraphql, SiJenkins, SiTailwindcss, SiJira } from "react-icons/si"
import { DiScrum, DiMsqlServer } from "react-icons/di"
import { BsFileEarmarkText } from "react-icons/bs"
import { MdOutlineDesignServices } from "react-icons/md"
import { ImUsers } from "react-icons/im"
import { TbBrandNetbeans, TbBrandMysql, TbBrandMongodb } from "react-icons/tb"
import { VscVscode, VscTerminalLinux } from "react-icons/vsc"
import { AiOutlineApi } from "react-icons/ai"
import { BiGame, BiLogoPostgresql } from "react-icons/bi"

const skillIcons: Record<string, React.ReactNode> = {
  Java: <RiJavaLine className="h-3.5 w-3.5" />,
  "C/C++": <SiCplusplus className="h-3.5 w-3.5" />,
  "C#": <SiSharp className="h-3.5 w-3.5" />,
  Python: <SiPython className="h-3.5 w-3.5" />,
  JavaScript: <SiJavascript className="h-3.5 w-3.5" />,
  TypeScript: <SiTypescript className="h-3.5 w-3.5" />,
  SQL: <FaDatabase className="h-3.5 w-3.5" />,
  React: <FaReact className="h-3.5 w-3.5" />,
  "Next.js": <SiNextdotjs className="h-3.5 w-3.5" />,
  "ASP.NET": <SiDotnet className="h-3.5 w-3.5" />,
  "Spring Boot": <SiSpring className="h-3.5 w-3.5" />,
  "Express.js": <SiExpress className="h-3.5 w-3.5" />,
  "Git/GitHub": <FaGitAlt className="h-3.5 w-3.5" />,
  "AWS (RDS)": <FaAws className="h-3.5 w-3.5" />,
  Figma: <FaFigma className="h-3.5 w-3.5" />,
  Jira: <SiJira className="h-3.5 w-3.5" />,
  "VS Code": <VscVscode className="h-3.5 w-3.5" />,
  NetBeans: <TbBrandNetbeans className="h-3.5 w-3.5" />,
  Linux: <VscTerminalLinux className="h-3.5 w-3.5" />,
  Notion: <SiNotion className="h-3.5 w-3.5" />,
  Scrum: <DiScrum className="h-3.5 w-3.5" />,
  "Collaborative Work": <ImUsers className="h-3.5 w-3.5" />,
  "Version Control": <FaCodeBranch className="h-3.5 w-3.5" />,
  Prototyping: <MdOutlineDesignServices className="h-3.5 w-3.5" />,
  "Technical Documentation": <BsFileEarmarkText className="h-3.5 w-3.5" />,
  "SQL Server": <DiMsqlServer className="h-3.5 w-3.5" />,
  MySQL: <TbBrandMysql className="h-3.5 w-3.5" />,
  PostgreSQL: <BiLogoPostgresql className="h-3.5 w-3.5" />,
  "Oracle SQL": <SiOracle className="h-3.5 w-3.5" />,
  MongoDB: <TbBrandMongodb className="h-3.5 w-3.5" />,
  "REST APIs": <AiOutlineApi className="h-3.5 w-3.5" />,
  GraphQL: <SiGraphql className="h-3.5 w-3.5" />,
  Docker: <FaDocker className="h-3.5 w-3.5" />,
  "CI/CD": <SiJenkins className="h-3.5 w-3.5" />,
  "Responsive Design": <SiTailwindcss className="h-3.5 w-3.5" />,
  "Game Development": <BiGame className="h-3.5 w-3.5" />,
}

const skillCategories = [
  {
    name: "Languages",
    icon: <VscVscode className="h-5 w-5" />,
    skills: ["Java", "C/C++", "C#", "Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    name: "Frameworks",
    icon: <FaReact className="h-5 w-5" />,
    skills: ["React", "Next.js", "ASP.NET", "Spring Boot", "Express.js"],
  },
  {
    name: "Tools",
    icon: <FaGitAlt className="h-5 w-5" />,
    skills: ["Git/GitHub", "AWS (RDS)", "Figma", "Jira", "Bizagi (BPMN)", "VS Code", "NetBeans", "Linux", "Notion"],
  },
  {
    name: "Methodologies",
    icon: <DiScrum className="h-5 w-5" />,
    skills: ["Scrum", "Collaborative Work", "Version Control", "Prototyping", "Technical Documentation"],
  },
  {
    name: "Databases",
    icon: <FaDatabase className="h-5 w-5" />,
    skills: ["SQL Server", "MySQL", "PostgreSQL", "Oracle SQL", "MongoDB"],
  },
  {
    name: "Other",
    icon: <SiGraphql className="h-5 w-5" />,
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
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl mb-8">
            <span className="text-primary">#</span> Skills
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {skillCategories.map((category, index) => (
              <Card key={index}>
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
                          {skillIcons[skill] || <Code className="h-3.5 w-3.5" />}
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
