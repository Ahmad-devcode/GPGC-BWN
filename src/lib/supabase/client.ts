// src/lib/supabase/client.ts
// Browser-side Supabase client (used by the admin login + admin dashboard).
// Uses the public anon key — all access is governed by Row Level Security.
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
