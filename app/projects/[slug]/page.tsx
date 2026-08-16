import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = getProject(slug); if (!project) notFound();
  return <main className="shell">
    <section className="detail-hero"><div className="eyebrow">{project.eyebrow}</div><h1>{project.name}</h1><p className="lead">{project.description}</p><div className="hero-meta"><a className="btn btn-primary" href={project.github} target="_blank" rel="noreferrer">View GitHub ↗</a><span className="btn btn-secondary">Private live demo available</span></div></section>
    <section className="media-placeholder" aria-label="Project media placeholder">
      <div>
        <div className="section-kicker">Media</div>
        <h2>Demo video & screenshots</h2>
        <p>Space reserved for a short product walkthrough and selected screenshots. These will be added as the project demos are recorded.</p>
      </div>
      <div className="media-slot-grid" aria-hidden="true">
        <div className="media-slot">VIDEO PLACEHOLDER</div>
        <div className="media-slot">SCREENSHOT PLACEHOLDER</div>
        <div className="media-slot">SCREENSHOT PLACEHOLDER</div>
      </div>
    </section>
    <section className="detail-grid">
      <article className="detail-panel"><h3>Problem</h3><p>{project.problem}</p><h3 style={{marginTop:28}}>Solution</h3><p>{project.solution}</p><h3 style={{marginTop:28}}>Architecture</h3><div className="architecture">{project.architecture.map(x=><span className="tag" key={x}>{x}</span>)}</div></article>
      <aside className="detail-panel"><h3>Technology</h3><div className="tags">{project.tags.map(x=><span className="tag" key={x}>{x}</span>)}</div><h3 style={{marginTop:28}}>Engineering decisions</h3><ul>{project.decisions.map(x=><li key={x}>{x}</li>)}</ul><h3 style={{marginTop:28}}>Reliability</h3><ul>{project.reliability.map(x=><li key={x}>{x}</li>)}</ul></aside>
    </section>
    <div className="center" style={{paddingBottom:80}}><Link className="btn btn-secondary" href="/#work">← Back to projects</Link></div>
  </main>;
}
