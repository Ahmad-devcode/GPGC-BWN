'use client';
// src/app/portal/teacher/TeacherProfile.tsx
// A teacher edits ONLY their own faculty record (matched by account email —
// enforced again by RLS): designation, bio and profile photo. The photo goes
// to R2 under images/faculty/<slug>.<ext>.
import { useEffect, useState } from 'react';
import { createClient } from '../../../lib/supabase/client';
import { resolveMediaUrl } from '../../../lib/media';
import type { FacultyMemberRow } from '../../../lib/supabase/types';
import { Loader2, Save, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

export default function TeacherProfile({ email }: { email: string }) {
  const [row, setRow] = useState<FacultyMemberRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [designation, setDesignation] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data, error: err } = await supabase
        .from('faculty_members')
        .select('*')
        .ilike('email', email)
        .limit(1);
      if (err) setError(err.message);
      const found = (data as FacultyMemberRow[] | null)?.[0] ?? null;
      setRow(found);
      if (found) {
        setDesignation(found.designation ?? '');
        setBio(found.bio ?? '');
        setImage(found.image ?? null);
      }
      setLoading(false);
    })();
  }, [email]);

  async function uploadPhoto(file: File) {
    if (!row) return;
    setUploading(true);
    setError('');
    setNotice('');
    try {
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
      const fileName = `${row.slug}.${ext}`;
      const res = await fetch('/api/admin/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName,
          contentType: file.type || 'image/jpeg',
          folder: 'images/faculty',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not start the upload.');

      const put = await fetch(data.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type || 'image/jpeg' },
        body: file,
      });
      if (!put.ok) throw new Error('Upload to storage failed.');

      await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: data.key,
          fileName,
          contentType: file.type || 'image/jpeg',
          sizeBytes: file.size,
          folder: 'images/faculty',
        }),
      });

      setImage(data.publicUrl);
      setNotice('Photo uploaded. Press "Save changes" to put it on the website.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Photo upload failed.');
    }
    setUploading(false);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!row) return;
    setSaving(true);
    setError('');
    setNotice('');
    const supabase = createClient();
    const { error: err } = await supabase
      .from('faculty_members')
      .update({
        designation: designation.trim() || null,
        bio: bio.trim() || null,
        image,
      })
      .eq('id', row.id);
    if (err) {
      setError(err.message);
    } else {
      setNotice('Saved — your faculty page on the website is updated.');
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <p className="inline-flex items-center gap-2 text-sm text-[#64748B]">
        <Loader2 size={16} className="animate-spin" /> Loading your profile...
      </p>
    );
  }

  if (!row) {
    return (
      <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 max-w-xl">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h2 className="font-bold text-[#0D2B5A] mb-1">
              No faculty record matches this account
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed">
              Your login email is <span className="font-semibold">{email}</span>,
              but no faculty member on the website has this email address.
              Ask the admin to put this exact email on your faculty record —
              after that, your profile will appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={save}
      className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 max-w-2xl"
    >
      <div className="flex items-start gap-5 mb-6">
        <div className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveMediaUrl(image)}
            alt={row.name}
            className="w-24 h-24 rounded-2xl object-cover bg-black/[0.04] border border-black/5"
          />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-[#0D2B5A]">{row.name}</h2>
          <p className="text-sm text-[#64748B]">
            {row.department ?? ''}
            {row.email ? ` · ${row.email}` : ''}
          </p>
          <label className="inline-flex items-center gap-2 mt-3 text-xs font-semibold bg-[#0D2B5A] text-white rounded-lg px-3 py-2 hover:bg-[#1A3F7A] cursor-pointer">
            {uploading ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Upload size={13} />
            )}
            {uploading ? 'Uploading...' : 'Upload new photo'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) uploadPhoto(f);
                e.target.value = '';
              }}
            />
          </label>
        </div>
      </div>

      {error && (
        <p className="text-sm text-[#C62828] bg-[#C62828]/5 border border-[#C62828]/15 rounded-xl px-4 py-3 mb-4">
          {error}
        </p>
      )}
      {notice && (
        <p className="inline-flex items-start gap-2 w-full text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-4">
          <CheckCircle2 size={16} className="shrink-0 mt-0.5" /> {notice}
        </p>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[#0D2B5A] mb-1.5">
            Designation
          </label>
          <input
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full px-4 py-2.5 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20"
            placeholder="e.g. Assistant Professor"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0D2B5A] mb-1.5">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={5}
            className="w-full px-4 py-2.5 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20"
            placeholder="A short introduction shown on your faculty page..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 mt-6 bg-[#0D2B5A] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#1A3F7A] disabled:opacity-60"
      >
        {saving ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <Save size={15} />
        )}
        Save changes
      </button>
      <p className="text-xs text-[#94A3B8] mt-3">
        You can only edit your own record — name and department are changed by
        the admin.
      </p>
    </form>
  );
}
