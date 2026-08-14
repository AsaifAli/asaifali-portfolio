import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/lib/portfolio-data";
import { ContactForm } from "@/components/ContactForm";

export default async function Home() {
  const projects = await getProjects();
  return <main>
    <section className="shell hero">
      <div className="eyebrow">AI / ML ENGINEER</div>
      <h1>Building <em>production-oriented</em> AI systems.</h1>
      <p className="hero-copy">I design and deploy Generative AI, Agentic AI, RAG, and LLM applications with strong engineering controls around validation, evaluation, evidence, observability, and reliability.</p>
      <div className="hero-meta"><Link className="btn btn-primary" href="#work">Explore projects ↓</Link><a className="btn btn-secondary" href="https://github.com/AsaifAli" target="_blank" rel="noreferrer">GitHub ↗</a></div>
      <div className="hero-grid">
        <div className="signal-card"><div className="signal-top"><span>system profile</span><span>online</span></div><div className="signal-lines">{[1,1,1,1,1,1,0,1].map((on,i)=><span className={on?"on":""} key={i} />)}</div><p className="muted">Probabilistic intelligence is paired with deterministic controls — typed outputs, evidence checks, stateful workflows, quality gates, and regression tests.</p></div>
        <div className="manifest"><code>{`{\n  "focus": [\n    "Agentic AI",\n    "RAG",\n    "LLM Systems",\n    "AI Automation"\n  ],\n  "default": "engineered, not improvised"\n}`}</code></div>
      </div>
    </section>

    <section id="work" className="shell section"><div className="section-head"><div><div className="section-kicker">Selected work</div><h2>Systems I built to be trusted.</h2></div><p className="section-intro">Five portfolio projects, each built around a different reliability problem: modernization, evidence, procurement, automation, and browser intelligence.</p></div><div className="project-list">{projects.map(p=><ProjectCard key={p.slug} project={p}/>)}</div></section>

    <section id="engineering" className="shell section"><div className="section-head"><div><div className="section-kicker">Engineering approach</div><h2>LLMs are components, not the application.</h2></div><p className="section-intro">The architecture keeps probabilistic reasoning close to deterministic interfaces, evidence, state, validation, and deployment controls.</p></div><div className="pipeline">{["Unstructured data","Retrieval / processing","LLM / agents","Structured validation","Deterministic logic","Evidence / quality gates","Evaluation / observability","Deployment / API"].map((x,i)=><div className="pipeline-step" key={x}><span className="pipeline-num">0{i+1}</span><strong>{x}</strong></div>)}</div><div className="principles">{["Structured outputs","Evidence-grounded generation","Fail-closed behavior","Human-in-the-loop","Async job processing","Regression testing"].map(x=><div className="stack-card" key={x}><h4>{x}</h4><p>Designed as an explicit engineering boundary rather than an implicit model behavior.</p></div>)}</div></section>

    <section className="shell section"><div className="section-head"><div><div className="section-kicker">Technology</div><h2>Tools I use to ship the systems above.</h2></div></div><div className="stack-grid">{[["AI & LLMs","Generative AI · Agentic AI · OpenAI API · Gemini API"],["Agent frameworks","LangGraph · LangChain · Agno · CrewAI"],["RAG & search","Qdrant · Hybrid search · RRF · Reranking · Tavily"],["Backend","Python · FastAPI · REST APIs · SQL"],["Infrastructure","Docker · Redis · PostgreSQL · Supabase · Vercel · Render"],["Quality","Pydantic · CI · Evaluation · Regression tests · Observability"]].map(([h,p])=><div className="stack-card" key={h}><h4>{h}</h4><p>{p}</p></div>)}</div></section>

    <section id="experience" className="shell section"><div className="section-head"><div><div className="section-kicker">Experience</div><h2>Applied AI, not just prototypes.</h2></div></div><div className="experience"><div className="experience-card"><h3>Software Engineer (AI/ML)</h3><div className="meta">BEBO TECHNOLOGIES · 11/2024 — PRESENT</div></div><div className="experience-card"><p>Building enterprise AI systems across Agentic RAG, LLM automation, multi-agent engineering workflows, application modernization, retrieval/knowledge systems, and AI-assisted software engineering.</p><p>Recent work includes production-oriented agent orchestration, hybrid retrieval and reranking, autonomous modernization workflows, and LLM-powered automation pipelines.</p></div></div></section>

    <section id="contact" className="shell section"><div className="contact-card"><div><div className="section-kicker">Contact</div><h2>Have an AI system worth building?</h2><p>For interviews and technical discussions, the live demos are available privately. The public site stays focused on architecture, engineering decisions, and code.</p></div><div><ContactForm/></div></div></section>
  </main>;
}
