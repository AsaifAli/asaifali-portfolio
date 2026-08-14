import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card ${project.accent}`}>
      <div className="card-top"><span className="card-number">{project.number}</span><span className="status">{project.status}</span></div>
      <div className="eyebrow">{project.eyebrow}</div>
      <h3>{project.name}</h3>
      <p>{project.short}</p>
      <div className="tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      <Link className="card-link" href={`/projects/${project.slug}`}>Explore project →</Link>
    </article>
  );
}
