'use client';
// src/app/portal/clerk/ClerkDashboard.tsx
// Clerk tools: attach PDFs to existing document entries (merit lists,
// challans, forms...), add brand-new document entries, all uploaded
// straight to Cloudflare R2 through the presigned-URL flow.
import { useCallback, useEffect, useRef, useState } from 'react';
import { createClient } from '../../../lib/supabase/client';
import type { DocumentRow } from '../../../lib/supabase/types';
import { FileText, Loader2, Paperclip, Plus, CheckCircle2 } from 'lucide-react';

const CATEGORIES = [
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

const CATEGORY_FOLDER: Record<string, string> = {
  'merit-list': 'pdfs/merit-lists',
  challan: 'pdfs/challans',
  form: 'pdfs/forms',
  fee: 'pdfs/fees',
  curriculum: 'pdfs/curriculum',
  survey: 'pdfs/general',
  advertisement: 'pdfs/general',
  application: 'pdfs/forms',
  general: 'pdfs/general',
};

type UploadResult = { key: string; publicUrl: string };

async function uploadFile(file: File, folder: string): Promise<UploadResult> {
  const res = await fetch('/api/admin/upload-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type || 'application/pdf',
      folder,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Could not start the upload.');

  const put = await fetch(data.uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type || 'application/pdf' },
    body: file,
  });
  if (!put.ok) throw new Error('Upload to storage failed.');

  await fetch('/api/admin/media', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      key: data.key,
      fileName: file.name,
      contentType: file.type || 'application/pdf',
      sizeBytes: file.size,
      folder,
    }),
  });

  return { key: data.key, publicUrl: data.publicUrl };
}

export default function ClerkDashboard() {
  const [pendingDocs, setPendingDocs] = useState<DocumentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busyId, setBusyId] = useState<string | 'new' | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  // New-entry form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('merit-list');
  const [groupLabel, setGroupLabel] = useState('');
  const [newFile, setNewFile] = useState<File | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error: err } = await supabase
      .from('documents')
      .select('*')
      .is('file_key', null)
      .order('category', { ascending: true })
      .order('sort_order', { ascending: true });
    if (err) setError(err.message);
    setPendingDocs((data as DocumentRow[] | null) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function attach(doc: DocumentRow, file: File) {
    setBusyId(doc.id);
    setError('');
    setNotice('');
    try {
      const folder = CATEGORY_FOLDER[doc.category] ?? 'pdfs/general';
      const up = await uploadFile(file, folder);
      const supabase = createClient();
      const { error: err } = await supabase
        .from('documents')
        .update({
          file_key: up.key,
          file_name: file.name,
          file_type: 'pdf',
          file_size: file.size,
        })
        .eq('id', doc.id);
      if (err) throw new Error(err.message);
      setNotice(`Attached "${file.name}" to "${doc.title}". The download button on the website now points to this file.`);
      setPendingDocs((prev) => prev.filter((d) => d.id !== doc.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Attach failed.');
    }
    setBusyId(null);
  }

  async function createEntry(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setBusyId('new');
    setError('');
    setNotice('');
    try {
      let fileFields: Partial<DocumentRow> = {};
      if (newFile) {
        const folder = CATEGORY_FOLDER[category] ?? 'pdfs/general';
        const up = await uploadFile(newFile, folder);
        fileFields = {
          file_key: up.key,
          file_name: newFile.name,
          file_type: 'pdf',
          file_size: newFile.size,
        };
      }
      const supabase = createClient();
      const { error: err } = await supabase.from('documents').insert({
        title: title.trim(),
        category,
        group_label: groupLabel.trim() || null,
        ...fileFields,
      });
      if (err) throw new Error(err.message);
      setNotice(`Document "${title.trim()}" added${newFile ? ' with its file' : ''}. It is live on the website now.`);
      setTitle('');
      setGroupLabel('');
      setNewFile(null);
      if (!newFile) load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not add the document.');
    }
    setBusyId(null);
  }

  return (
    <div className="space-y-8">
      {error && (
        <p className="text-sm text-[#C62828] bg-[#C62828]/5 border border-[#C62828]/15 rounded-xl px-4 py-3">
          {error}
        </p>
      )}
      {notice && (
        <p className="inline-flex items-start gap-2 w-full text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <CheckCircle2 size={16} className="shrink-0 mt-0.5" /> {notice}
        </p>
      )}

      {/* Attach files to entries that still have none */}
      <section className="bg-white rounded-2xl border border-black/5 shadow-sm p-6">
        <h2 className="inline-flex items-center gap-2 text-lg font-bold text-[#0D2B5A] mb-1">
          <Paperclip size={18} /> Documents waiting for a file
        </h2>
        <p className="text-sm text-[#64748B] mb-4">
          These entries are already on the website but their download buttons
          have no file yet. Attach the real PDF and the button starts working.
        </p>
        {loading ? (
          <p className="inline-flex items-center gap-2 text-sm text-[#64748B] py-4">
            <Loader2 size={16} className="animate-spin" /> Loading...
          </p>
        ) : pendingDocs.length === 0 ? (
          <p className="text-sm text-[#64748B] py-4">
            Every document entry has a file attached. 🎉
          </p>
        ) : (
          <ul className="divide-y divide-black/5">
            {pendingDocs.map((doc) => (
              <li
                key={doc.id}
                className="py-3 flex flex-wrap items-center gap-3"
              >
                <FileText size={16} className="text-[#0D2B5A] shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#0D2B5A] truncate">
                    {doc.title}
                  </p>
                  <p className="text-xs text-[#64748B]">
                    {doc.category}
                    {doc.group_label ? ` · ${doc.group_label}` : ''}
                  </p>
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  ref={(el) => {
                    fileInputs.current[doc.id] = el;
                  }}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) attach(doc, f);
                    e.target.value = '';
                  }}
                />
                <button
                  disabled={busyId === doc.id}
                  onClick={() => fileInputs.current[doc.id]?.click()}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#0D2B5A] text-white rounded-lg px-3 py-2 hover:bg-[#1A3F7A] disabled:opacity-60"
                >
                  {busyId === doc.id ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Paperclip size={13} />
                  )}
                  Attach PDF
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Add a new document entry */}
      <section className="bg-white rounded-2xl border border-black/5 shadow-sm p-6">
        <h2 className="inline-flex items-center gap-2 text-lg font-bold text-[#0D2B5A] mb-4">
          <Plus size={18} /> Add a new document
        </h2>
        <form onSubmit={createEntry} className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#0D2B5A] mb-1.5">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20"
              placeholder="e.g. Merit List — BS Electrical (1st)"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0D2B5A] mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 border border-black/10 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C62828]/20"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0D2B5A] mb-1.5">
              Group label (optional)
            </label>
            <input
              value={groupLabel}
              onChange={(e) => setGroupLabel(e.target.value)}
              className="w-full px-4 py-2.5 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20"
              placeholder="e.g. Fall 2026"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#0D2B5A] mb-1.5">
              PDF file (optional — can be attached later)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setNewFile(e.target.files?.[0] ?? null)}
              className="block text-sm text-[#475569]"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={busyId === 'new'}
              className="inline-flex items-center gap-2 bg-[#0D2B5A] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#1A3F7A] disabled:opacity-60"
            >
              {busyId === 'new' ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Plus size={15} />
              )}
              Add document
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
