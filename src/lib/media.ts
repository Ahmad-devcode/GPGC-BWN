// src/lib/media.ts
// Client-safe helpers for turning stored media values into public URLs.
//
// Storage convention (see BACKEND-SETUP.md):
//   * Values that start with "http://" / "https://" are already full URLs.
//   * Values that start with "/" are local paths served from /public
//     (e.g. "/faculty/obaid.jpg", "/images/campus-1.png").
//   * Anything else is a Cloudflare R2 object key (e.g. "images/faculty/x.jpg"
//     or "pdfs/fees/ug-fee.pdf") and is prefixed with NEXT_PUBLIC_R2_PUBLIC_URL.

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function isR2Configured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_R2_PUBLIC_URL);
}

/**
 * Resolve a stored media value to a displayable URL.
 * Returns "#" for empty values so download links degrade gracefully.
 */
export function resolveMediaUrl(value?: string | null): string {
  if (!value) return '#';
  const v = value.trim();
  if (!v) return '#';
  if (v.startsWith('http://') || v.startsWith('https://')) return v;
  if (v.startsWith('/')) return v;
  const base = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
  if (!base) return v; // no R2 configured — return the key as-is
  return `${base.replace(/\/+$/, '')}/${v.replace(/^\/+/, '')}`;
}

/** Slugify a title the same way the seed script does. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
