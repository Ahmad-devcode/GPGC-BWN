// src/lib/data.ts
// ─────────────────────────────────────────────────────────────────────────────
// Repository layer for the PTUT website.
//
// Every function follows the same contract:
//   1. If Supabase env vars are NOT set → return the local static data from
//      src/data/* (the site renders exactly as it did before the backend).
//   2. If Supabase is set → query the published rows, map them to the exact
//      frontend shapes, and resolve media values to public URLs.
//   3. On ANY error or empty result → fall back to the local static data.
//
// Public reads use a plain anon-key client (no cookies): all public content
// is readable by the anon role under RLS, and avoiding next/headers keeps
// pages eligible for static generation / ISR.
// ─────────────────────────────────────────────────────────────────────────────
import { cache } from 'react';
import { createClient as createAnonClient, type SupabaseClient } from '@supabase/supabase-js';

import { programs as localPrograms, type Program } from '../data/programs';
import {
  staffMembers as localFaculty,
  departments as localDepartments,
  type StaffMember,
} from '../data/faculty';
import { newsArticles as localNews, type NewsArticle } from '../data/news';
import {
  meritDocuments as localMeritDocs,
  feeDocuments as localFeeDocs,
  shortCourseDocuments as localShortCourseDocs,
  shortCourses as localShortCourses,
  campusGallery as localGallery,
  MERIT_GROUP_LABEL,
  type SiteDocument,
  type ShortCourse,
  type CampusGalleryItem,
} from '../data/documents';
import { isSupabaseConfigured, resolveMediaUrl } from './media';
import type {
  ProgramRow,
  FacultyMemberRow,
  DocumentRow,
  NewsArticleRow,
  ShortCourseRow,
  LeadershipMemberRow,
  CampusGalleryRow,
  SiteSettingRow,
  DepartmentRow,
} from './supabase/types';

// ── Read client (anon key, no session) ───────────────────────────────────────
let readClient: SupabaseClient | null = null;

function getReadClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!readClient) {
    readClient = createAnonClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
  }
  return readClient;
}

// ── Small helpers ────────────────────────────────────────────────────────────
function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function formatShortDate(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  // "Aug 05, 2026" — matches the format used by the original hardcoded data.
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function formatLongDate(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  // "22 October 2024" — matches the short-course page.
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Merge DB document URLs into a local fallback list, matched by title. */
function mergeDocumentUrls(local: SiteDocument[], dbDocs: SiteDocument[]): SiteDocument[] {
  if (dbDocs.length === 0) return local;
  const byTitle = new Map(dbDocs.map((d) => [d.title, d]));
  const merged = local.map((item) => {
    const db = byTitle.get(item.title);
    return db && db.url !== '#' ? { ...item, url: db.url } : item;
  });
  const localTitles = new Set(local.map((d) => d.title));
  const extras = dbDocs.filter((d) => !localTitles.has(d.title));
  return [...merged, ...extras];
}

function mapDocumentRow(row: DocumentRow): SiteDocument {
  return {
    title: row.title,
    category: row.category,
    url: row.file_key ? resolveMediaUrl(row.file_key) : '#',
    groupLabel: row.group_label ?? undefined,
    programSlug: row.program_slug ?? undefined,
    fileName: row.file_name ?? undefined,
  };
}

async function fetchDocuments(filters: {
  categories?: string[];
  programSlug?: string;
  groupLabel?: string;
}): Promise<SiteDocument[] | null> {
  const supabase = getReadClient();
  if (!supabase) return null;
  try {
    let query = supabase
      .from('documents')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });
    if (filters.categories?.length) query = query.in('category', filters.categories);
    if (filters.programSlug) query = query.eq('program_slug', filters.programSlug);
    if (filters.groupLabel) query = query.eq('group_label', filters.groupLabel);
    const { data, error } = await query;
    if (error || !data) return null;
    return (data as DocumentRow[]).map(mapDocumentRow);
  } catch {
    return null;
  }
}

// ── Programs ─────────────────────────────────────────────────────────────────
function mapProgramRow(row: ProgramRow, downloads: { label: string; url: string }[]): Program {
  return {
    slug: row.slug,
    title: row.title,
    shortTitle: row.short_title ?? '',
    degree: row.degree ?? '',
    duration: row.duration ?? '',
    creditHours: row.credit_hours ?? 0,
    facultyGroup: row.faculty_group ?? '',
    tagline: row.tagline ?? '',
    introduction: asArray<string>(row.introduction),
    mission: row.mission ?? '',
    peos: asArray<Program['peos'][number]>(row.peos),
    plos: asArray<Program['plos'][number]>(row.plos),
    peoPloMatrix: asArray<Program['peoPloMatrix'][number]>(row.peo_plo_matrix),
    curriculum: asArray<Program['curriculum'][number]>(row.curriculum),
    labs: asArray<string>(row.labs),
    eligibility: (row.eligibility as Program['eligibility']) ?? {
      prerequisites: [],
      distribution: [],
      general: [],
    },
    facultySlugs: row.faculty_slugs ?? [],
    downloads,
    accreditation: (row.accreditation as Program['accreditation']) ?? undefined,
  };
}

/**
 * Merge a program's local "#" downloads with real files from the documents
 * table. Only documents that actually have an uploaded file replace a "#";
 * anything else keeps the original placeholder so the UI never changes.
 */
function mergeProgramDownloads(
  slug: string,
  localDownloads: { label: string; url: string }[],
  dbDocs: SiteDocument[] | null,
): { label: string; url: string }[] {
  if (!dbDocs) return localDownloads;
  const forProgram = dbDocs.filter((d) => d.programSlug === slug && d.url !== '#');
  if (forProgram.length === 0) return localDownloads;
  const byLabel = new Map(forProgram.map((d) => [d.title, d.url]));
  const merged = localDownloads.map((dl) =>
    byLabel.has(dl.label) ? { label: dl.label, url: byLabel.get(dl.label)! } : dl,
  );
  const known = new Set(localDownloads.map((d) => d.label));
  for (const doc of forProgram) {
    if (!known.has(doc.title)) merged.push({ label: doc.title, url: doc.url });
  }
  return merged;
}

export const getPrograms = cache(async (): Promise<Program[]> => {
  const supabase = getReadClient();
  if (!supabase) return localPrograms;
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return localPrograms;

    const dbDocs = await fetchDocuments({
      categories: ['curriculum', 'survey', 'general'],
    });

    return (data as ProgramRow[]).map((row) => {
      const local = localPrograms.find((p) => p.slug === row.slug);
      const downloads = mergeProgramDownloads(
        row.slug,
        local?.downloads ?? [],
        dbDocs,
      );
      return mapProgramRow(row, downloads);
    });
  } catch {
    return localPrograms;
  }
});

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  const all = await getPrograms();
  return all.find((p) => p.slug === slug) ?? null;
}

// ── Faculty ──────────────────────────────────────────────────────────────────
function mapFacultyRow(row: FacultyMemberRow): StaffMember {
  return {
    slug: row.slug,
    name: row.name,
    designation: row.designation ?? '',
    image: row.image ? resolveMediaUrl(row.image) : '',
    email: row.email ?? '',
    department: row.department ?? '',
  };
}

export const getFacultyMembers = cache(async (): Promise<StaffMember[]> => {
  const supabase = getReadClient();
  if (!supabase) return localFaculty;
  try {
    const { data, error } = await supabase
      .from('faculty_members')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return localFaculty;
    return (data as FacultyMemberRow[]).map(mapFacultyRow);
  } catch {
    return localFaculty;
  }
});

export async function getFacultyBySlug(slug: string): Promise<StaffMember | null> {
  const all = await getFacultyMembers();
  return all.find((m) => m.slug === slug) ?? null;
}

export const getDepartments = cache(async (): Promise<string[]> => {
  const supabase = getReadClient();
  if (!supabase) return localDepartments;
  try {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return localDepartments;
    return ['All', ...(data as DepartmentRow[]).map((d) => d.name)];
  } catch {
    return localDepartments;
  }
});

// ── News ─────────────────────────────────────────────────────────────────────
export const getNewsArticles = cache(async (): Promise<NewsArticle[]> => {
  const supabase = getReadClient();
  if (!supabase) return localNews;
  try {
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });
    if (error || !data || data.length === 0) return localNews;
    return (data as NewsArticleRow[]).map((row) => ({
      slug: row.slug,
      img: row.image ? resolveMediaUrl(row.image) : '',
      cat: row.category ?? '',
      date: formatShortDate(row.published_at),
      title: row.title,
      excerpt: row.excerpt ?? undefined,
      body: row.body ?? undefined,
    }));
  } catch {
    return localNews;
  }
});

// ── Documents ────────────────────────────────────────────────────────────────
export async function getDocuments(filters: {
  category?: string;
  programSlug?: string;
  groupLabel?: string;
} = {}): Promise<SiteDocument[]> {
  const docs = await fetchDocuments({
    categories: filters.category ? [filters.category] : undefined,
    programSlug: filters.programSlug,
    groupLabel: filters.groupLabel,
  });
  return docs ?? [];
}

/** Merit-list page downloads (forms + challans + lists), URLs merged in. */
export async function getMeritDocuments(): Promise<SiteDocument[]> {
  const docs = await fetchDocuments({
    categories: ['merit-list', 'challan', 'form'],
    groupLabel: MERIT_GROUP_LABEL,
  });
  if (!docs) return localMeritDocs;
  return mergeDocumentUrls(localMeritDocs, docs);
}

/** Admissions fee-structure PDFs. */
export async function getFeeDocuments(): Promise<SiteDocument[]> {
  const docs = await fetchDocuments({ categories: ['fee'] });
  if (!docs) return localFeeDocs;
  // Fees are matched by file name first (stable), then by title.
  const byFileName = new Map(
    docs.filter((d) => d.fileName).map((d) => [d.fileName!, d]),
  );
  const merged = localFeeDocs.map((item) => {
    const byName = item.fileName ? byFileName.get(item.fileName) : undefined;
    const match = byName ?? docs.find((d) => d.title === item.title);
    return match && match.url !== '#' ? { ...item, url: match.url } : item;
  });
  return merged;
}

/** Downloads attached to a short course (advertisement / form / challan). */
export async function getShortCourseDocuments(courseSlug: string): Promise<SiteDocument[]> {
  const docs = await fetchDocuments({ programSlug: courseSlug });
  if (!docs) return localShortCourseDocs;
  const local = localShortCourseDocs.filter((d) => d.programSlug === courseSlug);
  return mergeDocumentUrls(local, docs);
}

// ── Short courses ────────────────────────────────────────────────────────────
export const getShortCourses = cache(async (): Promise<ShortCourse[]> => {
  const supabase = getReadClient();
  if (!supabase) return localShortCourses;
  try {
    const { data, error } = await supabase
      .from('short_courses')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return localShortCourses;
    return (data as ShortCourseRow[]).map((row) => ({
      slug: row.slug,
      title: row.title,
      subtitle: row.subtitle ?? '',
      durationText: row.duration_text ?? '',
      startDate: formatLongDate(row.start_date),
      applyDeadline: formatLongDate(row.apply_deadline),
      outcomes: asArray<string>(row.outcomes),
      isOpen: row.is_open,
    }));
  } catch {
    return localShortCourses;
  }
});

// ── Leadership ───────────────────────────────────────────────────────────────
export interface LeadershipMember {
  slug: string;
  name: string;
  title: string;
  message: string;
  image: string;
}

export const getLeadership = cache(async (): Promise<LeadershipMember[]> => {
  const supabase = getReadClient();
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('leadership_members')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });
    if (error || !data) return [];
    return (data as LeadershipMemberRow[]).map((row) => ({
      slug: row.slug,
      name: row.name,
      title: row.title ?? '',
      message: row.message ?? '',
      image: row.image ? resolveMediaUrl(row.image) : '',
    }));
  } catch {
    return [];
  }
});

// ── Campus gallery ───────────────────────────────────────────────────────────
export const getCampusGallery = cache(async (): Promise<CampusGalleryItem[]> => {
  const supabase = getReadClient();
  if (!supabase) return localGallery;
  try {
    const { data, error } = await supabase
      .from('campus_gallery')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return localGallery;
    // Merge with the local list so the tag / large layout flags survive.
    return (data as CampusGalleryRow[]).map((row, i) => {
      const local = localGallery.find((g) => g.img === row.image);
      return {
        img: resolveMediaUrl(row.image),
        tag: local?.tag ?? 'Campus',
        title: row.title ?? local?.title ?? '',
        large: local?.large ?? i === 0,
      };
    });
  } catch {
    return localGallery;
  }
});

// ── Site settings ────────────────────────────────────────────────────────────
const fallbackSettings: Record<string, unknown> = {
  site_name: 'Punjab Tianjin University of Technology',
  address: 'Near City Hospital, Bahawalnagar — Punjab, Pakistan',
  phone: '(063) 9240177',
  email: 'gpgcbwn@gmail.com',
  office_hours: 'Mon — Fri: 08:00 — 16:00',
  admissions_address: 'Sector C-II Township Lahore, Punjab 54770, Pakistan',
  admissions_phone: '+92 42 9933 2439',
  admissions_whatsapp: '0309-7888547',
  admissions_email: 'admissions@ptut.edu.pk',
};

export const getSiteSettings = cache(async (): Promise<Record<string, unknown>> => {
  const supabase = getReadClient();
  if (!supabase) return fallbackSettings;
  try {
    const { data, error } = await supabase.from('site_settings').select('*');
    if (error || !data || data.length === 0) return fallbackSettings;
    const out: Record<string, unknown> = { ...fallbackSettings };
    for (const row of data as SiteSettingRow[]) out[row.key] = row.value;
    return out;
  } catch {
    return fallbackSettings;
  }
});
