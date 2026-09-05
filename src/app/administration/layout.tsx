'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

const adminLinks = [
  { href: '/administration', label: 'Overview' },
  { href: '/administration/registrar', label: 'Registrar' },
  { href: '/administration/examinations', label: 'Examinations' },
  { href: '/administration/treasurer', label: 'Treasurer' },
  { href: '/administration/qec', label: 'Quality Enhancement Cell' },
  { href: '/administration/directorate-of-academics', label: 'Directorate of Academics' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <div className="bg-[#0D2B5A] text-white py-16 border-b-4 border-[#C62828]">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/administration" className="hover:text-white transition-colors">Administration</Link>
            {pathname !== '/administration' && (
              <>
                <ChevronRight size={14} />
                <span className="text-white/90">{adminLinks.find(l => l.href === pathname)?.label}</span>
              </>
            )}
          </div>
          <h1 className="text-[clamp(28px,3.5vw,44px)] font-extrabold tracking-tight">
            {adminLinks.find(l => l.href === pathname)?.label || 'Administration'}
          </h1>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24 bg-[#F5F7FA] rounded-xl p-2">
              <nav className="space-y-1">
                {adminLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        active
                          ? 'bg-[#0D2B5A] text-white shadow-md'
                          : 'text-[#4A5568] hover:bg-white hover:text-[#0D2B5A]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}