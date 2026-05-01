"use client";

import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faDownload } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { featuredProjects } from "@/lib/projects";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="min-h-[100dvh] flex items-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:py-12 relative overflow-hidden"
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
        <div className="grid min-w-0 gap-6 lg:grid-cols-[1fr_350px] lg:gap-8 xl:grid-cols-[1fr_500px] xl:gap-12">
          <div className="flex min-w-0 w-full max-w-[calc(100vw-2rem)] flex-col justify-center space-y-5 lg:max-w-none lg:space-y-3">
            <div
              className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Badge
                  variant="outline"
                  className="text-primary border-primary/30"
                >
                  Available for hire
                </Badge>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                <h1 className="text-4xl font-bold tracking-tight leading-none sm:text-5xl xl:text-6xl">
                  Johan Amador
                </h1>
                <span className="basis-full text-sm text-muted-foreground sm:basis-auto">
                  @cosmodev
                </span>
              </div>
              <h2 className="mb-2 flex max-w-full flex-wrap gap-x-2 text-lg leading-snug text-primary sm:text-2xl lg:mb-1">
                <span>Software Developer</span>
                <span aria-hidden="true">|</span>
                <span>Computer Science Engineer</span>
              </h2>
              <p className="w-full max-w-[16rem] whitespace-normal break-words text-base text-muted-foreground min-[380px]:max-w-[22rem] sm:max-w-[600px] sm:text-lg">
                Focused on building efficient solutions with modern
                technologies. Self-taught and passionate about tackling real
                technical challenges.
              </p>
            </div>

            <div
              className={`relative flex lg:hidden justify-center transition-opacity duration-1000 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
              style={{ isolation: "isolate" }}
            >
              <img
                src="/ja.svg"
                aria-hidden="true"
                className="absolute inset-0 m-auto h-full w-full max-h-64 object-contain opacity-5 scale-125 pointer-events-none"
                style={{ zIndex: -1 }}
              />
              <img
                src="/hero-section.webp"
                alt="Johan Amador"
                fetchPriority="high"
                className="relative max-h-[30vh] min-h-[170px] w-auto max-w-full object-contain"
              />
            </div>

            {/* Featured projects carousel */}
            <div
              className={`transition-opacity duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              <div className="min-w-0 sm:px-9 sm:-mx-9">
                <Carousel
                  opts={{ align: "start", loop: true }}
                  plugins={[
                    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
                  ]}
                  className="w-full max-w-[800px]"
                >
                  <CarouselContent className="-ml-3">
                    {featuredProjects.map((project, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-3 basis-[78%] min-[430px]:basis-[58%] sm:basis-1/3 md:basis-1/4 lg:basis-1/3"
                      >
                        <Link
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group"
                        >
                          <Card className="bg-card overflow-hidden border transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                            <CardContent className="p-0">
                              <AspectRatio ratio={16 / 9}>
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                              </AspectRatio>
                              <div className="p-2.5">
                                <p className="text-xs font-medium truncate">
                                  {project.title}
                                </p>
                                <p className="text-[10px] text-muted-foreground truncate">
                                  {project.techLabel}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-1 h-7 w-7 bg-background/80 backdrop-blur-sm hover:bg-background sm:-left-12" />
                  <CarouselNext className="right-1 h-7 w-7 bg-background/80 backdrop-blur-sm hover:bg-background sm:-right-12" />
                </Carousel>
              </div>
            </div>

            {/* CTA buttons */}
            <div
              className={`flex flex-wrap items-center gap-3 transition-opacity duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              <Button variant="ghost" size="sm" asChild>
                <Link href="#projects">
                  View more projects
                  <FontAwesomeIcon icon={faArrowRight} className="ml-1 h-3 w-3" />
                </Link>
              </Button>
              <Separator orientation="vertical" className="hidden h-4 sm:block" />
              <Button variant="outline" size="sm" asChild>
                <a href="/johan-amador-cv.pdf" download>
                  
                  Download CV
                  <FontAwesomeIcon icon={faDownload} className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>

          <div
            className={`relative hidden lg:flex items-end justify-center transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ isolation: "isolate" }}
          >
            <img
              src="/ja.svg"
              aria-hidden="true"
              className="absolute inset-0 m-auto object-contain opacity-5 scale-[2] pointer-events-none"
              style={{ zIndex: -1 }}
            />
            <img
              src="/hero-section.webp"
              alt="Johan Amador"
              fetchPriority="high"
              className="relative w-full max-w-[400px] xl:max-w-[500px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
