import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import Image from 'next/image';

export default function MessagesPage() {
  return (
    <>
      <Header />
      <main>
        {/* ─── Page Hero ─── */}
        <section className="relative bg-[#0D2B5A] text-white pt-32 pb-20 border-b-4 border-[#C62828] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(198,40,40,0.12)_0%,transparent_60%)] pointer-events-none" />
          <div className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-8">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#C62828] uppercase tracking-widest mb-4">
                <span className="text-[9px]">◆</span>
                Leadership
              </span>
              <h1 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-tight leading-[1.05]">
                Messages from <span className="text-[#C62828]">Leadership</span>
              </h1>
              <p className="mt-5 text-white/70 max-w-[60ch] text-lg leading-relaxed">
                Words of vision, commitment, and inspiration from the Principal and Vice Principal of GPGC.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── Principal Section ─── */}
        <section className="py-24 bg-white">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Portrait */}
              <ScrollReveal>
                <div className="relative">
                  <div className="absolute top-6 left-6 -right-6 -bottom-6 bg-[#0D2B5A] rounded-xl opacity-5 -z-10" />
                  <div className="relative rounded-xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/principal-wajahatMajeed.jpg"
                      alt="Prof. Wajahat Majeed Khan"
                      width={560}
                      height={640}
                      className="w-full h-[400px] lg:h-[560px] object-cover object-top"
                    />
                  </div>
                  <div className="mt-7">
                    <div className="text-[22px] font-bold text-[#0D2B5A] tracking-tight">
                      Prof. Wajahat Majeed Khan
                    </div>
                    <div className="text-[13px] text-[#64748B] font-medium uppercase tracking-widest mt-1">
                      Principal, GPGC Bahawalnagar
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Message */}
              <ScrollReveal delay={0.2}>
                <div className="relative">
                  <span className="absolute -top-8 -left-4 text-[140px] leading-none text-[#C62828] opacity-10 font-black select-none pointer-events-none">
                    &ldquo;
                  </span>
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-[#0D2B5A] mb-6 leading-snug">
                      A Legacy of Excellence &amp; Trust
                    </h2>
                    <div className="space-y-5 text-[17px] leading-[1.85] text-[#4A5568]">
                      <p className="font-medium text-[#0D2B5A] text-lg">
                        &ldquo;The process of learning and achievement of excellence is a legacy of our glorious past. The chronicles of history bear witness to the fact that our predecessors pioneered and made gigantic leaps in various branches of sciences.&rdquo;
                      </p>
                      <p>
                        We, therefore, are custodians of a trust vested in us. The turn of events and transgression from destined path have tilted the scales against us. At this point of time, vision with unflinching faith in our cause should be the guiding principle to turn the wheel and arrest further degradation of our potentials.
                      </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-black/5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#0D2B5A]/5 flex items-center justify-center text-[#0D2B5A]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1h2.25z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-[#0D2B5A]">Prof. Wajahat Majeed Khan</div>
                        <div className="text-xs text-[#64748B] uppercase tracking-wider">Principal</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
          <div className="h-px bg-black/5 w-full" />
        </div>

        {/* ─── Vice Principal Section ─── */}
        <section className="py-24 bg-gradient-to-b from-[#fafbfc] to-white">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Message — Left on desktop */}
              <ScrollReveal className="order-2 lg:order-1">
                <div className="relative">
                  <span className="absolute -top-8 -left-4 text-[140px] leading-none text-[#C62828] opacity-10 font-black select-none pointer-events-none">
                    &ldquo;
                  </span>
                  <div className="relative z-10">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#C62828] uppercase tracking-widest mb-4">
                      <span className="text-[9px]">◆</span>
                      From the Desk of Vice Principal
                    </span>
                    <h2 className="text-[clamp(26px,3vw,36px)] font-bold text-[#0D2B5A] mb-6 leading-tight">
                      A Commitment to Innovation &amp; Opportunity
                    </h2>
                    <div className="space-y-5 text-[16px] leading-[1.8] text-[#4A5568]">
                      <p>
                        It is with great humility and determination that I assume the responsibility of serving as Principal of Govt. Post Graduate College Bahawalnagar. GPGC was founded on the vision of fostering academic excellence and holistic development, committed to providing quality higher education to the youth of Bahawalnagar and surrounding regions.
                      </p>
                      <p>
                        As we move forward, I am committed to strengthening this foundation by:
                      </p>
                      <ul className="space-y-3 pl-1">
                        {[
                          'Promoting academic excellence and fostering a culture of research and innovation',
                          'Modernizing curricula to align with contemporary educational and market demands',
                          'Creating sustainable pathways for student success, career development, and lifelong learning',
                          'Building strong partnerships with community, industry, and educational institutions for holistic growth',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-[#4A5568]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C62828] mt-2.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p>
                        I invite all stakeholders students, faculty, alumni, and partners to join me in shaping GPGC Bahawalnagar into a premier institution of higher learning, where excellence, innovation, and opportunity converge for the betterment of our society.
                      </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-black/5">
                      <div className="font-bold text-[#0D2B5A] text-lg">Prof. Hameed Hamza</div>
                      <div className="text-xs text-[#64748B] uppercase tracking-wider mt-1">Vice Principal, GPGC Bahawalnagar</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Portrait — Right on desktop */}
              <ScrollReveal delay={0.2} className="order-1 lg:order-2">
                <div className="relative">
                  <div className="absolute top-6 left-6 -right-6 -bottom-6 bg-[#C62828] rounded-xl opacity-5 -z-10" />
                  <div className="relative rounded-xl overflow-hidden shadow-2xl group">
                    <Image
                      src="/images/vc-adeel-akram.png"
                      alt="Prof. Prof. Hameed Hamza"
                      width={560}
                      height={640}
                      className="w-full h-[400px] lg:h-[560px] object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>
                  <div className="mt-7">
                    <div className="text-[22px] font-bold text-[#0D2B5A] tracking-tight">
                      Prof. Hameed Hamza
                    </div>
                    <div className="text-[13px] text-[#64748B] font-medium uppercase tracking-widest mt-1">
                      Vice Principal, GPGC Bahawalnagar
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