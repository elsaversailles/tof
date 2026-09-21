-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query)

-- 1. Table for evaluation submissions
create table if not exists public.evaluations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  expert_name text,
  expert_age text,
  institution text,
  designation text,
  ratings jsonb,
  strengths text,
  improvements text,
  additional_features text,
  overall_score numeric
);

-- 2. Enable Row Level Security
alter table public.evaluations enable row level security;

-- 3. Allow anyone (anonymous visitors) to submit an evaluation
create policy "Anyone can submit an evaluation"
  on public.evaluations
  for insert
  to anon
  with check (true);

-- 4. Only authenticated users (the admin) can read submissions
create policy "Authenticated users can read evaluations"
  on public.evaluations
  for select
  to authenticated
  using (true);

-- 5. Create the admin login
-- Go to Authentication -> Users -> Add user (in the Supabase dashboard), NOT via SQL.
-- Use an email you control, for example: admin@trainorfail.app
-- Set the password there directly. Supabase Auth requires an email format,
-- so the visible "Admin" button on the site will ask for that email + password.
