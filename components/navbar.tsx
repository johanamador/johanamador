"use client";

import { useLanguage } from "@/components/language-provider";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { PortfolioDialog } from "@/components/portfolio-dialog";
import { AppearanceControls } from "@/components/appearance-controls";

const links = [
  { title: "Work", href: "#projects" },
  { title: "About", href: "#about" },
  { title: "Experience", href: "#experience" },
  { title: "Contact", href: "#contact" },
];
export function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    let previous = "";
    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / 160)).toFixed(
        3,
      );
      if (progress !== previous) {
        headerRef.current?.style.setProperty("--header-progress", progress);
        headerRef.current?.setAttribute(
          "data-scrolled",
          window.scrollY > 0 ? "true" : "false",
        );
        previous = progress;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <a href="#main-content" className="skip-link">
        {t("Skip to content")}
      </a>
      <header className="site-header" ref={headerRef} data-scrolled="false">
        <nav
          className="site-container nav-inner"
          aria-label={t("Main navigation")}
        >
          <a
            href="#home"
            className="wordmark"
            aria-label={t("Johan Amador — home")}
          >
            <img src="/ja.svg" width="30" height="24" alt="" />
            <span>
              {t("Johan Amador")}
              <span className="wordmark-dot">.</span>
            </span>
          </a>
          <div className="desktop-nav">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === link.href ? "location" : undefined}
              >
                {t(link.title)}
              </a>
            ))}
          </div>
          <div className="nav-tools">
            <AppearanceControls />
            <button
              type="button"
              className="icon-button mobile-menu-toggle"
              aria-label={t("Open navigation")}
              aria-haspopup="dialog"
              onClick={() => setOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>
      <PortfolioDialog
        open={open}
        onClose={() => setOpen(false)}
        titleId="mobile-nav-title"
        className="mobile-nav-dialog"
      >
        <h2 id="mobile-nav-title" className="eyebrow">
          {t("Navigation")}
        </h2>
        <nav aria-label={t("Mobile navigation")}>
          {links.map((link, index) => (
            <a href={link.href} key={link.href} onClick={() => setOpen(false)}>
              <span className="mono">0{index + 1}</span>
              {t(link.title)}
              <ArrowUpRight />
            </a>
          ))}
        </nav>
        <p className="muted">{t("Based in Lima, Perú.")}</p>
      </PortfolioDialog>
    </>
  );
}
