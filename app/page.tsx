import Link from "next/link";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { getProjects } from "@/lib/portfolio-data";

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
  process.env.CONTACT_TO_EMAIL?.trim() ||
  "";

export default async function Home() {
  const projects = await getProjects();
  const featuredOrder = ["evidenceflow", "legacylens", "flowpilot"];
  const featured = featuredOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean) as typeof projects;
  const remaining = projects.filter((project) => !featured.some((item) => item.slug === project.slug));

  return (
    <main>
      <section className="shell hero-personal hero-refined recruiter-hero">
        <div className="hero-refined-grid hero-personal-simple">
          <div className="hero-refined-copy">
            <div className="section-kicker">AI/ML Engineer · Chandigarh, India · Open to relocation</div>
            <h1>I build AI systems that hold up beyond the demo.</h1>
            <p className="hero-lede">
              I’m an AI/ML engineer working across generative AI, agentic workflows, RAG,
              document intelligence, and AI-assisted engineering. My focus is the layer around
              the model: retrieval, validation, orchestration, APIs, observability, and deployment.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="#work">See selected work</Link>
              <Link className="text-link" href="#experience">View experience <span aria-hidden="true">↗</span></Link>
            </div>
          </div>

          <div className="hero-personal-note hero-human-note recruiter-hero-note">
            <p className="hero-note-kicker">What I bring</p>
            <p>About two years of professional AI/ML engineering, plus a portfolio of independently deployed systems built to explore real engineering constraints.</p>
            <div className="hero-note-links">
              <a href="https://www.linkedin.com/in/sk-asaif-ali-134873243" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="https://github.com/AsaifAli" target="_blank" rel="noreferrer">GitHub ↗</a>
              {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}`}>Email ↗</a>}
            </div>
          </div>
        </div>

        <div className="recruiter-proof-strip" aria-label="Portfolio highlights">
          <div><strong>5</strong><span>deployed AI/ML builds</span></div>
          <div><strong>RAG</strong><span>hybrid retrieval + reranking</span></div>
          <div><strong>Agents</strong><span>durable workflows + approvals</span></div>
          <div><strong>Python</strong><span>FastAPI · PostgreSQL · Redis</span></div>
        </div>
      </section>

      <section id="about" className="shell section about-section about-prominent">
        <div className="about-intro-row">
          <div className="section-kicker">About me</div>
          <div className="about-intro-note">The engineer behind the projects.</div>
        </div>
        <div className="about-prominent-grid">
          <h2>I care about what happens after the interesting model call.</h2>
          <div className="about-copy about-copy-large">
            <p>
              I like building useful AI software where model behavior has to coexist with messy inputs,
              incomplete evidence, asynchronous work, external APIs, and real failure paths.
            </p>
            <p>
              That means I pay attention to retrieval quality, structured outputs, deterministic business
              rules, evaluation, persistence, observability, and deployment—not just prompts and model choice.
            </p>
            <p>
              This portfolio is intentionally personal: it shows what I choose to build, how I think through
              trade-offs, and how far I take an idea once the prototype starts becoming software.
            </p>
          </div>
        </div>

        <div className="about-beliefs about-beliefs-refined">
          <div><span>01</span><strong>Curious first.</strong><p>I learn by building, testing, breaking, and iterating.</p></div>
          <div><span>02</span><strong>Practical always.</strong><p>The model is only one component of a dependable AI system.</p></div>
          <div><span>03</span><strong>Ship, then improve.</strong><p>I prefer working software and measurable lessons over polished mockups.</p></div>
        </div>
      </section>

      <section id="experience" className="shell section experience-section experience-refined">
        <div className="section-head editorial-head">
          <div>
            <div className="section-kicker">Experience</div>
            <h2>Professional AI/ML engineering, backed by systems work outside the day job.</h2>
          </div>
          <p className="section-intro">
            My professional work has pushed me deeper into automation, retrieval, agentic workflows,
            application modernization, and the engineering needed to make AI useful in practice.
          </p>
        </div>

        <div className="experience-combined-grid">
          <article className="experience-summary">
            <div className="timeline-period">NOV 2024 — PRESENT</div>
            <h3>Software Engineer · AI/ML</h3>
            <div className="experience-company">Bebo Technologies Pvt Ltd</div>
            <div className="experience-summary-copy">
              <p>
                I work on AI/ML systems close to real product and engineering problems: connecting APIs and
                data sources, structuring context, building automation and retrieval workflows, validating outputs,
                and handling failure paths.
              </p>
              <p>
                The work has led me into agentic systems, RAG, multi-agent orchestration, application modernization,
                and AI-assisted engineering. I’ve learned to treat evaluation, persistence, observability,
                deployment, and edge cases as part of the system—not polish added at the end.
              </p>
            </div>
          </article>

          <div className="experience-focus-grid experience-focus-grid-combined">
            <div><span>01</span><strong>Agentic systems</strong><p>RAG, tool use, orchestration, memory, approvals, and multi-agent workflows.</p></div>
            <div><span>02</span><strong>Engineering around models</strong><p>APIs, validation, retrieval, evaluation, persistence, observability, and deployment.</p></div>
            <div><span>03</span><strong>Production-minded thinking</strong><p>Failure paths, quality gates, state management, and interfaces that people can use.</p></div>
          </div>
        </div>

        <div className="work-tools work-tools-combined">
          <div className="work-tools-head">
            <div>
              <div className="section-kicker">What I work with</div>
              <h3>The practical stack</h3>
              <p>Flexible tools, consistent engineering principles.</p>
            </div>
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
          <div>
            <div className="section-kicker">Selected personal builds</div>
            <h2>Five systems, each built to answer a different engineering question.</h2>
          </div>
          <p className="section-intro">
            Start with the featured builds, then use the project pages for architecture, engineering decisions,
            reliability details, GitHub, and live deployments.
          </p>
        </div>
        <ProjectCarousel projects={featured.concat(remaining)} />
      </section>

      <section id="contact" className="shell section contact-section contact-refined">
        <div className="contact-intro">
          <div className="section-kicker">Get in touch</div>
          <h2>Looking for an AI/ML engineer who likes building the whole system?</h2>
          <p>For a role, collaboration, or technical conversation, I’d be happy to connect.</p>
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
