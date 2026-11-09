'use client';
// src/app/admin/users/UsersManager.tsx
// Create portal accounts and change roles, via /api/admin/users.
import { useCallback, useEffect, useState } from 'react';
import { Loader2, UserPlus, RefreshCw, CheckCircle2 } from 'lucide-react';

type PortalUser = {
  id: string;
  email: string | null;
  role: string;
  created_at: string;
};

const ROLES = ['principal', 'clerk', 'teacher', 'admin', 'editor', 'viewer'];

const ROLE_HINTS: Record<string, string> = {
  principal: 'Read-only overview: stats, messages, documents.',
  clerk: 'Documents desk + message inbox.',
  teacher: 'Can edit only their own faculty profile + photo. Email must match their faculty record.',
  admin: 'Full control, including this page.',
  editor: 'Admin dashboard without user management.',
  viewer: 'No portal access.',
};

export default function UsersManager({ currentUserId }: { currentUserId: string }) {
  const [users, setUsers] = useState<PortalUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('teacher');
  const [creating, setCreating] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    if (!res.ok) setError(data.error || 'Could not load users.');
    else setUsers(data.users ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError('');
    setNotice('');
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Could not create the account.');
    } else {
      setNotice(
        `Account created for ${email} with role "${role}". Share the password with them privately — they sign in at /portal/login.`,
      );
      setEmail('');
      setPassword('');
      load();
    }
    setCreating(false);
  }

  async function changeRole(userId: string, newRole: string) {
    setSavingId(userId);
    setError('');
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role: newRole }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Could not change the role.');
    } else {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)),
      );
    }
    setSavingId(null);
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

      <section className="bg-white rounded-2xl border border-black/5 shadow-sm p-6">
        <h2 className="inline-flex items-center gap-2 text-lg font-bold text-[#0D2B5A] mb-4">
          <UserPlus size={18} /> Create an account
        </h2>
        <form onSubmit={create} className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#0D2B5A] mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20"
              placeholder="teacher@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0D2B5A] mb-1.5">
              Password (min 8 characters)
            </label>
            <input
              type="text"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20"
              placeholder="Temporary password"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0D2B5A] mb-1.5">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2.5 border border-black/10 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C62828]/20"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <p className="md:col-span-3 text-xs text-[#64748B]">
            {ROLE_HINTS[role]}
          </p>
          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={creating}
              className="inline-flex items-center gap-2 bg-[#0D2B5A] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#1A3F7A] disabled:opacity-60"
            >
              {creating ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <UserPlus size={15} />
              )}
              Create account
            </button>
          </div>
        </form>
      </section>

      <section className="bg-white rounded-2xl border border-black/5 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#0D2B5A]">All accounts</h2>
          <button
            onClick={load}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D2B5A] border border-black/10 rounded-lg px-3 py-1.5 hover:bg-black/[0.03]"
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
        {loading ? (
          <p className="inline-flex items-center gap-2 text-sm text-[#64748B] py-4">
            <Loader2 size={16} className="animate-spin" /> Loading...
          </p>
        ) : users.length === 0 ? (
          <p className="text-sm text-[#64748B] py-4">No accounts found.</p>
        ) : (
          <ul className="divide-y divide-black/5">
            {users.map((u) => (
              <li key={u.id} className="py-3 flex flex-wrap items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#0D2B5A] truncate">
                    {u.email ?? '(no email)'}
                    {u.id === currentUserId && (
                      <span className="ml-2 text-[11px] font-bold uppercase tracking-wide bg-[#0D2B5A]/[0.07] text-[#0D2B5A] rounded-full px-2 py-0.5">
                        you
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-[#64748B]">
                    Since {new Date(u.created_at).toLocaleDateString()}
                  </p>
                </div>
                <select
                  value={u.role}
                  disabled={savingId === u.id || u.id === currentUserId}
                  onChange={(e) => changeRole(u.id, e.target.value)}
                  className="px-3 py-2 border border-black/10 rounded-lg text-sm bg-white disabled:opacity-50"
                  title={
                    u.id === currentUserId
                      ? 'You cannot change your own role'
                      : 'Change role'
                  }
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                  {!ROLES.includes(u.role) && (
                    <option value={u.role}>{u.role}</option>
                  )}
                </select>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
