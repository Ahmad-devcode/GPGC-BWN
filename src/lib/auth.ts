// src/lib/auth.ts
// Server-side session + profile helpers shared by the portal pages.
import { createClient } from './supabase/server';
import type { UserRole } from './supabase/types';

export type SessionProfile = {
  userId: string;
  email: string;
  role: UserRole;
};

/**
 * Returns the signed-in user's profile, or null when signed out / no
 * profile row exists. Queries run under RLS as the user.
 */
export async function getSessionProfile(): Promise<SessionProfile | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile) return null;

  return {
    userId: user.id,
    email: user.email ?? '',
    role: profile.role as UserRole,
  };
}
