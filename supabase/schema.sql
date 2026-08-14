create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  number text not null,
  name text not null,
  eyebrow text not null,
  short text not null,
  description text not null,
  tags jsonb not null default '[]'::jsonb,
  github text not null,
  status text not null default 'In progress',
  accent text not null default 'blue',
  problem text not null,
  solution text not null,
  architecture jsonb not null default '[]'::jsonb,
  decisions jsonb not null default '[]'::jsonb,
  reliability jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "public can read published projects"
on public.projects for select
to anon, authenticated
using (published = true);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "public can submit contact messages"
on public.contact_messages for insert
to anon, authenticated
with check (char_length(name) between 1 and 120 and char_length(email) between 3 and 320 and char_length(message) between 1 and 5000);

create policy "authenticated can manage projects"
on public.projects for update
to authenticated
using (true)
with check (true);
