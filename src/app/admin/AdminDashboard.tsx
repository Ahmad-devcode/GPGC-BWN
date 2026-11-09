'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';
import { slugify } from '../../lib/media';
import type { MediaAssetRow } from '../../lib/supabase/types';
import {
  Upload,
  Copy,
  Check,
  LogOut,
  Loader2,
  FileText,
  Image as ImageIcon,
  Newspaper,
  FolderOpen,
  Users,
} from 'lucide-react';

const FOLDER_OPTIONS: { value: string; label: string }[] = [
  { value: 'images/faculty', label: 'Images — Faculty photos' },
  { value: 'images/news', label: 'Images — News' },
  { value: 'images/campus', label: 'Images — Campus gallery' },
  { value: 'images/hero', label: 'Images — Hero / banners' },
  { value: 'images/leadership', label: 'Images — Leadership' },
  { value: 'images/programs', label: 'Images — Programs' },
  { value: 'images/site', label: 'Images — Site (logo etc.)' },
  { value: 'pdfs/merit-lists', label: 'PDFs — Merit lists' },
  { value: 'pdfs/challans', label: 'PDFs — Fee challans' },
  { value: 'pdfs/forms', label: 'PDFs — Forms' },
  { value: 'pdfs/fees', label: 'PDFs — Fee structure' },
  { value: 'pdfs/curriculum', label: 'PDFs — Curriculum' },
  { value: 'pdfs/general', label: 'PDFs — General' },
];

const DOCUMENT_CATEGORIES = [
  'merit-list',
  'challan',
  'form',
  'fee',
  'curriculum',
  'survey',
  'advertisement',
  'application',
  'general',
] as const;

const inputClass =
  'w-full px-3.5 py-2.5 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828]/40';
const labelClass = 'block text-xs font-bold text-[#0D2B5A] uppercase tracking-wider mb-1.5';

interface Props {
  userEmail: string;
  role: string;
  initialAssets: MediaAssetRow[];
}

export default function AdminDashboard({ userEmail, role, initialAssets }: Props) {
  const router = useRouter();
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);
  const supabase = () => {
    if (!supabaseRef.current) supabaseRef.current = createClient();
    return supabaseRef.current;
  };

  const [assets, setAssets] = useState<MediaAssetRow[]>(initialAssets);
  const [notice, setNotice] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  // ── Upload widget state ──────────────────────────────────────────────────
  const [folder, setFolder] = useState('images/faculty');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [lastUploadUrl, setLastUploadUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload() {
    if (!file) {
      setNotice({ kind: 'err', text: 'Choose a file first.' });
      return;
    }
    setUploading(true);
    setNotice(null);
    try {
      // 1. Get a presigned URL from the server (checks session + role).
      const urlRes = await fetch('/api/admin/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type || 'application/octet-stream',
          folder,
        }),
      });
      const urlData = await urlRes.json().catch(() => ({}));
      if (!urlRes.ok) throw new Error(urlData.error ?? 'Could not get an upload URL.');

      // 2. Upload the file straight to R2.
      const putRes = await fetch(urlData.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
        body: file,
      });
      if (!putRes.ok) {
        throw new Error(
          'Upload to R2 failed. Check the bucket CORS settings (see BACKEND-SETUP.md).',
        );
      }

      // 3. Register the file in media_assets.
      const regRes = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: urlData.key,
          fileName: file.name,
          contentType: file.type,
          sizeBytes: file.size,
          folder,
        }),
      });
      const regData = await regRes.json().catch(() => ({}));
      if (!regRes.ok) throw new Error(regData.error ?? 'Uploaded, but registration failed.');
      if (regData.asset) setAssets((a) => [regData.asset as MediaAssetRow, ...a]);

      setLastUploadUrl(urlData.publicUrl);
      setNotice({ kind: 'ok', text: `Uploaded "${file.name}" successfully.` });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setNotice({
        kind: 'err',
        text: err instanceof Error ? err.message : 'Upload failed.',
      });
    } finally {
      setUploading(false);
    }
  }

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setNotice({ kind: 'err', text: 'Copy failed — select the URL manually.' });
    }
  }

  // ── Quick-add: news article ──────────────────────────────────────────────
  const [news, setNews] = useState({ title: '', category: '', image: '', excerpt: '', body: '' });
  const [savingNews, setSavingNews] = useState(false);

  async function handleAddNews(e: React.FormEvent) {
    e.preventDefault();
    setSavingNews(true);
    setNotice(null);
    const { error } = await supabase()
      .from('news_articles')
      .insert({
        slug: slugify(news.title),
        title: news.title.trim(),
        category: news.category.trim() || null,
        image: news.image.trim() || null,
        excerpt: news.excerpt.trim() || null,
        body: news.body.trim() || null,
        published_at: new Date().toISOString(),
        is_published: true,
      });
    setSavingNews(false);
    if (error) {
      setNotice({ kind: 'err', text: `News insert failed: ${error.message}` });
    } else {
      setNotice({ kind: 'ok', text: 'News article published. It will appear on the homepage.' });
      setNews({ title: '', category: '', image: '', excerpt: '', body: '' });
    }
  }

  // ── Quick-add: document ──────────────────────────────────────────────────
  const [doc, setDoc] = useState({
    title: '',
    category: 'merit-list',
    groupLabel: '',
    programSlug: '',
    fileKey: '',
  });
  const [savingDoc, setSavingDoc] = useState(false);

  async function handleAddDocument(e: React.FormEvent) {
    e.preventDefault();
    setSavingDoc(true);
    setNotice(null);
    const fileValue = doc.fileKey.trim();
    const { error } = await supabase()
      .from('documents')
      .insert({
        title: doc.title.trim(),
        category: doc.category,
        group_label: doc.groupLabel.trim() || null,
        program_slug: doc.programSlug.trim() || null,
        // A full public URL is stored as-is; a bare key works too —
        // the site resolves both (see src/lib/media.ts).
        file_key: fileValue || null,
        file_name: fileValue ? fileValue.split('/').pop() ?? null : null,
        is_published: true,
      });
    setSavingDoc(false);
    if (error) {
      setNotice({ kind: 'err', text: `Document insert failed: ${error.message}` });
    } else {
      setNotice({ kind: 'ok', text: 'Document added. It will appear wherever its category/group is shown.' });
      setDoc({ title: '', category: 'merit-list', groupLabel: '', programSlug: '', fileKey: '' });
    }
  }

  async function handleSignOut() {
    await supabase().auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div>
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0D2B5A] tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-[#64748B] mt-1">
            Signed in as <span className="font-semibold text-[#0D2B5A]">{userEmail}</span>{' '}
            <span className="ml-1 text-[11px] font-bold uppercase tracking-wider bg-[#0D2B5A] text-white px-2 py-0.5 rounded">
              {role}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {role === 'admin' && (
            <a
              href="/admin/users"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-black/10 rounded-lg text-sm font-semibold text-[#0D2B5A] hover:border-[#0D2B5A]/40 transition-colors"
            >
              <Users size={15} /> Portal users
            </a>
          )}
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-black/10 rounded-lg text-sm font-semibold text-[#0D2B5A] hover:border-[#C62828]/40 hover:text-[#C62828] transition-colors"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </div>

      {notice && (
        <div
          className={`p-4 rounded-xl border mb-8 text-sm font-medium ${
            notice.kind === 'ok'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-[#C62828]/5 border-[#C62828]/20 text-[#C62828]'
          }`}
        >
          {notice.text}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* ── Upload widget ─────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-black/5 shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#0D2B5A] flex items-center gap-2 mb-5">
            <Upload size={18} className="text-[#C62828]" /> Upload File to R2
          </h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="folder">Folder</label>
              <select
                id="folder"
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                className={inputClass}
              >
                {FOLDER_OPTIONS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="file">File (image, PDF or Word)</label>
              <input
                id="file"
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-[#4A5568] file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:bg-[#0D2B5A] file:text-white file:text-sm file:font-semibold hover:file:bg-[#1A3F7A] cursor-pointer"
              />
            </div>
            <button
              onClick={handleUpload}
              disabled={uploading || !file}
              className="inline-flex items-center gap-2 bg-[#C62828] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#D32F2F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload size={16} /> Upload
                </>
              )}
            </button>

            {lastUploadUrl && (
              <div className="p-4 bg-[#F5F7FA] rounded-xl">
                <div className="text-xs font-bold text-[#0D2B5A] uppercase tracking-wider mb-2">
                  Public URL
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs break-all bg-white border border-black/5 rounded-lg px-3 py-2">
                    {lastUploadUrl}
                  </code>
                  <button
                    onClick={() => copyUrl(lastUploadUrl)}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 bg-[#0D2B5A] text-white rounded-lg text-xs font-semibold hover:bg-[#1A3F7A] transition-colors"
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="text-xs text-[#64748B] mt-2">
                  Tip: paste this URL into the Document form (right) as the file, or into a
                  faculty/news image field in the database.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── Quick-add document ────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-black/5 shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#0D2B5A] flex items-center gap-2 mb-5">
            <FileText size={18} className="text-[#C62828]" /> Add a Document (PDF link)
          </h2>
          <form onSubmit={handleAddDocument} className="space-y-4">
            <div>
              <label className={labelClass}>Title *</label>
              <input
                required
                value={doc.title}
                onChange={(e) => setDoc({ ...doc, title: e.target.value })}
                className={inputClass}
                placeholder="e.g. SET 2nd List"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Category</label>
                <select
                  value={doc.category}
                  onChange={(e) => setDoc({ ...doc, category: e.target.value })}
                  className={inputClass}
                >
                  {DOCUMENT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Group label</label>
                <input
                  value={doc.groupLabel}
                  onChange={(e) => setDoc({ ...doc, groupLabel: e.target.value })}
                  className={inputClass}
                  placeholder="Merit list heading"
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Program slug (optional)</label>
              <input
                value={doc.programSlug}
                onChange={(e) => setDoc({ ...doc, programSlug: e.target.value })}
                className={inputClass}
                placeholder="e.g. electrical-engineering-technology"
              />
            </div>
            <div>
              <label className={labelClass}>Uploaded file (pick a recent upload or paste URL/key)</label>
              <div className="flex gap-2">
                <input
                  value={doc.fileKey}
                  onChange={(e) => setDoc({ ...doc, fileKey: e.target.value })}
                  className={inputClass}
                  placeholder="pdfs/merit-lists/… or https://…"
                />
                {assets.length > 0 && (
                  <select
                    value=""
                    onChange={(e) => {
                      if (e.target.value) setDoc({ ...doc, fileKey: e.target.value });
                    }}
                    className="w-40 shrink-0 px-2 py-2.5 bg-[#F5F7FA] border border-black/10 rounded-lg text-xs"
                  >
                    <option value="">Recent uploads…</option>
                    {assets.map((a) => (
                      <option key={a.id} value={a.public_url}>
                        {a.file_name ?? a.key}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={savingDoc}
              className="inline-flex items-center gap-2 bg-[#0D2B5A] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1A3F7A] transition-colors disabled:opacity-60"
            >
              {savingDoc ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
              Add Document
            </button>
          </form>
        </section>

        {/* ── Quick-add news ────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-black/5 shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#0D2B5A] flex items-center gap-2 mb-5">
            <Newspaper size={18} className="text-[#C62828]" /> Add a News Article
          </h2>
          <form onSubmit={handleAddNews} className="space-y-4">
            <div>
              <label className={labelClass}>Title *</label>
              <input
                required
                value={news.title}
                onChange={(e) => setNews({ ...news, title: e.target.value })}
                className={inputClass}
                placeholder="Article headline"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Category</label>
                <input
                  value={news.category}
                  onChange={(e) => setNews({ ...news, category: e.target.value })}
                  className={inputClass}
                  placeholder="e.g. Events"
                />
              </div>
              <div>
                <label className={labelClass}>Image URL / R2 key</label>
                <input
                  value={news.image}
                  onChange={(e) => setNews({ ...news, image: e.target.value })}
                  className={inputClass}
                  placeholder="images/news/… or https://…"
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Excerpt</label>
              <input
                value={news.excerpt}
                onChange={(e) => setNews({ ...news, excerpt: e.target.value })}
                className={inputClass}
                placeholder="Short summary (optional)"
              />
            </div>
            <div>
              <label className={labelClass}>Body</label>
              <textarea
                rows={4}
                value={news.body}
                onChange={(e) => setNews({ ...news, body: e.target.value })}
                className={`${inputClass} resize-y`}
                placeholder="Full article text (optional)"
              />
            </div>
            <button
              type="submit"
              disabled={savingNews}
              className="inline-flex items-center gap-2 bg-[#0D2B5A] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1A3F7A] transition-colors disabled:opacity-60"
            >
              {savingNews ? <Loader2 size={16} className="animate-spin" /> : <Newspaper size={16} />}
              Publish Article
            </button>
          </form>
        </section>

        {/* ── Recent uploads ────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-black/5 shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#0D2B5A] flex items-center gap-2 mb-5">
            <FolderOpen size={18} className="text-[#C62828]" /> Recent Uploads
          </h2>
          {assets.length === 0 ? (
            <p className="text-sm text-[#64748B]">
              Nothing uploaded yet. Use the upload widget to add your first file.
            </p>
          ) : (
            <ul className="divide-y divide-black/5">
              {assets.map((a) => (
                <li key={a.id} className="py-3 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0D2B5A]/5 text-[#0D2B5A] flex items-center justify-center shrink-0">
                    {a.content_type?.startsWith('image/') ? (
                      <ImageIcon size={16} />
                    ) : (
                      <FileText size={16} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#0D2B5A] truncate">
                      {a.file_name ?? a.key}
                    </div>
                    <div className="text-xs text-[#64748B] truncate">{a.key}</div>
                    <div className="text-[11px] text-[#94A3B8]">
                      {new Date(a.created_at).toLocaleString()}
                      {a.size_bytes ? ` · ${(a.size_bytes / 1024).toFixed(1)} KB` : ''}
                    </div>
                  </div>
                  <button
                    onClick={() => copyUrl(a.public_url)}
                    className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#F5F7FA] border border-black/5 rounded-lg text-[11px] font-semibold text-[#0D2B5A] hover:border-[#C62828]/30 hover:text-[#C62828] transition-colors"
                  >
                    <Copy size={12} /> URL
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
