import { Mail, Phone, MapPin, User, Download, FileText, Bell, ClipboardList, FormInput } from 'lucide-react';

const functions = [
  'Publish the Academic Calendar for Undergraduate and Graduate programs, including complete schedule of the academic year (Fall, Spring, Summer semesters), admission requirements, enrollment schedule for students, and academic programs offered.',
  'Coordinate with departments for regular revision and update of academic curricula.',
  'Arrange faculty training sessions as part of the Faculty Development Program using internal and external resource persons.',
  'Recommend measures for improving students\' learning and ensuring a conducive environment in classrooms, laboratories, and on campus.',
  'Coordinate with relevant faculties and regulatory bodies for the development of new academic programs and initiatives.',
  'Ensure the implementation of academic activities as per the approved academic calendar.',
  'Ensure the implementation of Outcome-Based Education (OBE) and Outcome-Based Assessment (OBA) activities.',
  'Coordinate with stakeholders for successful organization of accreditation visits for programs.',
];

const team = [
  {
    name: 'Prof. Dr. Muhammad Usman Rashid',
    role: 'Director Academics',
    email: 'director.academics@ptut.edu.pk',
    phone: '+92 42 9933 2438 Ext. 210',
  },
  {
    name: 'Hafiz Muhammad Ateeq Ur Rehman',
    role: 'Deputy Director Academics',
    email: 'ateeq.rehman@ptut.edu.pk',
    phone: '+92 42 9933 2438 Ext. 304',
  },
];

const downloads = [
  { label: 'Approved Academic Regulations', icon: FileText },
  { label: 'Announcements / Circulars for Students', icon: Bell },
  { label: 'Announcements / Circulars for Faculty', icon: Bell },
  { label: 'Notifications', icon: ClipboardList },
  { label: 'PTUT Scholarship form for Orphan Students', icon: FormInput },
];

export default function DirectoratePage() {
  return (
    <div className="space-y-12">
      <section>
        <h3 className="text-xl font-bold text-[#0D2B5A] mb-4">Introduction</h3>
        <div className="space-y-4 text-[#4A5568] leading-relaxed">
          <p>
            The Directorate of Academics develops, reviews, and monitors academic curricula and policies in line with international best practices, market needs, and accreditation requirements. It ensures the effective implementation of these policies across the University.
          </p>
          <p>
            As one of the leading offices of Punjab Tianjin University of Technology (PTUT), the Directorate plans and implements academic projects and programs as envisioned and approved by the Academic Council and Syndicate. It monitors academic activities to ensure compliance with regulations and the enforcement of the highest academic standards for excellence in teaching and learning.
          </p>
          <p>
            The Directorate regularly reviews and updates academic programs to maintain the quality of curricula, courses of study, and allied infrastructure, including laboratories and classrooms. It also anticipates emerging academic needs and prepares forecasts to ensure the University&apos;s readiness for future challenges.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#0D2B5A] mb-6">Functions</h3>
        <div className="grid gap-4">
          {functions.map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-5 bg-white border border-black/5 rounded-xl shadow-sm">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#C62828] text-white text-xs font-bold shrink-0">
                {i + 1}
              </span>
              <p className="text-sm text-[#4A5568] leading-relaxed pt-1">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#0D2B5A] mb-6">Our Team</h3>
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
                <div className="flex items-center gap-2.5 text-[#4A5568]">
                  <Phone size={15} className="shrink-0" />
                  <span>{person.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F5F7FA] rounded-xl p-8">
        <h3 className="text-lg font-bold text-[#0D2B5A] mb-4 flex items-center gap-2">
          <MapPin size={20} className="text-[#C62828]" /> Contact
        </h3>
        <div className="space-y-1 text-sm text-[#4A5568]">
          <p className="font-medium text-[#121826]">Directorate of Academics</p>
          <p>Room #108, First Floor, Academic Block</p>
          <p>Punjab Tianjin University of Technology, Lahore</p>
          <a href="mailto:academics@ptut.edu.pk" className="inline-flex items-center gap-2 text-[#C62828] font-medium mt-2 hover:underline">
            <Mail size={14} /> academics@ptut.edu.pk
          </a>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#0D2B5A] mb-6">Downloads</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {downloads.map((item, i) => (
            <a
              key={i}
              href="#"
              className="flex items-center gap-4 p-5 bg-white border border-black/5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0D2B5A]/5 text-[#0D2B5A] flex items-center justify-center group-hover:bg-[#C62828] group-hover:text-white transition-colors">
                <item.icon size={18} />
              </div>
              <span className="text-sm font-semibold text-[#121826] group-hover:text-[#C62828] transition-colors">
                {item.label}
              </span>
              <Download size={16} className="ml-auto text-[#64748B] group-hover:text-[#C62828] transition-colors" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}