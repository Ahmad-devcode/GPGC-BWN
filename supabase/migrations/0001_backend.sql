-- ═══════════════════════════════════════════════════════════════════════════
-- PTUT Website — Backend Schema (Supabase / Postgres)
-- Migration: 0001_backend.sql
-- ═══════════════════════════════════════════════════════════════════════════
--
-- HOW TO RUN
--   1. Create a NEW Supabase project for the PTUT website (do NOT reuse the
--      University Manager project — this is a different application).
--   2. Open the Supabase Dashboard → SQL Editor → New query.
--   3. Paste this entire file and click "Run".
--   4. Then run supabase/seed.sql the same way (optional static seed).
--   5. Then, from the project folder:  npm run seed   (seeds programs,
--      faculty, news, documents and the short course from the code files).
--
-- HOW TO MAKE THE FIRST ADMIN
--   1. Dashboard → Authentication → Users → "Add user" (create with email +
--      password). A matching row is automatically created in public.profiles
--      with role 'viewer'.
--   2. Promote that user to admin by running:
--
--        update public.profiles set role = 'admin'
--        where email = 'your-admin-email@example.com';
--
-- SECURITY MODEL
--   * The public (anon) role can only SELECT rows where is_published = true.
--   * contact_messages accepts anonymous INSERTs (the public contact form)
--     but anonymous users can never read them.
--   * Users whose profiles.role is 'admin' (or 'editor' for media routes via
--     the API) can manage content. Full write access in SQL policies is
--     granted to admins via public.is_admin().
--   * The service-role key bypasses RLS and is used ONLY by server-side code
--     and the seed script. Never expose it to the browser.
--
-- This file is written to be safe to re-run (create ... if not exists,
-- drop policy if exists before re-creating).
-- ═══════════════════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────────
-- profiles  (1:1 with auth.users; role controls admin access)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text,
  role       text not null default 'viewer'
             check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- departments
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.departments (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  slug       text not null unique,
  sort_order int  not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- faculty_members
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.faculty_members (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  name         text not null,
  designation  text,
  email        text,
  department   text,
  image        text,
  bio          text,
  sort_order   int  not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- programs  (structured columns + jsonb for the rich nested content)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.programs (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  short_title   text,
  degree        text,
  duration      text,
  credit_hours  int,
  faculty_group text,
  tagline       text,
  mission       text,
  introduction  jsonb not null default '[]'::jsonb,   -- string[]
  peos          jsonb not null default '[]'::jsonb,   -- {id,title,text}[]
  plos          jsonb not null default '[]'::jsonb,   -- {id,code,text}[]
  peo_plo_matrix jsonb not null default '[]'::jsonb,  -- {ploId,peo1,peo2,peo3}[]
  curriculum    jsonb not null default '[]'::jsonb,   -- Semester[]
  labs          jsonb not null default '[]'::jsonb,   -- string[]
  eligibility   jsonb not null default '{}'::jsonb,   -- {prerequisites,distribution,general}
  accreditation jsonb,                                -- {batch,date}[] | null
  faculty_slugs text[] not null default '{}',
  hero_image    text,
  sort_order    int  not null default 0,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- documents  (PDFs / downloads stored on Cloudflare R2)
--   file_key = R2 object key, e.g. "pdfs/merit-lists/set-2nd-list.pdf"
--   file_key stays NULL until the real file is uploaded via /admin.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.documents (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  category     text not null check (category in (
                 'merit-list', 'challan', 'form', 'fee', 'curriculum',
                 'survey', 'advertisement', 'application', 'general'
               )),
  program_slug text,
  group_label  text,
  file_key     text,
  file_name    text,
  file_type    text,
  file_size    bigint,
  sort_order   int not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- news_articles
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.news_articles (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  category     text,
  excerpt      text,
  body         text,
  image        text,
  published_at timestamptz,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- short_courses
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.short_courses (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  title          text not null,
  subtitle       text,
  duration_text  text,
  start_date     date,
  apply_deadline date,
  outcomes       jsonb not null default '[]'::jsonb,  -- string[]
  is_open        boolean not null default false,
  sort_order     int not null default 0,
  is_published   boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- leadership_members
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.leadership_members (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  name         text not null,
  title        text,
  message      text,
  image        text,
  sort_order   int not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- admin_offices
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.admin_offices (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  description  text,
  body         text,
  icon         text,
  sort_order   int not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- campus_gallery
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.campus_gallery (
  id           uuid primary key default gen_random_uuid(),
  image        text not null,
  title        text,
  sort_order   int not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- content_pages  (simple free-form pages for future use)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.content_pages (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  title            text not null,
  body             text,
  meta_description text,
  is_published     boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- site_settings  (key/value; value is jsonb so strings/numbers/objects work)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.site_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- media_assets  (registry of everything uploaded to Cloudflare R2)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.media_assets (
  id           uuid primary key default gen_random_uuid(),
  key          text not null unique,
  public_url   text not null,
  file_name    text,
  content_type text,
  size_bytes   bigint,
  folder       text,
  uploaded_by  uuid references auth.users (id) on delete set null,
  created_at   timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- contact_messages  (submissions from the public /contact form)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 1 and 200),
  email      text not null check (char_length(email) between 3 and 320),
  phone      text check (phone is null or char_length(phone) <= 50),
  subject    text check (subject is null or char_length(subject) <= 300),
  message    text not null check (char_length(message) between 1 and 5000),
  status     text not null default 'new'
             check (status in ('new', 'read', 'replied', 'archived')),
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Indexes
-- ─────────────────────────────────────────────────────────────────────────────
create index if not exists idx_faculty_published   on public.faculty_members (is_published, sort_order);
create index if not exists idx_programs_published  on public.programs (is_published, sort_order);
create index if not exists idx_documents_cat       on public.documents (category, is_published, sort_order);
create index if not exists idx_documents_program   on public.documents (program_slug);
create index if not exists idx_documents_group     on public.documents (group_label);
create index if not exists idx_news_published      on public.news_articles (is_published, published_at desc);
create index if not exists idx_media_folder        on public.media_assets (folder, created_at desc);
create index if not exists idx_contact_status      on public.contact_messages (status, created_at desc);

-- ─────────────────────────────────────────────────────────────────────────────
-- updated_at helper
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare t text;
begin
  foreach t in array array[
    'departments','faculty_members','programs','documents','news_articles',
    'short_courses','leadership_members','admin_offices','campus_gallery',
    'content_pages','site_settings'
  ] loop
    execute format('drop trigger if exists trg_touch_%1$s on public.%1$s', t);
    execute format(
      'create trigger trg_touch_%1$s before update on public.%1$s
       for each row execute function public.touch_updated_at()', t);
  end loop;
end;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- is_admin() helper — true when the signed-in user has role 'admin'
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- Auto-create a profile row for every new auth user (role 'viewer')
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'viewer')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ═══════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════════════════
alter table public.profiles         enable row level security;
alter table public.departments      enable row level security;
alter table public.faculty_members  enable row level security;
alter table public.programs         enable row level security;
alter table public.documents        enable row level security;
alter table public.news_articles    enable row level security;
alter table public.short_courses    enable row level security;
alter table public.leadership_members enable row level security;
alter table public.admin_offices    enable row level security;
alter table public.campus_gallery   enable row level security;
alter table public.content_pages    enable row level security;
alter table public.site_settings    enable row level security;
alter table public.media_assets     enable row level security;
alter table public.contact_messages enable row level security;

-- profiles: a user can read their own row; admins can read all.
drop policy if exists "profiles_self_select" on public.profiles;
create policy "profiles_self_select" on public.profiles
  for select using (id = auth.uid());

drop policy if exists "profiles_admin_all" on public.profiles;
create policy "profiles_admin_all" on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());

-- Published-content tables: public SELECT of published rows + admin ALL.
do $$
declare t text;
begin
  foreach t in array array[
    'faculty_members','programs','documents','news_articles','short_courses',
    'leadership_members','admin_offices','campus_gallery','content_pages'
  ] loop
    execute format('drop policy if exists "%1$s_public_select" on public.%1$s', t);
    execute format(
      'create policy "%1$s_public_select" on public.%1$s
       for select using (is_published = true)', t);
    execute format('drop policy if exists "%1$s_admin_all" on public.%1$s', t);
    execute format(
      'create policy "%1$s_admin_all" on public.%1$s
       for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end;
$$;

-- departments & site_settings: public SELECT (no is_published column) + admin ALL.
drop policy if exists "departments_public_select" on public.departments;
create policy "departments_public_select" on public.departments
  for select using (true);

drop policy if exists "departments_admin_all" on public.departments;
create policy "departments_admin_all" on public.departments
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "site_settings_public_select" on public.site_settings;
create policy "site_settings_public_select" on public.site_settings
  for select using (true);

drop policy if exists "site_settings_admin_all" on public.site_settings;
create policy "site_settings_admin_all" on public.site_settings
  for all using (public.is_admin()) with check (public.is_admin());

-- media_assets: public SELECT; admins manage.
drop policy if exists "media_assets_public_select" on public.media_assets;
create policy "media_assets_public_select" on public.media_assets
  for select using (true);

drop policy if exists "media_assets_admin_all" on public.media_assets;
create policy "media_assets_admin_all" on public.media_assets
  for all using (public.is_admin()) with check (public.is_admin());

-- contact_messages: anonymous INSERT only (public form); admins read/manage.
-- The website inserts through the service-role API route, but this policy
-- also allows a direct anon insert if ever needed.
drop policy if exists "contact_messages_anon_insert" on public.contact_messages;
create policy "contact_messages_anon_insert" on public.contact_messages
  for insert with check (
    char_length(name) between 1 and 200
    and char_length(message) between 1 and 5000
    and status = 'new'
  );

drop policy if exists "contact_messages_admin_all" on public.contact_messages;
create policy "contact_messages_admin_all" on public.contact_messages
  for all using (public.is_admin()) with check (public.is_admin());
