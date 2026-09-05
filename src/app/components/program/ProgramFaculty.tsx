'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { StaffMember } from '../../../data/faculty';

interface Props {
  faculty: StaffMember[];
  department: string;
}

export default function ProgramFaculty({ faculty, department }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
    >
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#C62828] uppercase tracking-widest mb-3">
            <span className="text-[9px]">◆</span>
            Faculty
          </span>
          <h2 className="text-[clamp(26px,3vw,36px)] font-bold text-[#0D2B5A] tracking-tight">
            Meet the {department} Faculty
          </h2>
        </div>
        <Link
          href="/faculty"
          className="text-sm font-semibold text-[#C62828] hover:underline underline-offset-4 inline-flex items-center gap-1"
        >
          View All Staff <ArrowUpRight size={16} />
        </Link>
      </div>

      {faculty.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((member, i) => (
            <motion.div
              key={member.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/faculty/${member.slug}`}
                className="group flex items-center gap-4 p-5 bg-white rounded-xl border border-black/5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#F5F7FA]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-[#0D2B5A] group-hover:text-[#C62828] transition-colors truncate">
                    {member.name}
                  </h4>
                  <p className="text-xs text-[#64748B] font-medium">{member.designation}</p>
                  {member.email && (
                    <p className="text-[11px] text-[#C62828] mt-1 truncate">{member.email}</p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-black/5 p-8 text-center">
          <p className="text-[#64748B]">Faculty information will be updated soon.</p>
        </div>
      )}
    </motion.section>
  );
}