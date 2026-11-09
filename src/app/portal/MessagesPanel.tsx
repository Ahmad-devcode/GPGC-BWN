'use client';
// src/app/portal/MessagesPanel.tsx
// Contact-form inbox. Reads run under RLS (principal/clerk/admin only).
// With `editable`, status can be changed (new → read → replied → archived).
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '../../lib/supabase/client';
import { Inbox, Loader2, RefreshCw } from 'lucide-react';

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
};

const STATUSES: ContactMessage['status'][] = [
  'new',
  'read',
  'replied',
  'archived',
];

const STATUS_STYLES: Record<ContactMessage['status'], string> = {
  new: 'bg-[#C62828]/10 text-[#C62828]',
  read: 'bg-sky-100 text-sky-800',
  replied: 'bg-emerald-100 text-emerald-800',
  archived: 'bg-black/[0.06] text-[#64748B]',
};

export default function MessagesPanel({
  editable = false,
  limit = 30,
}: {
  editable?: boolean;
  limit?: number;
}) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { data, error: err } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (err) setError(err.message);
    setMessages((data as ContactMessage[] | null) ?? []);
    setLoading(false);
  }, [limit]);

  useEffect(() => {
    load();
  }, [load]);

  async function setStatus(id: string, status: ContactMessage['status']) {
    setSavingId(id);
    const supabase = createClient();
    const { error: err } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id);
    if (err) {
      setError(err.message);
    } else {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m)),
      );
    }
    setSavingId(null);
  }

  const newCount = messages.filter((m) => m.status === 'new').length;

  return (
    <section className="bg-white rounded-2xl border border-black/5 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="inline-flex items-center gap-2 text-lg font-bold text-[#0D2B5A]">
          <Inbox size={19} /> Contact Messages
          {newCount > 0 && (
            <span className="text-xs font-bold bg-[#C62828] text-white rounded-full px-2 py-0.5">
              {newCount} new
            </span>
          )}
        </h2>
        <button
          onClick={load}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D2B5A] border border-black/10 rounded-lg px-3 py-1.5 hover:bg-black/[0.03]"
        >
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {error && (
        <p className="text-sm text-[#C62828] bg-[#C62828]/5 border border-[#C62828]/15 rounded-xl px-4 py-3 mb-4">
          {error}
        </p>
      )}

      {loading ? (
        <p className="inline-flex items-center gap-2 text-sm text-[#64748B] py-6">
          <Loader2 size={16} className="animate-spin" /> Loading messages...
        </p>
      ) : messages.length === 0 ? (
        <p className="text-sm text-[#64748B] py-6">
          No messages yet. Messages sent from the website contact form will
          appear here.
        </p>
      ) : (
        <ul className="divide-y divide-black/5">
          {messages.map((m) => (
            <li key={m.id} className="py-4">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-semibold text-sm text-[#0D2B5A]">
                  {m.name}
                </span>
                <span className="text-xs text-[#64748B]">{m.email}</span>
                {m.phone && (
                  <span className="text-xs text-[#64748B]">{m.phone}</span>
                )}
                <span
                  className={`text-[11px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5 ${STATUS_STYLES[m.status]}`}
                >
                  {m.status}
                </span>
                <span className="text-[11px] text-[#94A3B8] ml-auto">
                  {new Date(m.created_at).toLocaleString()}
                </span>
              </div>
              {m.subject && (
                <p className="text-sm font-medium text-[#334155]">{m.subject}</p>
              )}
              <p className="text-sm text-[#475569] whitespace-pre-wrap mt-0.5">
                {m.message}
              </p>
              {editable && (
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {STATUSES.filter((s) => s !== m.status).map((s) => (
                    <button
                      key={s}
                      disabled={savingId === m.id}
                      onClick={() => setStatus(m.id, s)}
                      className="text-[11px] font-semibold border border-black/10 rounded-full px-2.5 py-1 hover:bg-black/[0.04] disabled:opacity-50"
                    >
                      Mark {s}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
