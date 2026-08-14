export type Project = {
  slug: string;
  number: string;
  name: string;
  eyebrow: string;
  short: string;
  description: string;
  tags: string[];
  github: string;
  status: string;
  accent: string;
  problem: string;
  solution: string;
  architecture: string[];
  decisions: string[];
  reliability: string[];
};

export const projects: Project[] = [
  {
    slug: "legacylens",
    number: "01",
    name: "LegacyLens",
    eyebrow: "Agentic software modernization",
    short: "Analyze legacy repositories, plan migrations, transform code, and validate behavior with automated quality gates.",
    description: "An agentic modernization platform that treats migration as an engineering workflow rather than a one-shot code translation. It combines repository intelligence, planning, transformation, dependency awareness, post-migration validation, provenance, and release gating.",
    tags: ["Agentic AI", "Code Intelligence", "Agno", "FastAPI", "Docker"],
    github: "https://github.com/AsaifAli/AI-Code-Modernization-Platform",
    status: "Deployed",
    accent: "cyan",
    problem: "Legacy migration is difficult to trust when translation, dependency changes, validation, and release readiness are handled as disconnected steps.",
    solution: "A staged multi-agent workflow performs discovery, planning, conversion, semantic validation, repair, and release gating while retaining evidence and migration state.",
    architecture: ["Upload / source workspace", "Repository scanner + code intelligence", "Agentic planning + transformation", "Knowledge / dependency analysis", "Post-migration validation + repair", "Release gate + reports"],
    decisions: ["Keep deterministic validation outside the LLM", "Make migration state observable and resumable", "Treat repair as a re-validation loop", "Separate provider/model configuration from workflow logic"],
    reliability: ["Quality gates", "Semantic verification", "Security/provenance checks", "CI regression tests", "Persisted migration status"],
  },
  {
    slug: "evidenceflow",
    number: "02",
    name: "EvidenceFlow",
    eyebrow: "Verified RAG & research",
    short: "Hybrid retrieval, reranking, web research, evidence verification, and fail-closed answer generation.",
    description: "A LangGraph-based RAG system designed around evidence rather than raw model confidence. It routes between knowledge-base retrieval and web research, uses hybrid retrieval with reciprocal-rank fusion and reranking, and verifies answer claims against collected evidence.",
    tags: ["LangGraph", "Qdrant", "BM25", "RRF", "Tavily"],
    github: "https://github.com/AsaifAli/LangGraph-RAG",
    status: "Deployed",
    accent: "violet",
    problem: "RAG systems can retrieve plausible text while still producing unsupported claims or overconfident answers.",
    solution: "The pipeline separates retrieval, evidence synthesis, citation verification, and answer policy so unsupported responses can fail closed instead of being presented as fact.",
    architecture: ["Query understanding + routing", "Dense + lexical retrieval", "RRF fusion + cross-encoder reranking", "Evidence synthesis", "Citation / claim verification", "Final guarded response"],
    decisions: ["Preserve evidence IDs through the graph", "Keep tool execution provider-agnostic", "Use deterministic citation checks", "Separate document summaries from chunk analysis"],
    reliability: ["Evidence-grounded synthesis", "Citation verification", "Fail-closed behavior", "Hybrid retrieval", "Regression diagnostics"],
  },
  {
    slug: "quotesense",
    number: "03",
    name: "QuoteSense",
    eyebrow: "Procurement intelligence",
    short: "Turn messy quotations into validated, comparable procurement intelligence with deterministic scoring and review.",
    description: "A quotation-analysis workflow that deliberately separates probabilistic document extraction from deterministic business logic. LLM output is normalized into typed structures before scoring, risk checks, anomaly detection, and comparative reporting.",
    tags: ["Document AI", "Pydantic", "FastAPI", "Procurement"],
    github: "https://github.com/AsaifAli/quotation-analyzer",
    status: "Deployed",
    accent: "amber",
    problem: "Procurement documents contain inconsistent structure, missing values, and commercial edge cases that are risky to evaluate with free-form LLM reasoning alone.",
    solution: "Extract structured fields, validate with schemas, then apply deterministic calculations and business rules before generating the final interpretation.",
    architecture: ["Document ingestion", "LLM extraction", "Pydantic validation", "Deterministic calculations", "Comparison + anomaly analysis", "Human-readable result"],
    decisions: ["Keep arithmetic deterministic", "Validate before scoring", "Preserve raw extraction for auditability", "Make provider choice independent of business rules"],
    reliability: ["Typed schemas", "Deterministic scoring", "Anomaly detection", "Validation failures surfaced explicitly"],
  },
  {
    slug: "flowpilot",
    number: "04",
    name: "FlowPilot",
    eyebrow: "Agentic automation",
    short: "Asynchronous AI workflows with approvals, evidence, persistence, and observability.",
    description: "A production-minded automation command center where AI workflows run as durable jobs instead of fragile synchronous prompts. Human approval, execution state, validation, and observability are first-class parts of the design.",
    tags: ["LangGraph", "FastAPI", "Redis/RQ", "PostgreSQL", "Observability"],
    github: "https://github.com/AsaifAli/AI-Automation-Command-Center",
    status: "Deployed",
    accent: "blue",
    problem: "LLM automation becomes difficult to operate when long-running work, retries, approvals, and state are hidden inside a request-response cycle.",
    solution: "Separate orchestration from execution, persist workflow state, and expose progress and approval boundaries explicitly.",
    architecture: ["API command center", "Workflow definition", "Queue + worker execution", "Persistence + state transitions", "Approval / validation", "Result + observability"],
    decisions: ["Use async jobs for long-running AI work", "Persist state outside process memory", "Keep human approval explicit", "Treat provider failures as recoverable states"],
    reliability: ["Retryable workers", "Persisted state", "Approval gates", "Request correlation", "Health/readiness checks"],
  },
  {
    slug: "webqa-intelligence",
    number: "05",
    name: "WebQA Intelligence",
    eyebrow: "AI-assisted web QA",
    short: "Discover dynamic web interactions, score QA risk, generate evidence-grounded tests, and compare regressions.",
    description: "A browser-intelligence system built around Playwright that turns dynamic sites into testable evidence. It combines DOM analysis, interaction discovery, browser health signals, QA scoring, evidence-grounded test generation, and regression comparison.",
    tags: ["Playwright", "Browser Automation", "QA", "Agents"],
    github: "https://github.com/AsaifAli/Web-Crawler-Agent",
    status: "Deployed",
    accent: "green",
    problem: "Static crawlers miss dynamic interactions, delayed content, and real user-flow risk.",
    solution: "Use a real browser to observe behavior, collect evidence, identify meaningful interactions, and feed that evidence into QA analysis and test generation.",
    architecture: ["Browser session", "DOM + interaction discovery", "Browser health signals", "Risk scoring", "Evidence-grounded test generation", "Regression comparison"],
    decisions: ["Use Playwright for runtime truth", "Capture evidence before generating tests", "Separate crawler telemetry from LLM reasoning", "Treat browser failures as first-class signals"],
    reliability: ["Browser health telemetry", "Evidence-backed tests", "Regression comparison", "Bounded crawl behavior"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
