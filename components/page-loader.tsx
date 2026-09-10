"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { SonarGrid } from "@/components/ui/sonar-grid";

export function PageLoader({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"loading" | "leaving" | "ready">("loading");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const previousOverflow = document.body.style.overflow;
    let cancelled = false;
    let finishing = false;
    let revealTimer = 0;
    let removeTimer = 0;
    if (content) content.inert = true;
    document.body.style.overflow = "hidden";

    const restore = () => {
      if (content) content.inert = false;
      document.body.style.overflow = previousOverflow;
    };
    const finish = () => {
      if (cancelled || finishing) return;
      finishing = true;
      // Count from navigation, so a slow connection never gets an extra intro delay.
      const remaining = Math.max(0, 650 - performance.now());
      revealTimer = window.setTimeout(() => {
        setPhase("leaving");
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        removeTimer = window.setTimeout(() => {
          restore();
          setPhase("ready");
        }, reduce ? 0 : 400);
      }, remaining);
    };
    const onLoad = () => {
      document.fonts.ready.then(finish, finish);
    };
    // An unavailable font or resource must never keep the portfolio covered.
    const fallbackTimer = window.setTimeout(finish, 4500);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(removeTimer);
      restore();
    };
  }, []);

  return (
    <>
      <noscript><style>{".page-loader { display: none !important; }"}</style></noscript>
      {phase !== "ready" && (
        <div className="page-loader" data-phase={phase} role="status" aria-label="Loading portfolio">
          <SonarGrid
            className="page-loader-grid"
            spacing={30}
            dotRadius={1}
            baseOpacity={0.13}
            color="#b8b8b8"
            pingEvery={3.2}
            speed={180}
            ringWidth={70}
            amplitude={1.4}
            maxRings={3}
            interactive={false}
          >
            <div className="page-loader-wash" aria-hidden="true" />
            <div className="page-loader-mark" aria-hidden="true">
              <img src="/ja.svg" alt="" width={112} height={60} fetchPriority="high" />
              <span className="page-loader-track"><span /></span>
            </div>
          </SonarGrid>
          <span className="sr-only">Loading portfolio</span>
        </div>
      )}
      <div ref={contentRef}>{children}</div>
    </>
  );
}
