// src/app/api/admin/upload-url/route.ts
// POST { fileName, contentType, folder }
// Verifies the caller's Supabase session + admin/editor role, then returns a
// presigned R2 PUT URL. The browser uploads the file directly to R2 with
// that URL, then registers it via POST /api/admin/media.
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase/server';
import {
  R2_FOLDERS,
  buildKey,
  getPresignedUploadUrl,
  getPublicUrl,
  isR2ServerConfigured,
} from '../../../../lib/r2';

export const dynamic = 'force-dynamic';

const ALLOWED_CONTENT_TYPES = new Set([
  // images
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
  // documents
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/msword', // .doc
]);

type StaffAuth =
  | { ok: true; userId: string; role: string }
  | { ok: false; error: string; status: number };

const UPLOAD_ROLES = ['admin', 'editor', 'clerk', 'teacher'];

async function requireStaff(): Promise<StaffAuth> {
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

  if (!profile || !UPLOAD_ROLES.includes(profile.role)) {
    return { ok: false, error: 'A staff role is required to upload files', status: 403 };
  }
  return { ok: true, userId: user.id, role: profile.role };
}

/** Which folders each role may upload to. */
function folderAllowed(role: string, folder: string): boolean {
  if (role === 'admin' || role === 'editor') return true;
  if (role === 'clerk') {
    return (
      folder.startsWith('pdfs/') ||
      folder === 'images/news' ||
      folder === 'images/campus'
    );
  }
  if (role === 'teacher') return folder === 'images/faculty';
  return false;
}

export async function POST(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json(
      { error: 'Supabase is not configured on the server.' },
      { status: 503 },
    );
  }
  if (!isR2ServerConfigured()) {
    return NextResponse.json(
      { error: 'File storage (R2) is not configured on the server.' },
      { status: 503 },
    );
  }

  const auth = await requireStaff();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  let body: { fileName?: string; contentType?: string; folder?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { fileName, contentType, folder } = body;
  if (!fileName || !contentType || !folder) {
    return NextResponse.json(
      { error: 'fileName, contentType and folder are required' },
      { status: 400 },
    );
  }
  if (!(R2_FOLDERS as readonly string[]).includes(folder)) {
    return NextResponse.json(
      { error: `folder must be one of: ${R2_FOLDERS.join(', ')}` },
      { status: 400 },
    );
  }
  if (!folderAllowed(auth.role, folder)) {
    return NextResponse.json(
      { error: `Your role (${auth.role}) cannot upload to ${folder}.` },
      { status: 403 },
    );
  }
  if (!ALLOWED_CONTENT_TYPES.has(contentType)) {
    return NextResponse.json(
      { error: 'Only images, PDF and Word documents can be uploaded.' },
      { status: 400 },
    );
  }

  const key = buildKey(folder, fileName);
  const uploadUrl = await getPresignedUploadUrl(key, contentType);

  return NextResponse.json({
    uploadUrl,
    key,
    publicUrl: getPublicUrl(key),
  });
}
