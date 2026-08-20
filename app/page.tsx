import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/lib/portfolio-data";
import { InteractiveDemo } from "@/components/InteractiveDemo";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "";

export default async function Home() {
  const projects = await getProjects();
  const featuredOrder = ["evidenceflow", "legacylens", "flowpilot"];
  const featured = featuredOrder.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean) as typeof projects;
  const remaining = projects.filter((project) => !featured.some((item) => item.slug === project.slug));

  return (
    <main>
      <section className="shell hero-personal hero-refined">
        <div className="hero-refined-grid hero-personal-simple">
          <div className="hero-refined-copy">
            <h1>Hi, I’m <span className="name-accent">Asaif.</span></h1>
            <p className="hero-lede">I build AI systems, explore difficult problems, and turn good ideas into software people can actually use.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="#about">A little about me</Link>
              <Link className="text-link" href="#work">See my work <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="hero-personal-note hero-human-note">
            <p className="hero-note-kicker">Based in India</p>
            <p>I enjoy the space between experimentation and dependable software — trying things, learning fast, and making the next version better.</p>
            <div className="hero-note-links">
              <a href="https://www.linkedin.com/in/sk-asaif-ali-134873243" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="https://github.com/AsaifAli" target="_blank" rel="noreferrer">GitHub ↗</a>
              {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}`}>Email ↗</a>}
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

      <section id="experience" className="shell section experience-section experience-refined">
        <div className="section-head editorial-head">
          <div><div className="section-kicker">Experience</div><h2>What I’ve been working on recently.</h2></div>
        </div>
        <div className="timeline">
          <div className="timeline-line" aria-hidden="true" />
          <article className="timeline-item">
            <div className="timeline-dot" aria-hidden="true" />
            <div className="timeline-period">2024 — PRESENT</div>
            <div className="timeline-main">
              <h3>Software Engineer · AI/ML</h3>
              <div className="experience-company">BEBO Technologies Pvt Ltd</div>
              <p>I work across Agentic RAG, LLM automation, multi-agent engineering workflows, application modernization, retrieval systems, and AI-assisted software engineering.</p>
              <div className="experience-focus-grid">
                <div><span>01</span><strong>AI systems</strong><p>Building retrieval, agent, and LLM workflows around real application needs.</p></div>
                <div><span>02</span><strong>Engineering around AI</strong><p>Connecting models to APIs, validation, evaluation, persistence, observability, and deployment.</p></div>
                <div><span>03</span><strong>Making systems dependable</strong><p>Thinking through messy inputs, failure paths, quality, and the details that make a system useful.</p></div>
              </div>
            </div>
          </article>
        </div>
      </section>



      <section className="shell section toolkit-section toolkit-refined">
        <div className="section-head editorial-head">
          <div><div className="section-kicker">What I work with</div><h2>A practical stack, chosen for the problem.</h2></div>
          <p className="section-intro">I keep the toolkit flexible. The common thread is Python, modern LLM tooling, retrieval, APIs, and cloud infrastructure.</p>
        </div>
        <div className="toolkit-lines">
          <div><span>AI &amp; LLMs</span><strong>Generative AI · Agentic AI · OpenAI API · Gemini API</strong></div>
          <div><span>Agent systems</span><strong>LangGraph · LangChain · Agno · CrewAI</strong></div>
          <div><span>Retrieval &amp; search</span><strong>Qdrant · Hybrid search · RRF · Reranking · Tavily</strong></div>
          <div><span>Backend &amp; data</span><strong>Python · FastAPI · REST APIs · SQL</strong></div>
          <div><span>Infrastructure</span><strong>Docker · Redis · PostgreSQL · Supabase · Vercel · Render</strong></div>
        </div>
      </section>


      <section id="work" className="shell section work-section work-refined">
        <div className="section-head editorial-head">
          <div><div className="section-kicker">Selected work</div><h2>A few things I’ve built.</h2></div>
          <p className="section-intro">A few projects that show different sides of the way I think and build.</p>
        </div>
        <div className="project-list featured-projects">{featured.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
        <div className="work-more-intro"><span>More work</span><span>More experiments and systems live on the project pages.</span></div>
        <div className="project-list secondary-projects">{remaining.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
      </section>

      <section className="shell section playground-section" id="playground">
        <div className="playground-wrap playground-light">
          <div>
            <div className="section-kicker">A hands-on extra</div>
            <h2>Want to see the AI side in action?</h2>
            <p>An optional playground for anyone who wants to go a little deeper into the systems behind the work.</p>
          </div>
          <InteractiveDemo project="portfolio" title="Open the AI playground" description="Try the interactive side of the portfolio when you want to go deeper." />
        </div>
      </section>

      <section id="contact" className="shell section contact-section contact-refined">
        <div className="contact-intro">
          <div className="section-kicker">Get in touch</div>
          <h2>Interested in working together?</h2>
          <p>For a role, collaboration, or just a technical conversation, I’d be happy to hear from you.</p>
        </div>
        <div className="contact-direct contact-direct-stack" aria-label="Direct contact links">
          {CONTACT_EMAIL && (
            <a className="direct-contact contact-link-row" href={`mailto:${CONTACT_EMAIL}`}>
              <span><small>EMAIL</small><strong>Email me</strong></span><span aria-hidden="true">↗</span>
            </a>
          )}
          <a className="direct-contact contact-link-row" href="https://www.linkedin.com/in/sk-asaif-ali-134873243" target="_blank" rel="noreferrer">
            <span><small>LINKEDIN</small><strong>Connect with me on LinkedIn</strong></span><span aria-hidden="true">↗</span>
          </a>
          <a className="direct-contact contact-link-row" href="https://github.com/AsaifAli" target="_blank" rel="noreferrer">
            <span><small>GITHUB</small><strong>See what I’m building</strong></span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
