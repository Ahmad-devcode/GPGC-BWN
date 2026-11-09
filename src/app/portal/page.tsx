// src/app/portal/page.tsx
// Portal entry point: sends each signed-in user to the dashboard for their
// role. Accounts without a staff role see an explanatory message.
import { redirect } from 'next/navigation';
import { getSessionProfile } from '../../lib/auth';
import { portalHome, PORTAL_ROLES, type StaffRole } from '../../lib/roles';
import PortalHeader from './PortalHeader';

export const dynamic = 'force-dynamic';

export default async function PortalIndexPage() {
  const session = await getSessionProfile();
  if (!session) {
    redirect('/portal/login');
  }

  if (PORTAL_ROLES.includes(session.role as StaffRole)) {
    redirect(portalHome(session.role));
  }

  return (
    <div>
      <PortalHeader
        email={session.email}
        role="viewer"
        title="No portal assigned"
      />
      <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 max-w-xl">
        <p className="text-sm text-[#334155] leading-relaxed">
          Your account (<span className="font-semibold">{session.email}</span>)
          does not have a staff role yet, so there is no portal to show. Ask
          the website admin to assign you the Principal, Clerk or Teacher role.
        </p>
      </div>
    </div>
  );
}
