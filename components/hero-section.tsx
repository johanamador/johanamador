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
      className="min-h-[100dvh] flex items-center py-20 lg:py-12 relative overflow-hidden"
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
        <div className="grid gap-8 lg:grid-cols-[1fr_350px] lg:gap-8 xl:grid-cols-[1fr_500px] xl:gap-12">
          <div className="flex flex-col justify-center space-y-4 lg:space-y-3">
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
              <div className="flex items-baseline mb-2">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                  Johan Amador
                </h1>
                <span className="ml-3 text-sm text-muted-foreground">
                  @cosmodev
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl text-primary mb-2 lg:mb-1">
                Software Developer | Computer Science Engineer
              </h2>
              <p className="max-w-[600px] text-muted-foreground text-lg">
                Focused on building efficient solutions with modern
                technologies. Self-taught and passionate about tackling real
                technical challenges.
              </p>
            </div>

            {/* Featured projects carousel */}
            <div
              className={`transition-opacity duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              <div className="px-9 -mx-9">
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
                        className="pl-3 basis-[45%] min-[480px]:basis-1/3 sm:basis-1/4 lg:basis-1/3"
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
                  <CarouselPrevious className="h-7 w-7 bg-background/80 backdrop-blur-sm hover:bg-background" />
                  <CarouselNext className="h-7 w-7 bg-background/80 backdrop-blur-sm hover:bg-background" />
                </Carousel>
              </div>
            </div>

            {/* CTA buttons */}
            <div
              className={`flex items-center gap-3 transition-opacity duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              <Button variant="ghost" size="sm" asChild>
                <Link href="#projects">
                  View more projects
                  <FontAwesomeIcon icon={faArrowRight} className="ml-1 h-3 w-3" />
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-4" />
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
              src="/hero-section.png"
              alt="Johan Amador"
              className="relative w-full max-w-[400px] xl:max-w-[500px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
