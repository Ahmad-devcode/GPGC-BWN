import { Mail, Phone, User, CheckCircle2 } from 'lucide-react';

const functions = [
  'Develop and implement quality assurance frameworks and procedures to ensure that academic programs meet national and international standards.',
  'Conduct systematic evaluations of academic programs and courses to assess their effectiveness in achieving desired learning outcomes.',
  'Gather and analyze feedback from students, faculty and other stakeholders to suggest program improvements.',
  'Organize and manage the visits of accreditation councils and Higher Education Commission (HEC).',
  'Organize workshops, seminars, and training sessions for faculty to enhance their teaching skills and understanding of quality standards.',
  'Promote a culture of continuous improvement by identifying areas for development and implementing action plans for enhancement.',
  'Prepare and maintain documentation required for compliance with accreditation councils and HEC standards, ensuring timely submission and accuracy.',
];

const accreditation = [
  { sr: 1, program: 'B.Sc. Electrical Engineering Technology', council: 'National Technology Council (NTC)', status: 'Accredited' },
  { sr: 2, program: 'B.Sc. Mechanical Engineering Technology', council: 'National Technology Council (NTC)', status: 'Accredited' },
  { sr: 3, program: 'B.Sc. Civil Engineering Technology', council: 'National Technology Council (NTC)', status: 'Accredited' },
  { sr: 4, program: 'B.Sc. Architectural Engineering Technology', council: 'National Technology Council (NTC)', status: 'Accredited' },
  { sr: 5, program: 'B.Sc. Automotive Engineering Technology', council: 'National Technology Council (NTC)', status: 'Accredited' },
  { sr: 6, program: 'B.Sc. Fashion Design Technology', council: 'National Technology Council (NTC)', status: 'Accredited' },
  { sr: 7, program: 'B.Sc. Software Engineering Technology', council: 'National Technology Council (NTC)', status: 'Accredited' },
  { sr: 8, program: 'B.Sc. Garments Engineering Technology', council: 'National Technology Council (NTC)', status: 'Accredited' },
];

const team = [
  {
    name: 'Dr. Zaigham Mushtaq',
    role: 'Director QEC',
    email: 'zaigham.mushtaq@ptut.edu.pk',
    phone: null,
  },
  {
    name: 'Muhammad Omer Yasin',
    role: 'Deputy Director QEC',
    email: 'omer.yasin@ptut.edu.pk',
    phone: null,
  },
];

export default function QECPage() {
  return (
    <div className="space-y-12">
      <section>
        <h3 className="text-xl font-bold text-[#0D2B5A] mb-4">Functions of QEC</h3>
        <div className="grid gap-4">
          {functions.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-[#F5F7FA] rounded-lg">
              <CheckCircle2 size={18} className="text-[#C62828] shrink-0 mt-0.5" />
              <p className="text-sm text-[#4A5568] leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0D2B5A] text-white rounded-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C62828] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <h3 className="text-lg font-bold mb-4 relative z-10">Quality Policy of PTUT</h3>
        <p className="text-white/85 leading-[1.85] text-sm relative z-10">
          Punjab Tianjin University of Technology (PTUT) is committed to achieving excellence in quality technical education, research, and innovation by continuously improving its academic programs, administrative processes, and institutional governance. Our aim is to develop a culture of quality that supports the personal and professional development of our youth and general public, faculty, and staff while meeting the evolving needs of the industry and the society. The University endeavors to attain the highest educational and research standards through national and international collaborations while conforming the requirements of relevant accreditation bodies.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#0D2B5A] mb-4">Institutional Quality Circle — Accreditation of Programs</h3>
        <div className="overflow-x-auto rounded-xl border border-black/5 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0D2B5A] text-white text-left">
                <th className="px-5 py-3.5 font-semibold">Sr. No.</th>
                <th className="px-5 py-3.5 font-semibold">Program</th>
                <th className="px-5 py-3.5 font-semibold">Accreditation Council</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {accreditation.map((row) => (
                <tr key={row.sr} className="bg-white hover:bg-[#F5F7FA] transition-colors">
                  <td className="px-5 py-3.5 text-[#4A5568]">{row.sr}</td>
                  <td className="px-5 py-3.5 font-medium text-[#121826]">{row.program}</td>
                  <td className="px-5 py-3.5 text-[#4A5568]">{row.council}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                      <CheckCircle2 size={12} /> {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#0D2B5A] mb-4">QEC Activities</h3>
        <div className="bg-white border border-black/5 rounded-xl p-6 shadow-sm space-y-3">
          <p className="text-sm font-semibold text-[#0D2B5A]">Program Self Assessment:</p>
          <ul className="list-disc list-inside text-sm text-[#4A5568] space-y-1 ml-2">
            <li>M.Sc. Electrical Engineering Technology</li>
            <li>M.Sc. Mechanical Engineering Technology</li>
          </ul>
          <p className="text-sm text-[#4A5568] pt-2 border-t border-black/5">
            <span className="font-semibold text-[#0D2B5A]">QEC Activity Calendar:</span> 2025-26
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#0D2B5A] mb-6">QEC Leadership</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {team.map((person, i) => (
            <div key={i} className="bg-white border border-black/5 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-[#0D2B5A]/5 flex items-center justify-center text-[#0D2B5A] mb-4">
                <User size={28} />
              </div>
              <h4 className="text-lg font-bold text-[#0D2B5A] mb-1">{person.name}</h4>
              <div className="text-sm font-semibold text-[#C62828] mb-4">{person.role}</div>
              <div className="space-y-2 text-sm">
                <a href={`mailto:${person.email}`} className="flex items-center gap-2.5 text-[#4A5568] hover:text-[#C62828] transition-colors">
                  <Mail size={15} className="shrink-0" />
                  <span className="break-all">{person.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}