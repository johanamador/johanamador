"use client";

import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useLanguage } from "@/components/language-provider";

import { ArrowUp } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="site-container footer-top">
        <a href="#home" className="footer-wordmark">
          {t("Johan Amador")}
          <span>.</span>
        </a>
        <a href="#home" className="icon-button" aria-label={t("Back to top")}>
          <ArrowUp size={19} />
        </a>
      </div>
      <div className="site-container footer-bottom">
        <p>
          © {new Date().getFullYear()} {t("Johan Amador")}
        </p>
        <p>{t("Built to keep improving.")}</p>
        <div>
          <a
            href="https://github.com/johanamador"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={17} aria-hidden="true" />
            {t("GitHub")}
          </a>
          <a
            href="https://linkedin.com/in/cosmodev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn size={17} aria-hidden="true" />
            {t("LinkedIn")}
          </a>
        </div>
      </div>
    </footer>
  );
}
