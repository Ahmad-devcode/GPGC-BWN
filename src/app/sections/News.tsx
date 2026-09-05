import Image from 'next/image';
import ScrollReveal from '../components/ScrollReveal';

const articles = [
  { img: '/images/campus-2.jpg', cat: 'College', date: 'Aug 18, 2026', title: '28th meeting of the College Academic Council' },
  { img: '/images/news-2.jpg', cat: 'Careers', date: 'Aug 12, 2026', title: 'Career Counseling Workshop organized for students.' },
  { img: '/images/news-3.jpg', cat: 'Affiliation', date: 'Aug 05, 2026', title: 'GPGC Bahawalnagar secures affiliation with KFUEIT Rahim Yar Khan' },
  { img: '/images/news-4.jpg', cat: 'Academics', date: 'Jul 28, 2026', title: 'Appreciation certificates awarded to GPGC faculty members.' },
  { img: '/images/news-5.jpg', cat: 'Events', date: 'Jul 20, 2026', title: 'Convocation 2026: Celebrating the next generation of graduates' },
  { img: '/images/news-6.jpg', cat: 'Research', date: 'Jul 15, 2026', title: 'GPGC faculty publishes breakthrough research in local journal' },
];

export default function News() {
  return (
    <section id="news" className="py-24 bg-[#F5F7FA]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#C62828] uppercase tracking-widest mb-3.5">
                <span className="text-[9px]">◆</span>
                Campus Stories
              </span>
              <h2 className="text-[clamp(30px,3.4vw,44px)] font-bold tracking-tight text-[#0D2B5A] leading-tight">
                News & Announcements
              </h2>
            </div>
            <a href="#" className="text-[#C62828] font-semibold text-[15px] hover:underline underline-offset-4">
              View all news →
            </a>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {articles.map((article, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full">
                <div className="relative h-[220px] overflow-hidden">
                  <Image
                    src={article.img}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B5A]/30 to-transparent" />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3.5">
                    <span className="text-[11px] font-bold text-[#C62828] uppercase tracking-widest">
                      {article.cat}
                    </span>
                    <span className="text-xs text-[#64748B] font-medium">{article.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0D2B5A] leading-snug mb-3 flex-1">
                    {article.title}
                  </h3>
                  <a href="#" className="text-[13px] font-semibold text-[#C62828] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all mt-auto">
                    Read Article →
                  </a>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}