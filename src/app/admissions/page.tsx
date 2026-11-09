import { getFeeDocuments } from '../../lib/data';
import AdmissionsClient from './AdmissionsClient';

export const revalidate = 300;

export default async function AdmissionsPage() {
  const feeDocuments = await getFeeDocuments();
  return <AdmissionsClient feeDocuments={feeDocuments} />;
}
