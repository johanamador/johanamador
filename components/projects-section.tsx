"use client";

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
import { projects, designs, type Project } from "@/lib/projects";

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
const allProjects = [...projects, ...designs];

function ProjectDetail({
  project,
  navigate,
}: {
  project: Project;
  navigate: (project: Project) => void;
}) {
  const index = allProjects.findIndex((item) => item.id === project.id);
  const cover = selection.find((item) => item.id === project.id)?.cover;
  return (
    <>
      <div
        className={`project-detail-image ${cover ? "" : "project-detail-logo"}`}
      >
        <img
          src={cover || project.image}
          alt={cover ? `${project.title} website preview` : project.title}
        />
      </div>
      <div className="project-detail-body">
        <p className="eyebrow">
          {project.figma ? "Design study" : "Project details"}
        </p>
        <h2 id="project-dialog-title">{project.title}</h2>
        <p className="project-detail-description">{project.description}</p>
        <ul className="project-technologies" aria-label="Technologies">
          {project.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
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
              {project.figma ? "Open prototype" : "Visit website"}
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
              Source code
              <ArrowUpRight size={16} />
            </a>
          )}
          {project.figma && (
            <a
              className="text-link"
              href={project.figma}
              target="_blank"
              rel="noopener noreferrer"
            >
              Figma file
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
            Previous
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
            Next
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"projects" | "designs">("projects");
  const [query, setQuery] = useState("");
  const filtered = (filter === "projects" ? archived : designs).filter((item) =>
    `${item.title} ${item.technologies.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  return (
    <section id="projects" className="portfolio-section projects-section">
      <div className="site-container">
        <SectionTitle
          index="01"
          eyebrow="Selected work"
          title="Ideas, made real."
          description="A selection of websites, platforms and systems I’ve helped bring to life."
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
                  aria-label={`View ${project.title} project`}
                >
                  <TiltCard
                    tiltLimit={2}
                    scale={1.008}
                    spotlight
                    className={`project-cover ${item.cover ? "" : "project-cover-logo"}`}
                  >
                    <div className="cover-topline">
                      <span className="mono">
                        PROJECT / {String(index + 1).padStart(2, "0")}
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
                            ? `${project.title} website`
                            : project.title
                        }
                        loading="lazy"
                        width={1440}
                        height={1000}
                      />
                    </div>
                    {!item.cover && (
                      <p className="cover-caption mono">
                        OpenMRS / HL7 FHIR R4 / RENHICE
                      </p>
                    )}
                  </TiltCard>
                </button>
                <div className="project-caption">
                  <div>
                    <p className="eyebrow">{item.category}</p>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setSelected(project)}
                      >
                        {project.title}
                      </button>
                    </h3>
                    <p className="muted">{item.summary}</p>
                  </div>
                  <a
                    className="icon-button"
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title}`}
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
              <p className="eyebrow">There’s more to explore</p>
              <h3>
                The archive
                <span className="mono">{archived.length + designs.length}</span>
              </h3>
            </div>
            <ArrowDown className="muted" size={22} />
          </div>
          <div className="archive-toolbar">
            <div
              className="archive-filters"
              role="group"
              aria-label="Filter archive"
            >
              <button
                type="button"
                aria-pressed={filter === "projects"}
                onClick={() => setFilter("projects")}
              >
                Development <span>{archived.length}</span>
              </button>
              <button
                type="button"
                aria-pressed={filter === "designs"}
                onClick={() => setFilter("designs")}
              >
                Design <span>{designs.length}</span>
              </button>
            </div>
            <label className="archive-search">
              <Search size={15} />
              <span className="sr-only">Search archive</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find a project…"
              />
            </label>
          </div>
          <div className="archive-list" aria-live="polite">
            {filtered.map((project, index) => (
              <button
                type="button"
                className="archive-row"
                key={project.id}
                onClick={() => setSelected(project)}
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
                <span className="archive-title">{project.title}</span>
                <span className="archive-tech">
                  {project.technologies.slice(0, 3).join(" · ")}
                </span>
                <ArrowUpRight size={18} />
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="archive-empty">
                <p>No projects match “{query}”.</p>
                <button
                  className="text-link"
                  type="button"
                  onClick={() => setQuery("")}
                >
                  Clear search <ArrowRight size={15} />
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
