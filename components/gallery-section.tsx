"use client";

import { useLanguage } from "@/components/language-provider";

import { useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { PortfolioDialog } from "@/components/portfolio-dialog";
import { galleryImages } from "@/lib/profile";

export function GallerySection() {
  const { t } = useLanguage();
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
          eyebrow={t("Beyond the screen")}
          title={t("People & moments.")}
          description={t(
            "A few snapshots from the communities and projects I’ve been part of.",
          )}
        />
        <div className="gallery-controls">
          <span className="mono muted">{t("A few moments along the way")}</span>
          <div>
            <button
              className="icon-button"
              type="button"
              onClick={() => scroll(-1)}
              aria-label={t("Previous photos")}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              className="icon-button"
              type="button"
              onClick={() => scroll(1)}
              aria-label={t("Next photos")}
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
          aria-label={t("Photo gallery")}
        >
          {galleryImages.map((photo, index) => (
            <figure
              className="gallery-item"
              data-portrait={photo.width < photo.height}
              key={photo.src}
              style={
                {
                  "--photo-ratio":
                    photo.previewRatio ??
                    Math.max(0.9, photo.width / photo.height),
                  "--photo-position": photo.previewPosition,
                } as CSSProperties
              }
            >
              <button
                type="button"
                onClick={() => setSelected(index)}
                aria-label={`${t("Enlarge photo")}: ${t(photo.alt)}`}
              >
                <img
                  src={photo.thumbnail}
                  alt={t(photo.alt)}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                />
                <span>
                  <ArrowUpRight size={18} />
                </span>
              </button>
              <figcaption>
                <span className="mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{t(photo.description)}</p>
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
            <div className="gallery-image-stage">
              <img
                src={galleryImages[selected].thumbnail}
                alt=""
                aria-hidden="true"
                className="gallery-image-backdrop"
              />
              <img
                src={galleryImages[selected].src}
                alt={t(galleryImages[selected].alt)}
                className="gallery-full-image"
              />
            </div>
            <div className="gallery-dialog-caption">
              <h2 id="gallery-dialog-title">
                {t(galleryImages[selected].alt)}
              </h2>
              <p className="muted">{t(galleryImages[selected].description)}</p>
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
                  {t("Previous")}
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
                  {t("Next")}
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
