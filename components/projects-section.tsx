"use client"

import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare, faCode, faChevronLeft, faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faFigma } from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { SectionTitle } from "@/components/section-title"

type Project = {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  github?: string
  demo: string
  figma?: string
}

const projects: Project[] = [
  {
    id: 11,
    title: "Grupo Sercom",
    description:
      "Corporate B2B landing page for Grupo Sercom: services, products and training. Premium editorial UI/UX for a fire protection company with 22+ years of experience and SGS homologation.",
    image: "./projects/grupo-sercom.png",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    github: "",
    demo: "https://sercomfire.vercel.app/",
  },
  {
    id: 16,
    title: "Prosedain",
    description:
      "B2B catalog and quotation platform for industrial automation distribution. 385+ products auto-synced from Google Sheets, non-transactional quote cart, WhatsApp inquiries, Google Drive/Gmail API integration, advanced search, and SEO-optimized responsive design.",
    image: "./projects/prosedain.png",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Google Sheets API",
      "Gmail API",
      "Cloudinary"
    ],
    github: "",
    demo: "https://prosedain.com/",
  },
  {
    id: 15,
    title: "Nebu",
    description:
      "Full-stack platform with SSR frontend, NestJS backend, PostgreSQL master-slave replication, real-time voice/video via LiveKit, AI embeddings with ChromaDB, Culqi payments, and full observability stack.",
    image: "./projects/nebu.png",
    technologies: ["Remix", "NestJS", "TypeScript", "PostgreSQL", "Docker", "LiveKit", "OpenAI API", "Grafana"],
    github: "",
    demo: "https://flow-telligence.com/",
  },
  {
    id: 13,
    title: "Farmasalud Inversiones",
    description:
      "Professional responsive website for an online pharmacy. PostgreSQL + REST API backend, customizable Hero Section, WhatsApp consultation cart, SEO score 98/100, and full admin panel.",
    image: "./projects/farmasalud-inversiones.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "PostgreSQL", "Prisma", "NextAuth", "Cloudinary"],
    github: "",
    demo: "https://farmasaludinversiones.com/",
  },
  {
    id: 1,
    title: "3D Artist Portfolio",
    description:
      "Interactive 3D artist portfolio featuring Sketchfab Viewer API integration, terminal design, and embedded 3D model visualizations.",
    image: "./projects/cuadot.png",
    technologies: ["Next.js", "React", "Sketchfab API", "ArtStation", "Tailwind CSS", "TypeScript"],
    github: "",
    demo: "https://cuadot.vercel.app/",
  },
  {
    id: 17,
    title: "Academia Pásalo",
    description:
      "University-focused academic platform for PUCP and UTEC students. Course catalog, study resources, and academic tools built with a modern full-stack architecture. I followed the Figma prototype to the letter.",
    image: "./projects/pasalo-academia.png",
    technologies: ["Next.js", "NestJS", "TypeScript", "Tailwind CSS"],
    github: "",
    demo: "https://www.academiapasalo.com",
  },
  {
    id: 14,
    title: "IPED",
    description:
      "Institutional website for the Instituto Peruano de Enfermedades Digestivas (IPED). Built with Next.js for a clear, professional and trustworthy patient experience.",
    image: "./projects/iped.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/UltimateCosmic?tab=repositories",
    demo: "https://iped.vercel.app/",
  },
  {
    id: 12,
    title: "Grupo Sercom Portal",
    description:
      "Corporate document portal for Grupo Sercom. Clients securely access technical documents (certificates, reports) via RUC with integrated PDF preview. Admins manage companies, services and documents with real-time stats.",
    image: "./projects/grupo-sercom-portal.png",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "shadcn/ui", "Cloudflare Turnstile"],
    github: "",
    demo: "https://portalsercomfire.vercel.app/",
  },
  {
    id: 2,
    title: "Grunge Merch",
    description:
      "Official grunge and rock band merch store web interface, with detailed product pages and HD image gallery.",
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
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/UltimateCosmic/cinemark-peru",
    demo: "https://cinemark-peru.vercel.app/",
  },
  {
    id: 5,
    title: "Personal Portfolio",
    description:
      "My personal portfolio website built with Next.js, React, Tailwind CSS, and TypeScript. Features a modern UI, animated hero section, project gallery, and responsive design.",
    image: "./projects/cosmodev.png",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "shadcn/ui", "Lucide Icons"],
    github: "https://github.com/UltimateCosmic/UltimateCosmic.github.io",
    demo: "https://cosmodev.me/",
  },
]

const designs: Project[] = [
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

function ProjectModal({
  project,
  projectList,
  open,
  onOpenChange,
  onNavigate,
}: {
  project: Project
  projectList: Project[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onNavigate: (project: Project) => void
}) {
  const [iframeError, setIframeError] = useState(false)

  const hasDemo = !!project.demo
  const canPreview = hasDemo && !project.demo.includes("figma.com")

  const currentIndex = projectList.findIndex((p) => p.id === project.id)
  const prevProject = currentIndex > 0 ? projectList[currentIndex - 1] : null
  const nextProject = currentIndex < projectList.length - 1 ? projectList[currentIndex + 1] : null

  useEffect(() => {
    setIframeError(false)
  }, [project.id])

  useEffect(() => {
    if (!open) setIframeError(false)
  }, [open])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === "ArrowLeft" && prevProject) onNavigate(prevProject)
      if (e.key === "ArrowRight" && nextProject) onNavigate(nextProject)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, prevProject, nextProject, onNavigate])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideClose className="max-w-[95vw] lg:max-w-6xl xl:max-w-7xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <div className="flex flex-col lg:flex-row">
          {/* Left — Live Preview (desktop only) */}
          <div className="relative flex-1 hidden lg:block min-h-[550px] bg-muted/30 border-r border-border rounded-l-lg overflow-hidden">
            {canPreview && !iframeError ? (
              <iframe
                src={project.demo}
                title={`${project.title} preview`}
                className="absolute inset-0 w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-popups"
                onError={() => setIframeError(true)}
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-10"
                />
                <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">Preview not available</p>
                    <p className="text-xs text-muted-foreground max-w-[250px]">
                      This site doesn&apos;t allow embedded previews.
                    </p>
                  </div>
                  {hasDemo && (
                    <Button variant="outline" size="sm" className="mt-1" asChild>
                      <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3 mr-1.5" />
                        Open in new tab
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right — Info panel */}
          <div className="flex flex-col lg:w-80 shrink-0 p-5">
            {/* Header: title + close */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <DialogHeader className="space-y-1.5 flex-1">
                <DialogTitle className="text-xl leading-tight">{project.title}</DialogTitle>
              </DialogHeader>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 -mt-1 -mr-2"
                onClick={() => onOpenChange(false)}
              >
                <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            {/* Thumbnail */}
            <div className="rounded-md overflow-hidden border border-border mb-4">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                />
              </AspectRatio>
            </div>

            <DialogDescription className="text-sm leading-relaxed mb-4">
              {project.description}
            </DialogDescription>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex flex-col gap-2">
              {hasDemo && (
                <Button variant="default" size="sm" className="w-full" asChild>
                  <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-4 w-4 mr-1.5" />
                    Visit Site
                  </Link>
                </Button>
              )}
              {project.github ? (
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} className="h-4 w-4 mr-1.5" />
                    View Code
                  </Link>
                </Button>
              ) : project.figma ? (
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={project.figma} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFigma} className="h-4 w-4 mr-1.5" />
                    View Design
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" size="sm" className="w-full" disabled>
                  <FontAwesomeIcon icon={faGithub} className="h-4 w-4 mr-1.5" />
                  Private
                </Button>
              )}
            </div>

            {/* Navigation */}
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                disabled={!prevProject}
                onClick={() => prevProject && onNavigate(prevProject)}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3 mr-1.5" />
                Prev
              </Button>
              <span className="text-xs text-muted-foreground">
                {currentIndex + 1} / {projectList.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={!nextProject}
                onClick={() => nextProject && onNavigate(nextProject)}
              >
                Next
                <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeTab, setActiveTab] = useState<"projects" | "designs">("projects")

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

  const renderProjectCard = (project: Project) => (
    <Card
      key={project.id}
      className="bg-background overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
      onClick={() => setSelectedProject(project)}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
        />
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
            <Button variant="ghost" size="sm" asChild onClick={(e) => e.stopPropagation()}>
              <Link href={project.github} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} className="h-4 w-4 mr-1" />
                Code
              </Link>
            </Button>
          ) : project.figma ? (
            <Button variant="ghost" size="sm" asChild onClick={(e) => e.stopPropagation()}>
              <Link href={project.figma} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFigma} className="h-4 w-4 mr-1" />
                Design
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" disabled>
              <FontAwesomeIcon icon={faGithub} className="h-4 w-4 mr-1" />
              Private
            </Button>
          )}
        </div>
        {project.demo && (
          <Button variant="ghost" size="sm" asChild onClick={(e) => e.stopPropagation()}>
            <Link href={project.demo} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-4 w-4 mr-1" />
              Demo
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )

  return (
    <>
      <section id="projects" ref={sectionRef} className="py-12 md:py-20 bg-muted/30 fade-in-section">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-[72rem]">
            <SectionTitle title="Projects" className="mb-8" />

            <Tabs defaultValue="projects" className="w-full" onValueChange={(v) => setActiveTab(v as "projects" | "designs")}>
              <TabsList className="w-full md:w-auto grid grid-cols-2 md:inline-flex mb-6">
                <TabsTrigger value="projects" className="gap-2">
                  <FontAwesomeIcon icon={faCode} className="h-4 w-4" />
                  Projects
                </TabsTrigger>
                <TabsTrigger value="designs" className="gap-2">
                  <FontAwesomeIcon icon={faFigma} className="h-4 w-4" />
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

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          projectList={activeTab === "projects" ? projects : designs}
          open={!!selectedProject}
          onOpenChange={(open) => { if (!open) setSelectedProject(null) }}
          onNavigate={setSelectedProject}
        />
      )}
    </>
  )
}
