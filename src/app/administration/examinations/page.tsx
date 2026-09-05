import { Mail, Phone, User } from 'lucide-react';

const staff = [
  {
    name: 'Ch. Muhammad Azhar Naeem Kamboh',
    role: 'Controller of Examinations',
    email: 'controller@ptut.edu.pk',
    phone: '+92 42 9933 2662',
  },
  {
    name: 'Muhammad Imran Khan',
    role: 'Assistant Controller of Examinations',
    email: null,
    phone: null,
  },
  {
    name: 'Aqsa Saleem',
    role: 'Computer Operator',
    email: null,
    phone: null,
  },
];

export default function ExaminationsPage() {
  return (
    <div className="space-y-10">
      <section>
        <h3 className="text-xl font-bold text-[#0D2B5A] mb-4">Examinations Office</h3>
        <p className="text-[#4A5568] leading-relaxed">
          The Examinations Branch is responsible for the fair and efficient conduct of all semester and annual examinations, result compilation, transcript issuance, and the enforcement of examination policies across all academic programs.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#0D2B5A] mb-6">Examinations Team</h3>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {staff.map((person, i) => (
            <div key={i} className="bg-white border border-black/5 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-[#0D2B5A]/5 flex items-center justify-center text-[#0D2B5A] mb-4">
                <User size={28} />
              </div>
              <h4 className="text-lg font-bold text-[#0D2B5A] mb-1">{person.name}</h4>
              <div className="text-sm font-semibold text-[#C62828] mb-4">{person.role}</div>

              {(person.email || person.phone) ? (
                <div className="space-y-2 text-sm">
                  {person.email && (
                    <a href={`mailto:${person.email}`} className="flex items-center gap-2.5 text-[#4A5568] hover:text-[#C62828] transition-colors">
                      <Mail size={15} className="shrink-0" />
                      <span className="break-all">{person.email}</span>
                    </a>
                  )}
                  {person.phone && (
                    <div className="flex items-center gap-2.5 text-[#4A5568]">
                      <Phone size={15} className="shrink-0" />
                      <span>{person.phone}</span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-[#64748B] italic">Contact via main office</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}