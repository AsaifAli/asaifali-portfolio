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
  liveUrl?: string;
  star?: { situation: string; task: string; action: string[]; result: string[] };
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
    liveUrl: "https://ai-code-modernization-ui.onrender.com",
    star: {
      situation: "Legacy migration is difficult to trust when repositories contain many dependencies, inconsistent patterns, and behavior that must survive translation.",
      task: "Build a modernization workflow that could understand a repository before changing it, plan the migration, transform code with context, and prove whether the result was ready to release.",
      action: [
        "Used AST/CTags analysis and dependency intelligence to build deterministic repository context before generation.",
        "Stored analysis artifacts in Qdrant and retrieved bounded context instead of sending the whole repository to the model.",
        "Separated planning, context-grounded conversion, post-migration QA, repair, and release gating into explicit workflow stages."
      ],
      result: [
        "Turned modernization into an observable engineering workflow rather than a one-shot LLM translation.",
        "Added structural and execution-aware validation plus a release gate so generated code could be inspected before packaging."
      ]
    },
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
    liveUrl: "https://langgraph-rag-hdkn.onrender.com",
    star: {
      situation: "RAG systems can retrieve plausible text and still produce answers that are unsupported, overconfident, or weakly cited.",
      task: "Build a research assistant where retrieval, evidence collection, citation verification, and answer policy are explicit parts of the system.",
      action: [
        "Added agentic routing so a query can use the knowledge base, web research, both, or neither.",
        "Combined dense and sparse retrieval with reciprocal-rank fusion and cross-encoder reranking.",
        "Kept a turn-scoped evidence registry, verified citations against the exact evidence set, and added fail-closed behavior when support is insufficient."
      ],
      result: [
        "Answers can be grounded against a closed evidence set instead of trusting model confidence.",
        "Conversation state, citations, retrieval progress, and evidence become inspectable parts of the research workflow."
      ]
    },
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
    liveUrl: "https://quotation-analyzer-9m4i.onrender.com",
    star: {
      situation: "Supplier quotations arrive in inconsistent formats, with missing fields and commercial edge cases that make free-form LLM ranking risky.",
      task: "Create a controlled quotation pipeline that separates probabilistic extraction from deterministic procurement decisions.",
      action: [
        "Normalized PDF, DOCX, TXT, and XLSX content into typed quotation structures.",
        "Validated extracted data before calculating completeness, cost scores, comparisons, and anomalies in Python.",
        "Kept evidence snippets/pages/sheets alongside extracted fields so recommendations could be reviewed instead of treated as black-box output."
      ],
      result: [
        "Produced explainable quotation comparisons where arithmetic remains deterministic and qualitative reasoning stays grounded in validated data.",
        "Shipped the workflow as a Streamlit dashboard with a FastAPI service and deployment-friendly container stack."
      ]
    },
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
    liveUrl: "https://ai-automation-ui-ac2c.onrender.com",
    star: {
      situation: "AI automation becomes difficult to operate when long-running work, retries, approvals, and state live inside fragile synchronous requests.",
      task: "Build a production-minded AI automation control plane that treats agents as durable workflows instead of isolated prompts.",
      action: [
        "Separated API orchestration from execution with FastAPI, Redis/RQ workers, PostgreSQL persistence, and LangGraph workflows.",
        "Added human approval boundaries, evidence and validation for external-impact workflows, plus scheduled automation.",
        "Instrumented the system with Prometheus/Grafana metrics and OpenTelemetry/Jaeger traces and added CI evaluation coverage."
      ],
      result: [
        "Created an operations-oriented architecture for content, competitor, outreach, and KPI automation patterns.",
        "Made workflow progress, audit state, approvals, retries, and observability first-class rather than hidden behind the LLM call."
      ]
    },
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
    liveUrl: "https://web-crawler-agent.onrender.com",
    star: {
      situation: "Static crawlers miss the dynamic interactions, delayed content, browser errors, and real user-flow risk that matter in QA.",
      task: "Build a browser-intelligence pipeline that turns observed web behavior into evidence-grounded QA analysis without accidentally performing destructive actions.",
      action: [
        "Used Playwright to discover same-domain pages, forms, fields, links, controls, and browser health signals.",
        "Generated interaction candidates from observed evidence and used that evidence for risk scoring and prioritized test generation.",
        "Added console/network failure signals, regression baselines, and exports while deliberately avoiding arbitrary automatic clicks or form submissions."
      ],
      result: [
        "Produced a safer, evidence-first QA workflow that can prioritize meaningful test coverage from real browser observations.",
        "Kept the production pipeline focused on structured DOM/runtime truth rather than screenshot-only interpretation."
      ]
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectLiveUrl(project: Project): string {
  if (project.liveUrl) return project.liveUrl;
  const envKey = {
    legacylens: "NEXT_PUBLIC_DEMO_URL_LEGACYLENS",
    evidenceflow: "NEXT_PUBLIC_DEMO_URL_EVIDENCEFLOW",
    flowpilot: "NEXT_PUBLIC_DEMO_URL_FLOWPILOT",
    "webqa-intelligence": "NEXT_PUBLIC_DEMO_URL_WEBQA_INTELLIGENCE",
  }[project.slug] as string | undefined;
  return envKey ? (process.env[envKey] ?? "").trim().replace(/\/$/, "") : "";
}
