# Asaif Ali — AI/ML Engineering Portfolio

A full-stack engineering portfolio built with **Next.js 16, React 19, Supabase, and Vercel**, with live interactive AI demonstrations backed by a shared Portfolio LLM Gateway.

**Live portfolio:** https://asaifali-portfolio.vercel.app

## What the portfolio showcases

The portfolio presents five deployed AI engineering projects:

| Project | Focus | Live demo |
|---|---|---|
| LegacyLens | Agentic software modernization | https://ai-code-modernization-ui.onrender.com |
| FlowPilot | Agentic automation | https://ai-automation-ui-ac2c.onrender.com |
| EvidenceFlow | Verified RAG and research | https://langgraph-rag-hdkn.onrender.com |
| QuoteSense | Procurement/document intelligence | https://quotation-analyzer-9m4i.onrender.com |
| WebQA | AI-assisted web QA | https://web-crawler-agent.onrender.com |

## Interactive demo architecture

The interactive projects use a shared OpenAI-compatible LLM Gateway so users can bring their own supported provider key without exposing that provider credential to an individual project frontend.

```text
Portfolio
   ↓
BYOK session creation
   ↓
Redis-backed temporary session
   ↓
Short-lived JWT
   ↓
Selected project
   ↓
Portfolio LLM Gateway
   ↓
User-selected provider/model
```

Provider credentials remain server-side. Projects receive a temporary gateway session token rather than the provider API key.

## Stack

- Next.js 16
- React 19
- Supabase Postgres + Auth
- `@supabase/ssr`
- Vercel
- Shared Portfolio LLM Gateway

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The public site includes built-in project data so the UI can run before Supabase is configured. When Supabase variables are present, published project content is read from Supabase.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql`.
3. Run `supabase/seed.sql`.
4. Create the portfolio admin user in Supabase Auth.
5. Configure the Supabase URL and publishable key in `.env.local` and Vercel.

## Deployment

The portfolio is deployed on Vercel from the `main` branch. The repository is intended to remain directly deployable with the standard Next.js build settings.

## Project repository links

- LegacyLens: https://github.com/AsaifAli/AI-Code-Modernization-Platform
- FlowPilot: https://github.com/AsaifAli/AI-Automation-Command-Center
- EvidenceFlow: https://github.com/AsaifAli/LangGraph-RAG
- QuoteSense: https://github.com/AsaifAli/quotation-analyzer
- WebQA: https://github.com/AsaifAli/web-crawler-agent
- Shared LLM Gateway: https://github.com/AsaifAli/shared-Portfolio-LLM-Gateway

## Engineering philosophy

The portfolio is designed to show the engineering around AI, not just model calls:

```text
LLM / Agents
      ↓
Structured outputs
      ↓
Deterministic validation
      ↓
Evidence / quality gates
      ↓
Evaluation / observability
      ↓
Deployable application
```

## Security boundary

- Provider API keys are not part of project source code.
- BYOK credentials are handled through the shared gateway session architecture.
- Supabase secrets stay in environment configuration.
- Production secrets should never be committed to Git.

## License

MIT License.
