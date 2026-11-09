'use client';
// src/app/portal/PortalHeader.tsx
// Shared header for portal pages: who is signed in, their role, and sign out.
import { useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';
import { ROLE_LABELS, type StaffRole } from '../../lib/roles';
import { LogOut, ShieldCheck } from 'lucide-react';

type Props = {
  email: string;
  role: StaffRole;
  title: string;
  subtitle?: string;
};

export default function PortalHeader({ email, role, title, subtitle }: Props) {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/portal/login');
    router.refresh();
  }

  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
      <div>
        <div className="inline-flex items-center gap-2 text-[#C62828] mb-1">
          <ShieldCheck size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">
            {ROLE_LABELS[role]} Portal
          </span>
        </div>
        <h1 className="text-3xl font-bold text-[#0D2B5A]">{title}</h1>
        {subtitle && (
          <p className="text-sm text-[#64748B] mt-1">{subtitle}</p>
        )}
        <p className="text-sm text-[#64748B] mt-1">
          Signed in as <span className="font-semibold text-[#0D2B5A]">{email}</span>
        </p>
      </div>
      <button
        onClick={signOut}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 bg-white text-sm font-semibold text-[#0D2B5A] hover:bg-black/[0.03] transition-colors"
      >
        <LogOut size={15} /> Sign out
      </button>
    </div>
  );
}
