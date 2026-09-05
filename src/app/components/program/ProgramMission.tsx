'use client';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

interface Props {
  mission: string;
}

export default function ProgramMission({ mission }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
      className="relative bg-[#0D2B5A] rounded-2xl p-8 lg:p-12 text-white overflow-hidden border border-[#0D2B5A]"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C62828]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-14 h-14 rounded-xl bg-[#C62828] flex items-center justify-center shrink-0 shadow-lg shadow-[#C62828]/30">
          <Target size={28} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 tracking-tight">Program Mission Statement</h2>
          <p className="text-white/85 text-lg leading-relaxed max-w-[70ch]">{mission}</p>
        </div>
      </div>
    </motion.section>
  );
}