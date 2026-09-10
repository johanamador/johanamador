"use client";

import { FaGithub } from "react-icons/fa6";
import { useLanguage } from "@/components/language-provider";

import { useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Search,
} from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { PortfolioDialog } from "@/components/portfolio-dialog";
import { projects, type Project } from "@/lib/projects";

const selection = [
  {
    id: 18,
    category: "Hospital information system",
    background: "sihsalus",
  },
  {
    id: 11,
    category: "Corporate website",
    background: "sercom",
  },
  {
    id: 16,
    category: "Catalog & platform",
    background: "prosedain",
  },
  {
    id: 21,
    category: "Commerce & operations",
    background: "iserma",
  },
];
const selectedIds = new Set(selection.map((item) => item.id));
const archived = projects.filter((project) => !selectedIds.has(project.id));
const allProjects = projects;
const archiveFilters = [
  { id: "all", label: "All" },
  { id: "systems", label: "Systems & platforms" },
  { id: "websites", label: "Websites" },
  { id: "experiments", label: "Experiments" },
] as const;

function ProjectLinks({ project }: { project: Project }) {
  const { t } = useLanguage();
  const websiteLabel = t(
    project.id === 18 ? "Project information" : "Visit website",
  );
  return (
    <>
      {project.github && (
        <a
          className="archive-action"
          href={project.github}
          aria-label={`${t("Source code")}: ${t(project.title)}`}
          title={t("Source code")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={19} aria-hidden="true" />
        </a>
      )}
      {project.demo && (
        <a
          className="archive-action"
          href={project.demo}
          aria-label={`${websiteLabel}: ${t(project.title)}`}
          title={websiteLabel}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ArrowUpRight size={19} aria-hidden="true" />
        </a>
      )}
    </>
  );
}

function ProjectLogo({ project }: { project: Project }) {
  return (
    <span
      className="project-logo"
      aria-hidden="true"
      style={{
        maskImage: `url("${project.logo}")`,
        WebkitMaskImage: `url("${project.logo}")`,
      }}
    />
  );
}

function ProjectDetail({
  project,
  navigate,
}: {
  project: Project;
  navigate: (project: Project) => void;
}) {
  const { t } = useLanguage();
  const index = allProjects.findIndex((item) => item.id === project.id);
  return (
    <>
      <div className="project-detail-image project-detail-logo">
        <ProjectLogo project={project} />
      </div>
      <div className="project-detail-body">
        <p className="eyebrow">{t("Project details")}</p>
        <h2 id="project-dialog-title">{t(project.title)}</h2>
        <p className="project-detail-description">{t(project.description)}</p>
        {project.contribution && (
          <>
            <p className="eyebrow">{t("My contribution")}</p>
            <p className="project-detail-description">{t(project.contribution)}</p>
          </>
        )}
        <ul className="project-technologies" aria-label={t("Technologies")}>
          {project.technologies.map((tech) => (
            <li key={tech}>{t(tech)}</li>
          ))}
        </ul>
        <div className="project-detail-links">
          {project.demo && (
            <a
              className="pill-button"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(project.id === 18 ? "Project information" : "Visit website")}
              <ArrowUpRight size={16} />
            </a>
          )}
          {project.github && (
            <a
              className="text-link"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={16} aria-hidden="true" />
              {t(project.id === 18 ? "My interoperability module" : "Source code")}
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
        <div className="project-pagination">
          <button
            type="button"
            className="text-link"
            onClick={() =>
              navigate(
                allProjects[
                  (index - 1 + allProjects.length) % allProjects.length
                ],
              )
            }
          >
            <ArrowLeft size={16} />
            {t("Previous")}
          </button>
          <span className="mono muted">
            {String(index + 1).padStart(2, "0")} / {allProjects.length}
          </span>
          <button
            type="button"
            className="text-link"
            onClick={() =>
              navigate(allProjects[(index + 1) % allProjects.length])
            }
          >
            {t("Next")}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

export function ProjectsSection() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Project | null>(null);
  const [featuredId, setFeaturedId] = useState(selection[0].id);
  const [filter, setFilter] =
    useState<(typeof archiveFilters)[number]["id"]>("all");
  const [query, setQuery] = useState("");
  const filtered = archived
    .filter((item) => filter === "all" || item.category === filter)
    .filter((item) =>
      `${t(item.title)} ${item.technologies.map(t).join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
    );
  return (
    <section id="projects" className="portfolio-section projects-section">
      <div className="site-container">
        <SectionTitle
          index="01"
          eyebrow={t("Selected work")}
          title={t("Ideas, made real.")}
          description={t(
            "A selection of websites, platforms and systems I’ve helped bring to life.",
          )}
        />
        <div className="featured-showcase">
          <div
            className="featured-tabs"
            role="tablist"
            aria-label={t("Selected work")}
            aria-orientation="vertical"
          >
            {selection.map((item, index) => {
              const project = projects.find(
                (project) => project.id === item.id,
              )!;
              return (
                <button
                  key={item.id}
                  id={`featured-tab-${item.id}`}
                  className="featured-tab"
                  type="button"
                  role="tab"
                  aria-selected={featuredId === item.id}
                  aria-controls={`featured-panel-${item.id}`}
                  tabIndex={featuredId === item.id ? 0 : -1}
                  onClick={() => setFeaturedId(item.id)}
                  onKeyDown={(event) => {
                    let next = index;
                    if (event.key === "ArrowDown" || event.key === "ArrowRight")
                      next = (index + 1) % selection.length;
                    else if (
                      event.key === "ArrowUp" ||
                      event.key === "ArrowLeft"
                    )
                      next = (index - 1 + selection.length) % selection.length;
                    else if (event.key === "Home") next = 0;
                    else if (event.key === "End") next = selection.length - 1;
                    else return;
                    event.preventDefault();
                    setFeaturedId(selection[next].id);
                    document
                      .getElementById(`featured-tab-${selection[next].id}`)
                      ?.focus({ preventScroll: true });
                  }}
                >
                  <span className="featured-index mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="featured-tab-copy">
                    <span>{t(project.title)}</span>
                    <span className="eyebrow">{t(item.category)}</span>
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              );
            })}
          </div>
          <div className="featured-panels">
            {selection.map((item) => {
              const project = projects.find(
                (project) => project.id === item.id,
              )!;
              return (
                <div
                  key={item.id}
                  id={`featured-panel-${item.id}`}
                  role="tabpanel"
                  aria-labelledby={`featured-tab-${item.id}`}
                  hidden={featuredId !== item.id}
                  tabIndex={0}
                  className="featured-panel"
                >
                  <img
                    className="featured-background"
                    src={`/projects/featured/${item.background}-960.webp`}
                    srcSet={`/projects/featured/${item.background}-480.webp 480w, /projects/featured/${item.background}-960.webp 960w`}
                    sizes="(max-width: 600px) 70vw, (max-width: 900px) 60vw, 40vw"
                    alt=""
                    aria-hidden="true"
                    width={960}
                    height={960}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="featured-story">
                    <p className="eyebrow">{t(item.category)}</p>
                    <h3 className="featured-brand">
                      <span className="sr-only">{t(project.title)}</span>
                      <ProjectLogo project={project} />
                    </h3>
                    <p className="featured-summary">
                      {t(project.shortDescription)}
                    </p>
                  </div>
                  <ul className="featured-tech" aria-label={t("Technologies")}>
                    {project.technologies.slice(0, 5).map((tech) => (
                      <li key={tech}>{t(tech)}</li>
                    ))}
                  </ul>
                  <div className="featured-footer">
                    <a
                      className="pill-button"
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t(
                        project.id === 18
                          ? "Project information"
                          : "Visit website",
                      )}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                    <div className="featured-links">
                      {project.github && (
                        <a
                          className="archive-action"
                          href={project.github}
                          aria-label={`${t(project.id === 18 ? "My interoperability module" : "Source code")}: ${t(project.title)}`}
                          title={t(project.id === 18 ? "My interoperability module" : "Source code")}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGithub size={19} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                    <button
                      type="button"
                      className="text-link"
                      onClick={() => setSelected(project)}
                    >
                      {t("View project")}
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="archive" id="archive">
          <div className="archive-heading">
            <div>
              <p className="eyebrow">{t("There’s more to explore")}</p>
              <h3>
                {t("The archive")}
                <span className="mono">{archived.length}</span>
              </h3>
            </div>
            <ArrowDown className="muted" size={22} />
          </div>
          <div className="archive-toolbar">
            <div
              className="archive-filters"
              role="group"
              aria-label={t("Filter archive")}
            >
              {archiveFilters.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={filter === tab.id}
                  onClick={() => setFilter(tab.id)}
                >
                  {t(tab.label)}
                  <span>
                    {tab.id === "all"
                      ? archived.length
                      : archived.filter(
                          (project) => project.category === tab.id,
                        ).length}
                  </span>
                </button>
              ))}
            </div>
            <label className="archive-search">
              <Search size={15} />
              <span className="sr-only">{t("Search archive")}</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("Find a project…")}
              />
            </label>
          </div>
          <div className="archive-list" aria-live="polite">
            {filtered.map((project) => (
              <article className="archive-card" key={project.id}>
                <div className="archive-tile">
                  <button
                    type="button"
                    className="archive-project"
                    onClick={() => setSelected(project)}
                    aria-label={`${t("View project")}: ${t(project.title)}`}
                  >
                    <span className="archive-logo">
                      <ProjectLogo project={project} />
                    </span>
                    <span className="archive-info">
                      <span className="archive-title">{t(project.title)}</span>
                      <span className="archive-description">
                        {t(project.shortDescription)}
                      </span>
                      <span className="archive-tech">
                        {project.technologies.slice(0, 3).map(t).join(" · ")}
                      </span>
                    </span>
                  </button>
                  <div className="archive-actions">
                    <ProjectLinks project={project} />
                  </div>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <div className="archive-empty">
                <p>
                  {t("No projects match “")}
                  {query}”.
                </p>
                <button
                  className="text-link"
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setFilter("all");
                  }}
                >
                  {t("Clear search")}
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <PortfolioDialog
        open={selected !== null}
        onClose={() => setSelected(null)}
        titleId="project-dialog-title"
      >
        {selected && (
          <ProjectDetail project={selected} navigate={setSelected} />
        )}
      </PortfolioDialog>
    </section>
  );
}
