// src/components/DefaultHeader.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, NavItem } from '@/config/navigation';

export default function DefaultHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveDropdown(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const isTransparent = false; // always solid white

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-black/5">
      <nav className="max-w-[1240px] mx-auto px-6 lg:px-8 flex items-center justify-between h-[72px]">
        {/* ─── Logo ─── */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="h-10 lg:h-12 flex items-center">
            <Image
              src="/images/gpgc-logo.jpg"
              alt="GPGC Logo"
              width={48}
              height={48}
              className="h-full w-auto object-contain"
            />
          </div>
        </Link>

        {/* ─── Desktop Navigation ─── */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((item) => {
            const hasChildren = item.children && item.children.length > 0;

            if (!hasChildren) {
              return (
                <Link
                  key={item.label}
                  href={item.href || '#'}
                  className="relative px-4 py-2 text-[14px] font-medium transition-all duration-300 hover:text-[#C62828] group text-[#121826]"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute bottom-1 left-3 right-3 h-[2.5px] bg-[#C62828] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </Link>
              );
            }

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1.5 px-4 py-2 text-[14px] font-medium transition-all duration-300 hover:text-[#C62828] group text-[#121826] ${
                    activeDropdown === item.label ? 'text-[#C62828]' : ''
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      activeDropdown === item.label ? 'rotate-180' : ''
                    }`}
                  />
                  <span className="absolute bottom-1 left-3 right-3 h-[2.5px] bg-[#C62828] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </button>

                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 mt-2 min-w-[280px] bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden z-50"
                    >
                      {/* Same dropdown content as HomeHeader */}
                      {item.children && item.children.some(c => c.children && c.children.length > 0) ? (
                        <div className="p-5 min-w-[620px]">
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                            {item.children.map((child) => {
                              const hasGrandchildren = child.children && child.children.length > 0;
                              return (
                                <div key={child.label} className="py-1">
                                  {hasGrandchildren ? (
                                    <>
                                      <div className="flex items-center gap-2 mb-1.5">
                                        <span className="w-1 h-4 bg-[#C62828] rounded-full" />
                                        <span className="text-[12px] font-bold text-[#C62828] uppercase tracking-wider">
                                          {child.label}
                                        </span>
                                      </div>
                                      <div className="space-y-0.5 ml-2">
                                        {child.children!.map((sub) => (
                                          <Link
                                            key={sub.label}
                                            href={sub.href || '#'}
                                            onClick={() => setActiveDropdown(null)}
                                            className="group/sub flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] text-[#4A5568] hover:text-[#C62828] hover:bg-[#FEF2F2] transition-all duration-200"
                                          >
                                            {sub.label}
                                            <ArrowRight
                                              size={12}
                                              className="ml-auto opacity-0 group-hover/sub:opacity-100 transition-all duration-200 -translate-x-1 group-hover/sub:translate-x-0"
                                            />
                                          </Link>
                                        ))}
                                      </div>
                                    </>
                                  ) : (
                                    <Link
                                      href={child.href || '#'}
                                      onClick={() => setActiveDropdown(null)}
                                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] text-[#4A5568] hover:text-[#C62828] hover:bg-[#FEF2F2] transition-all duration-200"
                                    >
                                      {child.label}
                                      <ArrowRight
                                        size={12}
                                        className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
                                      />
                                    </Link>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <div className="mt-4 pt-3 border-t border-black/5">
                            <Link href="#" className="inline-flex items-center gap-2 text-[12px] font-medium text-[#C62828] hover:underline">
                              View all programs
                              <ArrowRight size={14} />
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="p-2">
                          {item.children!.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href || '#'}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] text-[#4A5568] hover:text-[#C62828] hover:bg-[#FEF2F2] transition-all duration-200 group/item"
                            >
                              {child.label}
                              <ArrowRight
                                size={14}
                                className="ml-auto opacity-0 group-hover/item:opacity-100 transition-all duration-200 -translate-x-2 group-hover/item:translate-x-0"
                              />
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ─── CTA Button ─── */}
        <a
          href="#admissions"
          className="hidden lg:inline-flex items-center gap-2 text-[13px] font-semibold px-6 py-2.5 bg-[#C62828] text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#C62828]/30 active:scale-95 shrink-0 group"
        >
          Apply Now
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>

        {/* ─── Mobile Toggle ─── */}
        <button
          className="lg:hidden p-2 -mr-2 relative z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="text-[#121826]" size={24} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu className="text-[#121826]" size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-white border-t border-black/5 overflow-hidden"
          >
            <div className="h-[calc(100dvh-72px)] overflow-y-auto px-5 py-6">
              {navLinks.map((item) => (
                <MobileNavItem key={item.label} item={item} onNavigate={() => setMobileOpen(false)} />
              ))}
              <a
                href="#admissions"
                className="flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3.5 bg-[#C62828] text-white rounded-xl mt-4 transition-all hover:shadow-lg hover:shadow-[#C62828]/25 active:scale-95"
                onClick={() => setMobileOpen(false)}
              >
                Apply Now
                <ArrowRight size={16} />
              </a>
              <div className="mt-6 text-center text-[12px] text-[#94A3B8]">
                PTUT — Shaping the future of technology
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Mobile Recursive Item (same as HomeHeader) ──────────
function MobileNavItem({ item, onNavigate, depth = 0 }: { item: NavItem; onNavigate: () => void; depth?: number }) {
  const [open, setOpen] = useState(false);
  const children = item.children ?? [];
  const hasChildren = children.length > 0;

  if (hasChildren) {
    const hasNested = children.some((c) => (c.children ?? []).length > 0);
    return (
      <div className={`border-b border-black/5 last:border-0 ${depth > 0 ? 'ml-3 pl-3 border-l-2 border-[#C62828]/20' : ''}`}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full py-3.5 text-left text-[#121826] font-medium text-[15px] group"
        >
          <span>{item.label}</span>
          <ChevronDown
            size={18}
            className={`text-[#64748B] transition-all duration-300 ${open ? 'rotate-180 text-[#C62828]' : ''}`}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-2 space-y-0.5">
                {children.map((child) => {
                  const childChildren = child.children ?? [];

                  if (hasNested && childChildren.length > 0) {
                    return (
                      <div key={child.label} className="py-1">
                        <div className="flex items-center gap-2 px-2 py-1.5">
                          <span className="w-1 h-3 bg-[#C62828] rounded-full" />
                          <span className="text-[11px] font-bold text-[#C62828] uppercase tracking-wider">{child.label}</span>
                        </div>
                        <div className="ml-4 space-y-0.5">
                          {childChildren.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href || '#'}
                              onClick={onNavigate}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[14px] text-[#4A5568] hover:text-[#C62828] hover:bg-[#FEF2F2] transition-all duration-200"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return <MobileNavItem key={child.label} item={child} onNavigate={onNavigate} depth={depth + 1} />;
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      href={item.href || '#'}
      onClick={onNavigate}
      className={`flex items-center gap-2.5 py-3.5 text-[15px] font-medium border-b border-black/5 last:border-0 transition-all duration-200 ${
        item.href && item.href !== '#'
          ? 'text-[#121826] hover:text-[#C62828] hover:pl-1'
          : 'text-[#121826]/40 cursor-not-allowed'
      }`}
      style={{ paddingLeft: depth * 16 + 8 }}
    >
      {item.label}
      {item.href && item.href !== '#' && <ArrowRight size={14} className="ml-auto text-[#C62828]/40" />}
    </Link>
  );
}