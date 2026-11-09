import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import ContactForm from './ContactForm';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us — PTUT',
  description:
    'Contact Punjab Tianjin University of Technology — address, phone, email and a message form.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-[#0D2B5A] text-white pt-32 pb-16 border-b-4 border-[#C62828]">
          <div className="max-w-[1240px] mx-auto px-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#C62828] uppercase tracking-widest mb-3">
              <span className="text-[9px]">◆</span> Get in Touch
            </span>
            <h1 className="text-[clamp(32px,4vw,52px)] font-extrabold tracking-tight">Contact Us</h1>
            <p className="mt-4 text-white/70 max-w-2xl text-lg">
              Questions about admissions, programs or anything else? Send us a message
              or reach the university through the details below.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#F5F7FA]">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
              <ScrollReveal>
                <ContactForm />
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 md:p-7">
                    <h3 className="text-lg font-bold text-[#0D2B5A] mb-5">University Office</h3>
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-[#C62828]/10 text-[#C62828] shrink-0">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Address</p>
                          <p className="font-semibold text-[#0D2B5A] text-sm mt-0.5">
                            Near City Hospital, Bahawalnagar — Punjab, Pakistan
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-[#C62828]/10 text-[#C62828] shrink-0">
                          <Phone size={18} />
                        </div>
                        <div>
                          <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Phone</p>
                          <p className="font-semibold text-[#0D2B5A] text-sm mt-0.5">(063) 9240177</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-[#C62828]/10 text-[#C62828] shrink-0">
                          <Mail size={18} />
                        </div>
                        <div>
                          <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Email</p>
                          <p className="font-semibold text-[#0D2B5A] text-sm mt-0.5">gpgcbwn@gmail.com</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-[#C62828]/10 text-[#C62828] shrink-0">
                          <Clock size={18} />
                        </div>
                        <div>
                          <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Office Hours</p>
                          <p className="font-semibold text-[#0D2B5A] text-sm mt-0.5">Mon — Fri: 08:00 — 16:00</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0D2B5A] rounded-2xl p-6 md:p-7 text-white relative overflow-hidden">
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#C62828]/10 rounded-full blur-3xl" />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-white/10 text-[#C62828]">
                          <MessageCircle size={18} />
                        </div>
                        <h3 className="font-bold">Admission Office</h3>
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed mb-4">
                        For admission queries, contact the admission office directly.
                      </p>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-white/50">Phone: </span>
                          <span className="font-semibold">+92 42 9933 2439</span>
                        </p>
                        <p>
                          <span className="text-white/50">WhatsApp: </span>
                          <span className="font-semibold">0309-7888547</span>
                        </p>
                        <p>
                          <span className="text-white/50">Email: </span>
                          <span className="font-semibold">admissions@ptut.edu.pk</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
