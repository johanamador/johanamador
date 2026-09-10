"use client";

import { useContext } from "react";
import { PageReadyContext } from "@/components/page-loader";

export function HeroBrand() {
  const ready = useContext(PageReadyContext);
  return (
    <h1 id="hero-title" className="hero-brand" data-ready={ready}>
      <img
        src="/ja.svg"
        alt=""
        aria-hidden="true"
        width={150}
        height={80}
        className="hero-brand-logo"
      />
      <span className="hero-brand-name">
        Johan Amador<span className="hero-brand-dot">.</span>
      </span>
    </h1>
  );
}
