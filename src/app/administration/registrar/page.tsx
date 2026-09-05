import { Mail, Phone, User } from 'lucide-react';

const staff = [
  {
    name: 'Dr. Manzoom Akhter',
    role: 'Registrar',
    email: 'registrar@ptut.edu.pk',
    phone: '+92 42 9933 0080 Ext. 103',
    education: null,
  },
  {
    name: 'Rana Muhammad Abubakar',
    role: 'Deputy Registrar',
    email: 'deputyregistrar@ptut.edu.pk',
    phone: '+92 42 9933 2438 Ext. 104',
    education: null,
  },
  {
    name: 'Muhammad Ahmad',
    role: 'Assistant',
    email: 'muhammad.ahmad@ptut.edu.pk',
    phone: '+92 42 9933 2438 Ext. 104',
    education: 'MS in Finance — NUML University Islamabad\nBBA in Finance — University of Education Lahore',
  },
];

export default function RegistrarPage() {
  return (
    <div className="space-y-10">
      <section>
        <h3 className="text-xl font-bold text-[#0D2B5A] mb-4">About the Registrar Office</h3>
        <p className="text-[#4A5568] leading-relaxed">
          The Registrar Office serves as the central administrative hub for academic records, student enrollment, degree verification, and official correspondence. It ensures the integrity and confidentiality of all university documentation.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#0D2B5A] mb-6">Office Bearers</h3>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {staff.map((person) => (
            <div key={person.email} className="bg-white border border-black/5 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-[#0D2B5A]/5 flex items-center justify-center text-[#0D2B5A] mb-4">
                <User size={28} />
              </div>
              <h4 className="text-lg font-bold text-[#0D2B5A] mb-1">{person.name}</h4>
              <div className="text-sm font-semibold text-[#C62828] mb-4">{person.role}</div>

              {person.education && (
                <div className="text-xs text-[#4A5568] bg-[#F5F7FA] rounded-lg p-3 mb-4 whitespace-pre-line leading-relaxed">
                  {person.education}
                </div>
              )}

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
    </div>
  );
}