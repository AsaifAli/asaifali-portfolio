import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`project-card editorial-project ${featured ? "editorial-project-featured" : ""} ${project.accent}`}>
      <div className="card-top">
        <span className="card-number">{project.number}</span>
        <span className="card-kind">{featured ? "Featured build" : "Independent project"}</span>
      </div>
      <div className="eyebrow">{project.eyebrow}</div>
      <h3>{project.name}</h3>
      <p className="project-lede">{project.short}</p>
      <div className="project-story-grid">
        <div>
          <span className="project-story-label">The Current Scenario</span>
          <p>{project.problem}</p>
        </div>
        <div>
          <span className="project-story-label">What I built</span>
          <p>{project.solution}</p>
        </div>
      </div>
      <p className="project-description">{project.description}</p>
      <div className="tags" aria-label="Technologies">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      <div className="project-card-footer">
        <Link className="card-link" href={`/projects/${project.slug}`} aria-label={`View the ${project.name} project`}><span>View project</span><span aria-hidden="true">↗</span></Link>
        <a className="card-link secondary-card-link" href={project.github} target="_blank" rel="noreferrer"><span>GitHub</span><span aria-hidden="true">↗</span></a>
      </div>
    </article>
  );
}
