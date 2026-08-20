"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const project = projects[index];

  const go = useCallback(
    (direction: 1 | -1) => {
      setIndex((current) => (current + direction + projects.length) % projects.length);
    },
    [projects.length]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go]);

  const position = useMemo(
    () => `${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`,
    [index, projects.length]
  );

  if (!project) return null;

  return (
    <div className="project-carousel" aria-label="Selected personal projects">
      <article className="carousel-card" aria-live="polite">
        <div className="carousel-card-top">
          <div className="carousel-meta">
            <span className="card-number">{position}</span>
            <span className="carousel-kind">{index === 0 ? "Featured build" : "Independent build"}</span>
          </div>

          <div className="carousel-nav" aria-label="Project navigation">
            <button
              className="carousel-arrow"
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous project"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              className="carousel-arrow"
              type="button"
              onClick={() => go(1)}
              aria-label="Next project"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div className="carousel-heading">
          <div>
            <div className="eyebrow">{project.eyebrow}</div>
            <h3>{project.name}</h3>
          </div>
          <p className="carousel-short">{project.short}</p>
        </div>

        <div className="carousel-divider" />

        <div className="carousel-summary-grid">
          <div>
            <span className="carousel-summary-label">Current Scenario</span>
            <p>{project.problem}</p>
          </div>
          <div>
            <span className="carousel-summary-label">What I built</span>
            <p>{project.solution}</p>
          </div>
        </div>

        <div className="carousel-bottom">
          <div className="tags" aria-label="Technologies">
            {project.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>

          <div className="carousel-footer">
            <Link className="btn btn-primary carousel-explore" href={`/projects/${project.slug}`}>
              Explore project <span aria-hidden="true">↗</span>
            </Link>
            <a className="text-link" href={project.github} target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </article>

      <div className="carousel-pagination" aria-live="polite">
        <span className="carousel-pagination-count">{position}</span>
        <div className="carousel-progress" aria-hidden="true">
          {projects.map((item, itemIndex) => (
            <button
              key={item.slug}
              className={`carousel-progress-segment ${itemIndex === index ? "active" : ""}`}
              type="button"
              tabIndex={-1}
              onClick={() => setIndex(itemIndex)}
              aria-label={`Show ${item.name}`}
            />
          ))}
        </div>
        <span className="carousel-hint">Use ← / → to browse</span>
      </div>
    </div>
  );
}
