"use client"

import { useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload, faLocationDot, faComment, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function AboutSection() {
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
    <section id="about" ref={sectionRef} className="py-16 md:py-24 bg-muted/30 fade-in-section">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-[58rem] flex-col items-start justify-center gap-4">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            <span className="text-primary">#</span> About Me
          </h2>
          <div className="mt-4 grid gap-6 md:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              <p className="text-foreground leading-relaxed">
                Computer Science student in my final semester at PUCP{" "}
                <Badge variant="secondary" className="ml-1">
                  No. 1 university in Peru – Ranking QS
                </Badge>
                . I'm focused on software development and motivated to build efficient solutions with modern technologies like Java, React, SQL, and .NET. Self-taught and passionate about participating in projects that pose real technical challenges.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently developing my thesis on healthcare systems interoperability, learning about standards like HL7
                FHIR and service-oriented architectures. This experience has brought me closer to designing scalable and
                connected systems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Outside of academics, I enjoy exploring game development, participating in game jams, and designing
                illustrations or logos as a hobby. These activities strengthen my creative thinking and practical
                approach.
              </p>

              <Separator className="my-4" />

              <div>
                <h3 className="text-lg font-semibold mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">English: B2 – FCE Cambridge</Badge>
                  <Badge variant="outline">Spanish: Native</Badge>
                </div>
              </div>

              <Button variant="outline" asChild className="mt-4">
                <a href="/johan-amador-cv.pdf" download>
                  <FontAwesomeIcon icon={faDownload} className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </div>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lg text-primary">Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <img
                  src="./johan-white.png"
                  alt="Johan Amador"
                  className="w-28 h-28 mb-2"
                  style={{ animation: "fadeIn 1s ease-in" }}
                />
                <Separator />
                <ul className="space-y-3 w-full text-sm">
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Lima, Peru</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faComment} className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>cosmodev</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>+51 951 665 323</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <a href="mailto:johan.amador@pucp.edu.pe" className="text-primary hover:underline">
                      johan.amador@pucp.edu.pe
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
