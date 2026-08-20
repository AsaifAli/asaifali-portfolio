import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjectLiveUrl, projects } from "@/lib/projects";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { AISessionProvider } from "@/components/AISessionProvider";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const star = project.star;

  return (
    <AISessionProvider>
      <main className="shell">
        <section className="detail-hero">
          <div className="eyebrow">{project.eyebrow}</div>
          <h1>{project.name}</h1>
          <p className="lead">{project.description}</p>
          <div className="hero-meta">
            <Link className="btn btn-primary" href="#project-demo">Try live demo →</Link>
            <a className="btn btn-secondary" href={project.github} target="_blank" rel="noreferrer">View GitHub ↗</a>
          </div>
        </section>

        {star && (
          <section className="star-section" aria-labelledby="star-heading">
            <h2><div className="section-kicker">Project story</div></h2>
            {/* <h2 id="star-heading"></h2> */}
            <div className="star-grid">
              <article className="star-card"><span>01</span><h3>Situation</h3><p>{star.situation}</p></article>
              <article className="star-card"><span>02</span><h3>Task</h3><p>{star.task}</p></article>
              <article className="star-card star-card-wide"><span>03</span><h3>Action</h3><ul>{star.action.map((item) => <li key={item}>{item}</li>)}</ul></article>
              <article className="star-card star-card-wide"><span>04</span><h3>Result</h3><ul>{star.result.map((item) => <li key={item}>{item}</li>)}</ul></article>
            </div>
          </section>
        )}

        {/* <section className="media-placeholder" aria-label="Project media placeholder">
          <div>
            <div className="section-kicker">Media</div>
            <h2>Demo video & screenshots</h2>
            <p>Reserved space for a short walkthrough and selected screens. The technical story below stays readable even before the final media is added.</p>
          </div>
          <div className="media-slot-grid" aria-hidden="true">
            <div className="media-slot">VIDEO PLACEHOLDER</div>
            <div className="media-slot">SCREENSHOT PLACEHOLDER</div>
            <div className="media-slot">SCREENSHOT PLACEHOLDER</div>
          </div>
        </section> */}

        <section className="detail-grid">
          {/* <article className="detail-panel"> */}
            {/* <h3>Problem</h3>
            <p>{project.problem}</p>
            <h3 style={{ marginTop: 28 }}>Solution</h3>
            <p>{project.solution}</p> */}
            {/* <h3 style={{ marginTop: 28 }}>Architecture</h3>
            <div className="architecture">{project.architecture.map((x) => <span className="tag" key={x}>{x}</span>)}</div>
          </article> */}
          <aside className="detail-panel">
            <h3>Technology</h3>
            <div className="tags">{project.tags.map((x) => <span className="tag" key={x}>{x}</span>)}</div>
            <h3 style={{ marginTop: 28 }}>Engineering decisions</h3>
            <ul>{project.decisions.map((x) => <li key={x}>{x}</li>)}</ul>
            <h3 style={{ marginTop: 28 }}>Reliability</h3>
            <ul>{project.reliability.map((x) => <li key={x}>{x}</li>)}</ul>
          </aside>
        </section>

        <section id="project-demo" className="section" style={{ paddingTop: 0 }}>
          <InteractiveDemo
            project={project.slug}
            mode="manager"
            title={`Try ${project.name} live`}
            description="Bring your own provider key to create a short-lived session for this project. The portfolio does not store the credential."
            liveUrl={getProjectLiveUrl(project)}
          />
        </section>

        <div className="center" style={{ paddingBottom: 80 }}>
          <Link className="btn btn-secondary" href="/#work">← Back to projects</Link>
        </div>
      </main>
    </AISessionProvider>
  );
}
