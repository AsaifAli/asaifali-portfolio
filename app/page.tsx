import Link from "next/link";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { getProjects } from "@/lib/portfolio-data";

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
            <p className="hero-note-kicker">Based in Chandigarh, India</p>
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
          <div>
            <div className="section-kicker">Experience &amp; focus</div>
            <h2>The work I do professionally — and the things I’ve learned building it.</h2>
          </div>
          <p className="section-intro">My day job gives me real engineering problems to solve. Outside work, I take the ideas that stay with me and turn them into personal systems, experiments, and working products.</p>
        </div>

        <div className="experience-combined-grid">
          <article className="experience-summary">
            <div className="timeline-period">NOV 2024 — PRESENT</div>
            <h3>Software Engineer · AI/ML</h3>
            <div className="experience-company">Bebo Technologies Pvt Ltd</div>
            <div className="experience-summary-copy">
              <p>I work on AI/ML systems that sit close to real product and engineering problems — building automation, retrieval and agentic workflows, and the infrastructure around them. A lot of the work is less about choosing a model and more about making the whole system behave well: connecting APIs and data sources, structuring context, validating outputs, handling failure paths, and creating interfaces that people can actually use.</p>
              <p>Over time, that has led me deeper into agentic systems, RAG, multi-agent orchestration, application modernization, and AI-assisted engineering. I enjoy the point where a promising experiment becomes a dependable piece of software — and I’ve learned to think about evaluation, persistence, observability, deployment, and edge cases as part of the product rather than afterthoughts.</p>
              <p>The personal projects on this site grow out of that same curiosity. They are where I get to ask, <em>“What would this look like if I took the idea a little further?”</em></p>
            </div>
          </article>

          <div className="experience-focus-grid experience-focus-grid-combined">
            <div><span>01</span><strong>Agentic systems</strong><p>RAG, tool use, orchestration, memory, and multi-agent workflows around real application problems.</p></div>
            <div><span>02</span><strong>Engineering around models</strong><p>APIs, validation, retrieval, evaluation, persistence, deployment, and the pieces that make AI usable.</p></div>
            <div><span>03</span><strong>From idea to software</strong><p>Taking an experiment beyond the demo and thinking through quality, failure paths, and operations.</p></div>
          </div>
        </div>

        <div className="work-tools work-tools-combined">
          <div className="work-tools-head">
            <div>
              <div className="section-kicker">What I work with</div>
              <h3>The practical stack</h3>
              <p>I keep the toolkit flexible. The common thread is Python, modern LLM tooling, retrieval, APIs, and cloud infrastructure.</p>
            </div>
            {/* <p>I keep the toolkit flexible. The common thread is Python, modern LLM tooling, retrieval, APIs, and cloud infrastructure.</p> */}
          </div>
          <div className="toolkit-lines">
            <div><span>AI &amp; LLMs</span><strong>Generative AI · Agentic AI · OpenAI API · Gemini API</strong></div>
            <div><span>Agent systems</span><strong>LangGraph · LangChain · Agno · CrewAI</strong></div>
            <div><span>Retrieval &amp; search</span><strong>Qdrant · Hybrid search · RRF · Reranking · Tavily</strong></div>
            <div><span>Backend &amp; data</span><strong>Python · FastAPI · REST APIs · SQL · PostgreSQL · Redis</strong></div>
            <div><span>Infrastructure</span><strong>Docker · Supabase · Vercel · Render · AWS</strong></div>
          </div>
        </div>
      </section>

      <section id="work" className="shell section work-section work-refined">
        <div className="section-head editorial-head">
          <div><div className="section-kicker">Selected personal builds</div><h2>A few things I’ve built outside the day job.</h2></div>
          <p className="section-intro">These are the projects where I give myself room to explore a problem, test an idea, and take it far enough to become a real working system.</p>
        </div>
        <ProjectCarousel projects={featured.concat(remaining)} />
      </section>

      {/* <section className="shell section playground-section" id="playground">
        <div className="playground-wrap playground-light hands-on-lite">
          <div>
            <div className="section-kicker">A hands-on extra</div>
            <h2>Want to go a little deeper?</h2>
            <p>The interactive demos now live with the individual projects, where each one has the context, walkthrough, and project-specific demo together.</p>
          </div>
          <Link className="btn btn-secondary" href="/projects/evidenceflow">Explore a project ↗</Link>
        </div>
      </section> */}

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
