// src/app/api/admin/users/route.ts
// Admin-only portal account management.
//   GET   — list all accounts with their roles (from public.profiles).
//   POST  — create an account { email, password, role } (Supabase Auth user +
//           role on the auto-created profile row).
//   PATCH — change an account's role { userId, role }.
// Uses the service-role client for the writes; the caller is verified as an
// admin through their normal session first.
import { NextRequest, NextResponse } from 'next/server';
import { createClient, createAdminClient } from '../../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

const ROLES = ['admin', 'principal', 'clerk', 'teacher', 'editor', 'viewer'];

async function requireAdmin(): Promise<
  | { ok: true }
  | { ok: false; error: string; status: number }
> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { ok: false, error: 'Supabase is not configured on the server.', status: 503 };
  }
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Not signed in', status: 401 };

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    return { ok: false, error: 'Admin role required', status: 403 };
  }
  return { ok: true };
}

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const admin = createAdminClient();
  const { data, error } = await admin
    .from('profiles')
    .select('id, email, role, created_at')
    .order('created_at', { ascending: true });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ users: data ?? [] });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  let body: { email?: string; password?: string; role?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  const password = body.password ?? '';
  const role = body.role ?? 'viewer';

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters.' },
      { status: 400 },
    );
  }
  if (!ROLES.includes(role)) {
    return NextResponse.json({ error: 'Unknown role.' }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error || !data.user) {
    return NextResponse.json(
      { error: error?.message ?? 'Could not create the account.' },
      { status: 400 },
    );
  }

  // The signup trigger already created the profile row as 'viewer' — set the
  // real role now.
  const { error: roleError } = await admin
    .from('profiles')
    .update({ role })
    .eq('id', data.user.id);
  if (roleError) {
    return NextResponse.json(
      {
        error: `Account created, but setting the role failed: ${roleError.message}. Set it in Supabase → Table Editor → profiles.`,
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { user: { id: data.user.id, email, role } },
    { status: 201 },
  );
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  let body: { userId?: string; role?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.userId || !body.role || !ROLES.includes(body.role)) {
    return NextResponse.json(
      { error: 'userId and a valid role are required.' },
      { status: 400 },
    );
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from('profiles')
    .update({ role: body.role })
    .eq('id', body.userId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
