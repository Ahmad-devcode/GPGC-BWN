import Image from 'next/image';
import ScrollReveal from '../components/ScrollReveal';

const items = [
  { img: '/images/campus-1.png', tag: 'Campus', title: 'Main Campus, Bahawalnagr', large: true },
  { img: '/images/campus-2.jpg', tag: 'Campus', title: 'Bahawalnagar Campus' },
  { img: '/images/campus-3.png', tag: 'Facilities', title: 'Technology Labs' },
  { img: '/images/campus-4.png', tag: 'Facilities', title: 'Physics Lab' },
  { img: '/images/campus-5.jpg', tag: 'Student Life', title: 'News & Events' },
  { img: '/images/campus-6.jpg', tag: 'Student Life', title: 'Sports & Recreation' },
  { img: '/images/campus-7.jpg', tag: 'Faculty', title: 'Cultural Festivals' },
  { img: '/images/campus-8.png', tag: 'Student Life', title: 'Graduation Day' },
];

export default function Campus() {
  return (
    <section id="campus" className="overflow-hidden bg-white">
      {/* Left-aligned header */}
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 pt-24 pb-12 md:pt-28 md:pb-16">
        <ScrollReveal>
          <div className="mb-3.5">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#C62828] uppercase tracking-widest">
              <span className="text-[9px]">◆</span>
              Field Documentation
            </span>
          </div>
          <h2 className="text-[clamp(30px,3.4vw,44px)] font-bold tracking-tight text-[#0D2B5A] leading-tight">
            Life at GPGC.
          </h2>
          <p className="text-[#4A5568] max-w-[50ch] mt-4 leading-relaxed">
            Experience world-class facilities, vibrant student life, and a campus designed for innovation.
          </p>
        </ScrollReveal>
      </div>

      {/* Full-bleed masonry gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {items.map((item, i) => (
          <ScrollReveal
            key={i}
            delay={item.large ? 0 : 0.1 * (i % 3)}
            className={`relative overflow-hidden cursor-pointer group ${
              item.large
                ? 'md:col-span-2 lg:col-span-1 lg:row-span-2 h-[340px] md:h-[400px] lg:h-[682px]'
                : 'h-[280px] md:h-[340px] lg:h-[340px]'
            }`}
          >
            <Image
              src={item.img}
              alt={item.title}
              fill
              sizes={item.large ? '33vw' : '33vw'}
              className="object-cover object-center transition-all duration-[1.2s] group-hover:scale-[1.08] brightness-[0.85] group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B5A]/85 via-[#0D2B5A]/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <span className="inline-block text-[11px] font-bold text-[#C62828] bg-white/95 px-3.5 py-1 rounded mb-2.5 tracking-widest translate-y-2.5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 delay-75">
                {item.tag}
              </span>
              <h4 className="text-xl lg:text-2xl font-bold text-white leading-tight translate-y-2.5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 delay-100">
                {item.title}
              </h4>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}