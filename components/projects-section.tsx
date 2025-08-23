"use client"

import { useEffect, useRef } from "react"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"

// Ejemplo de proyectos - puedes reemplazarlos con tus proyectos reales
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
    description: "Interfaz web de una tienda de merch oficial de bandas de grunge y rock, con sistema de páginas de producto detalladas y galería de imágenes HD.",
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

  return (
    <section id="projects" ref={sectionRef} className="py-12 md:py-20 bg-dark-surface/50 fade-in-section">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[72rem]">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl mb-8">
            <span className="text-dark-accent">#</span> Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
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
                    {project.github ? (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-dark-secondary hover:text-dark-accent transition-colors"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        <span className="text-sm">Code</span>
                      </Link>
                    ) : (
                      <span className="flex items-center text-dark-secondary/50">
                        <Github className="h-4 w-4 mr-1" />
                        <span className="text-sm">Private</span>
                      </span>
                    )}
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
