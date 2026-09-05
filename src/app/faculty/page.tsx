'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staffMembers, departments } from '../../data/faculty';
import FacultyCard from '../components/FacultyCard';
import { Users, Search, LayoutGrid, ListFilter } from 'lucide-react';

export default function FacultyPage() {
  const [activeDept, setActiveDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredByDept = activeDept === 'All'
    ? staffMembers
    : staffMembers.filter((s) => s.department === activeDept);

  const filtered = searchQuery.trim() === ''
    ? filteredByDept
    : filteredByDept.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.designation.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const activeCount = filtered.length;
  const totalCount = staffMembers.length;

  return (
    <section className="pt-28 pb-24 bg-[#F5F7FA] min-h-screen">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs font-medium text-[#64748B] mb-6 flex items-center gap-2">
          <span>Home</span>
          <span className="text-[#64748B]/50">/</span>
          <span className="text-[#0D2B5A] font-semibold">Staff Profile</span>
        </div>

        {/* Page Header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#C62828] uppercase tracking-widest mb-3">
            <span className="text-[9px]">◆</span>
            Directory
          </span>
          <h1 className="text-[clamp(32px,4vw,48px)] font-bold text-[#0D2B5A] tracking-tight leading-tight">
            Faculty & Staff
          </h1>
          <p className="text-[#4A5568] mt-2 max-w-[60ch] leading-relaxed">
            Meet the dedicated professionals across all departments at Punjab Tianjin University of Technology.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* ─── SIDEBAR ─── */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-black/5 rounded-xl text-sm text-[#0D2B5A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828]/30 transition-all shadow-sm"
                />
              </div>

              {/* Department List */}
              <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-black/5 flex items-center gap-2">
                  <ListFilter size={16} className="text-[#C62828]" />
                  <span className="text-sm font-bold text-[#0D2B5A] uppercase tracking-wider">Departments</span>
                </div>
                <nav className="p-2 space-y-0.5">
                  {departments.map((dept) => {
                    const count = dept === 'All'
                      ? totalCount
                      : staffMembers.filter((s) => s.department === dept).length;
                    const isActive = activeDept === dept;

                    return (
                      <button
                        key={dept}
                        onClick={() => setActiveDept(dept)}
                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                          isActive
                            ? 'bg-[#0D2B5A] text-white shadow-md'
                            : 'text-[#4A5568] hover:bg-[#F5F7FA] hover:text-[#0D2B5A]'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            isActive ? 'bg-[#C62828]' : 'bg-[#CBD5E1] group-hover:bg-[#C62828]'
                          }`} />
                          <span className="text-left leading-tight">{dept}</span>
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                          isActive ? 'bg-white/15 text-white' : 'bg-[#F5F7FA] text-[#64748B]'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Stat Card */}
              <div className="hidden lg:block bg-[#0D2B5A] rounded-xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#C62828]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <Users size={24} className="text-[#C62828] mb-3 relative z-10" />
                <div className="text-3xl font-bold relative z-10">{totalCount}</div>
                <div className="text-sm text-white/60 relative z-10 mt-1">Total Staff Members</div>
              </div>
            </div>
          </aside>

          {/* ─── MAIN CONTENT ─── */}
          <main className="flex-1 min-w-0">
            {/* Mobile Department Pills */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-6 -mx-1 px-1 scrollbar-hide">
              {departments.map((dept) => {
                const count = dept === 'All' ? totalCount : staffMembers.filter((s) => s.department === dept).length;
                const isActive = activeDept === dept;
                return (
                  <button
                    key={dept}
                    onClick={() => setActiveDept(dept)}
                    className={`shrink-0 px-4 py-2.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-[#0D2B5A] text-white border-[#0D2B5A] shadow-md'
                        : 'bg-white text-[#4A5568] border-black/5 hover:border-[#0D2B5A]'
                    }`}
                  >
                    {dept} <span className="opacity-60">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <LayoutGrid size={18} className="text-[#C62828]" />
                <h2 className="text-lg font-bold text-[#0D2B5A]">
                  {activeDept === 'All' ? 'All Staff' : activeDept}
                </h2>
                <span className="text-xs font-semibold text-[#64748B] bg-white px-2.5 py-1 rounded-md border border-black/5">
                  {activeCount} member{activeCount !== 1 ? 's' : ''}
                </span>
              </div>
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); setActiveDept('All'); }}
                  className="text-xs font-semibold text-[#C62828] hover:underline underline-offset-4"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <motion.div layout className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map((member, i) => (
                    <motion.div
                      key={member.slug}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
                    >
                      <FacultyCard
                        slug={member.slug}
                        name={member.name}
                        designation={member.designation}
                        department={member.department}
                        image={member.image}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-2xl border border-black/5 shadow-sm"
              >
                <Users size={48} className="mx-auto text-[#CBD5E1] mb-4" />
                <h3 className="text-xl font-semibold text-[#0D2B5A] mb-2">No members found</h3>
                <p className="text-[#64748B] text-sm">Try adjusting your search or department filter.</p>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}