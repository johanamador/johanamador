"use client"

import { useEffect, useRef, useState } from "react"
import { Github, ExternalLink, Figma, Code } from "lucide-react"
import Link from "next/link"

// Example projects - you can replace them with your real projects
const projects = [
  {
    id: 1,
    title: "3D Artist Portfolio",
    description: "Interactive 3D artist portfolio featuring Sketchfab Viewer API integration, cyberpunk design, and embedded 3D model visualizations.",
    image: "./projects/3d-artist.jpeg",
    technologies: ["Next.js", "React", "Sketchfab API", "Three.js", "Tailwind CSS", "TypeScript"],
    github: "", // Private repository
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
  {
    id: 6,
    title: "DeliPUCP",
    description: "Mobile app to reserve menus across the university dining halls. Figma prototype demonstrating menu browsing, schedule selection, and reservation flow.",
    image: "/projects/delipucp.png",
    technologies: ["Figma Prototype", "Mobile", "UI/UX"],
    github: "", // Private repository
    demo: "https://www.figma.com/proto/F94vpya9dZRTw9RioBY2Ah/DELIPUCP?node-id=23-5611&p=f&t=00qIgBVLQ8tHGD28-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=23%3A5611&show-proto-sidebar=1",
    figma: "https://www.figma.com/design/F94vpya9dZRTw9RioBY2Ah/DeliPUCP?node-id=0-1&t=8eErBWAJa3yqx32j-1",
  },
  {
    id: 7,
    title: "OdiparTrack",
    description: "A planning system developed as part of 9th-semester coursework. Figma prototype showcases task scheduling, progress tracking, and resource allocation features.",
    image: "/projects/odipartrack.png",
    technologies: ["Figma Prototype", "Planning System", "UI/UX"],
    github: "", // Private repository
    demo: "https://www.figma.com/proto/zJ4QQT8oATe2hilIgBmOQ9/OdiparTrack-Software---Prototype?node-id=47-11512&p=f&t=8dFNxVa6FVvgEaoK-1&scaling=min-zoom&content-scaling=fixed&page-id=23%3A845&starting-point-node-id=47%3A11512&show-proto-sidebar=1",
    figma: "https://www.figma.com/design/zJ4QQT8oATe2hilIgBmOQ9/OdiparTrack-Software---Prototype?node-id=23-845&t=xUV13eCrmrIxBU9h-1",
  },
  {
    id: 8,
    title: "MiTutor",
    description: "Tutoring management system for coordinating sessions between professors and students, developed during 7th-semester coursework. Figma prototype includes session booking, tutor profiles, and messaging flows.",
    image: "/projects/mitutor.png",
    technologies: ["Figma Prototype", "Education", "Scheduling"],
    github: "", // Private repository
    demo: "https://www.figma.com/proto/PNjuf2y76dcM4Ip6WOjzNt/Prototipo?node-id=2266-20827&p=f&t=20oUQkWg9payQwdf-1&scaling=min-zoom&content-scaling=fixed&page-id=6%3A16&starting-point-node-id=2266%3A20827",
    designType: "figma",
    figma: "", // Figma prototype exists but not publicly shared — mark as private
  },
]

// Filter state: default to show non-Figma projects (code/other)
// 'projects' = non-Figma items, 'designs' = Figma prototypes
type FilterType = "projects" | "designs"

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<FilterType>("projects")

  const filteredProjects = projects.filter((p) => {
    const isFigma = Boolean(p.figma) || p.designType === "figma"
    return filter === "designs" ? isFigma : !isFigma
  })

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
    <section id="projects" ref={sectionRef} className="py-12 md:py-20 bg-dark-surface/50 fade-in-section">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[72rem]">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl mb-8">
            <span className="text-dark-accent">#</span> Projects
          </h2>

          {/* Filter tabs: Projects (default) / Designs - simple, full-width buttons, stack on mobile */}
          <div className="mb-6 flex w-full flex-col md:flex-row gap-3">
            <button
              onClick={() => setFilter("projects")}
              className={`flex-1 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === "projects"
                  ? "bg-dark-accent/10 text-dark-accent border border-dark-accent"
                  : "bg-dark-surface text-dark-secondary border border-dark-border"
              }`}
              aria-pressed={filter === "projects"}
            >
              <Code className="h-4 w-4" />
              <span>Projects</span>
            </button>
            <button
              onClick={() => setFilter("designs")}
              className={`flex-1 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === "designs"
                  ? "bg-dark-accent/10 text-dark-accent border border-dark-accent"
                  : "bg-dark-surface text-dark-secondary border border-dark-border"
              }`}
              aria-pressed={filter === "designs"}
            >
              <Figma className="h-4 w-4" />
              <span>Designs</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-dark-background rounded-lg overflow-hidden border border-dark-border transition-all duration-300 hover:border-dark-accent hover:shadow-lg hover:shadow-dark-accent/10 flex flex-col h-full"
              >
                <div className="h-48 overflow-hidden">
                  <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105 cursor-pointer"
                  />
                  </Link>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-dark-secondary text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="text-xs bg-dark-surface px-2 py-1 rounded-full text-dark-accent border border-dark-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between mt-auto">
                    <div className="flex items-center space-x-4">
                      {/* Show Code if repository exists */}
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-dark-secondary hover:text-dark-accent transition-colors"
                        >
                          <Github className="h-4 w-4 mr-1" />
                          <span className="text-sm">Code</span>
                        </Link>
                      )}

                      {/* If project has a Figma design URL, show Design with Figma icon.
                          If project is a Figma prototype but has no public URL (designType === 'figma' && !project.figma),
                          show "Private" with the Figma icon. Otherwise, if no github and no figma, show Private with GitHub icon. */}
                      {project.figma ? (
                        <Link
                          href={project.figma}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-dark-secondary hover:text-dark-accent transition-colors"
                        >
                          <Figma className="h-4 w-4 mr-1" />
                          <span className="text-sm">Design</span>
                        </Link>
                      ) : project.designType === "figma" ? (
                        // Figma prototype exists but not publicly shared — show Private with Figma icon
                        <span className="flex items-center text-dark-secondary/50">
                          <Figma className="h-4 w-4 mr-1" />
                          <span className="text-sm">Private</span>
                        </span>
                      ) : (
                        !project.github && (
                          <span className="flex items-center text-dark-secondary/50">
                            <Github className="h-4 w-4 mr-1" />
                            <span className="text-sm">Private</span>
                          </span>
                        )
                      )}
                    </div>

                    <Link
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-dark-secondary hover:text-dark-accent transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      <span className="text-sm">Demo</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
