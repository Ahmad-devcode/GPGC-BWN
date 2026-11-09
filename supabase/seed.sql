-- ═══════════════════════════════════════════════════════════════════════════
-- PTUT Website — static seed (supabase/seed.sql)
-- Run in the Supabase SQL Editor AFTER supabase/migrations/0001_backend.sql.
-- Safe to re-run: everything uses ON CONFLICT upserts.
--
-- NOTE: Programs, faculty members, news articles, documents (merit lists,
-- fee PDFs, program downloads) and the short course are seeded by the Node
-- script instead — run `npm run seed` — because their content lives in the
-- TypeScript data files (src/data/*.ts) and page components. This SQL file
-- only covers the small static sets that are simplest to keep in SQL.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Departments (verbatim from src/data/faculty.ts — note: the "Automotive"
--    spelling is exactly as it appears in the source data) ──────────────────
insert into public.departments (name, slug, sort_order) values
  ('Electrical Department',            'electrical-department',            1),
  ('Automotive Department',            'automotive-department',            2),
  ('Civil & Architectural Department', 'civil-architectural-department',   3),
  ('Software Engineering Department',  'software-engineering-department',  4)
on conflict (name) do update set slug = excluded.slug, sort_order = excluded.sort_order;

-- ── Site settings — ONLY values that actually appear in the site code ──────
-- Sources: src/app/components/Footer.tsx (address / phone / email / hours)
--          src/app/admissions/page.tsx "Quick Contact" tab (admissions office)
insert into public.site_settings (key, value) values
  ('site_name',         '"Punjab Tianjin University of Technology"'::jsonb),
  ('address',           '"Near City Hospital, Bahawalnagar — Punjab, Pakistan"'::jsonb),
  ('phone',             '"(063) 9240177"'::jsonb),
  ('email',             '"gpgcbwn@gmail.com"'::jsonb),
  ('office_hours',      '"Mon — Fri: 08:00 — 16:00"'::jsonb),
  ('admissions_address',  '"Sector C-II Township Lahore, Punjab 54770, Pakistan"'::jsonb),
  ('admissions_phone',    '"+92 42 9933 2439"'::jsonb),
  ('admissions_whatsapp', '"0309-7888547"'::jsonb),
  ('admissions_email',    '"admissions@ptut.edu.pk"'::jsonb)
on conflict (key) do update set value = excluded.value, updated_at = now();

-- ── Administrative offices (from src/app/administration/page.tsx) ──────────
insert into public.admin_offices (slug, title, description, icon, sort_order) values
  ('registrar',              'Registrar Office',       'Student records, enrollment, and academic documentation.',          'Users',       1),
  ('examinations',           'Examinations',           'Exam scheduling, results, and controller office.',                    'FileCheck',   2),
  ('treasurer',              'Treasurer Office',       'Financial operations, fee management, and budgeting.',                'Landmark',    3),
  ('qec',                    'Quality Enhancement Cell','Accreditation, quality assurance, and continuous improvement.',      'ShieldCheck', 4),
  ('directorate-of-academics','Directorate of Academics','Curriculum development, academic policy, and faculty development.','GraduationCap', 5)
on conflict (slug) do update set
  title = excluded.title, description = excluded.description,
  icon = excluded.icon, sort_order = excluded.sort_order;

-- ── Campus gallery (the 8 images from src/app/sections/Campus.tsx) ─────────
insert into public.campus_gallery (image, title, sort_order)
select v.image, v.title, v.sort_order
from (values
  ('/images/campus-1.png', 'Main Campus, Bahawalnagr', 1),
  ('/images/campus-2.jpg', 'Bahawalnagar Campus',      2),
  ('/images/campus-3.png', 'Technology Labs',          3),
  ('/images/campus-4.png', 'Physics Lab',              4),
  ('/images/campus-5.jpg', 'News & Events',            5),
  ('/images/campus-6.jpg', 'Sports & Recreation',      6),
  ('/images/campus-7.jpg', 'Cultural Festivals',       7),
  ('/images/campus-8.png', 'Graduation Day',           8)
) as v(image, title, sort_order)
where not exists (
  select 1 from public.campus_gallery g where g.image = v.image
);
