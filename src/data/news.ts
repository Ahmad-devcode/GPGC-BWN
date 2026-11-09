// src/data/news.ts
// Local fallback copy of the news articles that used to be hardcoded in
// src/app/sections/News.tsx. The repository (src/lib/data.ts) returns these
// when Supabase is not configured or returns no rows, so the homepage renders
// identically with or without a backend.

export interface NewsArticle {
  slug: string;
  img: string;
  cat: string;
  /** Display date, e.g. "Aug 18, 2026" */
  date: string;
  title: string;
  excerpt?: string;
  body?: string;
}

export const newsArticles: NewsArticle[] = [
  { slug: '28th-meeting-of-the-college-academic-council', img: '/images/campus-2.jpg', cat: 'College', date: 'Aug 18, 2026', title: '28th meeting of the College Academic Council' },
  { slug: 'career-counseling-workshop-organized-for-students', img: '/images/news-2.jpg', cat: 'Careers', date: 'Aug 12, 2026', title: 'Career Counseling Workshop organized for students.' },
  { slug: 'gpgc-bahawalnagar-secures-affiliation-with-kfueit-rahim-yar-khan', img: '/images/news-3.jpg', cat: 'Affiliation', date: 'Aug 05, 2026', title: 'GPGC Bahawalnagar secures affiliation with KFUEIT Rahim Yar Khan' },
  { slug: 'appreciation-certificates-awarded-to-gpgc-faculty-members', img: '/images/news-4.jpg', cat: 'Academics', date: 'Jul 28, 2026', title: 'Appreciation certificates awarded to GPGC faculty members.' },
  { slug: 'convocation-2026-celebrating-the-next-generation-of-graduates', img: '/images/news-5.jpg', cat: 'Events', date: 'Jul 20, 2026', title: 'Convocation 2026: Celebrating the next generation of graduates' },
  { slug: 'gpgc-faculty-publishes-breakthrough-research-in-local-journal', img: '/images/news-6.jpg', cat: 'Research', date: 'Jul 15, 2026', title: 'GPGC faculty publishes breakthrough research in local journal' },
];
