"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { PortfolioDialog } from "@/components/portfolio-dialog";
import { galleryImages } from "@/lib/profile";

export function GallerySection() {
  const track = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  function scroll(direction: number) {
    track.current?.scrollBy({
      left: direction * track.current.clientWidth * 0.75,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <section id="gallery" className="portfolio-section">
      <div className="site-container">
        <SectionTitle
          index="04"
          eyebrow="Beyond the screen"
          title="People & moments."
          description="A few snapshots from the communities and projects I’ve been part of."
        />
        <div className="gallery-controls">
          <span className="mono muted">A few moments along the way</span>
          <div>
            <button
              className="icon-button"
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous photos"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              className="icon-button"
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next photos"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <div
          className="gallery-track"
          ref={track}
          tabIndex={0}
          role="region"
          aria-label="Photo gallery"
        >
          {galleryImages.map((photo, index) => (
            <figure className="gallery-item" key={photo.src}>
              <button
                type="button"
                onClick={() => setSelected(index)}
                aria-label={`Enlarge photo: ${photo.alt}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={640}
                  height={480}
                  loading="lazy"
                />
                <span>
                  <ArrowUpRight size={18} />
                </span>
              </button>
              <figcaption>
                <span className="mono">0{index + 1}</span>
                <p>{photo.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <PortfolioDialog
        open={selected !== null}
        onClose={() => setSelected(null)}
        titleId="gallery-dialog-title"
        className="gallery-dialog"
      >
        {selected !== null && (
          <>
            <img
              src={galleryImages[selected].src}
              alt={galleryImages[selected].alt}
              className="gallery-full-image"
            />
            <div className="gallery-dialog-caption">
              <h2 id="gallery-dialog-title">{galleryImages[selected].alt}</h2>
              <p className="muted">{galleryImages[selected].description}</p>
              <div className="project-pagination">
                <button
                  type="button"
                  className="text-link"
                  onClick={() =>
                    setSelected(
                      (selected - 1 + galleryImages.length) %
                        galleryImages.length,
                    )
                  }
                >
                  <ArrowLeft size={16} />
                  Previous
                </button>
                <span className="mono">
                  {selected + 1} / {galleryImages.length}
                </span>
                <button
                  type="button"
                  className="text-link"
                  onClick={() =>
                    setSelected((selected + 1) % galleryImages.length)
                  }
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </PortfolioDialog>
    </section>
  );
}
