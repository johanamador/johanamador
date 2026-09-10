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
import { TiltCard } from "@/components/spell/tilt-card";
import { PortfolioDialog } from "@/components/portfolio-dialog";
import { projects, type Project } from "@/lib/projects";

const selection = [
  {
    id: 11,
    category: "Corporate website",
    summary: "A digital home for industrial safety.",
    cover: "/projects/previews/sercom.webp",
  },
  {
    id: 16,
    category: "Catalog & platform",
    summary: "Industrial products, simpler quotations.",
    cover: "/projects/previews/prosedain.webp",
  },
  {
    id: 21,
    category: "Commerce & operations",
    summary: "An industrial catalog, built to be managed.",
    cover: "/projects/previews/iserma.webp",
  },
  {
    id: 18,
    category: "Healthcare & interoperability",
    summary: "Connecting clinical records across systems.",
    cover: "",
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

function ProjectDetail({
  project,
  navigate,
}: {
  project: Project;
  navigate: (project: Project) => void;
}) {
  const { t } = useLanguage();
  const index = allProjects.findIndex((item) => item.id === project.id);
  const cover = selection.find((item) => item.id === project.id)?.cover;
  return (
    <>
      <div
        className={`project-detail-image ${cover ? "" : "project-detail-logo"}`}
      >
        <img
          src={cover || project.image}
          alt={
            cover
              ? `${t(project.title)} - ${t("website preview")}`
              : t(project.title)
          }
        />
      </div>
      <div className="project-detail-body">
        <p className="eyebrow">{t("Project details")}</p>
        <h2 id="project-dialog-title">{t(project.title)}</h2>
        <p className="project-detail-description">{t(project.description)}</p>
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
              {t("Visit website")}
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
              {t("Source code")}
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
        <div className="featured-grid">
          {selection.map((item, index) => {
            const project = projects.find((project) => project.id === item.id)!;
            return (
              <article className="featured-project" key={project.id}>
                <button
                  type="button"
                  className="project-cover-button"
                  onClick={() => setSelected(project)}
                  aria-label={`${t("View project")}: ${t(project.title)}`}
                >
                  <TiltCard
                    tiltLimit={2}
                    scale={1.008}
                    spotlight
                    className={`project-cover ${item.cover ? "" : "project-cover-logo"}`}
                  >
                    <div className="cover-topline">
                      <span className="mono">
                        {t("PROJECT /")} {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="cover-open">
                        <ArrowUpRight size={17} />
                      </span>
                    </div>
                    <div className="cover-art">
                      <img
                        src={item.cover || project.image}
                        alt={
                          item.cover
                            ? `${t(project.title)} - ${t("website")}`
                            : t(project.title)
                        }
                        loading="lazy"
                        width={1440}
                        height={1000}
                      />
                    </div>
                    {!item.cover && (
                      <p className="cover-caption mono">
                        {t("OpenMRS / HL7 FHIR / RENHICE")}
                      </p>
                    )}
                  </TiltCard>
                </button>
                <div className="project-caption">
                  <div>
                    <p className="eyebrow">{t(item.category)}</p>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setSelected(project)}
                      >
                        {t(project.title)}
                      </button>
                    </h3>
                    <p className="muted">{t(item.summary)}</p>
                  </div>
                  <a
                    className="icon-button"
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("Visit")} ${t(project.title)}`}
                  >
                    <ArrowUpRight size={19} />
                  </a>
                </div>
              </article>
            );
          })}
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
            {filtered.map((project, index) => (
              <article className="archive-row" key={project.id}>
                <button
                  type="button"
                  className="archive-project"
                  onClick={() => setSelected(project)}
                  aria-label={`${t("View project")}: ${t(project.title)}`}
                >
                  <span className="archive-number mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <img
                    src={project.image}
                    alt=""
                    width={64}
                    height={44}
                    loading="lazy"
                  />
                  <span className="archive-info">
                    <span className="archive-title">{t(project.title)}</span>
                    <span className="archive-tech">
                      {project.technologies.slice(0, 3).map(t).join(" · ")}
                    </span>
                  </span>
                </button>
                <div className="archive-actions">
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
                      aria-label={`${t("Visit website")}: ${t(project.title)}`}
                      title={t("Visit website")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ArrowUpRight size={19} aria-hidden="true" />
                    </a>
                  )}
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
