"use client"

import { useEffect, useRef } from "react"
import { Github, ExternalLink, Figma, Code } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

const projects = [
  {
    id: 1,
    title: "3D Artist Portfolio",
    description: "Interactive 3D artist portfolio featuring Sketchfab Viewer API integration, cyberpunk design, and embedded 3D model visualizations.",
    image: "./projects/3d-artist.jpeg",
    technologies: ["Next.js", "React", "Sketchfab API", "Three.js", "Tailwind CSS", "TypeScript"],
    github: "",
    demo: "https://cuadot.vercel.app/",
  },
  {
    id: 2,
    title: "Grunge Merch",
    description: "Official grunge and rock band merch store web interface, with detailed product pages and HD image gallery.",
    image: "./projects/grunge.png",
    technologies: ["Next.js", "React", "Tailwind CSS", "APIs", "Web Scraping"],
    github: "https://github.com/UltimateCosmic/grunge",
    demo: "https://grunge.vercel.app/",
  },
  {
    id: 3,
    title: "Cinemark Perú Clone",
    description: "Responsive Cinemark Perú website clone using Next.js, TypeScript, and Cinemark API.",
    image: "./projects/cinemark-peru.png",
    technologies: ["Next.js", "React 19", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/UltimateCosmic/cinemark-peru",
    demo: "https://cinemark-peru.vercel.app/",
  },
  {
    id: 4,
    title: "Anniversary Project",
    description: "A digital memory corner and gift for a loved one. Built with Next.js and Tailwind CSS.",
    image: "./projects/anniversary-project.png",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/UltimateCosmic/anniversary-project",
    demo: "https://anniversary-project-sage.vercel.app/",
  },
  {
    id: 5,
    title: "Personal Portfolio",
    description: "My personal portfolio website built with Next.js, React, Tailwind CSS, and TypeScript. Features a modern UI, animated hero section, project gallery, and responsive design.",
    image: "./projects/cosmodev.png",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Shadcn/ui", "Lucide Icons"],
    github: "https://github.com/UltimateCosmic/UltimateCosmic.github.io",
    demo: "https://cosmodev.me/",
  },
]

const designs = [
  {
    id: 6,
    title: "DeliPUCP",
    description: "Mobile app to reserve menus across the university dining halls. Figma prototype demonstrating menu browsing, schedule selection, and reservation flow.",
    image: "/projects/delipucp.png",
    technologies: ["Figma Prototype", "Mobile", "UI/UX"],
    figma: "https://www.figma.com/design/F94vpya9dZRTw9RioBY2Ah/DeliPUCP?node-id=0-1&t=8eErBWAJa3yqx32j-1",
    demo: "https://www.figma.com/proto/F94vpya9dZRTw9RioBY2Ah/DELIPUCP?node-id=23-5611&p=f&t=00qIgBVLQ8tHGD28-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=23%3A5611&show-proto-sidebar=1",
  },
  {
    id: 7,
    title: "OdiparTrack",
    description: "A planning system developed as part of 9th-semester coursework. Figma prototype showcases task scheduling, progress tracking, and resource allocation features.",
    image: "/projects/odipartrack.png",
    technologies: ["Figma Prototype", "Planning System", "UI/UX"],
    figma: "https://www.figma.com/design/zJ4QQT8oATe2hilIgBmOQ9/OdiparTrack-Software---Prototype?node-id=23-845&t=xUV13eCrmrIxBU9h-1",
    demo: "https://www.figma.com/proto/zJ4QQT8oATe2hilIgBmOQ9/OdiparTrack-Software---Prototype?node-id=47-11512&p=f&t=8dFNxVa6FVvgEaoK-1&scaling=min-zoom&content-scaling=fixed&page-id=23%3A845&starting-point-node-id=47%3A11512&show-proto-sidebar=1",
  },
  {
    id: 8,
    title: "MiTutor",
    description: "Tutoring management system for coordinating sessions between professors and students, developed during 7th-semester coursework. Figma prototype includes session booking, tutor profiles, and messaging flows.",
    image: "/projects/mitutor.png",
    technologies: ["Figma Prototype", "Education", "Scheduling"],
    figma: "",
    demo: "https://www.figma.com/proto/PNjuf2y76dcM4Ip6WOjzNt/Prototipo?node-id=2266-20827&p=f&t=20oUQkWg9payQwdf-1&scaling=min-zoom&content-scaling=fixed&page-id=6%3A16&starting-point-node-id=2266%3A20827",
  },
]

export function ProjectsSection() {
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

  const renderProjectCard = (project: typeof projects[0] & { figma?: string }) => (
    <Card key={project.id} className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="h-48 overflow-hidden">
        <Link href={project.demo} target="_blank" rel="noopener noreferrer">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105 cursor-pointer"
          />
        </Link>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{project.title}</CardTitle>
        <CardDescription className="line-clamp-3">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-3">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="justify-between pt-4">
        <div className="flex items-center gap-3">
          {project.github ? (
            <Button variant="ghost" size="sm" asChild>
              <Link href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-1" />
                Code
              </Link>
            </Button>
          ) : project.figma ? (
            <Button variant="ghost" size="sm" asChild>
              <Link href={project.figma} target="_blank" rel="noopener noreferrer">
                <Figma className="h-4 w-4 mr-1" />
                Design
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" disabled>
              <Github className="h-4 w-4 mr-1" />
              Private
            </Button>
          )}
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={project.demo} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1" />
            Demo
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <section id="projects" ref={sectionRef} className="py-12 md:py-20 bg-muted/30 fade-in-section">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[72rem]">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl mb-8">
            <span className="text-primary">#</span> Projects
          </h2>

          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="w-full md:w-auto grid grid-cols-2 md:inline-flex mb-6">
              <TabsTrigger value="projects" className="gap-2">
                <Code className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="designs" className="gap-2">
                <Figma className="h-4 w-4" />
                Designs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(renderProjectCard)}
              </div>
            </TabsContent>

            <TabsContent value="designs">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {designs.map(renderProjectCard)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
