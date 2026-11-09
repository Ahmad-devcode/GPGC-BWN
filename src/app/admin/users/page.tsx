// src/app/admin/users/page.tsx
// Admin-only: manage portal accounts (Principal / Clerk / Teacher / ...).
import { redirect } from 'next/navigation';
import { createClient } from '../../../lib/supabase/server';
import { isSupabaseConfigured } from '../../../lib/media';
import UsersManager from './UsersManager';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  if (!isSupabaseConfigured()) {
    redirect('/admin/login');
  }
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/admin/login');
  }
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (!profile || profile.role !== 'admin') {
    redirect('/admin');
  }

  return (
    <div>
      <div className="mb-8">
        <a
          href="/admin"
          className="text-xs font-semibold text-[#64748B] hover:text-[#0D2B5A]"
        >
          ← Back to dashboard
        </a>
        <h1 className="text-3xl font-bold text-[#0D2B5A] tracking-tight mt-2">
          Portal Users
        </h1>
        <p className="text-sm text-[#64748B] mt-1">
          Create accounts for the Principal, Clerk and Teachers, and control
          who has which role. Teachers sign in with the same email that is on
          their faculty record — that is how the portal finds their profile.
        </p>
      </div>
      <UsersManager currentUserId={user.id} />
    </div>
  );
}
