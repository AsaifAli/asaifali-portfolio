import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/lib/portfolio-data";
import { ContactForm } from "@/components/ContactForm";
import { InteractiveDemo } from "@/components/InteractiveDemo";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "";

export default async function Home() {
  const projects = await getProjects();
  const featured = projects.filter((project) => ["legacylens", "evidenceflow", "flowpilot"].includes(project.slug));
  const remaining = projects.filter((project) => !featured.some((item) => item.slug === project.slug));

  return (
    <main>
      <section className="shell hero-personal">
        <div className="hero-personal-grid">
          <div className="hero-personal-copy">
            <div className="eyebrow">AI/ML ENGINEER · BUILDER · PROBLEM SOLVER</div>
            <h1>Hi, I’m <span className="name-accent">Asaif.</span><br />I build useful AI systems.</h1>
            <p className="hero-lede">
              I design and ship Generative AI, Agentic AI, RAG, and automation systems — with the engineering discipline needed to make them useful beyond a demo.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="#about">A little about me ↓</Link>
              <Link className="text-link" href="#work">See what I’ve built <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="hero-socials" aria-label="Social links">
              <a href="https://github.com/AsaifAli" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/sk-asaif-ali-134873243" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}`}>Email ↗</a>}
            </div>
          </div>
          <aside className="hero-note" aria-label="Introduction note">
            <div className="note-mark">AA</div>
            <p className="note-label">A quick introduction</p>
            <p className="note-text">Curious by default. Practical about AI. I like turning fuzzy problems into systems that can actually be tested, explained, and shipped.</p>
            <div className="note-divider" />
            <div className="note-row"><span>Current focus</span><strong>AI/ML · LLM systems</strong></div>
            <div className="note-row"><span>Based in</span><strong>India</strong></div>
          </aside>
        </div>
      </section>

      <section id="about" className="shell section about-section">
        <div className="about-grid">
          <div>
            <div className="section-kicker">About me</div>
            <h2>I’m more interested in building than talking about building.</h2>
          </div>
          <div className="about-copy">
            <p>
              I’m an AI/ML engineer who enjoys the part of AI work that sits between an interesting model call and a dependable product. I care about how systems behave when inputs are messy, evidence is incomplete, jobs take time, or a model is simply wrong.
            </p>
            <p>
              My work spans Agentic AI, RAG, document intelligence, AI-assisted software engineering, and asynchronous automation. I tend to combine probabilistic reasoning with typed interfaces, deterministic checks, evaluation, observability, and clear failure paths.
            </p>
            <p>
              The portfolio below is a collection of things I’ve actually built — each one is there to show a different part of how I think and engineer.
            </p>
            <div className="about-links">
              <Link className="btn btn-secondary" href="#work">Explore the work</Link>
              <Link className="btn btn-secondary" href="#experience">My experience</Link>
            </div>
          </div>
        </div>
        <div className="about-beliefs">
          <div><span>01</span><strong>Build the useful thing.</strong><p>Start with the problem and keep the interface simple.</p></div>
          <div><span>02</span><strong>Make AI accountable.</strong><p>Use validation, evidence, tests, and clear fallbacks.</p></div>
          <div><span>03</span><strong>Ship, learn, improve.</strong><p>Real deployment teaches more than a perfect notebook.</p></div>
        </div>
      </section>

      <section id="work" className="shell section work-section">
        <div className="section-head editorial-head">
          <div><div className="section-kicker">Selected work</div><h2>A few things I’ve built.</h2></div>
          <p className="section-intro">A small set of projects I’m proud of. Each one explores a different AI engineering problem.</p>
        </div>
        <div className="project-list featured-projects">{featured.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
        <div className="work-more-intro"><span>More experiments & systems</span><span>Documentation, demos, and source code on each project page.</span></div>
        <div className="project-list secondary-projects">{remaining.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
      </section>

      <section id="experience" className="shell section experience-section">
        <div className="section-head editorial-head">
          <div><div className="section-kicker">Experience</div><h2>Where the work became real.</h2></div>
        </div>
        <div className="timeline">
          <div className="timeline-line" aria-hidden="true" />
          <article className="timeline-item">
            <div className="timeline-dot" aria-hidden="true" />
            <div className="timeline-period">11/2024 — PRESENT</div>
            <div className="timeline-main"><h3>Software Engineer (AI/ML)</h3><div className="timeline-company">BEBO TECHNOLOGIES</div>
              <p>Building enterprise AI systems across Agentic RAG, LLM automation, multi-agent engineering workflows, application modernization, retrieval/knowledge systems, and AI-assisted software engineering.</p>
              <p>Recent work includes agent orchestration, hybrid retrieval and reranking, autonomous modernization workflows, and LLM-powered automation pipelines.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="shell section toolkit-section">
        <div className="section-head editorial-head">
          <div><div className="section-kicker">Toolkit</div><h2>The stack behind the work.</h2></div>
          <p className="section-intro">Tools change. The habits behind them matter more.</p>
        </div>
        <div className="toolkit-grid">
          {[['AI & LLMs','Generative AI · Agentic AI · OpenAI API · Gemini API'],['Agent frameworks','LangGraph · LangChain · Agno · CrewAI'],['Retrieval & search','Qdrant · Hybrid search · RRF · Reranking · Tavily'],['Backend & data','Python · FastAPI · REST APIs · SQL'],['Infrastructure','Docker · Redis · PostgreSQL · Supabase · Vercel · Render'],['Quality','Pydantic · CI · Evaluation · Regression tests · Observability']].map(([title, text]) => <div className="toolkit-item" key={title}><h3>{title}</h3><p>{text}</p></div>)}
        </div>
      </section>

      <section className="shell section playground-section" id="playground">
        <div className="playground-wrap">
          <div>
            <div className="section-kicker">Optional playground</div>
            <h2>Want to try the AI side?</h2>
            <p>There’s a shared BYOK playground for the projects. It’s deliberately separate from the portfolio story, so the site stays about the person first.</p>
          </div>
          <InteractiveDemo project="portfolio" title="Open the AI playground" description="Bring your own provider key to create a short-lived inference session. The portfolio never stores the provider credential." />
        </div>
      </section>

      <section id="contact" className="shell section contact-section">
        <div className="contact-intro">
          <div className="section-kicker">Contact</div>
          <h2>Let’s talk about the next interesting problem.</h2>
          <p>For roles, collaborations, or a technical conversation, the quickest path is email or LinkedIn. The form is there when you want to send a longer note.</p>
          <div className="contact-actions">
            {CONTACT_EMAIL ? <a className="btn btn-primary" href={`mailto:${CONTACT_EMAIL}`}>Email me ↗</a> : <a className="btn btn-primary" href="https://www.linkedin.com/in/sk-asaif-ali-134873243" target="_blank" rel="noreferrer">Message me on LinkedIn ↗</a>}
            <a className="btn btn-secondary" href="https://www.linkedin.com/in/sk-asaif-ali-134873243" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a className="btn btn-secondary" href="https://github.com/AsaifAli" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
          {!CONTACT_EMAIL && <p className="contact-note">Add <code>NEXT_PUBLIC_CONTACT_EMAIL</code> to your Vercel environment to enable a direct email button.</p>}
        </div>
        <div className="contact-form-wrap">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
