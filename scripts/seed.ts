// scripts/seed.ts
// ─────────────────────────────────────────────────────────────────────────────
// Seeds the Supabase database with the content that currently lives in the
// website code:
//   • programs        ← src/data/programs.ts (all 10, incl. curriculum jsonb)
//   • faculty_members ← src/data/faculty.ts (all 19)
//   • departments     ← src/data/faculty.ts
//   • news_articles   ← src/data/news.ts (the 6 homepage articles)
//   • documents       ← merit-list downloads, fee PDFs, program downloads,
//                       short-course downloads (file_key stays NULL until the
//                       real PDFs are uploaded via /admin)
//   • short_courses   ← the "Denim Supervisor" course
//
// (Departments, site settings, admin offices and the campus gallery are also
// covered by supabase/seed.sql; running both is fine.)
//
// SAFE TO RE-RUN: everything upserts on its natural key (slug / name /
// title+category), so re-running refreshes content instead of duplicating it.
//
// Usage:
//   1. Run supabase/migrations/0001_backend.sql in the SQL Editor first.
//   2. Put NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local
//   3. npm run seed
// ─────────────────────────────────────────────────────────────────────────────
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { programs } from '../src/data/programs';
import { staffMembers, departments } from '../src/data/faculty';
import { newsArticles } from '../src/data/news';
import {
  meritDocuments,
  feeDocuments,
  shortCourseDocuments,
  shortCourses,
  type SiteDocument,
} from '../src/data/documents';
import { slugify } from '../src/lib/media';

// ── Minimal .env.local loader (avoids an extra dotenv dependency) ───────────
function loadEnvFile(file: string) {
  const full = path.resolve(process.cwd(), file);
  if (!fs.existsSync(full)) return;
  for (const line of fs.readFileSync(full, 'utf8').split('\n')) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue;
    process.env[key] = rawValue.replace(/^["']|["']$/g, '');
  }
}
loadEnvFile('.env.local');
loadEnvFile('.env');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    '\n✗ Missing env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY ' +
      'in .env.local (see .env.example), then run again.\n',
  );
  process.exit(1);
}

const supabase: SupabaseClient = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// ── Helpers ──────────────────────────────────────────────────────────────────
const MONTHS: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  jan: 0, feb: 1, mar: 2, apr: 3, jun: 5, jul: 6, aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11,
};

/** "Aug 18, 2026" / "22 October 2024" → ISO string (UTC midnight). */
function parseDisplayDate(text: string): string | null {
  const m = text.trim().match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/) ??
    text.trim().match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/);
  if (!m) return null;
  let day: number, monthName: string, year: number;
  if (/^\d/.test(m[1])) {
    day = Number(m[1]); monthName = m[2]; year = Number(m[3]);
  } else {
    monthName = m[1]; day = Number(m[2]); year = Number(m[3]);
  }
  const month = MONTHS[monthName.toLowerCase()];
  if (month === undefined) return null;
  return new Date(Date.UTC(year, month, day)).toISOString();
}

function check(label: string, error: { message: string } | null) {
  if (error) {
    console.error(`✗ ${label}: ${error.message}`);
    process.exitCode = 1;
    return false;
  }
  return true;
}

/**
 * Documents have no single unique column, so upsert manually on
 * (title, category, program_slug, group_label).
 * Existing file_key values are preserved — re-running the seed never wipes
 * a PDF link that an admin already uploaded.
 */
async function upsertDocument(doc: {
  title: string;
  category: string;
  program_slug: string | null;
  group_label: string | null;
  file_name: string | null;
  sort_order: number;
}): Promise<'inserted' | 'updated' | 'failed'> {
  let query = supabase
    .from('documents')
    .select('id')
    .eq('title', doc.title)
    .eq('category', doc.category);
  query = doc.program_slug
    ? query.eq('program_slug', doc.program_slug)
    : query.is('program_slug', null);
  query = doc.group_label
    ? query.eq('group_label', doc.group_label)
    : query.is('group_label', null);

  const { data: existing, error: selectError } = await query.limit(1);
  if (selectError) {
    console.error(`✗ document lookup "${doc.title}": ${selectError.message}`);
    return 'failed';
  }

  if (existing && existing.length > 0) {
    const { error } = await supabase
      .from('documents')
      .update({ sort_order: doc.sort_order, is_published: true })
      .eq('id', existing[0].id);
    if (error) {
      console.error(`✗ document update "${doc.title}": ${error.message}`);
      return 'failed';
    }
    return 'updated';
  }

  const { error } = await supabase.from('documents').insert({
    ...doc,
    file_key: null, // linked later, once the real PDF is uploaded via /admin
    is_published: true,
  });
  if (error) {
    console.error(`✗ document insert "${doc.title}": ${error.message}`);
    return 'failed';
  }
  return 'inserted';
}

function programDownloadCategory(label: string): string {
  if (/curriculum/i.test(label)) return 'curriculum';
  if (/survey/i.test(label)) return 'survey';
  return 'general';
}

// ── Seed steps ───────────────────────────────────────────────────────────────
async function seedDepartments() {
  const rows = departments
    .filter((d) => d !== 'All')
    .map((name, i) => ({ name, slug: slugify(name), sort_order: i + 1 }));
  const { error } = await supabase
    .from('departments')
    .upsert(rows, { onConflict: 'name' });
  if (check('departments', error)) console.log(`✓ departments: ${rows.length}`);
  return rows.length;
}

async function seedFaculty() {
  const rows = staffMembers.map((m, i) => ({
    slug: m.slug,
    name: m.name,
    designation: m.designation,
    email: m.email,
    department: m.department,
    image: m.image,
    sort_order: i + 1,
    is_published: true,
  }));
  const { error } = await supabase
    .from('faculty_members')
    .upsert(rows, { onConflict: 'slug' });
  if (check('faculty_members', error)) console.log(`✓ faculty_members: ${rows.length}`);
  return rows.length;
}

async function seedPrograms() {
  const rows = programs.map((p, i) => ({
    slug: p.slug,
    title: p.title,
    short_title: p.shortTitle,
    degree: p.degree,
    duration: p.duration,
    credit_hours: p.creditHours,
    faculty_group: p.facultyGroup,
    tagline: p.tagline,
    mission: p.mission,
    introduction: p.introduction,
    peos: p.peos,
    plos: p.plos,
    peo_plo_matrix: p.peoPloMatrix,
    curriculum: p.curriculum,
    labs: p.labs,
    eligibility: p.eligibility,
    accreditation: p.accreditation ?? null,
    faculty_slugs: p.facultySlugs,
    sort_order: i + 1,
    is_published: true,
  }));
  const { error } = await supabase.from('programs').upsert(rows, { onConflict: 'slug' });
  if (check('programs', error)) console.log(`✓ programs: ${rows.length}`);
  return rows.length;
}

async function seedNews() {
  const rows = newsArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.cat,
    image: a.img,
    excerpt: a.excerpt ?? null,
    body: a.body ?? null,
    published_at: parseDisplayDate(a.date),
    is_published: true,
  }));
  const { error } = await supabase
    .from('news_articles')
    .upsert(rows, { onConflict: 'slug' });
  if (check('news_articles', error)) console.log(`✓ news_articles: ${rows.length}`);
  return rows.length;
}

async function seedDocuments() {
  const docs: Parameters<typeof upsertDocument>[0][] = [];

  meritDocuments.forEach((d: SiteDocument, i: number) => {
    docs.push({
      title: d.title,
      category: d.category,
      program_slug: null,
      group_label: d.groupLabel ?? null,
      file_name: null,
      sort_order: i + 1,
    });
  });

  feeDocuments.forEach((d: SiteDocument, i: number) => {
    docs.push({
      title: d.title,
      category: 'fee',
      program_slug: null,
      group_label: null,
      file_name: d.fileName ?? null,
      sort_order: i + 1,
    });
  });

  for (const p of programs) {
    p.downloads.forEach((dl, i) => {
      docs.push({
        title: dl.label,
        category: programDownloadCategory(dl.label),
        program_slug: p.slug,
        group_label: null,
        file_name: null,
        sort_order: i + 1,
      });
    });
  }

  shortCourseDocuments.forEach((d: SiteDocument, i: number) => {
    docs.push({
      title: d.title,
      category: d.category,
      program_slug: d.programSlug ?? 'denim-supervisor',
      group_label: null,
      file_name: null,
      sort_order: i + 1,
    });
  });

  let inserted = 0;
  let updated = 0;
  let failed = 0;
  for (const doc of docs) {
    const result = await upsertDocument(doc);
    if (result === 'inserted') inserted++;
    else if (result === 'updated') updated++;
    else failed++;
  }
  console.log(
    `✓ documents: ${docs.length} total (${inserted} inserted, ${updated} already present, ${failed} failed)`,
  );
  if (failed > 0) process.exitCode = 1;
  return docs.length;
}

async function seedShortCourses() {
  const rows = shortCourses.map((c, i) => ({
    slug: c.slug,
    title: c.title,
    subtitle: c.subtitle,
    duration_text: c.durationText,
    start_date: parseDisplayDate(c.startDate)?.slice(0, 10) ?? null,
    apply_deadline: parseDisplayDate(c.applyDeadline)?.slice(0, 10) ?? null,
    outcomes: c.outcomes,
    is_open: c.isOpen,
    sort_order: i + 1,
    is_published: true,
  }));
  const { error } = await supabase
    .from('short_courses')
    .upsert(rows, { onConflict: 'slug' });
  if (check('short_courses', error)) console.log(`✓ short_courses: ${rows.length}`);
  return rows.length;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\nSeeding PTUT backend → ${SUPABASE_URL}\n`);
  const counts: Record<string, number> = {};
  counts.departments = await seedDepartments();
  counts.faculty_members = await seedFaculty();
  counts.programs = await seedPrograms();
  counts.news_articles = await seedNews();
  counts.documents = await seedDocuments();
  counts.short_courses = await seedShortCourses();

  console.log('\n── Seed summary ─────────────────────────────');
  for (const [table, count] of Object.entries(counts)) {
    console.log(`  ${table.padEnd(18)} ${count}`);
  }
  console.log(
    '\nNote: document file_key values are NULL until the real PDFs are ' +
      'uploaded via /admin and linked. Also run supabase/seed.sql once for ' +
      'site settings, admin offices and the campus gallery (if not done yet).',
  );
  if (process.exitCode) {
    console.log('\nFinished WITH ERRORS — see messages above.');
  } else {
    console.log('\nDone ✓');
  }
}

main().catch((err) => {
  console.error('Seed crashed:', err);
  process.exit(1);
});
