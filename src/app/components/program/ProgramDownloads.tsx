'use client';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

interface Props {
  downloads: { label: string; url: string }[];
}

export default function ProgramDownloads({ downloads }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
    >
      <div className="mb-10">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#C62828] uppercase tracking-widest mb-3">
          <span className="text-[9px]">◆</span>
          Resources
        </span>
        <h2 className="text-[clamp(26px,3vw,36px)] font-bold text-[#0D2B5A] tracking-tight">
          Downloads & Forms
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {downloads.map((item, i) => (
          <motion.a
            key={item.label}
            href={item.url}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group flex flex-col items-center text-center p-6 bg-white rounded-xl border border-black/5 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-[#C62828]/20 transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-[#0D2B5A]/5 flex items-center justify-center text-[#0D2B5A] group-hover:bg-[#C62828] group-hover:text-white transition-all mb-4">
              <FileText size={22} />
            </div>
            <h4 className="text-sm font-bold text-[#0D2B5A] group-hover:text-[#C62828] transition-colors mb-2">
              {item.label}
            </h4>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#64748B] group-hover:text-[#C62828] transition-colors">
              <Download size={14} />
              PDF
            </span>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}