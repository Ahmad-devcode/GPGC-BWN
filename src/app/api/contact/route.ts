// src/app/api/contact/route.ts
// POST — public contact form endpoint. Inserts into `contact_messages`
// using the service-role client (RLS also allows anon inserts as a backup).
// Includes a honeypot field ("website") that real visitors never fill in.
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '../../../lib/supabase/server';
import { isSupabaseConfigured } from '../../../lib/media';

export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return bad('The contact form is not configured yet. Please email us directly.', 503);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return bad('Invalid request body.');
  }

  // Honeypot: bots fill every field; humans never see this one.
  // Pretend success so the bot doesn't learn anything.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (name.length < 2 || name.length > 200) return bad('Please enter your name.');
  if (!EMAIL_RE.test(email) || email.length > 320) return bad('Please enter a valid email address.');
  if (phone.length > 50) return bad('Phone number is too long.');
  if (subject.length > 300) return bad('Subject is too long.');
  if (message.length < 5) return bad('Please write a message.');
  if (message.length > 5000) return bad('Message is too long (max 5000 characters).');

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from('contact_messages').insert({
      name,
      email,
      phone: phone || null,
      subject: subject || null,
      message,
    });
    if (error) {
      console.error('contact insert failed:', error.message);
      return bad('Could not send your message right now. Please try again later.', 500);
    }
  } catch (err) {
    console.error('contact route error:', err);
    return bad('Could not send your message right now. Please try again later.', 500);
  }

  return NextResponse.json({ ok: true });
}
