import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card editorial-project ${project.accent}`}>
      <div className="card-top"><span className="card-number">{project.number}</span></div>
      <div className="eyebrow">{project.eyebrow}</div>
      <h3>{project.name}</h3>
      <p>{project.short}</p>
      <div className="tags" aria-label="Technologies">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      <div className="project-card-footer">
        <Link className="card-link" href={`/projects/${project.slug}`} aria-label={`View the ${project.name} project`}><span>View project</span><span aria-hidden="true">↗</span></Link>
        <a className="card-link secondary-card-link" href={project.github} target="_blank" rel="noreferrer"><span>Source</span><span aria-hidden="true">↗</span></a>
      </div>
    </article>
  );
}
