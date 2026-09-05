import Link from 'next/link';
import { ArrowRight, Users, FileCheck, Landmark, ShieldCheck, GraduationCap, Building2 } from 'lucide-react';

const offices = [
  {
    href: '/administration/registrar',
    title: 'Registrar Office',
    desc: 'Student records, enrollment, and academic documentation.',
    icon: Users,
  },
  {
    href: '/administration/examinations',
    title: 'Examinations',
    desc: 'Exam scheduling, results, and controller office.',
    icon: FileCheck,
  },
  {
    href: '/administration/treasurer',
    title: 'Treasurer Office',
    desc: 'Financial operations, fee management, and budgeting.',
    icon: Landmark,
  },
  {
    href: '/administration/qec',
    title: 'Quality Enhancement Cell',
    desc: 'Accreditation, quality assurance, and continuous improvement.',
    icon: ShieldCheck,
  },
  {
    href: '/administration/directorate-of-academics',
    title: 'Directorate of Academics',
    desc: 'Curriculum development, academic policy, and faculty development.',
    icon: GraduationCap,
  },
];

export default function AdministrationPage() {
  return (
    <div>
      <div className="mb-10">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#C62828] uppercase tracking-widest mb-3">
          <span className="text-[9px]">◆</span> University Governance
        </span>
        <h2 className="text-2xl font-bold text-[#0D2B5A] mb-4">Administrative Offices</h2>
        <p className="text-[#4A5568] leading-relaxed max-w-[70ch]">
          The administration of Punjab Tianjin University of Technology is committed to providing efficient, transparent, and student-centered services across all operational domains.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {offices.map((office) => (
          <Link
            key={office.href}
            href={office.href}
            className="group flex items-start gap-5 p-6 bg-white border border-black/5 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-[#0D2B5A]/5 text-[#0D2B5A] flex items-center justify-center shrink-0 group-hover:bg-[#C62828] group-hover:text-white transition-colors">
              <office.icon size={22} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#0D2B5A] group-hover:text-[#C62828] transition-colors mb-1">
                {office.title}
              </h3>
              <p className="text-sm text-[#4A5568] leading-relaxed mb-3">{office.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#C62828]">
                View Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-[#F5F7FA] rounded-xl p-8 flex items-start gap-5">
        <Building2 className="text-[#C62828] shrink-0 mt-1" size={24} />
        <div>
          <h3 className="text-lg font-bold text-[#0D2B5A] mb-2">General Administration Block</h3>
          <p className="text-sm text-[#4A5568] leading-relaxed">
            All administrative offices are located in the Main Administration Block, First Floor, Punjab Tianjin University of Technology, Lahore. Office hours are Monday through Friday, 09:00 AM to 05:00 PM.
          </p>
        </div>
      </div>
    </div>
  );
}