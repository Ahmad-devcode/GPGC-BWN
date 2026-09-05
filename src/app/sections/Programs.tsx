'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

const categories = [
  { id: 'all', label: 'All Programs' },
  { id: 'fsc', label: 'Intermediate Programs' },
  { id: 'it', label: 'Computer & IT' },
  { id: 'science', label: 'Sciences' },
  { id: 'arts', label: 'Arts' },
];

const programs = [
  // Intermediate Programs (FSc, ICS, FA)
  { id: 10, title: 'FSc (Pre-Medical)', short: 'FSc-Med', category: 'fsc', img: '/images/programs/prog-medical.png', duration: '2-Year Program', desc: 'Study biology, chemistry, and physics for medical and health sciences careers.' },
  { id: 11, title: 'FSc (Pre-Engineering)', short: 'FSc-Eng', category: 'fsc', img: '/images/programs/prog-engineering.png', duration: '2-Year Program', desc: 'Study mathematics, physics, and chemistry for engineering and technology careers.' },
  { id: 12, title: 'ICS (Computer Science)', short: 'ICS', category: 'fsc', img: '/images/programs/prog-ics.png', duration: '2-Year Program', desc: 'Study computer science, mathematics, and physics for IT and computing careers.' },
  { id: 13, title: 'FA (General Arts)', short: 'FA', category: 'fsc', img: '/images/programs/prog-fa.png', duration: '2-Year Program', desc: 'Study humanities, social sciences, and arts for diverse career paths.' },
  { id: 14, title: 'FA (Information Technology)', short: 'FA-IT', category: 'fsc', img: '/images/programs/prog-fa-it.png', duration: '2-Year Program', desc: 'Study information technology fundamentals along with humanities and arts.' },

  // Sciences & Humanities Programs (BS)
  { id: 1, title: 'BS Computer Science', short: 'CS', category: 'science', img: '/images/programs/prog-ise.jpg', duration: '4-Year BS', desc: 'Comprehensive study of computing principles, algorithms, programming, and software development methodologies.' },
  { id: 2, title: 'BS Chemistry', short: 'CHEM', category: 'science', img: '/images/programs/prog-chemistry.png', duration: '4-Year BS', desc: 'Explore the molecular world, chemical reactions, and advanced laboratory techniques for scientific discovery.' },
  { id: 3, title: 'BS Physics', short: 'PHY', category: 'science', img: '/images/programs/prog-ppg.png', duration: '4-Year BS', desc: 'Understand the fundamental laws of nature, quantum mechanics, and the physical universe through rigorous study.' },
  { id: 4, title: 'BS Mathematics', short: 'MATH', category: 'science', img: '/images/programs/prog-math.png', duration: '4-Year BS', desc: 'Master pure and applied mathematics, mathematical modeling, and problem-solving for real-world applications.' },
  { id: 5, title: 'BS English', short: 'ENG', category: 'arts', img: '/images/programs/prog-eng.png', duration: '4-Year BS', desc: 'Study literature, linguistics, and critical theory while developing advanced analytical and communication skills.' },
  { id: 6, title: 'BS Urdu', short: 'URDU', category: 'arts', img: '/images/programs/prog-urdu.png', duration: '4-Year BS', desc: 'Explore Urdu language, literature, and cultural heritage with deep understanding of classical and modern texts.' },
  { id: 7, title: 'BS Islamiat', short: 'ISL', category: 'arts', img: '/images/programs/prog-isl.png', duration: '4-Year BS', desc: 'Study Islamic theology, jurisprudence, and philosophy with comprehensive knowledge of Quranic and Hadith studies.' },
  { id: 8, title: 'BS Zoology', short: 'ZOO', category: 'science', img: '/images/programs/prog-zoology.png', duration: '4-Year BS', desc: 'Investigate animal biology, biodiversity, genetics, and ecological systems through practical field and lab work.' },

  // IT Programs
  { id: 9, title: 'Diploma in Information Technology', short: 'DIT', category: 'it', img: '/images/programs/prog-dit.png', duration: '2-Year Diploma', desc: 'Build practical IT skills in programming, networking, databases, and system administration for entry-level careers.' },

];

export default function Programs() {
  const [activeCat, setActiveCat] = useState('all');
  const filtered = activeCat === 'all' ? programs : programs.filter((p) => p.category === activeCat);

  return (
    <section id="programs" className="py-24 bg-[#F5F7FA]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#C62828] uppercase tracking-widest mb-3.5">
                <span className="text-[9px]">◆</span>
                Program Catalog
              </span>
              <h2 className="text-[clamp(30px,3.4vw,44px)] font-bold tracking-tight text-[#0D2B5A] leading-tight">
                Academic Programs
              </h2>
            </div>
            <p className="text-[#4A5568] max-w-[40ch] leading-relaxed">
              Diverse undergraduate and intermediate programs in sciences, humanities, and information technology.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`px-5 py-2.5 text-[13px] font-semibold rounded-md border-[1.5px] transition-all ${activeCat === cat.id
                    ? 'bg-[#0D2B5A] text-white border-[#0D2B5A] shadow-lg shadow-[#0D2B5A]/20'
                    : 'bg-white text-[#4A5568] border-black/5 hover:border-[#0D2B5A] hover:text-[#0D2B5A]'
                  }`}
              >
                {cat.label} ({cat.id === 'all' ? programs.length : programs.filter((p) => p.category === cat.id).length})
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-white rounded-xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col"
              >
                <div className="relative h-[220px] overflow-hidden shrink-0">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B5A]/10 to-transparent" />
                  <span className="absolute top-4 right-4 bg-[#C62828] text-white text-[11px] font-bold px-3.5 py-1 rounded shadow-lg shadow-[#C62828]/35 tracking-widest">
                    {p.short}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="text-[17px] font-bold text-[#0D2B5A] leading-snug mb-1.5">
                    {p.title}
                  </h4>
                  <div className="text-[13px] text-[#64748B] font-medium mb-4">
                    {p.category === 'it' ? 'Diploma Program' : p.category === 'fsc' ? 'Intermediate Program' : 'Undergraduate Degree Program'}
                  </div>
                  <p className="text-sm text-[#4A5568] leading-relaxed mb-4 flex-1">
                    {p.desc}
                  </p>
                  <div className="flex justify-between items-center border-t border-black/5 pt-4 mt-auto">
                    <span className="text-[11px] font-bold text-[#C62828] bg-[#C62828]/5 px-3.5 py-1.5 rounded-full tracking-wider uppercase">
                      {p.duration}
                    </span>
                    <span className="w-9 h-9 rounded-full bg-[#F5F7FA] flex items-center justify-center text-[#C62828] text-[15px] font-bold group-hover:bg-[#C62828] group-hover:text-white group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <ScrollReveal>
          <div className="mt-12 flex flex-col gap-4">
            <div className="text-xs text-[#64748B] tracking-widest font-semibold uppercase">
              ◆ Entry Tests
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                'MDCAT',
                'ECAT',
                'B.ED'
              ].map((prog) => (
                <span
                  key={prog}
                  className="text-sm font-semibold px-7 py-3.5 border-[1.5px] border-[#0D2B5A] rounded-xl text-[#0D2B5A] bg-white hover:bg-[#0D2B5A] hover:text-white hover:-translate-y-0.5 transition-all cursor-default"
                >
                  {prog}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}