import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card ${project.accent}`}>
      <div className="card-top">
        <span className="card-number">{project.number}</span>
        <span className="status">
          <span className="status-dot" aria-hidden="true" />
          {project.status}
        </span>
      </div>

      <div className="eyebrow">{project.eyebrow}</div>
      <h3>{project.name}</h3>
      <p>{project.short}</p>

      <div className="tags" aria-label="Technologies">
        {project.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="project-card-footer">
        <Link
          className="card-link"
          href={`/projects/${project.slug}`}
          aria-label={`Explore ${project.name}`}
        >
          <span>Explore project</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
