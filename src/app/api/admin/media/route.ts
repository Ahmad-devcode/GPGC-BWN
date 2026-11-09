// src/app/api/admin/media/route.ts
// POST — register a file that was just uploaded to R2 into `media_assets`.
// GET  — list the most recent media assets (any staff role).
// The caller is verified by session + role; the insert itself runs through
// the service-role client (server-side only) so clerk/teacher uploads can
// register their files without broad table permissions.
import { NextRequest, NextResponse } from 'next/server';
import { createClient, createAdminClient } from '../../../../lib/supabase/server';
import { getPublicUrl } from '../../../../lib/r2';

export const dynamic = 'force-dynamic';

const READ_ROLES = ['admin', 'editor', 'principal', 'clerk', 'teacher'];
const WRITE_ROLES = ['admin', 'editor', 'clerk', 'teacher'];

type StaffAuth =
  | {
      ok: true;
      supabase: ReturnType<typeof createClient>;
      user: { id: string };
      role: string;
    }
  | { ok: false; error: string; status: number };

async function requireStaff(roles: string[]): Promise<StaffAuth> {
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

  if (!profile || !roles.includes(profile.role)) {
    return { ok: false, error: 'A staff role is required', status: 403 };
  }
  return { ok: true, supabase, user, role: profile.role };
}

export async function GET() {
  const auth = await requireStaff(READ_ROLES);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const { data, error } = await auth.supabase
    .from('media_assets')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ assets: data ?? [] });
}

export async function POST(request: NextRequest) {
  const auth = await requireStaff(WRITE_ROLES);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  let body: {
    key?: string;
    fileName?: string;
    contentType?: string;
    sizeBytes?: number;
    folder?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.key) {
    return NextResponse.json({ error: 'key is required' }, { status: 400 });
  }

  const { data, error } = await createAdminClient()
    .from('media_assets')
    .insert({
      key: body.key,
      public_url: getPublicUrl(body.key),
      file_name: body.fileName ?? null,
      content_type: body.contentType ?? null,
      size_bytes: typeof body.sizeBytes === 'number' ? body.sizeBytes : null,
      folder: body.folder ?? null,
      uploaded_by: auth.user.id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ asset: data }, { status: 201 });
}
