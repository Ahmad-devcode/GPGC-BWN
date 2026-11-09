import { getFacultyMembers, getDepartments } from '../../lib/data';
import FacultyDirectory from './FacultyDirectory';

export const revalidate = 300;

export default async function FacultyPage() {
  const [staffMembers, departments] = await Promise.all([
    getFacultyMembers(),
    getDepartments(),
  ]);

  return <FacultyDirectory staffMembers={staffMembers} departments={departments} />;
}
