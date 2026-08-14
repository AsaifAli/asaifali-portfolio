# Asaif Ali — Dynamic AI/ML Portfolio

A full-stack engineering portfolio built with Next.js 16, Supabase, and Vercel. It is intentionally not a static site: project content can be stored in Supabase, the site has a private admin area, and the contact form is backed by a database route. A shared Portfolio LLM Gateway can be connected later for BYOK interactive demos.

## Stack
- Next.js 16 / React 19
- Supabase Postgres + Auth via `@supabase/ssr`
- Vercel deployment
- Portfolio LLM Gateway integration point

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

The public site works with the built-in project data even before Supabase is configured. Once `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are set, published projects are read from Supabase.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Run `supabase/seed.sql`.
4. Create your admin user in Supabase Auth.
5. Add the Supabase URL and publishable key to `.env.local` and Vercel.

Supabase's current Next.js SSR guidance uses `@supabase/ssr` and cookie-backed server clients. See the official guide: https://supabase.com/docs/guides/auth/server-side/creating-a-client

## Vercel

Import the GitHub repository into Vercel. Keep the project root as `/` and use the default Next.js build settings. Vercel provides first-class Next.js deployment with Git push previews.

## Interactive demos

The public portfolio does not expose deployment URLs for the five AI projects. The intended future flow is:

Portfolio → demo UI → Portfolio LLM Gateway → LiteLLM → selected provider/model → project API.

The gateway base URL can be supplied with `NEXT_PUBLIC_LLM_GATEWAY_URL` when we wire the interactive demos.
