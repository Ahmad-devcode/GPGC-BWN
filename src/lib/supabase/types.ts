// src/lib/supabase/types.ts
// Pragmatic hand-written row types for the Supabase tables created by
// supabase/migrations/0001_backend.sql. These mirror the database columns;
// the repository layer (src/lib/data.ts) maps rows to the frontend shapes
// defined in src/data/*.ts.

export type UserRole =
  | 'admin'
  | 'principal'
  | 'clerk'
  | 'teacher'
  | 'editor'
  | 'viewer';

export interface ProfileRow {
  id: string;
  email: string | null;
  role: UserRole;
  created_at: string;
}

export interface DepartmentRow {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface FacultyMemberRow {
  id: string;
  slug: string;
  name: string;
  designation: string | null;
  email: string | null;
  department: string | null;
  image: string | null;
  bio: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProgramRow {
  id: string;
  slug: string;
  title: string;
  short_title: string | null;
  degree: string | null;
  duration: string | null;
  credit_hours: number | null;
  faculty_group: string | null;
  tagline: string | null;
  mission: string | null;
  introduction: unknown;
  peos: unknown;
  plos: unknown;
  peo_plo_matrix: unknown;
  curriculum: unknown;
  labs: unknown;
  eligibility: unknown;
  accreditation: unknown;
  faculty_slugs: string[];
  hero_image: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type DocumentCategoryRow =
  | 'merit-list'
  | 'challan'
  | 'form'
  | 'fee'
  | 'curriculum'
  | 'survey'
  | 'advertisement'
  | 'application'
  | 'general';

export interface DocumentRow {
  id: string;
  title: string;
  category: DocumentCategoryRow;
  program_slug: string | null;
  group_label: string | null;
  file_key: string | null;
  file_name: string | null;
  file_type: string | null;
  file_size: number | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsArticleRow {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  excerpt: string | null;
  body: string | null;
  image: string | null;
  published_at: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ShortCourseRow {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  duration_text: string | null;
  start_date: string | null;
  apply_deadline: string | null;
  outcomes: unknown;
  is_open: boolean;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface LeadershipMemberRow {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  message: string | null;
  image: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminOfficeRow {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  body: string | null;
  icon: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CampusGalleryRow {
  id: string;
  image: string;
  title: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSettingRow {
  key: string;
  value: unknown;
  updated_at: string;
}

export interface MediaAssetRow {
  id: string;
  key: string;
  public_url: string;
  file_name: string | null;
  content_type: string | null;
  size_bytes: number | null;
  folder: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface ContactMessageInsert {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}
