// src/app/portal/clerk/page.tsx
// Clerk portal — documents office: attach/add PDFs and work the
// contact-message inbox.
import { redirect } from 'next/navigation';
import { getSessionProfile } from '../../../lib/auth';
import { portalHome } from '../../../lib/roles';
import PortalHeader from '../PortalHeader';
import MessagesPanel from '../MessagesPanel';
import ClerkDashboard from './ClerkDashboard';

export const dynamic = 'force-dynamic';

export default async function ClerkPortalPage() {
  const session = await getSessionProfile();
  if (!session) redirect('/portal/login');
  if (session.role !== 'clerk' && session.role !== 'admin') {
    redirect(portalHome(session.role));
  }

  return (
    <div>
      <PortalHeader
        email={session.email}
        role="clerk"
        title="Clerk Desk"
        subtitle="Merit lists, challans and forms — plus the website's message inbox."
      />
      <div className="space-y-8">
        <ClerkDashboard />
        <MessagesPanel editable limit={30} />
      </div>
    </div>
  );
}
