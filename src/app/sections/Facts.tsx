'use client';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

const facts = [
  { num: '01', code:  'Pakistan\'s First', desc: 'Technology College of its kind in the country, pioneering applied education.' },
  { num: '02', code: 'Applied Learning', desc: 'State-of-the-art technical & vocational training at graduation level.' },
  { num: '03', code: 'Main Campuses', desc: 'Main campus Bahawalnagar Punjab Pakistan.' },
  { num: '04', code: 'Industry-Linked', desc: 'Curriculum built around market-oriented, job-ready skill.' },
];

export default function Facts() {
  return (
    <section id="facts" className="relative py-24 bg-[#0D2B5A] overflow-hidden border-y-4 border-[#C62828]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(198,40,40,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-[2] max-w-[1240px] mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
           
            <h2 className="text-[clamp(30px,3.4vw,44px)] font-bold tracking-tight text-white leading-tight mt-3">
              Built Different. Built for Industry.
            </h2>
            <p className="text-white/60 max-w-[50ch] mx-auto mt-3.5 leading-relaxed">
              Four pillars that define our approach to technology education in Pakistan.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((fact, i) => (
            <ScrollReveal key={fact.num} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8, borderColor: 'rgba(198,40,40,0.4)' }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-8 text-center transition-colors duration-300 hover:shadow-2xl"
              >
                <div className="relative w-[120px] h-[120px] flex items-center justify-center mx-auto mb-7">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[105px] h-[105px] rounded-full border-[1.5px] border-white/15 animate-orbit-1" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[115px] h-[115px] rounded-full border-[1.5px] border-white/10 animate-orbit-2" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[125px] h-[125px] rounded-full border-[1.5px] border-white/[0.07] animate-orbit-3" />
                  </div>
                  <div className="relative z-10 w-20 h-20 bg-[#C62828] rounded-full flex items-center justify-center text-2xl font-extrabold text-white shadow-lg shadow-[#C62828]/30 animate-pulse-slow">
                    {fact.num}
                  </div>
                </div>

                <div className="text-[11px] font-bold text-[#C62828] mb-4 tracking-[0.08em] uppercase">
                  {fact.code}
                </div>
                
                <p className="text-sm text-white/60 leading-relaxed">
                  {fact.desc}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}