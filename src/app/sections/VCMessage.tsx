import Image from 'next/image';
import ScrollReveal from '../components/ScrollReveal';

export default function VCMessage() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-[#fafbfc]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#C62828] uppercase tracking-widest mb-3.5">
              <span className="text-[9px]">◆</span>
              From the Principal 
            </span>
            <h2 className="text-[clamp(30px,3.4vw,44px)] font-bold tracking-tight text-[#0D2B5A] leading-tight">
              A message from leadership.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[420px_1fr] gap-12 lg:gap-20 items-center">
          <ScrollReveal>
            <div className="relative">
              <div className="absolute top-6 left-6 -right-6 -bottom-6 bg-[#0D2B5A] rounded-xl opacity-5 -z-10" />
              <div className="relative rounded-xl overflow-hidden shadow-2xl group">
                <Image
                  src="/images/principal-wajahatMajeed.jpg"
                  alt="Prof. Dr. Adeel Akram"
                  width={420}
                  height={520}
                  className="w-full h-[400px] lg:h-[520px] object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-7">
                <div className="text-[22px] font-bold text-[#0D2B5A] tracking-tight">
                  Prof. Wajahat Majeed Khan
                </div>
                <div className="text-[13px] text-[#64748B] font-medium uppercase tracking-widest mt-1">
                  Principal of Govt. Post Graduate College Bahawalnagar
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative">
              <span className="absolute -top-5 -left-2.5 text-[120px] leading-[0.6] text-[#C62828] opacity-10 font-black select-none pointer-events-none">
                &ldquo;
              </span>
              <div className="relative z-[1] text-[17px] leading-[1.85] text-[#4A5568] space-y-5">
                <p>
                  The role of educational institutions has never been more important. They are the foundations of knowledge, character, and personal growth, preparing students with the skills, confidence, and values needed to succeed—not only in their academic and professional careers but throughout their lives.                </p>
                <p>
                  At Govt. Post Graduate College Bahawalnagar, we believe that education is more than the pursuit of academic knowledge. It is a holistic journey that develops intellectual ability, moral character, creativity, confidence, and social responsibility. Our institution is committed to providing a supportive and inspiring learning environment where students can discover their potential and prepare for a successful future.
                </p>
                <p>
                  We take pride in nurturing responsible, capable, and confident individuals who are ready to contribute positively to society. Through quality education, dedicated faculty, and a strong commitment to excellence, Govt. Post Graduate College Bahawalnagar continues to guide and inspire students toward knowledge, achievement, and lifelong success.
                </p>
              </div>
              <div className="mt-9 pt-7 border-t border-black/5 font-bold text-[22px] text-[#C62828] tracking-tight leading-tight">
                &ldquo;Innovation with Purpose, Excellence with Vision.&rdquo;
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}