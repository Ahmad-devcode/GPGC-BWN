'use client';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Notice Board', href: '#' },
    { label: 'Alumni Network', href: '#' },
    { label: 'Quality Enhancement Cell', href: '#' },
    { label: 'News & Events', href: '#' },
    { label: 'Career Opportunities', href: '#' },
  ];

  const studentLinks = [
    { label: 'Academic Calendar', href: '#' },
    { label: 'Class Time Table', href: '#' },
    { label: 'Exam Date Sheet', href: '#' },
    { label: 'Semester Results', href: '#' },
    { label: 'Student Portal', href: '#' },
  ];

  const facultyLinks = [
    { label: 'PTUT Webmail', href: '#' },
    { label: 'Update Profile', href: '#' },
    { label: 'Faculty Handbook', href: '#' },
    { label: 'Faculty Publications', href: '#' },
    { label: 'Research Portal', href: '#' },
  ];

  return (
    <footer className="relative bg-[#0D2B5A] text-white/80 overflow-hidden border-t-4 border-[#C62828]">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(198,40,40,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Column — Spans 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center p-2">
                <Image
                  src="/images/site-logo.png"
                  alt="PTUT Logo"
                  width={48}
                  height={48}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div>
                <strong className="text-white text-xl font-bold tracking-tight block">
                  GPGC Bahawalnagar
                </strong>
                <span className="text-[11px] text-[#9b8d8d] font-semibold uppercase tracking-widest">
                  Govt. Post Graduate College Bahawalnagar
                </span>
              </div>
            </div>

            <p className="text-sm text-white/60 leading-relaxed max-w-[34ch]">
              Pakistan&apos;s First Technology College — pioneering applied education, industry-linked curriculum, and innovation with purpose.
            </p>

            {/* Contact Details with Icons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-white/70">
                <MapPin size={16} className="text-[#f5f3f3] mt-0.5 shrink-0" />
                <span>Near City Hospital, Bahawalnagar — Punjab, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Phone size={16} className="text-[#f5f3f3] shrink-0" />
                <span>(063) 9240177</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Mail size={16} className="text-[#f5f3f3] shrink-0" />
                <span>gpgcbwn@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Clock size={16} className="text-[#f5f3f3] shrink-0" />
                <span>Mon — Fri: 08:00 — 16:00</span>
              </div>
            </div>

            {/* Social Icons — Inline SVGs (no import dependency) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#C62828] hover:border-[#C62828] hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#C62828] hover:border-[#C62828] hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#C62828] hover:border-[#C62828] hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links — Spans 2 cols */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-xs text-[#f5f3f3] font-bold uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-[#C62828] rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-300 text-[#C62828]">
                      <ArrowUpRight size={12} />
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Students — Spans 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="text-xs text-[#f5f3f3] font-bold uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-[#C62828] rounded-full" />
              Students
            </h4>
            <ul className="space-y-3">
              {studentLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-300 text-[#C62828]">
                      <ArrowUpRight size={12} />
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Faculty — Spans 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="text-xs text-[#f5f3f3] font-bold uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-[#C62828] rounded-full" />
              Faculty
            </h4>
            <ul className="space-y-3">
              {facultyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-300 text-[#C62828]">
                      <ArrowUpRight size={12} />
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-white/40 tracking-wide">
            © {currentYear} GPGC — WEBSITE DEVELOPED BY CS DEPARTMENT, GPGC
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[11px] text-white/40 hover:text-[#C62828] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[11px] text-white/40 hover:text-[#C62828] transition-colors">
              Terms of Use
            </a>
            <a href="#" className="text-[11px] text-white/40 hover:text-[#C62828] transition-colors">
              Sitemap
            </a>
          </div>
          <p className="text-[11px] text-white/40 tracking-wide uppercase">
            Post Graduate College Bahawalnagar
          </p>
        </div>
      </div>
    </footer>
  );
}