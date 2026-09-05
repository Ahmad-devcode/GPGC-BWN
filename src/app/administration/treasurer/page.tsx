import { Mail, Phone, User } from 'lucide-react';

const staff = [
  {
    name: 'Anjum Sharif',
    role: 'Treasurer',
    email: 'treasurer@ptut.edu.pk',
    phone: '+92 42 9933 0080 Ext. 107',
  },
  {
    name: 'Hasnain Baig',
    role: 'Assistant Treasurer',
    email: 'hasnain.baig@ptut.edu.pk',
    phone: '+92 42 9933 0080 Ext. 106',
  },
  {
    name: 'Muhammad Bilal',
    role: 'Accountant',
    email: 'muhammad.bilal@ptut.edu.pk',
    phone: null,
  },
];

export default function TreasurerPage() {
  return (
    <div className="space-y-10">
      <section>
        <h3 className="text-xl font-bold text-[#0D2B5A] mb-4">Treasurer Office</h3>
        <p className="text-[#4A5568] leading-relaxed">
          The Treasurer Office manages all financial matters of the University including budget preparation, fee collection, payroll, procurement oversight, and financial reporting to ensure fiscal responsibility and transparency.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#0D2B5A] mb-6">Finance Team</h3>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {staff.map((person, i) => (
            <div key={i} className="bg-white border border-black/5 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-[#0D2B5A]/5 flex items-center justify-center text-[#0D2B5A] mb-4">
                <User size={28} />
              </div>
              <h4 className="text-lg font-bold text-[#0D2B5A] mb-1">{person.name}</h4>
              <div className="text-sm font-semibold text-[#C62828] mb-4">{person.role}</div>
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
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}