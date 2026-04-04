"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faDownload } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
          <div className="flex flex-col justify-center space-y-4">
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
              <h2 className="text-xl sm:text-2xl text-primary mb-4">
                Software Developer | Computer Science Engineer
              </h2>
              <p className="max-w-[600px] text-muted-foreground text-lg mb-6">
                Focused on building efficient solutions with modern
                technologies. Self-taught and passionate about tackling real
                technical challenges.
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-3 transition-opacity duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              <Button asChild>
                <Link href="#projects">
                  View Projects
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ml-1 h-4 w-4"
                  />
                </Link>
              </Button>
              {/*<Button variant="outline" asChild>
                <Link href="#contact">Contact Me</Link>
              </Button>*/}
              <Button variant="secondary" asChild>
                <a href="/johan-amador-cv.pdf" download>
                  Download CV
                  <FontAwesomeIcon icon={faDownload} className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className={`relative flex items-end justify-center transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <img
              src="/ja.svg"
              aria-hidden="true"
              className="absolute inset-0 m-auto object-contain opacity-5 scale-[2]"
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
