"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { PortfolioDialog } from "@/components/portfolio-dialog";

const links = [
  { title: "Work", href: "#projects" },
  { title: "About", href: "#about" },
  { title: "Experience", href: "#experience" },
  { title: "Contact", href: "#contact" },
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
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
        Skip to content
      </a>
      <header className="site-header">
        <nav className="site-container nav-inner" aria-label="Main navigation">
          <a href="#home" className="wordmark" aria-label="Johan Amador — home">
            <img src="/ja.svg" width="30" height="24" alt="" />
            <span>
              Johan Amador<span className="wordmark-dot">.</span>
            </span>
          </a>
          <div className="desktop-nav">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === link.href ? "location" : undefined}
              >
                {link.title}
              </a>
            ))}
          </div>
          <a className="nav-cta" href="mailto:johan.amador@pucp.edu.pe">
            Let’s talk <ArrowUpRight size={15} />
          </a>
          <button
            type="button"
            className="icon-button mobile-menu-toggle"
            aria-label="Open navigation"
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>
      <PortfolioDialog
        open={open}
        onClose={() => setOpen(false)}
        titleId="mobile-nav-title"
        className="mobile-nav-dialog"
      >
        <h2 id="mobile-nav-title" className="eyebrow">
          Navigation
        </h2>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <a href={link.href} key={link.href} onClick={() => setOpen(false)}>
              <span className="mono">0{index + 1}</span>
              {link.title}
              <ArrowUpRight />
            </a>
          ))}
        </nav>
        <p className="muted">Based in Lima, Peru.</p>
      </PortfolioDialog>
    </>
  );
}
