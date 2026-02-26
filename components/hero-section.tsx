"use client"

import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { faArrowRight, faDownload, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const codeLines = [
    {
      id: 1,
      content:
        '<span class="code-keyword">const</span> <span class="code-variable">developer</span> <span class="code-operator">=</span> {',
      delay: 0,
    },
    {
      id: 2,
      content: '  <span class="code-variable">name</span>: <span class="code-string">"Johan Amador"</span>,',
      delay: 800,
    },
    {
      id: 3,
      content: '  <span class="code-variable">username</span>: <span class="code-string">"@cosmodev"</span>,',
      delay: 1200,
    },
    {
      id: 4,
      content:
        '  <span class="code-variable">role</span>: <span class="code-string">"Computer Science Student | Software Developer"</span>,',
      delay: 1600,
    },
    {
      id: 5,
      content: '  <span class="code-variable">location</span>: <span class="code-string">"Lima, Peru"</span>,',
      delay: 2400,
    },
    { id: 6, content: '  <span class="code-function">introduce</span>() {', delay: 3200 },
    {
      id: 7,
      content:
        '    <span class="code-keyword">return</span> <span class="code-string">"Building efficient solutions with modern technologies"</span>;',
      delay: 4000,
    },
    { id: 8, content: "  }", delay: 4800 },
    { id: 9, content: "};", delay: 5600 },
  ]

  useEffect(() => {
    setIsVisible(true)

    const timer = setTimeout(() => {
      setCurrentLine(codeLines.length)
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="home"
      className="min-h-screen flex items-center py-20 relative overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-8">
            <div className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="text-primary border-primary/30">
                  Available for hire
                </Badge>
              </div>
              <div className="flex items-baseline mb-2">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">Johan Amador</h1>
                <span className="ml-3 text-sm text-muted-foreground">@cosmodev</span>
              </div>
              <h2 className="text-xl sm:text-2xl text-primary mb-4">
                Computer Science Student | Software Developer
              </h2>
              <p className="max-w-[600px] text-muted-foreground text-lg mb-6">
                Focused on building efficient solutions with modern technologies. Self-taught and passionate about
                tackling real technical challenges.
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-3 transition-opacity duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              <Button asChild>
                <Link href="#projects">
                  View Projects
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#contact">Contact Me</Link>
              </Button>
              <Button variant="secondary" asChild>
                <a href="/johan-amador-cv.pdf" download>
                  <FontAwesomeIcon icon={faDownload} className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </div>

            <div
              className={`flex space-x-2 transition-opacity duration-1000 delay-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="https://github.com/UltimateCosmic" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>GitHub</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="https://linkedin.com/in/cosmodev" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedinIn} className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>LinkedIn</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="mailto:johan.amador@pucp.edu.pe">
                        <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Email</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Card className="w-full bg-muted/30">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                  <span className="ml-2 text-muted-foreground text-sm">developer.js</span>
                </div>
                <Separator className="mb-4" />
                <div className="font-mono text-sm md:text-base">
                  {codeLines.map((line, index) => (
                    <div
                      key={line.id}
                      className={`code-line ${index <= currentLine ? "block" : "hidden"}`}
                      style={{ animation: `fadeIn 0.5s ease-out forwards ${line.delay / 1000}s` }}
                      dangerouslySetInnerHTML={{ __html: line.content }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
