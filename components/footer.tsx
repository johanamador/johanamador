import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-top">
        <a href="#home" className="footer-wordmark">
          Johan Amador<span>.</span>
        </a>
        <a href="#home" className="icon-button" aria-label="Back to top">
          <ArrowUp size={19} />
        </a>
      </div>
      <div className="site-container footer-bottom">
        <p>© {new Date().getFullYear()} Johan Amador</p>
        <p>Made with care in Lima, Peru.</p>
        <div>
          <a
            href="https://github.com/johanamador"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/cosmodev"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
