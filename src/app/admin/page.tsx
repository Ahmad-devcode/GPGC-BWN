import { redirect } from 'next/navigation';
import { createClient } from '../../lib/supabase/server';
import { isSupabaseConfigured } from '../../lib/media';
import type { MediaAssetRow } from '../../lib/supabase/types';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
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

  if (!profile || !['admin', 'editor'].includes(profile.role)) {
    redirect('/admin/login');
  }

  const { data: assets } = await supabase
    .from('media_assets')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(30);

  return (
    <AdminDashboard
      userEmail={user.email ?? ''}
      role={profile.role}
      initialAssets={(assets as MediaAssetRow[] | null) ?? []}
    />
  );
}
