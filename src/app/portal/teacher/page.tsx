// src/app/portal/teacher/page.tsx
// Teacher portal — edit your own faculty profile and photo.
import { redirect } from 'next/navigation';
import { getSessionProfile } from '../../../lib/auth';
import { portalHome } from '../../../lib/roles';
import PortalHeader from '../PortalHeader';
import TeacherProfile from './TeacherProfile';

export const dynamic = 'force-dynamic';

export default async function TeacherPortalPage() {
  const session = await getSessionProfile();
  if (!session) redirect('/portal/login');
  if (session.role !== 'teacher' && session.role !== 'admin') {
    redirect(portalHome(session.role));
  }

  return (
    <div>
      <PortalHeader
        email={session.email}
        role="teacher"
        title="My Faculty Profile"
        subtitle="Keep your page on the university website up to date."
      />
      <TeacherProfile email={session.email} />
    </div>
  );
}
