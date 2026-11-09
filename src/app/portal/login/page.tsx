'use client';
// src/app/portal/login/page.tsx
// One login for every staff portal (Principal / Clerk / Teacher). After
// sign-in the user is sent to the dashboard matching their role.
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase/client';
import { portalHome } from '../../../lib/roles';
import { Lock, Loader2, AlertCircle } from 'lucide-react';

export default function PortalLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError || !data.user) {
        setError(signInError?.message ?? 'Could not sign in.');
        setLoading(false);
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      const next = new URLSearchParams(window.location.search).get('next');
      router.push(next || portalHome(profile?.role));
      router.refresh();
    } catch {
      setError('Could not sign in. Check that Supabase is configured correctly.');
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8">
        <div className="inline-flex p-3 rounded-full bg-[#C62828]/10 text-[#C62828] mb-4">
          <Lock size={24} />
        </div>
        <h1 className="text-2xl font-bold text-[#0D2B5A] mb-1">Staff Portal Sign In</h1>
        <p className="text-sm text-[#64748B] mb-7">
          Principal, Clerk and Teacher accounts sign in here. You will be taken
          to the portal for your role.
        </p>

        {!configured && (
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6">
            <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              Supabase is not configured yet. Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
              <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> first — see BACKEND-SETUP.md.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#0D2B5A] mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828]/40"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-[#0D2B5A] mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828]/40"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="flex items-start gap-3 p-4 bg-[#C62828]/5 border border-[#C62828]/15 rounded-xl">
              <AlertCircle size={18} className="text-[#C62828] shrink-0 mt-0.5" />
              <p className="text-sm text-[#C62828] font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !configured}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#0D2B5A] text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#1A3F7A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-xs text-[#64748B] mt-6">
          Accounts are created by the admin — there is no public sign-up.
          Admins use the <a href="/admin/login" className="underline font-medium">admin sign in</a>.
        </p>
      </div>
    </div>
  );
}
