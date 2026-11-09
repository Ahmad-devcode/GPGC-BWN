// src/lib/roles.ts
// Staff roles and portal routing. Roles live in public.profiles.role
// (see supabase/migrations/0001 + 0002).

export type StaffRole =
  | 'admin'
  | 'principal'
  | 'clerk'
  | 'teacher'
  | 'editor'
  | 'viewer';

export const ROLE_LABELS: Record<StaffRole, string> = {
  admin: 'Admin',
  principal: 'Principal',
  clerk: 'Clerk',
  teacher: 'Teacher',
  editor: 'Editor',
  viewer: 'Viewer',
};

/** Where a signed-in user lands after portal login. */
export function portalHome(role: string | null | undefined): string {
  switch (role) {
    case 'admin':
    case 'editor':
      return '/admin';
    case 'principal':
      return '/portal/principal';
    case 'clerk':
      return '/portal/clerk';
    case 'teacher':
      return '/portal/teacher';
    default:
      return '/portal';
  }
}

/** Roles that may sign in to a portal at all. */
export const PORTAL_ROLES: StaffRole[] = [
  'admin',
  'principal',
  'clerk',
  'teacher',
  'editor',
];
