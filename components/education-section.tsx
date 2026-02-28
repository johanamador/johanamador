"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const education = [
  {
    institution: "Pontificia Universidad Católica del Perú",
    degree: "Bachelor in Computer Science",
    period: "2020-2026",
    location: "Lima, Peru",
    icon: "/icons/pucp.svg",
  },
  {
    institution: "Platzi",
    degree: "Full Stack Developer Path",
    period: "2022-2023",
    location: "Online",
    icon: "/icons/platzi.svg",
  },
  {
    institution: "Coursera",
    degree: "Software Development",
    period: "2025",
    location: "Online",
    icon: "/icons/coursera.svg",
  },
]

export function EducationSection() {
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
    <section id="education" ref={sectionRef} className="py-16 md:py-24 fade-in-section">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[58rem]">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl mb-8">
            <span className="text-primary">#</span> Education
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {education.map((item, index) => (
              <Card key={index} className="transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="bg-primary/10 p-3 rounded-md mb-3">
                      <img src={item.icon} alt={item.institution} className="h-10 w-10" />
                    </div>
                    <Badge variant="outline" className="text-xs">{item.period}</Badge>
                  </div>
                  <CardTitle className="text-lg">{item.institution}</CardTitle>
                  <CardDescription>{item.degree}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
