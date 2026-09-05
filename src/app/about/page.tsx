'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* ─── PAGE HERO ─── */}
        <section className="relative pt-32 pb-20 md:pt-28 md:pb-28 overflow-hidden border-b-4 border-[#C62828] min-h-[60vh] md:min-h-[70vh]">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/about-img.png"
              alt="College Campus"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              quality={90}
            />
          </div>

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-[#111]/80" />

          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(198,40,40,0.15)_0%,transparent_50%)] pointer-events-none" />

          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          <div className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-8 h-full flex items-center">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full py-8 md:py-12">
              {/* Left Side - Text Content */}
              <ScrollReveal>
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-3 text-xs font-semibold text-[#fff] uppercase tracking-[0.2em] mb-6">
                    <span className="w-8 h-[2px] bg-[#C62828]" />
                    Discover GPGC
                  </div>
                  <h1 className="text-[clamp(32px,5.5vw,64px)] font-extrabold text-white leading-[1.05] tracking-tight">
                    About Govt. Post Graduate{' '}
                    <span className="text-[#C62828]">College Bahawalnagar</span>
                  </h1>
                  <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-[55ch]">
                    A premier public sector institution of higher learning — committed to academic excellence, research innovation, and holistic development of students in the region.
                  </p>
                </div>
              </ScrollReveal>

              {/* Right Side - Stats & Features Box */}
              <ScrollReveal delay={0.15}>
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-md rounded-md p-6 md:p-8 border border-white/10 shadow-2xl">
                    {/* Decorative elements */}
                    <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#111]/20 rounded-md blur-xl" />
                    <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-[#0D2B5A]/20 rounded-md blur-xl" />

                    <div className="relative z-10">
                      <div className="text-center mb-6">
                        <span className="inline-block px-4 py-1 bg-[#111]/20 text-[#fff] text-xs font-semi-bold uppercase tracking-wider rounded-md border border-[#fff]/30">
                          At a Glance
                        </span>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-[#0D2B5A]/20 rounded-md p-4 text-center border border-white/5 hover:bg-white/10 transition-all duration-300">
                          <div className="text-3xl md:text-4xl font-extrabold text-[#fff]/80">1973</div>
                          <div className="text-[10px] text-white/60 uppercase tracking-wider mt-1">Established</div>
                        </div>
                        <div className="bg-[#0D2B5A]/20 rounded-md p-4 text-center border border-white/5 hover:bg-white/10 transition-all duration-300">
                          <div className="text-3xl md:text-4xl font-extrabold text-[#fff]/80">50+</div>
                          <div className="text-[10px] text-white/60 uppercase tracking-wider mt-1">Years Legacy</div>
                        </div>
                        <div className="bg-[#0D2B5A]/20 rounded-md p-4 text-center border border-white/5 hover:bg-white/10 transition-all duration-300">
                          <div className="text-3xl md:text-4xl font-extrabold text-[#fff]/80"> 14+ </div>
                          <div className="text-[10px] text-white/60 uppercase tracking-wider mt-1">Programs</div>
                        </div>
                        <div className="bg-[#0D2B5A]/20 rounded-md p-4 text-center border border-white/5 hover:bg-white/10 transition-all duration-300">
                          <div className="text-3xl md:text-4xl font-extrabold text-[#fff]/80">5000+</div>
                          <div className="text-[10px] text-white/60 uppercase tracking-wider mt-1">Alumni</div>
                        </div>
                      </div>


                      {/* Bottom CTA */}
                      <div className="mt-6 pt-4 border-t border-white/10 text-center">
                        <a
                          href="#story"
                          className="inline-flex items-center gap-2 text-sm text-[#fff] font-medium hover:text-white transition-colors duration-300"
                        >
                          Learn More About Us
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─── OUR STORY ─── */}
        <section id="story" className="py-16 bg-white scroll-mt-20">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <ScrollReveal>
                <div className="relative">
                  <span className="absolute -top-4 -left-4 text-[100px] font-black text-[#0D2B5A]/[0.04] leading-none select-none pointer-events-none">
                    1973
                  </span>
                  <div className="relative">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#C62828] uppercase tracking-widest mb-4">
                      <span className="text-[9px]">◆</span>
                      Our History
                    </span>
                    <h2 className="text-[clamp(28px,3.2vw,40px)] font-bold text-[#0D2B5A] leading-tight tracking-tight mb-6">
                      A legacy of excellence spanning decades.
                    </h2>
                    <div className="space-y-5 text-[#4A5568] leading-[1.8]">
                      <p>
                        Govt. Post Graduate College Bahawalnagar stands as one of the oldest and most prestigious institutions of higher education in the region, established with a vision to provide quality education and foster intellectual growth among the youth of Bahawalnagar and surrounding areas.
                      </p>
                      <p>
                        Since its inception, the college has been a beacon of academic excellence, producing countless graduates who have gone on to serve the nation in various fields including education, government, business, and research. The institution is committed to nurturing talent and developing future leaders.
                      </p>
                      <p>
                        The college offers a diverse range of programs at both undergraduate and postgraduate levels, including FSc, FA, ICS, and BS programs in sciences, humanities, and information technology. Through dedicated faculty and state-of-the-art facilities, we prepare students for successful careers and meaningful contributions to society.
                      </p>
                    </div>

                    {/* Mini timeline - Stats in one row */}
                    <div className="mt-10 grid grid-cols-3 gap-4 md:gap-8">
                      <div className="text-center bg-[#F5F7FA] rounded-xl p-4 md:p-6 border border-black/5">
                        <div className="text-2xl md:text-3xl font-extrabold text-[#0D2B5A]">1973</div>
                        <div className="text-[10px] md:text-[11px] text-[#64748B] font-medium uppercase tracking-wider mt-1">Founded</div>
                      </div>
                      <div className="text-center bg-[#F5F7FA] rounded-xl p-4 md:p-6 border border-black/5">
                        <div className="text-2xl md:text-3xl font-extrabold text-[#0D2B5A]">50+</div>
                        <div className="text-[10px] md:text-[11px] text-[#64748B] font-medium uppercase tracking-wider mt-1">Years of Excellence</div>
                      </div>
                      <div className="text-center bg-[#F5F7FA] rounded-xl p-4 md:p-6 border border-black/5">
                        <div className="text-2xl md:text-3xl font-extrabold text-[#0D2B5A]">14+</div>
                        <div className="text-[10px] md:text-[11px] text-[#64748B] font-medium uppercase tracking-wider mt-1">Academic Programs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="relative">
                  <div className="absolute top-6 left-6 -right-6 -bottom-6 bg-[#0D2B5A] rounded-2xl opacity-[0.04]" />
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-black/5">
                    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[440px]">
                      <Image
                        src="/images/clg.jpg"
                        alt="College Campus"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 50vw"
                        quality={90}
                        priority={false}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B5A]/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 shadow-lg">
                        <div className="text-[11px] font-bold text-[#C62828] uppercase tracking-widest mb-1">Premier Institution</div>
                        <div className="text-sm font-semibold text-[#0D2B5A]">Govt. Post Graduate College Bahawalnagar</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─── VISION & MISSION ─── */}
        <section className="py-24 bg-[#F5F7FA]">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#C62828] uppercase tracking-widest mb-3 justify-center">
                  <span className="text-[9px]">◆</span>
                  Guiding Principles
                </span>
                <h2 className="text-[clamp(30px,3.4vw,44px)] font-bold text-[#0D2B5A] leading-tight tracking-tight">
                  Vision & Mission
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {/* Vision */}
              <ScrollReveal>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative bg-white rounded-2xl p-8 lg:p-10 border border-black/[0.04] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D2B5A]/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-[#0D2B5A] flex items-center justify-center text-white mb-6 shadow-lg shadow-[#0D2B5A]/20 group-hover:scale-110 transition-transform duration-300">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#0D2B5A] mb-4 tracking-tight">Our Vision</h3>
                    <p className="text-[#4A5568] leading-relaxed">
                      To be a premier public sector institution of higher learning in the region — producing graduates of exceptional caliber who contribute meaningfully to the socio-economic development of Pakistan.
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>

              {/* Mission */}
              <ScrollReveal delay={0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative bg-white rounded-2xl p-8 lg:p-10 border border-black/[0.04] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C62828]/[0.04] rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-[#C62828] flex items-center justify-center text-white mb-6 shadow-lg shadow-[#C62828]/20 group-hover:scale-110 transition-transform duration-300">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#0D2B5A] mb-4 tracking-tight">Our Mission</h3>
                    <p className="text-[#4A5568] leading-relaxed">
                      To provide quality higher education through innovative teaching, research, and community engagement — empowering students with knowledge, skills, and values for lifelong success.
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="pb-20 pt-4">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
            <ScrollReveal>
              <div className="bg-[#C62828] text-white rounded-2xl px-8 py-12 md:px-14 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 border border-[#0D2B5A] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 text-center lg:text-left">
                  <h2 className="text-[clamp(24px,3vw,36px)] font-bold leading-tight max-w-[24ch]">
                    Shape your future at GPGC Bahawalnagar.
                  </h2>
                  <p className="text-white/80 mt-3 text-sm">
                    ◆ Admissions open for Fall {new Date().getFullYear()}
                  </p>
                </div>
                <a
                  href="/"
                  className="relative z-10 shrink-0 bg-white text-[#C62828] px-8 py-4 text-sm font-semibold rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  BACK TO HOME →
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}