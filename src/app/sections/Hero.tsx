'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const stats = [
  { label: '10+', sub: 'Undergraduate Programs' },
  { label: '2', sub: 'Graduate Programs' },
  { label: '21', sub: 'Main Campus — Bahawalnagar' },
  { label: '2026', sub: 'Fall Admissions Open' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-[#0D2B5A] text-white overflow-hidden border-b-4 border-[#C62828]"
    >
      {/* Background Image with Ken Burns */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/about-img.png"
          alt="GPGC BWN"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Multi-layer Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#111]/85 via-[#111]/60 to-[#0D2B5A]/45 z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0D2B5A/30_100%)] z-[1]" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#C62828] z-[3]" />

      {/* Content */}
      <div className="relative z-[2] w-full max-w-[1240px] mx-auto px-6 lg:px-8 pt-28 pb-24 md:pt-28 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2.5 text-[12px] md:text-[13px] font-medium tracking-[0.08em] uppercase mb-6 md:mb-8 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10 shadow-lg">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C62828] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C62828]" />
                </span>
                Pakistan&apos;s First  College
              </div>
            </motion.div>

            {/* Main Heading — College Name */}
            <motion.div variants={itemVariants} className="relative">
              {/* Decorative GPGC watermark */}
              <span className="absolute -top-6 -left-2 md:-left-4 text-[clamp(60px,12vw,140px)] font-black text-white/[0.03] leading-none select-none pointer-events-none tracking-tighter">
                GPGCBWN
              </span>

              <h1 className="text-[clamp(30px,5.3vw,54px)] font-extrabold leading-[1.2] tracking-tight">
                Post Graduate {' '}
                <span className="block">College Bahawalnagar</span>
              </h1>
            </motion.div>

            {/* Tagline / Sub-heading */}
            <motion.div
              variants={itemVariants}
              className="mt-5 md:mt-6 flex items-center gap-4"
            >
              <h2 className="text-[clamp(24px,3vw,30px)] font-bold leading-[1.2] tracking-tight text-white/95">
                Innovation with Purpose.
                <br className="hidden sm:block" />{' '}
                <span className="text-[#C62828]">Excellence</span> with Vision.
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-6 md:mt-8 text-base md:text-lg text-white/70 max-w-[55ch] leading-[1.4] font-light"
            >
              The first institute in Pakistan built around a vision of world-class
              technical and vocational training at graduation level — applied
              knowledge and skill for the market that&apos;s actually hiring.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mt-8 md:mt-10"
            >
              <a
                href="#admissions"
                className="group inline-flex items-center gap-2.5 bg-[#C62828] text-white px-7 py-4 text-sm font-semibold rounded-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#C62828]/30 active:translate-y-0"
              >
                APPLY FOR ADMISSION
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="#programs"
                className="group inline-flex items-center gap-2 border-[1.5px] border-white/30 text-white px-7 py-4 text-sm font-medium rounded-lg transition-all hover:border-[#C62828] hover:text-[#C62828] hover:bg-white/5 active:translate-y-0"
              >
                VIEW PROGRAMS
                <ArrowRight
                  size={16}
                  className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Stats Box */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl"
            >
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#C62828]/20 rounded-md blur-xl opacity-50" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-[#0D2B5A]/20 rounded-md blur-xl opacity-50" />

              <div className="relative z-10">
                <div className="text-center mb-6">
                  <span className="inline-block px-4 py-1 bg-[#111]/20 text-[#fff] text-xs font-semi-bold uppercase tracking-wider rounded-md border border-[#fff]/30">
                    At a Glance
                  </span>
                </div>

                {/* Stats Grid 2x2 */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.sub}
                      variants={itemVariants}
                      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-md hover:cursor-pointer p-5 text-center hover:bg-white/10 hover:border-[#fff]/30 transition-all duration-300"
                    >
                      <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#fff] to-transparent  opacity-0 group-hover:opacity-100 transition-opacity" />
                      <b className="block text-2xl md:text-[28px] font-extrabold text-white mb-1 tracking-tight">
                        {stat.label}
                      </b>
                      <span className="text-[11px] md:text-[12px] text-white/50 font-medium leading-tight block">
                        {stat.sub}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Text */}
                <div className="mt-6 pt-4 border-t border-white/10 text-center">
                  <p className="text-[11px] text-white/40 uppercase tracking-wider font-medium">
                    ✦ Shaping Futures Since 1973 ✦
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 text-white/40 hover:text-[#C62828] transition-colors group"
        aria-label="Scroll to content"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
          Explore
        </span>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}