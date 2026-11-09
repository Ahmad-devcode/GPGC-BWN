// src/app/portal/principal/page.tsx
// Principal portal — read-only oversight: headline counts, the contact
// inbox, and the latest documents/media. No editing controls here.
import { redirect } from 'next/navigation';
import { getSessionProfile } from '../../../lib/auth';
import { createClient } from '../../../lib/supabase/server';
import { portalHome } from '../../../lib/roles';
import PortalHeader from '../PortalHeader';
import MessagesPanel from '../MessagesPanel';
import {
  BookOpen,
  Users,
  Newspaper,
  FileText,
  Image as ImageIcon,
  Inbox,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

async function count(
  supabase: ReturnType<typeof createClient>,
  table: string,
  filter?: (q: any) => any,
) {
  let q = supabase.from(table).select('id', { count: 'exact', head: true });
  if (filter) q = filter(q);
  const { count } = await q;
  return count ?? 0;
}

export default async function PrincipalPortalPage() {
  const session = await getSessionProfile();
  if (!session) redirect('/portal/login');
  if (session.role !== 'principal' && session.role !== 'admin') {
    redirect(portalHome(session.role));
  }

  const supabase = createClient();
  const [programs, faculty, news, documents, media, newMessages] =
    await Promise.all([
      count(supabase, 'programs'),
      count(supabase, 'faculty_members'),
      count(supabase, 'news_articles'),
      count(supabase, 'documents'),
      count(supabase, 'media_assets'),
      count(supabase, 'contact_messages', (q) => q.eq('status', 'new')),
    ]);

  const stats = [
    { label: 'Programs', value: programs, icon: BookOpen },
    { label: 'Faculty members', value: faculty, icon: Users },
    { label: 'News articles', value: news, icon: Newspaper },
    { label: 'Documents', value: documents, icon: FileText },
    { label: 'Media files', value: media, icon: ImageIcon },
    { label: 'New messages', value: newMessages, icon: Inbox },
  ];

  return (
    <div>
      <PortalHeader
        email={session.email}
        role="principal"
        title="Principal Overview"
        subtitle="Read-only view of the whole website — content, files and enquiries."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-black/5 shadow-sm p-5"
          >
            <div className="inline-flex p-2 rounded-lg bg-[#0D2B5A]/[0.06] text-[#0D2B5A] mb-2">
              <s.icon size={17} />
            </div>
            <div className="text-3xl font-bold text-[#0D2B5A]">{s.value}</div>
            <div className="text-xs font-medium text-[#64748B] mt-0.5">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <MessagesPanel editable={false} limit={15} />

      <p className="text-xs text-[#94A3B8] mt-6">
        This portal is read-only. To change content, ask the admin or use the
        Clerk portal for documents and messages.
      </p>
    </div>
  );
}
