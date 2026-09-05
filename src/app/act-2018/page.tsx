// app/act-2018/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, BookOpen, Calendar, Scale, Menu, X, FileText } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';

const chapters = [
  { id: 'I', title: 'Preliminary' },
  { id: 'II', title: 'The College' },
  { id: 'III', title: 'Officers of the College' },
  { id: 'IV', title: 'Authorities of the College' },
  { id: 'V', title: 'Statutes, Regulations and Rules' },
  { id: 'VI', title: 'Finances' },
  { id: 'VII', title: 'Miscellaneous' },
];

const LetteredList = ({ items, startChar = 'a', className = '' }: { items: (string | React.ReactNode)[]; startChar?: string; className?: string }) => (
  <div className={`space-y-2.5 my-3 ${className}`}>
    {items.map((item, i) => {
      const letter = String.fromCharCode(startChar.charCodeAt(0) + i);
      return (
        <div key={i} className="flex gap-3 text-[15px] leading-[1.75] text-[#4A5568]">
          <span className="shrink-0 text-[#C62828] font-bold text-sm mt-0.5">({letter})</span>
          <span>{item}</span>
        </div>
      );
    })}
  </div>
);

const NumberedList = ({ items, startNum = 1 }: { items: (string | React.ReactNode)[]; startNum?: number }) => (
  <div className="space-y-2.5 my-3">
    {items.map((item, i) => (
      <div key={i} className="flex gap-3 text-[15px] leading-[1.75] text-[#4A5568]">
        <span className="shrink-0 text-[#0D2B5A] font-bold text-sm mt-0.5">({startNum + i})</span>
        <span>{item}</span>
      </div>
    ))}
  </div>
);

const RomanList = ({ items }: { items: (string | React.ReactNode)[] }) => (
  <div className="space-y-2.5 my-3">
    {items.map((item, i) => {
      const numerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii'];
      return (
        <div key={i} className="flex gap-3 text-[15px] leading-[1.75] text-[#4A5568]">
          <span className="shrink-0 text-[#64748B] font-semibold text-sm mt-0.5">({numerals[i]})</span>
          <span>{item}</span>
        </div>
      );
    })}
  </div>
);

const Proviso = ({ children }: { children: React.ReactNode }) => (
  <div className="my-3 pl-4 border-l-2 border-[#C62828]/30 italic text-[#4A5568]/90 text-[15px] leading-[1.75]">
    {children}
  </div>
);

const SectionHeader = ({ num, title }: { num: string; title: string }) => (
  <div className="mb-8 mt-16 first:mt-0 scroll-mt-28" id={`chapter-${num}`}>
    <div className="flex items-center gap-4">
      <span className="text-[clamp(48px,6vw,80px)] font-black text-[#C62828]/10 leading-none select-none">{num}</span>
      <div>
        <span className="text-xs font-bold text-[#C62828] uppercase tracking-[0.2em] block mb-1">Chapter {num}</span>
        <h2 className="text-[clamp(22px,2.5vw,30px)] font-bold text-[#0D2B5A] leading-tight">{title}</h2>
      </div>
    </div>
    <div className="w-16 h-1 bg-[#C62828] mt-4 rounded-full ml-[4px]" />
  </div>
);

const ActSection = ({ num, title, children }: { num: string; title: string; children: React.ReactNode }) => (
  <div className="mb-10 scroll-mt-32" id={`section-${num.replace(/\./g, '-')}`}>
    <h3 className="text-lg font-bold text-[#0D2B5A] mb-3 flex items-start gap-3">
      <span className="shrink-0 inline-flex items-center justify-center min-w-[40px] h-8 px-2 rounded-md bg-[#C62828]/10 text-[#C62828] text-xs font-bold tracking-wider border border-[#C62828]/10">
        {num}
      </span>
      <span className="leading-snug mt-0.5">{title}</span>
    </h3>
    <div className="pl-[52px] text-[15px] leading-[1.8] text-[#4A5568] space-y-3">
      {children}
    </div>
  </div>
);

export default function Act2018Page() {
  const [activeChapter, setActiveChapter] = useState('I');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      const chapterIds = chapters.map((c) => `chapter-${c.id}`);
      for (let i = chapterIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapterIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveChapter(chapters[i].id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <main className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative bg-[#0D2B5A] text-white border-b-4 border-[#C62828] pt-28 pb-14 lg:pt-32 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(198,40,40,0.15)_0%,transparent_60%)]" />
        <div className="relative max-w-[1240px] mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2.5 text-[13px] font-medium tracking-wide mb-5 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
            <Scale size={14} className="text-[#C62828]" />
            LEGAL FRAMEWORK
          </div>
          <h1 className="text-[clamp(28px,4.5vw,52px)] font-extrabold leading-[1.1] tracking-tight max-w-[24ch]">
            The Govt. Post Graduate College Bahawalnagar <span className="text-[#C62828]">Act 2018</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-[60ch] leading-relaxed text-[15px]">
            Act XI of 2018 — An Act for the establishment of Govt. Post Graduate College Bahawalnagar.
          </p>
        </div>
      </section>

      {/* Meta Bar */}
      <div className="bg-[#F5F7FA] border-b border-black/5">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: FileText, label: 'Act Number', value: 'Act XI of 2018' },
              { icon: Calendar, label: 'Passed', value: '14 March 2018' },
              { icon: BookOpen, label: 'Published', value: '20 March 2018' },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-black/5 rounded-lg p-4 flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#0D2B5A]/5 flex items-center justify-center text-[#0D2B5A]">
                  <item.icon size={20} />
                </div>
                <div>
                  <div className="text-[11px] text-[#64748B] font-semibold uppercase tracking-wider">{item.label}</div>
                  <div className="text-sm font-bold text-[#0D2B5A]">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-28">
              <div className="bg-white border border-black/5 rounded-xl shadow-sm p-5">
                <h3 className="text-xs font-bold text-[#C62828] uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                  <span className="w-4 h-[2px] bg-[#C62828] rounded-full" />
                  Table of Contents
                </h3>
                <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
                  {chapters.map((ch) => (
                    <a
                      key={ch.id}
                      href={`#chapter-${ch.id}`}
                      onClick={() => setMobileNavOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        activeChapter === ch.id
                          ? 'bg-[#0D2B5A] text-white shadow-md'
                          : 'text-[#4A5568] hover:bg-[#F5F7FA] hover:text-[#0D2B5A]'
                      }`}
                    >
                      <span className={`text-xs font-bold ${activeChapter === ch.id ? 'text-[#C62828]' : 'text-[#C62828]/60'}`}>
                        {ch.id}
                      </span>
                      <span className="truncate">{ch.title}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Article */}
          <article className="flex-1 min-w-0">
            {/* Mobile Nav */}
            <div className="lg:hidden mb-8">
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="w-full flex items-center justify-between bg-white border border-black/5 rounded-lg p-4 shadow-sm text-[#0D2B5A] font-semibold text-sm"
              >
                <span>Jump to Chapter</span>
                {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <AnimatePresence>
                {mobileNavOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 bg-white border border-black/5 rounded-lg shadow-sm p-2 space-y-1">
                      {chapters.map((ch) => (
                        <a
                          key={ch.id}
                          href={`#chapter-${ch.id}`}
                          onClick={() => setMobileNavOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#4A5568] hover:bg-[#F5F7FA] hover:text-[#0D2B5A]"
                        >
                          <span className="text-xs font-bold text-[#C62828]/60">{ch.id}</span>
                          {ch.title}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Preamble */}
            <ScrollReveal>
              <div className="mb-14 p-6 lg:p-8 bg-[#F5F7FA] border-l-4 border-[#C62828] rounded-r-xl">
                <p className="text-[15px] leading-[1.8] text-[#4A5568] font-medium">
                  An Act for the establishment of Govt. Post Graduate College Bahawalnagar.
                </p>
                <p className="text-[15px] leading-[1.8] text-[#4A5568] mt-4">
                  It is necessary in public interest to make provisions for the establishment of Govt. Post Graduate College Bahawalnagar inter alia to undertake research and development for purposes of producing high quality technical human resource to cope with the present day requirements; and, to make incidental provisions.
                </p>
                <p className="text-[15px] leading-[1.8] text-[#0D2B5A] mt-4 font-bold">
                  Be it enacted by the Provincial Assembly of the Punjab as follows:
                </p>
              </div>
            </ScrollReveal>

            {/* ─── CHAPTER I ─── */}
            <ScrollReveal>
              <div>
                <SectionHeader num="I" title="Preliminary" />
                <ActSection num="1" title="Short title and commencement.">
                  <p>(1) This Act may be cited as the Govt. Post Graduate College Bahawalnagar Act 2018.</p>
                  <p>(2) It shall come into force at once.</p>
                </ActSection>

                <ActSection num="2" title="Definitions.">
                  <p className="mb-4">In this Act:</p>
                  <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
                    {[
                      ['Academic Council', 'means the Academic Council of the College;'],
                      ['Act', 'means the Govt. Post Graduate College Bahawalnagar Act 2018;'],
                      ['affiliated college', 'means a college or an institute affiliated with the College;'],
                      ['Authority', 'means an Authority of the College;'],
                      ['Chairperson', 'means the head of an academic department and includes the Principal of a constituent college or Director of an institute;'],
                      ['Chancellor', 'means the Chancellor of the College;'],
                      ['Commission', 'means Higher Education Commission set up under the Higher Education Commission Ordinance, 2002 (LIII of 2002);'],
                      ['constituent college', 'means a college maintained and administered by the College;'],
                      ['Controller of Examinations', 'means the Controller of Examinations of the College;'],
                      ['Dean', 'means the head of a Faculty of the College;'],
                      ['department', 'means a teaching, research or technological department maintained and administered by the College in the prescribed manner;'],
                      ['Faculty', 'means an administrative and academic unit of the College consisting of one or more departments, institutes or constituent colleges;'],
                      ['Government', 'means Government of the Punjab;'],
                      ['institute', 'means an institute established, maintained and administered by the College;'],
                      ['prescribed', 'means prescribed by the Rules, Statutes or Regulations;'],
                      ['Pro-Chancellor', 'means the Pro-Chancellor of the College;'],
                      ['Pro-Principal', 'means the Pro-Principal of the College;'],
                      ['Principal', 'means the Principal of the College;'],
                      ['Punjab Higher Education Commission', 'means Punjab Higher Education Commission set up under the Punjab Higher Education Commission Act 2014 (I of 2015);'],
                      ['Registrar', 'means the Registrar of the College;'],
                      ['Statutes, Regulations and Rules', 'respectively mean the Statutes, Regulations and Rules made or deemed to have been made under the Act;'],
                      ['Syndicate', 'means the Syndicate of the College;'],
                      ['teacher', 'includes a Professor, Associate Professor, Assistant Professor or Lecturer, Teaching Assistant, demonstrator and instructor engaged whole time by the College and any other person declared by Regulations as teacher;'],
                      ['College', 'means Govt. Post Graduate College Bahawalnagar;'],
                      ['Principal', 'means the Principal of the College.'],
                    ].map(([term, def], i) => (
                      <div key={i} className="flex gap-2 text-sm text-[#4A5568] leading-relaxed p-3 rounded-lg border border-black/5 bg-white">
                        <span className="text-[#C62828] font-bold shrink-0">({String.fromCharCode(97 + i)})</span>
                        <span><strong className="text-[#0D2B5A]">“{term}”</strong> {def}</span>
                      </div>
                    ))}
                  </div>
                </ActSection>
              </div>
            </ScrollReveal>

            {/* ─── CHAPTER II ─── */}
            <ScrollReveal>
              <div>
                <SectionHeader num="II" title="The College" />
                <ActSection num="3" title="Incorporation.">
                  <NumberedList
                    items={[
                      <>As soon as may be after the commencement of the Act, the existing Govt. Post Graduate College Bahawalnagar shall be reconstituted as Govt. Post Graduate College Bahawalnagar in accordance with the provisions of the Act.</>,
                      <>The College shall be a body corporate by the name of Govt. Post Graduate College Bahawalnagar and shall have a perpetual succession and a common seal and may, by the said name, sue and be sued.</>,
                      <>The College may acquire and hold property, both movable and immovable, and lease, sell or otherwise transfer any property vested in it, or enter into contracts for purposes of the Act in the prescribed manner.</>,
                      <>The College may, with the approval of the Government, open and administer a sub-campus of the College after the expiry of ten years from the establishment of the College.</>,
                      <>All properties, rights and interests of whatever kind used, enjoyed, possessed, owned or vested in the existing Govt. Post Graduate College Bahawalnagar and all liabilities legally subsisting against the said college shall stand transferred to the College.</>,
                      <>An employee, regular or on contract basis, serving the existing Govt. Post Graduate College Bahawalnagar immediately after coming into force of the Act, shall stand transferred to the College, except an employee who is serving that college on deputation, with or without deputation allowance, and shall continue to serve the College as such and be liable to be transferred to the parent department or the College.</>,
                      <>Subject to the procedure notified by the College, an employee serving the existing Govt. Post Graduate College Bahawalnagar on deputation with the College under subsection (6) may, within three hundred and sixty five days from the date of commencement of the Act, opt for absorption in the service of the College on such terms and conditions and in such manner as may be prescribed <Proviso>Provided that such terms and conditions shall not be less favourable than those admissible to such an employee while in service of existing Govt. Post Graduate College Bahawalnagar immediately before his deputation under subsection (6).</Proviso></>,
                    ]}
                  />
                </ActSection>

                <ActSection num="4" title="Functions of the College.">
                  <p className="font-semibold text-[#0D2B5A] mb-2">(1) The College shall:</p>
                  <LetteredList
                    items={[
                      'provide for instructions in such branches of education as it may deem fit, and make provisions for teaching, training, research and for the application, advancement and dissemination of knowledge in such manner as it may determine;',
                      'prescribe courses of studies;',
                      'hold examinations in the prescribed manner and, if a person qualifies the examination, award degree, diploma, certificate and other academic distinction to such person;',
                      'confer, in the prescribed manner, a degree on a person who has successfully conducted research;',
                      'award, in the prescribed manner, an honorary degree or other academic distinctions on such a person as the Chancellor, on the recommendations of the Syndicate, may approve;',
                      'collaborate with other colleges, universities, research and educational institutions and commercial or industrial organizations, in the public or private sector, or other public authorities in such manner and for such purposes as it may determine;',
                      'institute such academic or other offices as may be required by the College;',
                      'create posts in connection with teaching, research, development of education, administration, and for any other purpose relating thereto and appoint persons against those posts;',
                      'establish and support other facilities for education, training and research;',
                      'institute and award financial assistance to students in need, fellowships, scholarships, bursaries, medals and prizes in the prescribed manner;',
                      'establish teaching departments, faculties, institutes, colleges, centres of excellence, laboratories, workshops and other centres of learning for the development of teaching, research and education and make such arrangements for their maintenance, management and administration, as it may determine;',
                      'establish, control and maintain College halls of residence for students and approve any place as a hostel or lodging for students;',
                      'supervise and control the discipline of students of the College and promote co-curriculum and recreational activities of such students and make arrangements for promoting their health and general welfare;',
                      'take disciplinary action against and impose penalty on the students in the prescribed manner;',
                      'charge and receive such fees and other payments as it may determine;',
                      'receive and manage property (acquired or transferred), grants, bequests, trusts, gifts, donations, endowments and other contributions, made to the College, and to invest any fund representing such property, grants, bequests, trusts, gifts, donations, endowments or contributions, and to convert one kind of property into another in such manner as it may deem fit;',
                      'provide for the printing, recording, broadcasting, publication and distribution of teaching material, research reports, papers and other works which may be issued by the College;',
                      'provide career counseling and services in search of job to the students and alumni;',
                      'inspect colleges, affiliated or seeking affiliation;',
                      'affiliate or associate itself with examination bodies and other institutions within Pakistan or abroad and to establish facilities in Pakistan or abroad for the effective discharge of its functions and responsibilities;',
                      'do such other acts, whether incidental to the powers aforesaid or otherwise, as may be required for furthering the objectives of the College as a place of education, learning and research in the relevant disciplines.',
                    ]}
                  />
                  <p className="font-semibold text-[#0D2B5A] mb-2 mt-6">(2) The College may:</p>
                  <LetteredList
                    startChar="a"
                    items={[
                      'institute programmes for the exchange of students and teachers between the College and any other college, university, educational institution or research organization;',
                      'develop and implement fund-raising plans;',
                      'accept, in the prescribed manner, an examination and the period of study spent by a student of the College at any other college, university or place of learning equivalent to an examination or period of study of the College and may withdraw such acceptance;',
                      'cooperate with a public authority, college, university or private organization in the prescribed manner;',
                      'make provisions for research, advisory or consultancy services and, for the purpose, enter into arrangements with other institutions or organizations or with public or private bodies, commercial or industrial enterprises in the prescribed manner;',
                      'admit any college or other educational institution to its privileges or withdraw such privileges in the prescribed manner;',
                      'affiliate or de-affiliate a college or any other educational institution within the territorial limits of the Punjab Province.',
                    ]}
                  />
                </ActSection>

                <ActSection num="5" title="Jurisdiction of the College.">
                  <p>The jurisdiction of the College shall extend to Province of the Punjab.</p>
                </ActSection>

                <ActSection num="6" title="College to be open to all classes and creeds.">
                  <p>Subject to such reasonable restrictions as may be prescribed by the Statutes, the College shall be open to all persons irrespective of gender, religion, race, creed, class or colour and no person shall be denied the privileges of the College on any such ground.</p>
                </ActSection>

                <ActSection num="7" title="Fee and other charges.">
                  <p>The College may, from time to time, but with the approval of the Syndicate, prescribed fees and other charges.</p>
                </ActSection>

                <ActSection num="8" title="Teaching in the College.">
                  <NumberedList
                    items={[
                      'All recognized teaching in various courses in the College, constituent colleges and affiliated colleges shall be conducted in the prescribed manner, and it may include lectures, tutorials, discussions, seminars, demonstrations as well as practical work in laboratories and workshops and other methods of instruction.',
                      'The teaching of any prescribed course in the College, constituent colleges or affiliated colleges shall be organized by such Authority as may be prescribed.',
                      'The courses and the curricula for teaching in the College, constituent colleges and affiliated colleges shall be such as may be prescribed.',
                      'A degree, diploma or certificate shall be granted to a student who fulfills the prescribed requirements for that degree, diploma or certificate.',
                      'A continuous evaluation shall be built into the system of studies.',
                      <>A discipline to be called Islamic and Pakistan Studies shall be offered as a compulsory subject at the Bachelor&apos;s level, in the College and constituent and affiliated colleges but the non-Muslim students may opt for Ethics and Pakistan Studies.</>,
                    ]}
                  />
                </ActSection>
              </div>
            </ScrollReveal>

            {/* ─── CHAPTER III ─── */}
            <ScrollReveal>
              <div>
                <SectionHeader num="III" title="Officers of the College" />
                <ActSection num="9" title="Officers of the College.">
                  <p className="mb-3">The following shall be the officers of the College:</p>
                  <LetteredList
                    items={['Chancellor;', 'Pro-Chancellor;', 'Principal;', 'Pro-Principal;', 'Deans;', 'Chairpersons;', 'Teachers;', 'Registrar;', 'Treasurer;', 'Controller of Examinations;', 'Resident Auditor;', 'Librarian;', 'such other persons as may be prescribed to be officers of the College.']}
                  />
                </ActSection>

                <ActSection num="10" title="Chancellor.">
                  <NumberedList
                    items={[
                      'Governor of the Punjab shall be the Chancellor of the College.',
                      'The College may, with the prior approval of the Chancellor, confer an honorary degree on a person of eminence.',
                      'The Chancellor or his nominee shall preside at the convocation of the College.',
                      <>The Chancellor may, after affording an opportunity of being heard, remove any person from the membership of an Authority if such person: <LetteredList items={['has become of unsound mind;', 'has been subjected to any incapacity which prevents him from functioning as a member of such Authority;', 'has been convicted by a court of law of an offence involving moral turpitude;', 'does not attend five consecutive meetings of the Authority, without intimation to the Principal;', 'has accepted any assignment which involves his absence from the country for a continuous period of more than six months, without intimation to the Principal.']} /></>,
                      'In the performance of his functions under the Act, the Chancellor shall act and shall be bound in the same manner as the Governor of a Province acts and is bound under Article 105 of the Constitution of the Islamic Republic of Pakistan.',
                    ]}
                  />
                </ActSection>

                <ActSection num="11" title="Inspection and inquiry.">
                  <NumberedList
                    items={[
                      'The Chancellor may direct inspection or inquiry into the affairs of the College.',
                      'The Chancellor shall convey the views with regard to the result of the inspection or inquiry to the Syndicate and may, after ascertaining the views of the Syndicate, direct any remedial action to the Syndicate.',
                      'The Syndicate shall, within the time specified by the Chancellor, submit a report to the Chancellor about the action taken on the direction of the Chancellor.',
                      'If the Syndicate fails to take action to the satisfaction of the Chancellor within the specified time, the Chancellor may issue such directions as the Chancellor deems appropriate and the Syndicate shall comply with the directions.',
                      'The Chancellor may set aside a decision or action of the Syndicate, which, in his opinion, is against the law, interest of academic excellence of the College, religious or cultural ideology, or national integrity.',
                    ]}
                  />
                </ActSection>

                <ActSection num="12" title="Revisional powers of the Chancellor.">
                  <p>The Chancellor may, on his own motion or otherwise, call for and examine the record of any proceedings in which an order has been passed by any Authority for purposes of satisfying himself as to the correctness, legality or propriety of any finding or order and may pass such orders as he may deem fit but no order shall be so passed unless the person likely to be affected thereby is afforded an opportunity of being heard.</p>
                </ActSection>

                <ActSection num="13" title="Pro-Chancellor.">
                  <NumberedList
                    items={[
                      'Minister for Education of the Government shall be the Pro-Chancellor of the College.',
                      'The Pro-Chancellor shall perform functions under the Act and exercise such powers of the Chancellor, except the powers under section 10, as may be prescribed or assigned to him by the Chancellor.',
                    ]}
                  />
                </ActSection>

                <ActSection num="14" title="Principal.">
                  <NumberedList
                    items={[
                      'A person who is eligible and is not more than sixty five years of age on the last date fixed for submission of the applications for the post of the Principal may apply for the post.',
                      'The Government shall determine, by notification in the official Gazette, the qualifications, experience and other relevant requirements for the post of the Principal.',
                      'The Government shall constitute, for a term of two years, a Search Committee consisting of not less than three and not more than five members, including at least one expert member, to make recommendations for appointment of the Principal.',
                      'The Search Committee shall follow such procedure and criteria, for selection of the panel for the post of the Principal as the Government may, by notification in the official Gazette, determine.',
                      'The Search Committee shall recommend to the Government, in alphabetical order without any preference, a panel of three persons who, in its opinion, are suitable for appointment as the Principal.',
                      'The Chancellor shall appoint the Principal for each term of four years but he shall serve during the pleasure of the Chancellor.',
                      'The Government shall determine the terms and conditions of service of the Principal.',
                      'The incumbent Principal shall not be allowed any extension in his tenure but subject to eligibility he may again compete for the post of the Principal in accordance with the procedure prescribed by or under this section.',
                      'If the office of the Principal is vacant or the Principal is absent or is unable to perform the functions of the Principal owing to any cause, the Pro-Principal shall perform the functions of the Principal but, if at any time, the office of Pro-Principal is also vacant, or the Pro-Principal is absent or is unable to perform the functions of the Principal owing to any cause, the Chancellor shall make such temporary arrangements for the performance of the duties of the Principal as he may deem fit.',
                      'The Pro-Principal or any other person acting as Principal under subsection (9) shall not, in any case, perform the functions of the Principal for a period of more than six months and the Chancellor shall, within such period, ensure appointment of the Principal under this section.',
                    ]}
                  />
                </ActSection>

                <ActSection num="15" title="Powers of the Principal.">
                  <NumberedList
                    items={[
                      'The Principal shall be the chief executive and academic officer of the College and shall ensure that the provisions of the Act, Statutes, Regulations and Rules are faithfully observed in order to promote teaching, research, educational development, publications, administration and the general efficiency and good order of the College.',
                      'The Principal shall preside over the meetings of the Authorities of which he is the Chairperson and be entitled to attend and preside over any meeting of any other authority or body of the College.',
                      'Subject to such conditions as may be prescribed, the Principal may, in an emergency, take an action which is not otherwise in the competence of the Principal but is in the competence of any other Authority.',
                      'The Principal shall, within seven days of taking an action under subsection (3), submit a report to the members of the Syndicate; and, the Syndicate shall, within forty five days of the action of the Principal, pass such orders as it may deem appropriate.',
                      <>Subject to the general supervision and control of the Syndicate, the Principal may: <LetteredList items={['direct a teacher, officer or other employee of the College to take up such assignment in connection with teaching, research, examination, administration and such other activities in relation to the College as he may deem necessary;', 'sanction expenditure provided for in the approved budget and re-appropriate funds within the same major head of expenditure;', 'sanction and re-appropriate an amount not exceeding rupees one hundred and fifty thousand for an unforeseen item not provided for in the budget and report the action to the Syndicate at its next meeting;', 'appoint paper setters and examiners for all examinations of the College after receiving panels of names from the relevant authorities;', 'make such arrangements for the secrecy and scrutiny of papers, marks and results as he may consider necessary;', 'exercise general control and supervision over the system of examinations in the College;', 'appoint visiting Professors in various disciplines for a period of not more than one academic year on the terms and conditions as prescribed;', 'delegate, subject to such conditions as may be prescribed, any of his powers to a teacher or officer of the College;', 'exercise and perform such other powers as may be prescribed or as may be assigned by the Syndicate.']} /></>,
                      'The Principal shall prepare an annual report on the activities of the College in the preceding academic year including disclosure of facts pertaining to academics, research, administration and finances of the College.',
                      'The Principal shall, within three months of the end of the academic year, submit the report under sub-section (6) to the Syndicate.',
                    ]}
                  />
                </ActSection>

                <ActSection num="16" title="Pro-Principal.">
                  <NumberedList
                    items={[
                      'The Chancellor shall nominate the Pro-Principal of the College, from amongst three senior most Professors of the College, for a term of three years.',
                      'The Pro-Principal shall perform such functions as may be assigned to him under the Act, Statutes or Regulations.',
                      'The Syndicate or the Principal may assign any other functions to the Pro-Principal in addition to his duties as Professor.',
                    ]}
                  />
                </ActSection>

                <ActSection num="17" title="Registrar.">
                  <NumberedList
                    items={[
                      'The Registrar shall be a whole time officer of the College and shall be the administrative head of the secretariat of the College and be responsible for the provision of the secretarial support to the Syndicate and the Principal.',
                      'No person shall be appointed as Registrar unless he possesses the prescribed qualifications, experience and other requirements, if any.',
                      'The Syndicate shall recommend to the Government, in alphabetical order, a panel of three persons short-listed through a competitive process for appointment as Registrar.',
                      'The Chancellor, on the advice of the Chief Minister, shall appoint the Registrar for each term of three years in such manner and on such terms and conditions as may be prescribed.',
                      <>The Registrar, under the general supervision of the Principal, shall: <LetteredList items={['be the custodian of the Common Seal and the academic records of the College;', 'maintain a register of the students and Registered Graduates in the prescribed manner;', 'supervise the conduct of elections of members to the various authorities in the prescribed manner;', 'be the Secretary of the Syndicate, the Academic Council, the Advanced Studies and Research Board, the Selection Board and such other Committees as may be prescribed;', 'perform such other duties as may be prescribed or as the Principal or the Syndicate may assign.']} /></>,
                      'When the office of the Registrar is vacant or the Registrar is absent or unable to perform his functions owing to any cause, the Chancellor shall make temporary arrangements for the performance of duties of the Registrar but the period of such temporary arrangements shall not exceed six months, and the Registrar shall be appointed during that period.',
                    ]}
                  />
                </ActSection>

                <ActSection num="18" title="Treasurer.">
                  <NumberedList
                    items={[
                      'The Treasurer shall be a whole time officer of the College.',
                      'No person shall be appointed as Treasurer unless he possesses the prescribed qualifications, experience and other requirements, if any.',
                      'The Syndicate shall recommend to the Government, in alphabetical order, a panel of three persons short-listed through a competitive process for appointment as Treasurer.',
                      'The Chancellor, on the advice of the Chief Minister, shall appoint the Treasurer for each term of three years in such manner and on such terms and conditions as may be prescribed.',
                      <>The Treasurer shall: <LetteredList items={['manage the assets, liabilities, receipts, expenditure, funds and investments of the College;', 'prepare the annual and revised budget estimates of the College and present the estimates to the Finance and Planning Committee and the Syndicate;', 'ensure that the funds of the College are spent for the purposes for which they are provided;', 'ensure that the accounts of the College are audited annually and are available for submission to the Syndicate by 31st December each year;', 'perform such other functions as may be prescribed or as the Principal or the Syndicate may assign.']} /></>,
                      'The Treasurer shall be the Secretary of the Finance and Planning Committee.',
                      'When the office of the Treasurer is vacant or the Treasurer is absent or unable to perform his functions owing to any cause, the Chancellor shall make temporary arrangements for the performance of duties of the Treasurer but the period of such temporary arrangements shall not exceed six months, and the Treasurer shall be appointed during that period.',
                    ]}
                  />
                </ActSection>

                <ActSection num="19" title="Controller of Examinations.">
                  <NumberedList
                    items={[
                      'The Controller of Examinations shall be a whole time officer of the College.',
                      'No person shall be appointed as Controller of Examinations unless he possesses the prescribed qualifications, experience and other requirements, if any.',
                      'The Syndicate shall recommend to the Government, in alphabetical order, a panel of three persons short-listed through a competitive process for appointment as Controller of Examinations.',
                      'The Chancellor, on the advice of the Chief Minister, shall appoint the Controller of Examinations for each term of three years in such manner and on such terms and conditions as may be prescribed.',
                      'The Controller of Examinations shall be responsible for all matters connected with the conduct of examinations and shall perform such other duties as may be prescribed or as the Principal or the Syndicate may assign.',
                      'When the office of the Controller of Examinations is vacant or the Controller of Examinations is absent or unable to perform his functions owing to any cause, the Chancellor shall make temporary arrangements for the performance of duties of the Controller of Examinations but the period of such temporary arrangements shall not exceed six months, and the Controller of Examinations shall be appointed during that period.',
                    ]}
                  />
                </ActSection>

                <ActSection num="20" title="Resident Auditor.">
                  <NumberedList
                    items={[
                      'The Syndicate shall appoint, on deputation from amongst the panel recommended by the Government, the Resident Auditor of the College.',
                      'The College shall request the Government to send a panel of three Government officers qualified to be appointed as the Resident Auditor of the College.',
                      'The Resident Auditor shall hold office for each term of three years.',
                      'The Resident Auditor shall perform such functions as are prescribed or as the Syndicate may assign.',
                    ]}
                  />
                </ActSection>

                <ActSection num="21" title="Other appointments.">
                  <p>The College may appoint such persons in its service as may be necessary in such manner and on such terms and conditions as may be prescribed.</p>
                </ActSection>
              </div>
            </ScrollReveal>

            {/* ─── CHAPTER IV ─── */}
            <ScrollReveal>
              <div>
                <SectionHeader num="IV" title="Authorities of the College" />
                <ActSection num="22" title="Authorities of the College.">
                  <p className="mb-3">The following shall be the Authorities of the College:</p>
                  <LetteredList
                    items={['Syndicate;', 'Academic Council;', 'Boards of Faculties;', 'Board of Advanced Studies and Research;', 'Board of Studies;', 'Selection Board;', 'Finance and Planning Committee;', 'Affiliation Committee;', 'Discipline Committee;', 'such other Authorities as may be prescribed under the Statutes.']}
                  />
                </ActSection>

                <ActSection num="23" title="Syndicate.">
                  <p className="font-semibold text-[#0D2B5A] mb-2">(1) The Syndicate shall consist of:</p>
                  <LetteredList
                    items={[
                      'Principal (Chairperson);',
                      'Pro-Principal;',
                      'Secretary to the Government, Education Department or his nominee not below the rank of an Additional Secretary;',
                      'Secretary to the Government, Finance Department or his nominee not below the rank of an Additional Secretary;',
                      'Secretary to the Government, Law and Parliamentary Affairs Department or his nominee not below the rank of an Additional Secretary;',
                      'Chairperson of the Commission or his nominee not below the rank of a whole-time member of the Commission;',
                      'Chairperson, Punjab Higher Education Commission or his nominee not below the rank of a Director General;',
                      'two members of Provincial Assembly of the Punjab, including at least one female member of the Assembly, to be nominated by the Speaker of the Assembly;',
                      'one Principal of a public sector college in the Province to be nominated by the Chancellor;',
                      'two Deans to be nominated by the Chancellor;',
                      'one principal of an affiliated college to be nominated by the Government;',
                      'five persons, including at least two women, of eminence to be nominated by the Chancellor.',
                    ]}
                  />
                  <NumberedList startNum={2} items={['The Registrar shall be the Secretary of the Syndicate.', 'The members of the Syndicate, other than ex officio members, shall be appointed for a term of three years but they shall serve during the pleasure of the Chancellor.', 'The quorum for a meeting of the Syndicate shall be one half of the total number of members, a fraction being counted as one.', 'The Registrar shall, with the approval of the Chairperson of the Syndicate, summon a meeting of the Syndicate.', 'The Syndicate shall take decisions by majority of the votes of the members present and voting and the Registrar shall clearly reflect in the minutes of the meeting the dissent, if any, along with the reasons of such dissent. The Chairperson shall have a casting vote in case of equality in votes.']} />
                </ActSection>

                <ActSection num="24" title="Powers and duties of the Syndicate.">
                  <p className="font-semibold text-[#0D2B5A] mb-2">(1) The Syndicate shall be the executive body of the College and shall, subject to the provisions of the Act and the Statutes, take effective measures to raise the standard of teaching, research, educational development, publication and other academic pursuits and exercise general supervision over the affairs of the College and management of the property of the College.</p>
                  <p className="font-semibold text-[#0D2B5A] mb-2">(2) Without prejudice to the generality of the foregoing powers and subject to the provisions of the Act, the Syndicate may:</p>
                  <LetteredList
                    items={[
                      'hold, control and administer the property and funds of the College;',
                      'govern and regulate, with due regard to the advice of the Finance and Planning Committee in this behalf, the finances, accounts and investments of the College and for that purpose, appoint such agents as it may deem fit;',
                      'consider and approve the annual report, the annual and revised budget estimates and re-appropriate funds from one major head of expenditure to another;',
                      'transfer and accept transfer of movable or immovable property on behalf of the College;',
                      'enter into, vary, carry out or cancel contracts on behalf of the College;',
                      'cause proper books of account to be kept for all sums of money received and expended by the College and for the assets and liabilities of the College;',
                      'invest any money belonging to the College including any unapplied income in any of the securities described in section 20 of the Trusts Act 1882 (II of 1882), or in the purchase of immovable property or in such other manner, as it may determine, with the like powers of varying such investments;',
                      'receive and manage any property transferred, grants, bequests, trusts, gifts, donations, endowments and other contributions made to the College;',
                      'determine the form, custody and regulations of the use of the common seal of the College;',
                      'provide buildings, libraries, premises, furniture, apparatus, equipment and other means required for carrying out the work of the College;',
                      'establish and maintain halls of residence and hostels or approve or license hostels or lodgings for the residence of students;',
                      'affiliate or de-affiliate a college and an institute;',
                      'admit educational institutions to the privileges of the College and withdraw such privileges;',
                      'arrange for the inspection of the academic departments;',
                      'institute Professorships, Associate Professorships, Assistant Professorships, Lectureships and other posts, and suspend or abolish such posts;',
                      'create, suspend or abolish such administrative, technical, research, extension or other posts as may be necessary;',
                      'appoint College teachers and other officers on the recommendation of the Selection Board for teaching and other managerial posts;',
                      'confer, with prior approval of the Chancellor, an honorary degree on a person of eminence in the prescribed manner;',
                      'prescribe the duties of the officers, teachers and other employees of the College and of those working in the College on deputation or on contract;',
                      'appoint members to the various Authorities, committees and bodies in the prescribed manner;',
                      'remove any person from the membership of an Authority if such person has accepted any assignment which involves absence from the College for a continuous period of more than six months;',
                      'regulate, determine and administer, all other matters concerning the College and for the purpose exercise all necessary powers not specifically mentioned in the Act and Statutes but not inconsistent with the provisions of the Act and Statutes;',
                      'appoint Professor Emeritus on such terms and conditions as may be prescribed;',
                      'suspend, punish and remove from service in the prescribed manner officers, teachers and employees whom it is empowered to appoint;',
                      'approve Statutes and recommend those drafts of the Statutes, for approval of the Chancellor, which pertain to terms and conditions of service of the College employees;',
                      'approve Regulations recommended by the academic council;',
                      'perform such other functions as may be assigned to it under the Act and the Statutes.',
                    ]}
                  />
                  <p className="font-semibold text-[#0D2B5A] mb-2 mt-6">(3) The Syndicate may delegate any of its functions to an Authority or officer or a committee or sub-committee, except the following functions:</p>
                  <LetteredList
                    startChar="a"
                    items={[
                      'approval of Statutes or recommendation of the drafts of the Statutes to the Chancellor;',
                      'approval of Regulations;',
                      'approval of annual budget of the College, annual report, the annual and revised budget estimates and re-appropriation of funds from one major head of expenditure to another;',
                      'approval of investment or purchase of immovable property by the College;',
                      'transfer of immovable property of the College.',
                    ]}
                  />
                </ActSection>

                <ActSection num="25" title="Academic Council.">
                  <p className="font-semibold text-[#0D2B5A] mb-2">(1) The Academic Council shall consist of:</p>
                  <LetteredList
                    items={[
                      'Principal (Chairperson);',
                      'Pro-Principal;',
                      'Deans;',
                      'Director, Board of Advanced Studies and Research;',
                      'two senior most Professors, other than ex officio members, from each academic department;',
                      'all Professors Emeritus;',
                      'Chairpersons of the academic departments;',
                      'two Associate Professors, two Assistant Professors and two Lecturers, to be elected by and from amongst themselves, out of whom at least two shall be women;',
                      'an eminent person each in pure sciences, social sciences and Arts to be nominated by the Chancellor in consultation with the Principal but one of them shall be a woman;',
                      'Secretary to the Government, Higher Education Department or his nominee not below the rank of a Deputy Secretary;',
                      'Director Public Instructions (Colleges) of the Government;',
                      'Librarian of the College;',
                      'Controller of Examinations;',
                      'five experts in the field of education, including at least two women, to be nominated by the Chancellor;',
                      'Registrar (Member/Secretary).',
                    ]}
                  />
                  <NumberedList startNum={2} items={['A member of the Academic Council, other than an ex officio member, shall hold office for three years; and, the vacancy, if any, shall be filled for the remaining period in the prescribed manner.', 'The quorum for a meeting of the Academic Council shall be one-third of the total number of members, a fraction being counted as one.']} />
                </ActSection>

                <ActSection num="26" title="Powers and duties of the Academic Council.">
                  <p className="font-semibold text-[#0D2B5A] mb-2">(1) The Academic Council shall be the academic body of the College and shall, subject to the provisions of the Act, the Statutes and the Regulations, have the powers to lay down proper standards of instruction, research, publication and examination and to regulate and promote the academic life of the College and affiliated colleges.</p>
                  <p className="font-semibold text-[#0D2B5A] mb-2">(2) In particular and without prejudice to the generality of the foregoing provisions, the Academic Council may:</p>
                  <LetteredList
                    items={[
                      'advise the Syndicate on academic matters;',
                      'regulate teaching, research and examinations;',
                      'regulate the admission of students to the courses of studies and examinations of the College and affiliated colleges or institutes;',
                      'regulate the award of studentships, scholarships, medals and prizes;',
                      'regulate the conduct and discipline of students of the College and affiliated colleges and institutes;',
                      'propose to the Syndicate the schemes for the constitution and organization of faculties, institutes and other academic bodies;',
                      'propose regulations on the recommendations of the Boards of Faculties and the Boards of Studies for consideration and approval of the Syndicate;',
                      'propose for each academic year, on the recommendations of the Boards of Studies, Regulations prescribing the courses of studies, the syllabi and the outlines of tests for all examinations; but, if the recommendations of a Board of Faculties or Board of Studies are not received by the prescribed date, the Academic Council may, subject to the approval of the Syndicate, permit such Regulations to continue for the following year;',
                      'recognize the examinations of other colleges, Universities or examining bodies as equivalent to the corresponding examinations of the College;',
                      'appoint members to the Authorities in accordance with the provisions of the Act;',
                      'perform such other functions as may be prescribed or assigned by the Syndicate.',
                    ]}
                  />
                </ActSection>

                <ActSection num="27" title="Boards of Faculty.">
                  <p className="font-semibold text-[#0D2B5A] mb-2">(1) There shall be a Board of Faculty for each Faculty which shall consist of:</p>
                  <LetteredList items={['Dean of the Faculty (Chairperson);', 'Professors and the Chairpersons in the Faculty;', 'two members to be nominated by the Academic Council on the basis of their specialized knowledge of the subjects which, though not assigned to the Faculty, have in the opinion of the Academic Council, important bearing on the subjects assigned to the Faculty;', 'two experts, including at least one woman, in the field from outside the College to be appointed by the Syndicate;', 'one member from amongst the officers of the College to be nominated by the Principal.']} />
                  <NumberedList startNum={2} items={['The members, other than ex officio members, of a Board of Faculty shall hold office for a period of three years.', 'The quorum for a meeting of a Board of Faculty shall be one half of the total number of members, a fraction being counted as one.']} />
                  <p className="font-semibold text-[#0D2B5A] mb-2 mt-4">(4) A Board of Faculty, subject to the general control of the Syndicate and Academic Council, may:</p>
                  <LetteredList items={['co-ordinate the teaching and research work in the subjects assigned to the Faculty;', 'scrutinize the recommendations of the Board of Studies in the Faculty with regard to the appointment of paper setters and examiners for graduate and postgraduate examinations and to forward the panels of suitable paper setters and examiners for each examination to the Principal;', 'consider any other academic matter relating to the Faculty and submit its report to the Academic Council;', 'prepare a comprehensive annual report regarding the performance of each department, constituent college or institute in the Faculty for presentation to the Academic Council;', 'perform such other functions as may be prescribed by Statutes.']} />
                </ActSection>

                <ActSection num="28" title="Dean.">
                  <NumberedList
                    items={[
                      'There shall be a Dean of each Faculty and the Dean shall be the Chairperson and Convener of the Board of Faculty.',
                      <>The Chancellor shall appoint the Dean of a Faculty from amongst the three senior most Professors in the Faculty for a period of three years and he shall be eligible for re-appointment: <Proviso>Provided that if no Professor is available in a Faculty, a Professor from some other Faculty may act as Dean till a Professor of the Faculty itself is appointed.</Proviso></>,
                      'The Dean shall present candidates for admission to degrees, except honorary degrees, in the courses falling within the purview of the Faculty.',
                      'The Dean shall exercise such administrative and academic powers as may be delegated to him.',
                    ]}
                  />
                </ActSection>

                <ActSection num="29" title="Teaching Departments and Chairpersons.">
                  <NumberedList
                    items={[
                      'There shall be a teaching department or an institute for each subject or a group of subjects, as may be prescribed by the Regulations and each teaching department or an institute shall be headed by the Chairperson.',
                      <>The Chairperson of a teaching department or an Institute shall be appointed by the Syndicate on the recommendation of the Principal from amongst the three senior most Professors of the department or, as the case may be, the institute for a period of three years and shall be eligible for re-appointment but if, in a Department or Institute, three Professors are not available, the appointment shall be made from amongst the three senior most Professors and Associate Professors of the Department or Institute: <Proviso>Provided that in a Department or an Institute, where there is no Professor or Associate Professor, no such appointment shall be made and the department or institute shall be looked after by the Dean of the Faculty with the assistance of the senior most teacher of the department or institute.</Proviso></>,
                      'The Chairperson shall plan, organize and supervise the work of the department or institute and shall be responsible to the Dean for the work of his department or institute.',
                    ]}
                  />
                </ActSection>

                <ActSection num="30" title="Board of Advanced Studies and Research.">
                  <p className="font-semibold text-[#0D2B5A] mb-2">(1) The Board of Advanced Studies and Research shall consist of:</p>
                  <LetteredList items={['Principal (Chairperson);', 'all the Deans;', 'Controller of Examinations;', 'one College Professor from each Faculty to be nominated by the Syndicate;', 'one member from amongst the officers of the College to be nominated by the Principal;', 'three members from the relevant field, research organizations and the Government, including at least one woman from any of the categories, to be nominated by the Syndicate;', 'Registrar (Secretary).']} />
                  <NumberedList startNum={2} items={['The term of office of the members of the Board of Advanced Studies and Research, other than ex officio members, shall be three years.', 'The quorum for a meeting of the Board of Advanced Studies and Research shall be one half of the total number of members, a fraction being counted as one.']} />
                </ActSection>

                <ActSection num="31" title="Functions of the Board of Advanced Studies and Research.">
                  <p className="mb-3">The Board of Advanced Studies and Research shall:</p>
                  <LetteredList items={['advise the Authorities on all matters connected with the promotion of advanced studies and research publications in the College;', 'consider and report to the Authorities with regard to a research degree of the College;', 'propose regulations regarding the award of a research degree;', 'appoint supervisors for a postgraduate research student and to approve title and synopsis of a thesis or dissertation;', 'recommend panels of names of examiners for evaluation of a research examination;', 'perform such other functions as may be prescribed by the Statutes.']} />
                </ActSection>

                <ActSection num="32" title="Board of Studies.">
                  <NumberedList
                    items={[
                      'There shall be a separate Board of Studies for each subject or group of subjects as may be prescribed by Regulations.',
                      <>A Board of Studies shall consist of: <LetteredList items={['all the teachers of the department concerned;', 'experts or teachers, not less than three but not more than five, other than College teachers, to be determined and appointed by the Syndicate according to the need of each Board;', 'not more than five teachers of the affiliated colleges, teaching graduate and post-graduate courses in that subject, to be nominated by the Academic Council.']} /></>,
                      'The term of office of members of a Board of Studies other than ex officio members shall be three years.',
                      'The quorum for a meeting of the Board of Studies shall be one-half of the total number of members, a fraction being counted as one.',
                      'The Chairperson of the concerned department or institute shall be the Chairperson of the Board of Studies.',
                    ]}
                  />
                </ActSection>

                <ActSection num="33" title="Functions of Board of Studies.">
                  <p className="mb-3">A Board of Studies shall perform the following functions:</p>
                  <LetteredList items={['to advise the Authorities on all academic matters connected with instruction, publication, research and examination in the subject or subjects concerned;', 'to propose curricula and syllabi for all degrees, diplomas and certificate courses in the subject or subjects concerned;', 'to suggest a panel of names of paper setters and examiners in the subject or subjects concerned;', 'to perform such other functions as may be prescribed by the Regulations.']} />
                </ActSection>

                <ActSection num="34" title="Selection Board.">
                  <p className="font-semibold text-[#0D2B5A] mb-2">(1) The Selection Board shall consist of:</p>
                  <LetteredList items={['Principal (Chairperson);', 'Dean of the Faculty concerned;', 'Chairperson concerned;', 'one member of the Syndicate to be nominated by the Syndicate;', 'one eminent scholar to be nominated by the Syndicate;', 'two experts, including at least one woman, to be nominated by the Government;', 'Registrar (Secretary).']} />
                  <NumberedList startNum={2} items={['The members, other than ex officio members, shall hold office for a period of three years.', 'Five members, including at least one expert, shall constitute the quorum for a meeting of the Selection Board.', 'No member who is a candidate or whose family member is a candidate, for a post to which appointment is to be made, shall take part in the proceedings of the Selection Board for selection of a candidate to such post.', 'In selection of candidates for the post of Professor or Associate Professor, the Selection Board shall co-opt or consult three experts in the subject and in selecting candidates for any other teaching post, two experts in the subject, to be nominated by the Principal from a standing list of experts for each subject approved by the Syndicate.', 'The Syndicate may approve or revise the standing list of experts of a subject on the recommendation of the Selection Board.']} />
                </ActSection>

                <ActSection num="35" title="Functions of the Selection Board.">
                  <p className="mb-3">The Selection Board shall:</p>
                  <LetteredList items={['consider the applications and recommend to the Syndicate, the names of suitable candidates for appointment to teaching and other posts and recommend suitable salary for the selected candidate;', 'consider all cases of promotion of officers of the College and recommend the names of suitable candidates for such promotion to the Syndicate.']} />
                </ActSection>

                <ActSection num="36" title="Finance and Planning Committee.">
                  <p className="font-semibold text-[#0D2B5A] mb-2">(1) The Finance and Planning Committee shall consist of:</p>
                  <LetteredList items={['Principal (Chairperson);', 'all the Deans;', 'one member of the Syndicate to be nominated by the Syndicate;', 'one member of the Academic Council to be nominated by the Academic Council;', 'one representative each from Higher Education Department and Finance Department of the Government not below the rank of a Deputy Secretary;', 'Director Planning or any other nominee of the Commission;', 'one nominee, who deals with finance and planning, of Punjab Higher Education Commission;', 'Registrar;', 'Treasurer (Secretary).']} />
                  <NumberedList startNum={2} items={['The term of office of the nominated members shall be three years.', 'Six members of the Finance and Planning Committee shall constitute the quorum for a meeting of the Finance and Planning Committee.']} />
                </ActSection>

                <ActSection num="37" title="Functions of the Finance and Planning Committee.">
                  <p className="mb-3">The Finance and Planning Committee shall:</p>
                  <LetteredList items={['prepare the annual statement of accounts, propose annual budget estimates and make recommendations to the Syndicate;', 'periodically review the financial position of the College;', 'advise the Syndicate on all matters relating to finance, investments and accounts of the College;', 'perform such other functions as may be prescribed by the Statutes.']} />
                </ActSection>

                <ActSection num="38" title="Affiliation Committee.">
                  <NumberedList
                    items={[
                      <>The Affiliation Committee shall consist of: <LetteredList items={['the Chairperson to be nominated by the Syndicate;', 'two Professors to be nominated by the Academic Council;', 'two teachers to be nominated by the Syndicate;', 'a representative of the Higher Education Department not below the rank of Deputy Secretary.']} /></>,
                      'The term of office of the members of the Committee, other than ex officio members, shall be two years.',
                      'The Affiliation Committee may co-opt not more than three experts who shall be counted for the quorum of an inspection by the Affiliation Committee.',
                      'The quorum for a meeting of, or an inspection by, the Affiliation Committee shall be three.',
                      'The Deputy Registrar dealing with the affiliation cases or such other person as may be designated by the Principal for this purpose shall act as Secretary of the Committee.',
                    ]}
                  />
                </ActSection>

                <ActSection num="39" title="Functions of the Affiliation Committee.">
                  <p className="mb-3">The functions of the Affiliation Committee shall be to:</p>
                  <LetteredList items={['inspect the educational institution seeking affiliation with, or admission to, the privileges of the College and to advise the Syndicate thereon;', 'inquire into complaints alleging breach of conditions of affiliation by the affiliated colleges and to advise the Syndicate thereon;', 'perform such other functions as may be prescribed by the Regulations.']} />
                </ActSection>

                <ActSection num="40" title="Discipline Committee.">
                  <NumberedList
                    items={[
                      <>The Discipline Committee shall consist of: <LetteredList items={['the Chairperson to be nominated by the Principal;', 'two Professors to be nominated by the Academic Council;', 'two Professors to be nominated by the Syndicate;', 'the teacher or officer-in-charge of students&apos; affairs, by whatever name called (Member/Secretary).']} /></>,
                      'The term of office of the members of the Committee, other than ex officio members, shall be two years.',
                      'The quorum for a meeting of Discipline Committee shall be four members.',
                    ]}
                  />
                </ActSection>

                <ActSection num="41" title="Functions of the Discipline Committee.">
                  <p className="mb-3">The functions of the Discipline Committee shall be to:</p>
                  <LetteredList items={['propose Regulations to the Academic Council relating to the conduct of College students, maintenance of discipline and breach of discipline;', 'perform such other functions as may be prescribed by Statutes.']} />
                </ActSection>

                <ActSection num="42" title="Appointment of Committees by Authorities.">
                  <p>An Authority may, from time to time, appoint such standing, special or advisory committees as it may deem fit, and may nominate such persons on the committees as are not members of the Authorities appointing the committees.</p>
                </ActSection>
              </div>
            </ScrollReveal>

            {/* ─── CHAPTER V ─── */}
            <ScrollReveal>
              <div>
                <SectionHeader num="V" title="Statutes, Regulations and Rules" />
                <ActSection num="43" title="Statutes.">
                  <p className="font-semibold text-[#0D2B5A] mb-2">(1) Subject to the provisions of the Act, the Syndicate may make Statutes to provide for and regulate all or any of the following matters:</p>
                  <LetteredList
                    items={[
                      'scales of pay, method of recruitment and other terms and conditions of service of officers, teachers and other employees of the College and the constitution of their pension, insurance, gratuity, provident fund and benevolent fund;',
                      'conduct and discipline of the officers, teachers and other employees of the College;',
                      'constitution, powers and duties of the Authorities and related matters;',
                      'affiliation and de-affiliation of colleges or institutes, and related matters;',
                      'admission of educational institutions to the privileges of the College and withdrawal of such privileges;',
                      'establishment of institutes, faculties, constituent colleges, departments and academic divisions;',
                      'powers and duties of officers, teachers and employees of the College;',
                      'conditions for appointment of Professors Emeritus;',
                      'conditions on which the College may enter into arrangements with public bodies or other organizations for purposes of research and advisory services;',
                      'general scheme of studies including the duration of courses, the system of examinations and the number of subjects and papers for examinations;',
                      'award of honorary degrees;',
                      'maintenance of register of students and registered graduates;',
                      'all other matters which are to be prescribed or regulated by the Statutes.',
                    ]}
                  />
                  <NumberedList startNum={2} items={['The Syndicate shall propose the draft of Statutes under clause (a) of subsection (1) to the Chancellor who may approve the Statutes, with or without any modifications, or may refer the Statutes back to the Syndicate for reconsideration or may reject the Statutes:', <Proviso key="p">Provided that: <LetteredList items={['the Statutes affecting the constitution or powers of any Authority shall not be proposed or approved until such Authority has been given an opportunity of expressing its opinion in writing on the proposal;', 'the Statutes under clause (a) of subsection (1) shall not be effective until they have been approved by the Chancellor.']} /></Proviso>]} />
                </ActSection>

                <ActSection num="44" title="Regulations.">
                  <p className="font-semibold text-[#0D2B5A] mb-2">(1) Subject to the provisions of the Act and the Statutes, Regulations may be framed for any of the following matters:</p>
                  <LetteredList
                    items={[
                      'courses of study for degrees, diplomas and certificates of the College;',
                      'manner of teaching in the College and affiliated colleges;',
                      'admission of students to the College and conditions under which they are admitted or allowed to take courses and examinations of the College and become eligible for the award of degrees, diplomas and certificates;',
                      'conduct of examinations;',
                      'fees and other charges to be paid by the students for admission to the courses of study and the examinations of the College;',
                      'conduct and discipline of students of the College;',
                      'conditions of residence of the students of the College including levying of fees for residence in halls of residence and hostels;',
                      'approval and licensing of hostels and lodgings;',
                      'conditions under which a person should conduct research to entitle him to a degree;',
                      'institution of fellowships, scholarships, exhibitions, medals and prizes;',
                      'institution of stipends and free and half-free studentship;',
                      'academic costumes;',
                      'use of the library;',
                      'establishment of academic departments.',
                    ]}
                  />
                  <NumberedList startNum={2} items={['The Academic Council shall prepare and submit the Regulations to the Syndicate and the Syndicate may approve the Statutes, with or without modifications or refer them back to the Academic Council for reconsideration or reject them.']} />
                </ActSection>

                <ActSection num="45" title="Rules.">
                  <NumberedList items={['An Authority or a body of the College may make Rules consistent with the Act, Statutes and Regulations, to regulate the conduct of its business.', 'The Syndicate may direct an Authority or a body of the College to amend or repeal any Rules made by the Authority or body.']} />
                </ActSection>
              </div>
            </ScrollReveal>

            {/* ─── CHAPTER VI ─── */}
            <ScrollReveal>
              <div>
                <SectionHeader num="VI" title="Finances" />
                <ActSection num="46" title="College Fund.">
                  <NumberedList
                    items={[
                      'There shall be a Fund to be known as the Govt. Post Graduate College Bahawalnagar Fund to which shall be credited its income from fees, donations, trusts, bequests, endowments, contributions, grants, and other sources.',
                      'The College may accept donations in the shape of land, vehicles, equipment or any other items that may facilitate the functioning of the College and all such donations shall be used, maintained and disposed of by the College in the prescribed manner.',
                    ]}
                  />
                </ActSection>

                <ActSection num="47" title="Budget, audit and accounts.">
                  <NumberedList
                    items={[
                      'The budget of the College shall be approved and its accounts shall be maintained and audited in such manner as may be prescribed by the Syndicate.',
                      <>No expenditure shall be made from the College fund unless: <LetteredList items={['the expenditure is included in the approved budget of the College;', 'a bill for its payment has been audited by the Resident Auditor in conformity with the Statutes, Regulations and Rules.']} /></>,
                      'The annual statement of accounts of the College signed by the Treasurer and the Resident Auditor shall be submitted to the Government within six months of the closing of the financial year.',
                      'The accounts of the College together with audit objections, if any, and the observations of the Auditor appointed by the Government and the Treasurer shall, in the prescribed manner, be presented to the Syndicate with the remarks of the Finance and Planning Committee.',
                    ]}
                  />
                </ActSection>
              </div>
            </ScrollReveal>

            {/* ─── CHAPTER VII ─── */}
            <ScrollReveal>
              <div>
                <SectionHeader num="VII" title="Miscellaneous" />
                <ActSection num="48" title="Appeal and review.">
                  <NumberedList
                    items={[
                      <>Subject to sub-section (2) and sub-section (3), where an order is made punishing any officer, other than the Principal, teacher or other employee of the College or altering or interpreting to his disadvantage the prescribed terms or conditions of his service, he shall, where the order is made by the Principal or any other officer or teacher of the College, have the right to appeal to the Syndicate, against the order, and where the order is made by the Syndicate, have the right to appeal to the Chancellor for review of that order, within thirty days of the receipt of the order.</>,
                      'The application for review shall be submitted to the Principal and he shall present it to the Chancellor with his comments.',
                      'An order under this section shall not be passed unless the person to be affected thereby is afforded an opportunity of being heard.',
                    ]}
                  />
                </ActSection>

                <ActSection num="49" title="Tripartite mobility.">
                  <NumberedList
                    items={[
                      'Any officer, teacher of the Government or employee of the College, on the recommendation of the Syndicate, may be directed to serve in any post in the College or under the Government or an educational or research institution in public interest.',
                      'The Government may, in consultation with the Selection Board, place the services of an employee of the Government or of any other College or an educational or research institution at the disposal of the College in the public interest.',
                      'The terms and conditions of service of an officer or employee under this section shall not be less favourable than those enjoyed by him immediately before his services are placed at the disposal of the College, Government, educational or research institution, and full benefit of his previous service shall continue to remain in force until altered in accordance with law.',
                    ]}
                  />
                </ActSection>

                <ActSection num="50" title="Transition.">
                  <p>The Chancellor shall constitute a Chancellor&apos;s Committee to exercise the powers assigned to the Syndicate under the Act till such time the Syndicate is constituted in accordance with the provisions of the Act or until expiry of one year from the date of establishment of the College, whichever is earlier.</p>
                </ActSection>

                <ActSection num="51" title="Removal of difficulties.">
                  <p>If any difficulty arises in giving effect to any of the provisions of the Act, the Government may give such directions, not inconsistent with the Act, as it may consider necessary for the removal of such difficulty.</p>
                </ActSection>

                <ActSection num="52" title="Indemnity.">
                  <p>No suit or legal proceedings shall lie against the Government, the College or any Authority, officer or employee of the Government or the College or any person in respect of anything which is done in good faith under the Act.</p>
                </ActSection>

                <ActSection num="53" title="Savings.">
                  <p>On the commencement of the Act, everything done, action taken, obligations and liabilities incurred, rights and assets acquired, persons appointed or authorized, jurisdictions or powers conferred, endowments, bequests, funds or trusts created, donations or grants made, orders issued immediately before the commencement of the Act in respect of existing Govt. Post Graduate College Bahawalnagar shall be deemed to have respectively been done, taken, incurred, acquired, appointed, conferred, created, made or issued under the Act.</p>
                </ActSection>

                <ActSection num="54" title="Repeal.">
                  <p>The Govt. Post Graduate College Bahawalnagar Ordinance 2017 (XVI of 2017) is hereby repealed.</p>
                </ActSection>

                {/* Footer note */}
                <div className="mt-12 p-4 bg-[#F5F7FA] border border-black/5 rounded-lg text-[13px] text-[#64748B] leading-relaxed">
                  <p className="font-medium text-[#0D2B5A]">Note:</p>
                  <p>This Act was passed by the Punjab Assembly on 14 March 2018; assented to by the Governor of the Punjab on 19 March 2018; and, was published in the Punjab Gazette (Extraordinary), dated 20 March 2018, pages 6647-64.</p>
                </div>
              </div>
            </ScrollReveal>
          </article>
        </div>
      </div>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 p-3 bg-[#0D2B5A] text-white rounded-full shadow-lg hover:bg-[#1A3C7A] transition-all duration-300 hover:scale-105 group"
            aria-label="Back to top"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
    <Footer />
    </>
  );
}