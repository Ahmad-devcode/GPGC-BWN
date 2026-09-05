'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen } from 'lucide-react';

interface Course {
  srNo: number;
  code: string;
  name: string;
  domain: string;
  creditHrs: string;
  contactHrs: string;
}

interface Semester {
  number: number;
  courses: Course[];
}

interface Props {
  curriculum: Semester[];
  creditHours: number;
  duration: string;
}

export default function ProgramCurriculum({ curriculum, creditHours, duration }: Props) {
  const [openSemester, setOpenSemester] = useState<number | null>(1);

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
            Academic Plan
          </span>
          <h2 className="text-[clamp(26px,3vw,36px)] font-bold text-[#0D2B5A] tracking-tight">
            Program Curriculum
          </h2>
        </div>
        <div className="flex gap-3 text-sm">
          <span className="px-4 py-2 bg-white border border-black/5 rounded-lg font-semibold text-[#0D2B5A] shadow-sm">
            {duration}
          </span>
          <span className="px-4 py-2 bg-white border border-black/5 rounded-lg font-semibold text-[#0D2B5A] shadow-sm">
            {creditHours} Credit Hours
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {curriculum.map((sem) => (
          <div key={sem.number} className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
            <button
              onClick={() => setOpenSemester(openSemester === sem.number ? null : sem.number)}
              className="w-full flex items-center justify-between p-5 lg:p-6 text-left hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#0D2B5A] text-white flex items-center justify-center font-bold text-sm">
                  S{sem.number}
                </div>
                <div>
                  <h4 className="font-bold text-[#0D2B5A]">Semester {sem.number}</h4>
                  <p className="text-xs text-[#64748B]">{sem.courses.length} Courses</p>
                </div>
              </div>
              <ChevronDown
                size={20}
                className={`text-[#64748B] transition-transform duration-300 ${
                  openSemester === sem.number ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {openSemester === sem.number && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 lg:px-6 pb-6 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-black/5 text-[#64748B] text-xs uppercase tracking-wider">
                          <th className="py-3 text-left font-semibold">Sr.</th>
                          <th className="py-3 text-left font-semibold">Code</th>
                          <th className="py-3 text-left font-semibold">Course Name</th>
                          <th className="py-3 text-left font-semibold hidden md:table-cell">Domain</th>
                          <th className="py-3 text-center font-semibold">Credits</th>
                          <th className="py-3 text-center font-semibold">Contact Hrs</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5">
                        {sem.courses.map((course) => (
                          <tr key={course.srNo} className="hover:bg-[#F8FAFC] transition-colors">
                            <td className="py-3 text-[#64748B] font-medium">{course.srNo}</td>
                            <td className="py-3 font-semibold text-[#0D2B5A]">{course.code}</td>
                            <td className="py-3 text-[#4A5568]">{course.name}</td>
                            <td className="py-3 text-[#64748B] hidden md:table-cell">{course.domain}</td>
                            <td className="py-3 text-center text-[#0D2B5A] font-semibold">{course.creditHrs}</td>
                            <td className="py-3 text-center text-[#64748B]">{course.contactHrs}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.section>
  );
}