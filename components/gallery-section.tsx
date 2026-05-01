"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SectionTitle } from "@/components/section-title"

const images = [
  {
    src: "./gallery/conectaton-ips-2025.webp",
    alt: "Conectatón IPS Perú 2025",
    description: "At IPS Perú 2025 with teammates, representing Hospital Santa Clotilde & university.",
  },
  {
    src: "./gallery/hl7-peru-reunion.webp",
    alt: "Meeting with HL7 Peru members",
    description: "SIH.SALUS team meeting with HL7 Perú members.",
  },
  {
    src: "./gallery/health-minister.webp",
    alt: "With Dr. César Vásquez (Minister of Health) and José Pérez Lu (General Director of IT, MINSA)",
    description: "With Dr. César Vásquez, Minister of Health, and José Pérez Lu, General Director of IT at MINSA.",
  },
  {
    src: "./gallery/diresa-huanuco-sanmartin.webp",
    alt: "With DIRESA Huánuco and San Martín members",
    description: "With members of DIRESA Huánuco and San Martín during a regional health digitalization meeting.",
  },
  {
    src: "./gallery/xpostem-2025.webp",
    alt: "XPOSTEM 2025",
    description: "At XPOSTEM 2025, a fair of innovation by PUCP showcasing 90+ solutions transforming lives through science and engineering.",
  },
]

export function GallerySection() {
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
    <section
      id="gallery"
      ref={sectionRef}
      className="py-12 md:py-20 fade-in-section"
    >
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[58rem] px-10">
          <SectionTitle title="Gallery" className="mb-8" />
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((img, idx) => (
                <CarouselItem key={img.src + idx} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover select-none"
                        draggable={false}
                      />
                    </AspectRatio>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground text-center leading-relaxed">
                        {img.description}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
