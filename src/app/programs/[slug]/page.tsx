import { notFound } from 'next/navigation';
import { programs } from 'src/data/programs';
import { staffMembers } from 'src/data/faculty';
import ProgramHero from 'src/app/components/program/ProgramHero';
import ProgramMission from 'src/app/components/program/ProgramMission';
import ProgramOutcomes from 'src/app/components/program/ProgramOutcomes';
import ProgramCurriculum from 'src/app/components/program/ProgramCurriculum';
import ProgramLabs from 'src/app/components/program/ProgramLabs';
import ProgramEligibility from 'src/app/components/program/ProgramEligibility';
import ProgramFaculty from 'src/app/components/program/ProgramFaculty';
import ProgramDownloads from 'src/app/components/program/ProgramDownloads';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const program = programs.find((p) => p.slug === params.slug);
  if (!program) return { title: 'Program — PTUT' };
  return {
    title: `${program.title} — PTUT`,
    description: program.mission,
  };
}

export default function ProgramPage({ params }: Props) {
  const program = programs.find((p) => p.slug === params.slug);
  if (!program) notFound();

  const faculty = staffMembers.filter((s) => program.facultySlugs.includes(s.slug));

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