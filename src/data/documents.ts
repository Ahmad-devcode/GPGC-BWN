// src/data/documents.ts
// Local fallback data for downloadable documents (merit lists, challans,
// forms, fee PDFs, short-course files). Mirrors what used to be hardcoded in
// src/app/merit-list/page.tsx, src/app/admissions/page.tsx and
// src/app/short-course/page.tsx. URLs are "#" until the real PDFs are
// uploaded to Cloudflare R2 and linked in the `documents` table.

export type DocumentCategory =
  | 'merit-list'
  | 'challan'
  | 'form'
  | 'fee'
  | 'curriculum'
  | 'survey'
  | 'advertisement'
  | 'application'
  | 'general';

export interface SiteDocument {
  title: string;
  category: DocumentCategory;
  /** Resolved public URL of the file, or "#" when not uploaded yet. */
  url: string;
  groupLabel?: string;
  programSlug?: string;
  fileName?: string;
}

export const MERIT_GROUP_LABEL = 'Provisional Phase I — Second Merit List';

/** The 16 downloads from the merit-list page (FORM / CHALLAN / LIST). */
export const meritDocuments: SiteDocument[] = [
  { title: 'Undertaking Form', category: 'form', url: '#', groupLabel: MERIT_GROUP_LABEL },
  { title: 'Medical Certificate', category: 'form', url: '#', groupLabel: MERIT_GROUP_LABEL },
  { title: '2nd List BS Program Fee Challan', category: 'challan', url: '#', groupLabel: MERIT_GROUP_LABEL },
  { title: 'First Semester Challan for MSC Program', category: 'challan', url: '#', groupLabel: MERIT_GROUP_LABEL },
  { title: 'SET 2nd List', category: 'merit-list', url: '#', groupLabel: MERIT_GROUP_LABEL },
  { title: 'PPG 2nd List', category: 'merit-list', url: '#', groupLabel: MERIT_GROUP_LABEL },
  { title: 'MET 2nd List', category: 'merit-list', url: '#', groupLabel: MERIT_GROUP_LABEL },
  { title: 'FD 2nd List', category: 'merit-list', url: '#', groupLabel: MERIT_GROUP_LABEL },
  { title: 'EET 2nd List', category: 'merit-list', url: '#', groupLabel: MERIT_GROUP_LABEL },
  { title: 'CET 2nd List', category: 'merit-list', url: '#', groupLabel: MERIT_GROUP_LABEL },
  { title: 'BBIT 2nd List', category: 'merit-list', url: '#', groupLabel: MERIT_GROUP_LABEL },
  { title: 'AU 2nd List', category: 'merit-list', url: '#', groupLabel: MERIT_GROUP_LABEL },
  { title: 'ArET 2nd List', category: 'merit-list', url: '#', groupLabel: MERIT_GROUP_LABEL },
  { title: 'AI 2nd List', category: 'merit-list', url: '#', groupLabel: MERIT_GROUP_LABEL },
  { title: '1st Merit List Phase-1 2026 MSMET', category: 'merit-list', url: '#', groupLabel: MERIT_GROUP_LABEL },
  { title: '1st Merit List Phase-1 2026 MSET', category: 'merit-list', url: '#', groupLabel: MERIT_GROUP_LABEL },
];

/**
 * Fee-structure PDFs linked from the admissions page.
 * Fallback URL is the original local path under /downloads/.
 */
export const feeDocuments: SiteDocument[] = [
  { title: 'DAE Programs Fee', category: 'fee', url: '/downloads/dae-fee.pdf', fileName: 'dae-fee.pdf' },
  { title: 'Undergraduate Program Fee', category: 'fee', url: '/downloads/ug-fee.pdf', fileName: 'ug-fee.pdf' },
  { title: 'Master Program Fee', category: 'fee', url: '/downloads/masters-fee.pdf', fileName: 'masters-fee.pdf' },
];

/** Downloads shown on the short-course page for "Denim Supervisor". */
export const shortCourseDocuments: SiteDocument[] = [
  { title: 'Advertisement', category: 'advertisement', url: '#', programSlug: 'denim-supervisor' },
  { title: 'Application Form', category: 'application', url: '#', programSlug: 'denim-supervisor' },
  { title: 'Course Fee Challan', category: 'challan', url: '#', programSlug: 'denim-supervisor' },
];

export interface ShortCourse {
  slug: string;
  title: string;
  subtitle: string;
  durationText: string;
  /** Display strings, e.g. "22 October 2024" */
  startDate: string;
  applyDeadline: string;
  outcomes: string[];
  isOpen: boolean;
}

/** Fallback copy of the single short course hardcoded in the page. */
export const shortCourses: ShortCourse[] = [
  {
    slug: 'denim-supervisor',
    title: 'Denim Supervisor',
    subtitle: '6 Months Short Course at Punjab Tianjin University of Technology Lahore',
    durationText: '6 Months',
    startDate: '22 October 2024',
    applyDeadline: '21 June 2024',
    outcomes: [
      'Can run your own business',
      'Can be Quality, Stitching and Pattern making expert',
      'Can get jobs in different textile and fashion industries / Brands',
    ],
    isOpen: true,
  },
];

export interface CampusGalleryItem {
  img: string;
  tag: string;
  title: string;
  large?: boolean;
}

/** Fallback copy of the gallery from src/app/sections/Campus.tsx. */
export const campusGallery: CampusGalleryItem[] = [
  { img: '/images/campus-1.png', tag: 'Campus', title: 'Main Campus, Bahawalnagr', large: true },
  { img: '/images/campus-2.jpg', tag: 'Campus', title: 'Bahawalnagar Campus' },
  { img: '/images/campus-3.png', tag: 'Facilities', title: 'Technology Labs' },
  { img: '/images/campus-4.png', tag: 'Facilities', title: 'Physics Lab' },
  { img: '/images/campus-5.jpg', tag: 'Student Life', title: 'News & Events' },
  { img: '/images/campus-6.jpg', tag: 'Student Life', title: 'Sports & Recreation' },
  { img: '/images/campus-7.jpg', tag: 'Faculty', title: 'Cultural Festivals' },
  { img: '/images/campus-8.png', tag: 'Student Life', title: 'Graduation Day' },
];
