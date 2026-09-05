import ScrollReveal from '../components/ScrollReveal';

export default function CTA() {
  return (
    <section id="admissions" className="py-10 pb-16">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="bg-[#C62828] text-white rounded-xl px-8 py-12 md:px-12 md:py-14 flex flex-col lg:flex-row items-center justify-between gap-8 border border-[#0D2B5A] shadow-lg">
            <div>
              <h2 className="text-[clamp(26px,3vw,38px)] font-bold leading-tight max-w-[22ch]">
                Applications are open for Fall Admissions.
              </h2>
              <p className="text-white/85 mt-2 text-sm">
                ◆ SECURE_YOUR_FUTURE — apply online today
              </p>
            </div>
            <a
              href="#"
              className="shrink-0 bg-white text-[#C62828] px-8 py-4 text-sm font-semibold rounded-md transition-all hover:-translate-y-0.5 hover:bg-[#F5F7FA] shadow-lg"
            >
              APPLY ONLINE NOW →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}