import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { programs } from '../../../data/programs';
import { getProgramBySlug, getFacultyMembers } from '../../../lib/data';
import ProgramHero from '../../components/program/ProgramHero';
import ProgramMission from '../../components/program/ProgramMission';
import ProgramOutcomes from '../../components/program/ProgramOutcomes';
import ProgramCurriculum from '../../components/program/ProgramCurriculum';
import ProgramLabs from '../../components/program/ProgramLabs';
import ProgramEligibility from '../../components/program/ProgramEligibility';
import ProgramFaculty from '../../components/program/ProgramFaculty';
import ProgramDownloads from '../../components/program/ProgramDownloads';

export const revalidate = 300;

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const program = await getProgramBySlug(params.slug);
  if (!program) return { title: 'Program — PTUT' };
  return {
    title: `${program.title} — PTUT`,
    description: program.mission,
  };
}

export default async function ProgramPage({ params }: Props) {
  const program = await getProgramBySlug(params.slug);
  if (!program) notFound();

  const allFaculty = await getFacultyMembers();
  const faculty = allFaculty.filter((s) => program.facultySlugs.includes(s.slug));

  return (
    <main className="pt-28 pb-24 bg-gradient-to-b from-white to-[#fafbfc] min-h-screen">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 space-y-24">
        <ProgramHero program={program} />
        <ProgramMission mission={program.mission} />
        <ProgramOutcomes peos={program.peos} plos={program.plos} matrix={program.peoPloMatrix} />
        <ProgramCurriculum curriculum={program.curriculum} creditHours={program.creditHours} duration={program.duration} />
        <ProgramLabs labs={program.labs} />
        <ProgramEligibility eligibility={program.eligibility} />
        <ProgramFaculty faculty={faculty} department={program.title} />
        <ProgramDownloads downloads={program.downloads} />
      </div>
    </main>
  );
}
