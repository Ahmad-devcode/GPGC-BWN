'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';

interface Props {
  peos: { id: string; title: string; text: string }[];
  plos: { id: string; code: string; text: string }[];
  matrix: { ploId: string; peo1: boolean; peo2: boolean; peo3: boolean }[];
}

export default function ProgramOutcomes({ peos, plos, matrix }: Props) {
  const [activeTab, setActiveTab] = useState<'peo' | 'plo' | 'matrix'>('peo');

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
          Program Outcomes
        </span>
        <h2 className="text-[clamp(26px,3vw,36px)] font-bold text-[#0D2B5A] tracking-tight">
          Educational Objectives & Learning Outcomes
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { id: 'peo' as const, label: 'PEOs — Objectives' },
          { id: 'plo' as const, label: 'PLOs — Learning Outcomes' },
          { id: 'matrix' as const, label: 'Mapping Matrix' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 text-[13px] font-semibold rounded-lg border-[1.5px] transition-all ${
              activeTab === tab.id
                ? 'bg-[#0D2B5A] text-white border-[#0D2B5A] shadow-lg shadow-[#0D2B5A]/20'
                : 'bg-white text-[#4A5568] border-black/5 hover:border-[#0D2B5A] hover:text-[#0D2B5A]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
        {activeTab === 'peo' && (
          <div className="divide-y divide-black/5">
            {peos.map((peo, i) => (
              <motion.div
                key={peo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 lg:p-8 flex gap-5 items-start"
              >
                <div className="w-12 h-12 rounded-full bg-[#C62828] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                  {peo.id.replace('PEO ', '')}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#0D2B5A] mb-1">{peo.title}</h4>
                  <p className="text-[#4A5568] leading-relaxed">{peo.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'plo' && (
          <div className="divide-y divide-black/5">
            {plos.map((plo, i) => (
              <motion.div
                key={plo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 lg:p-6 flex gap-4 items-start"
              >
                <span className="inline-flex items-center justify-center px-3 py-1 bg-[#0D2B5A]/5 text-[#0D2B5A] text-xs font-bold rounded-md shrink-0">
                  {plo.code}
                </span>
                <p className="text-sm text-[#4A5568] leading-relaxed pt-0.5">{plo.text}</p>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'matrix' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0D2B5A] text-white">
                  <th className="px-4 py-3 text-left font-semibold">Sr. No.</th>
                  <th className="px-4 py-3 text-left font-semibold">PLOs</th>
                  <th className="px-4 py-3 text-center font-semibold w-24">PEO 1</th>
                  <th className="px-4 py-3 text-center font-semibold w-24">PEO 2</th>
                  <th className="px-4 py-3 text-center font-semibold w-24">PEO 3</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {matrix.map((row, i) => (
                  <tr key={row.ploId} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                    <td className="px-4 py-3 text-[#64748B] font-medium">{row.ploId}</td>
                    <td className="px-4 py-3 text-[#4A5568]">PLO {row.ploId}</td>
                    <td className="px-4 py-3 text-center">
                      {row.peo1 && <Check size={16} className="text-[#C62828] mx-auto" />}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.peo2 && <Check size={16} className="text-[#C62828] mx-auto" />}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.peo3 && <Check size={16} className="text-[#C62828] mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.section>
  );
}