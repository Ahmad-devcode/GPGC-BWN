'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Award } from 'lucide-react';

interface Props {
  program: {
    title: string;
    shortTitle: string;
    degree: string;
    duration: string;
    creditHours: number;
    facultyGroup: string;
    tagline: string;
    introduction: string[];
  };
}

export default function ProgramHero({ program }: Props) {
  return (
    <section>
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-medium text-[#64748B] mb-8 flex items-center gap-2"
      >
        <Link href="/" className="hover:text-[#C62828] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-[#0D2B5A] font-semibold">{program.facultyGroup}</span>
        <span>/</span>
        <span className="text-[#C62828] font-semibold">{program.shortTitle}</span>
      </motion.div>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#C62828] uppercase tracking-widest mb-4">
            <span className="text-[9px]">◆</span>
            Undergraduate Program
          </span>
          <h1 className="text-[clamp(32px,4.5vw,52px)] font-extrabold text-[#0D2B5A] tracking-tight leading-[1.05] mb-4">
            {program.title}
          </h1>
          <p className="text-lg text-[#4A5568] leading-relaxed mb-8 max-w-[55ch]">
            {program.tagline}
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 px-5 py-3 bg-white border border-black/5 rounded-xl shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#0D2B5A]/10 flex items-center justify-center text-[#0D2B5A]">
                <Award size={20} />
              </div>
              <div>
                <div className="text-[11px] text-[#64748B] font-semibold uppercase tracking-wider">Degree</div>
                <div className="text-sm font-bold text-[#0D2B5A]">{program.degree}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-white border border-black/5 rounded-xl shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#C62828]/10 flex items-center justify-center text-[#C62828]">
                <Clock size={20} />
              </div>
              <div>
                <div className="text-[11px] text-[#64748B] font-semibold uppercase tracking-wider">Duration</div>
                <div className="text-sm font-bold text-[#0D2B5A]">{program.duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-white border border-black/5 rounded-xl shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#0D2B5A]/10 flex items-center justify-center text-[#0D2B5A]">
                <BookOpen size={20} />
              </div>
              <div>
                <div className="text-[11px] text-[#64748B] font-semibold uppercase tracking-wider">Credits</div>
                <div className="text-sm font-bold text-[#0D2B5A]">{program.creditHours} CH</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl border border-black/5 p-8 shadow-sm"
        >
          <h3 className="text-lg font-bold text-[#0D2B5A] mb-5 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#C62828] rounded-full" />
            Introduction
          </h3>
          <div className="space-y-4 text-[15px] text-[#4A5568] leading-[1.8]">
            {program.introduction.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}