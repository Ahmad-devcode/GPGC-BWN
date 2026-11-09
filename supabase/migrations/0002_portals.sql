-- 0002_portals.sql
-- Staff portals: adds 'principal', 'clerk' and 'teacher' roles on top of the
-- 0001 backend, plus the Row Level Security the portal pages rely on.
--
--   * principal — read-only oversight: stats, contact messages, media.
--   * clerk     — office work: documents (upload + entries) and the
--                 contact-message inbox (status updates).
--   * teacher   — a faculty member: can update ONLY their own faculty row
--                 (matched by email) and upload their own photo.
--
-- Safe to run more than once. Run in the Supabase SQL Editor AFTER
-- 0001_backend.sql.

-- ---------------------------------------------------------------------------
-- 1. Widen the role list on profiles
-- ---------------------------------------------------------------------------
alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in ('admin', 'principal', 'clerk', 'teacher', 'editor', 'viewer'));

-- ---------------------------------------------------------------------------
-- 2. Helpers
-- ---------------------------------------------------------------------------
-- Role of the signed-in user (null when signed out).
create or replace function public.current_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

-- True for any staff account (used by portal read policies).
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    public.current_role() in ('admin', 'principal', 'clerk', 'teacher', 'editor'),
    false
  )
$$;

-- True for the message-inbox roles (principal + clerk + admin).
create or replace function public.can_read_messages()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    public.current_role() in ('admin', 'principal', 'clerk'),
    false
  )
$$;

-- ---------------------------------------------------------------------------
-- 3. contact_messages — inbox roles can read; they can also update (the app
--    only ever updates `status`).
-- ---------------------------------------------------------------------------
drop policy if exists "contact_messages_staff_select" on public.contact_messages;
create policy "contact_messages_staff_select" on public.contact_messages
  for select
  using (public.can_read_messages());

drop policy if exists "contact_messages_staff_update" on public.contact_messages;
create policy "contact_messages_staff_update" on public.contact_messages
  for update
  using (public.can_read_messages())
  with check (public.can_read_messages());

-- ---------------------------------------------------------------------------
-- 4. documents — clerk can create and edit document entries (admin already
--    has full access via 0001).
-- ---------------------------------------------------------------------------
drop policy if exists "documents_clerk_insert" on public.documents;
create policy "documents_clerk_insert" on public.documents
  for insert
  with check (public.current_role() = 'clerk');

drop policy if exists "documents_clerk_update" on public.documents;
create policy "documents_clerk_update" on public.documents
  for update
  using (public.current_role() = 'clerk')
  with check (public.current_role() = 'clerk');

-- ---------------------------------------------------------------------------
-- 5. faculty_members — a teacher can update ONLY the row whose email matches
--    their own account email.
-- ---------------------------------------------------------------------------
drop policy if exists "faculty_teacher_update_own" on public.faculty_members;
create policy "faculty_teacher_update_own" on public.faculty_members
  for update
  using (
    public.current_role() = 'teacher'
    and email is not null
    and lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  )
  with check (
    public.current_role() = 'teacher'
    and email is not null
    and lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );

-- ---------------------------------------------------------------------------
-- 6. media_assets — staff can read the media list (public read of published
--    assets from 0001 stays untouched).
-- ---------------------------------------------------------------------------
drop policy if exists "media_assets_staff_select" on public.media_assets;
create policy "media_assets_staff_select" on public.media_assets
  for select
  using (public.is_staff());
