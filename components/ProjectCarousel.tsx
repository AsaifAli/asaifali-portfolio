"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const project = projects[index];

  const go = useCallback((direction: 1 | -1) => {
    setIndex((current) => (current + direction + projects.length) % projects.length);
  }, [projects.length]);

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
      <button className="carousel-arrow carousel-arrow-left" type="button" onClick={() => go(-1)} aria-label="Previous project">←</button>

      <article className="carousel-card" aria-live="polite">
        <div className="carousel-card-top">
          <span className="card-number">{position}</span>
          <span className="carousel-card-label">{index === 0 ? "Featured build" : "Independent build"}</span>
        </div>
        <div className="eyebrow">{project.eyebrow}</div>
        <h3>{project.name}</h3>
        <p className="carousel-short">{project.short}</p>
        <div className="carousel-divider" />
        <div className="carousel-summary-grid">
          <div>
            <span className="carousel-summary-label">THE PROBLEM</span>
            <p>{project.problem}</p>
          </div>
          <div>
            <span className="carousel-summary-label">WHAT I BUILT</span>
            <p>{project.solution}</p>
          </div>
        </div>
        <div className="tags" aria-label="Technologies">
          {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
        <div className="carousel-footer">
          <Link className="btn btn-primary carousel-explore" href={`/projects/${project.slug}`}>Explore project ↗</Link>
          <a className="text-link" href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </article>

      <button className="carousel-arrow carousel-arrow-right" type="button" onClick={() => go(1)} aria-label="Next project">→</button>

      <div className="carousel-pagination" aria-live="polite">
        <span>{position}</span>
        <div className="carousel-dots" aria-hidden="true">
          {projects.map((item, itemIndex) => (
            <button key={item.slug} className={`carousel-dot ${itemIndex === index ? "active" : ""}`} type="button" tabIndex={-1} onClick={() => setIndex(itemIndex)} aria-label={`Show ${item.name}`} />
          ))}
        </div>
        <span className="carousel-hint">Use ← / → to browse</span>
      </div>
    </div>
  );
}
