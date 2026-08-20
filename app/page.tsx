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
      <section className="shell hero-personal hero-refined">
        <div className="hero-refined-grid">
          <div className="hero-refined-copy">
            <div className="eyebrow">AI/ML ENGINEER</div>
            <h1>Hi, I’m <span className="name-accent">Asaif.</span></h1>
            <p className="hero-lede">I build AI systems, explore difficult problems, and turn good ideas into software people can actually use.</p>
            <p className="hero-support">My work sits around Generative AI, Agentic AI, RAG, automation, and AI-assisted software engineering.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="#about">About me</Link>
              <Link className="text-link" href="#work">See my work <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="hero-identity">
            <div className="identity-monogram">AA</div>
            <div>
              <span className="identity-label">Based in</span>
              <strong>India</strong>
            </div>
            <div>
              <span className="identity-label">Currently</span>
              <strong>Building AI/ML systems</strong>
            </div>
            <div className="identity-links">
              <a href="https://www.linkedin.com/in/sk-asaif-ali-134873243" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
              <a href="https://github.com/AsaifAli" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
              {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}`}>Email <span>↗</span></a>}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="shell section about-section about-prominent">
        <div className="about-intro-row">
          <div className="section-kicker">About me</div>
          <div className="about-intro-note">A little more about the person behind the projects.</div>
        </div>
        <div className="about-prominent-grid">
          <h2>I like the part of engineering where an idea has to become real.</h2>
          <div className="about-copy about-copy-large">
            <p>I’m an AI/ML engineer who enjoys the space between experimentation and dependable software. I like trying new models and frameworks, but I’m equally interested in what happens after the interesting demo: messy inputs, incomplete evidence, long-running jobs, failure paths, evaluation, and the details that make a system trustworthy.</p>
            <p>Most of my work revolves around building useful AI products — from retrieval and document intelligence to agentic workflows and AI-assisted software engineering. I care about clear interfaces, measurable behavior, and systems that can be explained to the person using them.</p>
            <p>This site is a record of that work, but more importantly, it is a place to get a sense of how I think and what I enjoy building.</p>
          </div>
        </div>
        <div className="about-beliefs about-beliefs-refined">
          <div><span>01</span><strong>Curious first.</strong><p>I like learning by building, testing ideas, and getting close to the real problem.</p></div>
          <div><span>02</span><strong>Practical always.</strong><p>A clever model is useful only when the surrounding system makes it dependable.</p></div>
          <div><span>03</span><strong>Keep improving.</strong><p>Ship something real, learn from it, then make the next version better.</p></div>
        </div>
      </section>

      <section id="work" className="shell section work-section work-refined">
        <div className="section-head editorial-head">
          <div><div className="section-kicker">Selected work</div><h2>Things I’ve built along the way.</h2></div>
          <p className="section-intro">A curated set of projects that show different sides of my engineering work. Start with the case studies that interest you.</p>
        </div>
        <div className="project-list featured-projects">{featured.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
        <div className="work-more-intro"><span>More work</span><span>More experiments and systems live on the project pages.</span></div>
        <div className="project-list secondary-projects">{remaining.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
      </section>

      <section id="experience" className="shell section experience-section experience-refined">
        <div className="section-head editorial-head">
          <div><div className="section-kicker">Experience</div><h2>What I’ve been working on recently.</h2></div>
        </div>
        <div className="timeline">
          <div className="timeline-line" aria-hidden="true" />
          <article className="timeline-item">
            <div className="timeline-dot" aria-hidden="true" />
            <div className="timeline-period">2024 — NOW</div>
            <div className="timeline-main"><h3>Software Engineer · AI/ML</h3>
              <p>Working across Agentic RAG, LLM automation, multi-agent engineering workflows, application modernization, retrieval systems, and AI-assisted software engineering.</p>
              <p>I spend a lot of time connecting the AI layer to the engineering around it: APIs, validation, evaluation, persistence, observability, and cloud deployment.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="shell section toolkit-section toolkit-refined">
        <div className="section-head editorial-head">
          <div><div className="section-kicker">Toolkit</div><h2>What I tend to reach for.</h2></div>
          <p className="section-intro">A snapshot of the tools and technologies behind the work — not a list of everything I’ve ever touched.</p>
        </div>
        <div className="toolkit-grid">
          {[['AI & LLMs','Generative AI · Agentic AI · OpenAI API · Gemini API'],['Agent systems','LangGraph · LangChain · Agno · CrewAI'],['Retrieval & search','Qdrant · Hybrid search · RRF · Reranking · Tavily'],['Backend & data','Python · FastAPI · REST APIs · SQL'],['Infrastructure','Docker · Redis · PostgreSQL · Supabase · Vercel · Render'],['Quality','Pydantic · CI · Evaluation · Regression tests · Observability']].map(([title, text]) => <div className="toolkit-item" key={title}><h3>{title}</h3><p>{text}</p></div>)}
        </div>
      </section>

      <section className="shell section playground-section" id="playground">
        <div className="playground-wrap playground-light">
          <div>
            <div className="section-kicker">A hands-on extra</div>
            <h2>Want to see the AI side in action?</h2>
            <p>There’s an optional shared playground for the projects. It’s here for people who want to go deeper; the portfolio itself stays focused on me and the work.</p>
          </div>
          <InteractiveDemo project="portfolio" title="Open the AI playground" description="Bring your own provider key to create a short-lived inference session. The portfolio never stores the provider credential." />
        </div>
      </section>

      <section id="contact" className="shell section contact-section contact-refined">
        <div className="contact-intro">
          <div className="section-kicker">Get in touch</div>
          <h2>Interested in working together?</h2>
          <p>For a role, collaboration, or just a technical conversation, I’d be happy to hear from you.</p>
          <div className="contact-direct">
            {CONTACT_EMAIL && <a className="direct-contact" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}<span>↗</span></a>}
            <a className="direct-contact" href="https://www.linkedin.com/in/sk-asaif-ali-134873243" target="_blank" rel="noreferrer">LinkedIn<span>↗</span></a>
          </div>
          <p className="contact-hint">Prefer a message? Use the form and it will be sent to the portfolio contact service.</p>
        </div>
        <div className="contact-form-wrap">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
