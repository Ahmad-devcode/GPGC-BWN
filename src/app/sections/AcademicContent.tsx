'use client';
import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import {
    BookOpen,
    ChevronRight,
    Menu,
    X,
    GraduationCap,
    DollarSign,
    ClipboardList,
    Award,
    Users,
    Calendar,
    FileText,
    AlertCircle,
    Scale,
    Library,
    UserCheck,
    Building,
    PenTool,
    Shield,
    BookMarked,
} from 'lucide-react';

const chapters = [
    { id: 'ch1', title: 'Chapter 1: Job Descriptions', icon: Users },
    { id: 'ch2', title: 'Chapter 2: Admission Regulations', icon: FileText },
    { id: 'ch3', title: 'Chapter 3: Fee Regulations', icon: DollarSign },
    { id: 'ch4', title: 'Chapter 4: Semester Regulations', icon: Calendar },
    { id: 'ch5', title: 'Chapter 5: Examination Regulations', icon: ClipboardList },
    { id: 'ch6', title: 'Chapter 6: Planning & Orientation', icon: BookOpen }
];

export default function AcademicContent() {
    const [mobileTocOpen, setMobileTocOpen] = useState(false);

    const note = (title: string, children: React.ReactNode) => (
        <div className="bg-[#C62828]/5 border-l-4 border-[#C62828] rounded-r-lg p-4 my-5">
            <p className="text-sm font-bold text-[#0D2B5A] mb-1 flex items-center gap-2">
                <AlertCircle size={14} className="text-[#C62828]" /> {title}
            </p>
            <div className="text-sm text-[#4A5568] leading-relaxed">{children}</div>
        </div>
    );

    const table = (headers: string[], rows: (string | number)[][]) => (
        <div className="overflow-x-auto my-5 rounded-lg border border-black/5">
            <table className="w-full text-sm text-left">
                <thead className="bg-[#0D2B5A] text-white">
                    <tr>{headers.map((h, i) => <th key={i} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                    {rows.map((row, ri) => (
                        <tr key={ri} className="bg-white hover:bg-[#F5F7FA] transition-colors">
                            {row.map((cell, ci) => <td key={ci} className="px-4 py-3 text-[#4A5568]">{cell}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="bg-[#F5F7FA] min-h-screen">
            {/* Page Hero */}
            <div className="bg-[#0D2B5A] text-white pt-28 pb-14 lg:pt-32 lg:pb-16 border-b-4 border-[#C62828]">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#C62828] uppercase tracking-widest mb-3">
                        <BookOpen size={14} /> Official Document
                    </span>
                    <h1 className="text-[clamp(32px,4vw,52px)] font-extrabold leading-tight tracking-tight max-w-[24ch]">
                        College Academic Regulations
                    </h1>
                    <p className="mt-4 text-white/70 max-w-[65ch] leading-relaxed text-base lg:text-lg">
                        Govt. Post Graduate College Bahawalnagar, Comprehensive academic, fee, and discipline regulations governing the semester system for faculty, staff, and students.
                    </p>
                </div>
            </div>

            <div className="max-w-[1240px] mx-auto px-6 lg:px-8 py-10 lg:py-16">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

                    {/* Sticky Sidebar TOC */}
                    <aside className="lg:w-72 shrink-0">
                        <div className="lg:sticky lg:top-28">
                            <button
                                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                                className="lg:hidden w-full flex items-center justify-between bg-white border border-black/5 rounded-xl px-5 py-3.5 text-sm font-bold text-[#0D2B5A] shadow-sm mb-3"
                            >
                                <span className="flex items-center gap-2"><Menu size={16} className="text-[#C62828]" /> Table of Contents</span>
                                {mobileTocOpen ? <X size={16} /> : <ChevronRight size={16} />}
                            </button>

                            <div className={`${mobileTocOpen ? 'block' : 'hidden'} lg:block bg-white rounded-xl border border-black/5 shadow-sm p-5`}>
                                <h3 className="text-xs font-bold text-[#0D2B5A] uppercase tracking-[0.15em] mb-4 hidden lg:block">Navigate</h3>
                                <nav className="space-y-1">
                                    {chapters.map((ch) => (
                                        <a key={ch.id} href={`#${ch.id}`} onClick={() => setMobileTocOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-[#4A5568] hover:text-[#0D2B5A] hover:bg-[#F5F7FA] transition-colors group">
                                            <ch.icon size={15} className="text-[#C62828] opacity-70 group-hover:opacity-100" />
                                            <span>{ch.title}</span>
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </aside>

                    {/* Main Document */}
                    <article className="flex-1 space-y-8">

                        {/* CHAPTER 1 */}
                        <ScrollReveal>
                            <section id="ch1" className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
                                <div className="bg-[#0D2B5A] px-6 py-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-[#C62828] flex items-center justify-center text-xs font-bold text-white">01</span>
                                    <h2 className="text-lg font-bold text-white tracking-tight">Job Descriptions</h2>
                                </div>
                                <div className="p-6 lg:p-8 space-y-6 text-[15px] leading-relaxed text-[#4A5568]">
                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Introduction</h3>
                                        <p>This document has been prepared for the faculty members and staff of the college to apprise them about the academic, fee and discipline regulations of the institution. It is important that all faculty members and staff are aware of these regulations and claim of ignorance will not be accepted as an excuse in matters of conflict.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Important Information and Definitions</h3>
                                        <ul className="list-disc pl-5 space-y-2 mt-2">
                                            <li>Masculine gender used in the following regulations implies male students as well as female students.</li>
                                            <li>The term faculty member or instructor or teacher when mentioned in these regulations would refer to the concerned faculty member or instructor or teacher, if not mentioned as such.</li>
                                            <li>The medium of instructions and examinations shall be English for all subjects except Islamic Studies and Pakistan Studies for which the medium of instructions and examinations may be either Urdu or English.</li>
                                            <li>The term &ldquo;Academic Year&rdquo; refers to the period of study at the college spread over one calendar year period. Academic year is further divided into semesters.</li>
                                            <li>The term &ldquo;Contact Hour&rdquo; refers to a 60 minutes period of contact with the students.</li>
                                            <li>The term &ldquo;Credit Hour (CH)&rdquo; refers to a unit of academic credit during a semester. Each credit hour is related to a one or more &ldquo;Contact hours per week&rdquo; according to subject type and the semester in which it is offered as defined in these regulations.</li>
                                            <li>The term &ldquo;Pre-requisites&rdquo; refers to subjects that must be successfully completed prior to registration in a subject requiring these pre-requisites.</li>
                                            <li>The term &ldquo;Co-requisite&rdquo; refers to subjects that must be registered simultaneously if studied for the first time. During repetition, simultaneous registration of such subjects is not necessary.</li>
                                            <li>The term &ldquo;Tutor&rdquo; refers to a teacher appointed as an advisor and counselor to a group of students and the term &ldquo;Tutorial&rdquo; refers to a scheduled session with their tutor.</li>
                                        </ul>
                                    </div>

                                    {note('Special Provisions', (
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>In all cases where the regulations are silent, the decision of the Principal shall be final.</li>
                                            <li>Interpretation of these rules and regulations by authorized officers of the college shall be final.</li>
                                            <li>The college authorities reserve the right to make any changes in the existing regulations, rules, fee structure and courses of study that may be considered necessary at any time without prior notice.</li>
                                            <li>No student is allowed to maintain simultaneous enrollment in any other program of studies in the college or any other educational institution within or outside Pakistan, unless permitted by the competent authority as an Exchange Student.</li>
                                            <li>In case a student enrolled in this college is found to be a regular student of some other college/institution whether local or foreign, his admission in this college shall be canceled.</li>
                                            <li>Students are required to know the rules and regulations mentioned in the prospectus and notified time to time. Ignorance of rules and regulations does not absolve them of their responsibilities and shall not be treated as an excuse.</li>
                                        </ul>
                                    ))}

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Functions and Duties of Faculty Members</h3>
                                        <ul className="list-disc pl-5 space-y-2 mt-2">
                                            <li>Unless in any case it is otherwise distinctly provided, the whole time of all college employees is at the disposal of the college and they may be employed in any manner required by proper authority without claim for additional remuneration.</li>
                                            <li>Faculty members are required to be available on-campus under fixed timings as they are full-time employees.</li>
                                            <li>Faculty members are required to be punctual (i) in observing classroom timing; (ii) in examination schedule, and (iii) in submitting grades.</li>
                                            <li>When office hours are canceled by a faculty member for any reason (including college business) the department&apos;s secretary must be informed and a notice must be posted on the faculty member&apos;s office door. These hours may be rescheduled during that week, if possible.</li>
                                            <li>Absence from class without any valid reason or prior notice may result in disciplinary proceedings. Such proceedings, if absolutely required, will be initiated by the concerned chairperson.</li>
                                            <li>The teaching load is allocated by the department&apos;s Chairperson keeping in view research and other commitments of the faculty member.</li>
                                            <li>The normal teaching load per academic year may vary from 16 to 24 semester credit hours distributed over the fall, spring and summer semesters. Each theory credit hour is equated to one class contact hour per week and each laboratory (practical) credit hour is equated to 2 to three contact hours per week.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Ethics and Norms of Faculty Members</h3>
                                        <p className="mb-2">In pursuing his/her professional obligations the faculty member shall:</p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Adhere to Islamic/religious values and ethical norms.</li>
                                            <li>Safeguard and promote national interest.</li>
                                            <li>Act always in a manner that brings honor and prestige to the individual, the college and the profession.</li>
                                            <li>Justify public trust and confidence through sheer devotion to excellence and by providing quality education for all students.</li>
                                            <li>Make the teaching profession attractive by continuously updating his/her knowledge and perfecting his/her pedagogic skills.</li>
                                            <li>Safeguard and promote the interest and well-being of the students and make every effort to protect them from physical or mental harm.</li>
                                            <li>Not discriminate based on race, color, gender, national origin, political or religious beliefs, family/ social/ cultural background by excluding any student from participation in any academic/professional program or by denying any student any legitimate benefits, or by granting any undue advantage to any student.</li>
                                            <li>Be fair in the award of grades.</li>
                                            <li>Ensure academic freedom for each student.</li>
                                            <li>Not use professional relationships for personal gains, such as accepting favors or gifts from students.</li>
                                            <li>Promote mutual respect among colleagues and safeguard and promote their welfare and genuine interests.</li>
                                            <li>Maintain confidentiality of information related to students and colleagues unless disclosure of such information serves a compelling professional purpose or is required by law.</li>
                                            <li>Not make false statements in any documentation.</li>
                                            <li>Be knowledgeable of his/her administrative responsibilities and rights.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Functions and Duties of The Deans of Faculties</h3>
                                        <p className="mb-2">The Dean of the Faculty concerned shall be responsible to see that the Statutes, Regulations and Rules relating to the Faculty are duly observed and followed. Without prejudice to the above, the Dean shall have the following functions and duties:</p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>To co-ordinate teaching, publication and research in the departments of the Faculty;</li>
                                            <li>To frame time table for the different classes in consultation with the other Deans;</li>
                                            <li>To take disciplinary action against the students who have defaulted in the payment of their fees and other dues in time;</li>
                                            <li>To condone the delay in the payment of dues and to remit the late fee fine;</li>
                                            <li>To make proposals for improvement of facilities in each department in the faculty in consultation with the HODs/ In-charges;</li>
                                            <li>To scrutinize budget proposals of the departments and make recommendations to the Principal;</li>
                                            <li>To forward to the Principal all applications of the HODs for leave or absence;</li>
                                            <li>To sanction casual leave to the non-teaching staff attached to his office;</li>
                                            <li>To grant earned leave to the laboratory staff up to and including the rank of laboratory supervisor;</li>
                                            <li>To see that all the members of the teaching and non-teaching staff under the faculty attend to their duties in due time and for the full duration and report the matter to the Principal;</li>
                                            <li>To permit departments to proceed on excursion and on industrial/study tours within the country;</li>
                                            <li>To prepare annual report before and after the Academic Session of the teaching and research activities of the faculty;</li>
                                            <li>To forward applications of teaching and non-teaching staff of his faculty for study leave to the Principal;</li>
                                            <li>To place all proposals in respect of object and schemes of study received from the HODs before the Board of Faculty forward recommendations to the Principal;</li>
                                            <li>To present the Graduates of the faculty for conferment of degrees at the Convocation of the college;</li>
                                            <li>To pass orders for inter departmental transfer of the laboratory staff in consultation with the HODs under his faculty;</li>
                                            <li>To write confidential reports of the office staff;</li>
                                            <li>To see all resolutions/decisions of the Principal, the Academic Council and the Syndicate relating to the faculty communicated to him are given effect;</li>
                                            <li>To put up proposals regarding allocation of seats and procedure for admission to various disciplines for the consideration of the Principal/Academic Council;</li>
                                            <li>To consider the case of migration of students from other colleges to this college and make recommendations to the Principal;</li>
                                            <li>To provide the Principal with adequate information on all academic and other related matters and periodically submit a progress report on teaching and research carried out by the departments within his faculty.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Functions and Duties of The HODs/ In-Charges of Teaching Departments</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>To organize teaching and research in the Department and to ensure that the Syllabi are completed in time and research is carried out in accordance with the policies laid from time to time;</li>
                                            <li>To assist the Deans in framing time table of different classes;</li>
                                            <li>To sanction casual/emergency leave to the teaching and non-teaching staff in the department;</li>
                                            <li>To scrutinize and forward to the Dean application for all kinds of leave other than casual/emergency leave from the teaching and non-teaching staff and to propose consequential arrangements;</li>
                                            <li>To prepare budget proposals and schemes of study and forward them to the Dean of the Faculty concerned;</li>
                                            <li>To arrange for visiting teachers;</li>
                                            <li>To arrange for the class test in the Department;</li>
                                            <li>To ensure that all teachers in the Department maintain a record of attendance of all students of the various classes and to supply the same to the Dean of faculty concerned;</li>
                                            <li>To see that all teaching and non-teaching staff in the department attend to their duties properly;</li>
                                            <li>To act as the Convener of the Board of Studies;</li>
                                            <li>To appoint Research Assistant on the recommendation of the Departmental Committee and the teachers utilizing the services of the research staff, provided that funds are available;</li>
                                            <li>To keep the Dean regularly informed of teaching and research and submit periodical report to him for forwarding it to the Principal/Syndicate;</li>
                                            <li>To submit Annual Report about teaching, research, development and other academic programs, planned and executed by the Department to the Dean of faculty concerned before and after each academic session;</li>
                                            <li>To perform such other duties as may be assigned to him by the Dean or the Principal from time to time.</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        </ScrollReveal>

                        {/* CHAPTER 2 */}
                        <ScrollReveal>
                            <section id="ch2" className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
                                <div className="bg-[#0D2B5A] px-6 py-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-[#C62828] flex items-center justify-center text-xs font-bold text-white">02</span>
                                    <h2 className="text-lg font-bold text-white tracking-tight">Admission Regulations</h2>
                                </div>
                                <div className="p-6 lg:p-8 space-y-6 text-[15px] leading-relaxed text-[#4A5568]">
                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Admission Categories</h3>
                                        <p>For the purpose of admissions, applicants are categorized based on their qualification.</p>
                                        <ul className="list-disc pl-5 space-y-1 mt-2">
                                            <li><strong>Category 1:</strong> Candidates with Matriculation (Science/Arts) qualification.</li>
                                            <li><strong>Category 2:</strong> Candidates with Intermediate (FSc/FA/ICS) qualification.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Seat Distribution in Each Category</h3>
                                        <p>Seats in each discipline offered by the college will be distributed as under:</p>
                                        <ul className="list-disc pl-5 space-y-1 mt-2">
                                            <li>Category 1: <strong>40%</strong> seats</li>
                                            <li>Category 2: <strong>60%</strong> seats</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Eligibility Requirements</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Category 1 applicants for Science programs should have at least <strong>50% marks</strong> in Matriculation (Science) or equivalent qualification as determined by the admission committee.</li>
                                            <li>Category 2 applicants for Science programs should have at least <strong>50% marks</strong> in F.Sc. (Pre-Medical/Pre-Engineering) or equivalent qualification as determined by IBCC.</li>
                                            <li>Category 2 applicants for Arts &amp; Humanities programs should have at least <strong>45% marks</strong> in FA/ICS or equivalent as determined by IBCC.</li>
                                            <li>Applicants who earn less than the required aggregate marks will not be eligible for admission.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Hafiz-E-Qura&apos;an Test</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Candidates who claim of being Hafiz-e-Qura&apos;an will be examined by a committee constituted for this purpose.</li>
                                            <li>The committee, after assessment, will give a score from 0 to 100 based on the level of proficiency in Hifz demonstrated by the candidate during examination.</li>
                                            <li>Decision of the committee will be final.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Admission/ Entry Test</h3>
                                        <p>An admission test will be conducted from all the candidates by the college.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Merit Aggregate Calculation and Screening Of Applicants</h3>
                                        <p className="mb-2">Aggregate marks would be calculated as under:</p>
                                        <div className="bg-[#F5F7FA] border border-black/5 rounded-lg p-4 font-mono text-sm text-[#0D2B5A]">
                                            [&#123;%age marks in Matric/Intermediate&#125; x 0.7] + [&#123;%age marks in Admission Test&#125; x 0.3]
                                        </div>
                                        <p className="mt-3">Aggregate of eligible Hafiz-e-Qura&apos;an applicants will be adjusted after inclusion of their earned Hifz test score as under:</p>
                                        <div className="bg-[#F5F7FA] border border-black/5 rounded-lg p-4 font-mono text-sm text-[#0D2B5A] mt-2">
                                            Adjusted Aggregate = Aggregate marks + (%age marks earned in Hifz test x 0.0127)
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Admission Criterion</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Separate merit lists will be prepared for Category 1 and Category 2 applicants.</li>
                                            <li>In case seats under any category remained vacant, that can be filled from other category.</li>
                                            <li>In each category admission will be purely only on merit.</li>
                                            <li>The college has been established primarily for Punjab domiciled candidates.</li>
                                            <li>In case the quota seats left vacant, the seats will be adjusted in open merit criterion.</li>
                                        </ul>
                                        <p className="mt-3 font-semibold text-[#0D2B5A]">Allocation of seat in each department will be as under:</p>
                                        {table(['Category', 'Percentage'], [
                                            ['Open Merit', '90%'],
                                            ['Merged districts of FATA in KPK (One seat for each District)', '02%'],
                                            ['Baluchistan (One seat for each Civil Division)', '02%'],
                                            ['Sports based seats', '02%'],
                                            ['Minorities', '02%'],
                                            ['Disable', '02%'],
                                        ])}
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Age Limit</h3>
                                        <p>There is no age restriction for seeking admission to any program at the college.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Medical Fitness Requirement for Admitted Candidates</h3>
                                        <p>Selected candidates will be required to submit medical fitness certificate from the registered medical practitioner with PMDC/PMC (regulatory body as per law) as per policy of the college.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Submission of Original Documents</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Students at the time of admission will submit the original documents of Matriculation and Intermediate in the admission office, after securing admission at the college.</li>
                                            <li>Admission office will verify these documents from the respective issuing authority and will be returned after verification.</li>
                                            <li>In case student needs his/her original documents, he/she has to write written application to the convener admission committee.</li>
                                            <li>In case the original documents submitted by the students are found fake, student&apos;s admission at the college shall be cancelled and legal action can be taken as per law.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Cancellation of Admission</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Admission of a candidate is liable to be cancelled if he / she is found guilty of suppression or misrepresentation of materials facts at any stage.</li>
                                            <li>The college reserves the right to reject any application for admission.</li>
                                            <li>If a student does not opt to register the courses and also does not request for the semester dropping for one semester, his/her admission shall automatically stand cancelled without any notification. However, he/she may apply to the in charge department and dean for re-admission as per prescribed criteria.</li>
                                            <li>In case a student applies for cancellation of his/her admission, the application must have been recommended by the respective chairperson/Head of Department/In charge Department. There should be no outstanding dues against him/her. He/she has to obtain clearance and return the college student card. Admission of student will be cancelled by convener admission committee after the approval of Principal and original documents will be returned.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Student&apos;s Clearance Process</h3>
                                        <p className="mb-2">In order to obtain clearance from college, student has to complete the process of physical/online clearance on LMS from the following authorities:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Chairperson/Head of department</li>
                                            <li>Accounts Section</li>
                                            <li>In charge Student Affairs</li>
                                            <li>In charge Library</li>
                                            <li>Examination office</li>
                                            <li>Registrar Office</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Application Filling and Submission — Required Documents</h3>
                                        <p className="mb-2">Attested photocopies of the following documents are required to be submitted by all the applicants:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Certificate of all the examinations on the basis of which admission is sought, that is Matric/SSC or equivalent, Intermediate/HSSC or equivalent.</li>
                                            <li>Detailed Marks Certificates</li>
                                            <li>CNIC or B-Form issued by NADRA</li>
                                            <li>Domicile Certificate.</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        </ScrollReveal>

                        {/* CHAPTER 3 */}
                        <ScrollReveal>
                            <section id="ch3" className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
                                <div className="bg-[#0D2B5A] px-6 py-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-[#C62828] flex items-center justify-center text-xs font-bold text-white">03</span>
                                    <h2 className="text-lg font-bold text-white tracking-tight">Fee Regulations</h2>
                                </div>
                                <div className="p-6 lg:p-8 space-y-6 text-[15px] leading-relaxed text-[#4A5568]">
                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">3.1 Payment of Dues</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Students shall pay prescribed six months fees irrespective of the number of credit hours registered during a semester.</li>
                                            <li>No relaxation in prescribed fees would be given to students deciding not to register in a semester due to any reason.</li>
                                            <li>Registration in subjects would be suspended if fee is not deposited within the prescribed deadline. Students having justifiable reasons for seeking relaxation in fee payment schedule must apply to the Principal through the Dean and Chairman/In charge of department for this purpose.</li>
                                            <li>Neither tuition fee nor other charges will be charged from a student who does not register for any credit hours during a semester.</li>
                                            <li>Hostel charges are payable for the period of occupation, a part of term/semester being counted as full term/ semester. Rent and electricity charges for fans are payable for six months. Electricity charges for room heaters are payable for the winter season for four months.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">3.2 Periods of Fees and Other Charges</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>The fees and other charges are categorized as: One-time payments at the time of admission; Annual recurring fees; Monthly recurring fees.</li>
                                            <li>During each year of a student&apos;s stay at the college, all recurring fees (annual or monthly) are calculated based on twelve months period and are charged in two installments payable at beginning of Fall and Spring semesters.</li>
                                            <li>A prescribed fee per credit hour will be charged from students registering during summer semester.</li>
                                            <li>A minimum of 24 months or 48 months recurring fees are admissible to students graduating respectively from a two years or four years program.</li>
                                            <li>Students registering in semesters beyond the minimum prescribed study period shall pay a prescribed admission retention fee at the beginning of Fall and Spring Semesters until submission of their degree requirements completion form (Form 2).</li>
                                            <li>A prescribed fee per credit hour will be charged from students registering during summer semester or any other additional course in a regular semester.</li>
                                            <li>Late fee will be charged per day after the deadline of fee submission.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">3.3 Fee Schedule for Deferred Semester</h3>
                                        <p>Neither tuition fee nor any other charges will be charged from students who have deferred their studies. However, an admission retention charge is applicable during this period.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">3.4 Refund of Securities</h3>
                                        <p>The college security and library security are refunded when a student leaves the college after completion of his/her program after deduction of outstanding dues of the college or the library.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">3.5 Refund on Admission Cancellation</h3>
                                        <p className="font-semibold text-[#0D2B5A] mb-2">3.5.1 Admission Cancellation by Freshly Admitted Students</p>
                                        <p className="mb-2">All dues paid by the student are refundable excluding the Admission Fee as per the following schedule:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Full (100%) fee refund if admission cancelled up to 7th day.</li>
                                            <li>Half (50%) fee refund if admission cancelled from 7th to 15th day.</li>
                                            <li>No fee refund if admission cancelled from 16th day onward.</li>
                                        </ul>
                                        <p className="mt-2">The count of days mentioned in the schedule for determining refund amount, would start from the date falling last from the date of convening of classes.</p>
                                        <p className="font-semibold text-[#0D2B5A] mt-4 mb-2">3.5.2 Admission Cancellation by Other Students</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>The college security, library security, hostel security and mess securities are refunded when a student cancels his admission before completion of his program.</li>
                                            <li>All other dues and fees deposited shall not be refunded including migration fee charged from migrated students.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">3.6 Fee Structure</h3>
                                        {table(['Sr. No.', 'Fee Structure', 'Amount (Rs.)'], [
                                            ['1', 'Admission fee payable in first year (one time)', '1,000'],
                                            ['2', 'College Registration Fee (one time)', '500'],
                                            ['3', 'College Security (refundable)', '5,000'],
                                            ['4', 'Library Security (one time)', '500'],
                                            ['5', 'Verification fee', '2,000'],
                                            ['6', 'Deferment of studies/freezing (For one semester)', '5,000'],
                                            ['7', 'Re-admission Fee', '5,000'],
                                            ['8', 'Per credit hour fee for registering during summer semester or any other additional course in a regular semester', '2,000'],
                                            ['9', 'Semester Tuition Fee (recurring)', '21,000'],
                                            ['10', 'Late fee per day after the deadline of fee submission', '50'],
                                            ['11', 'Summer School Registration Fee', '200/paper'],
                                            ['12', 'Detail Marks Certificate', '500'],
                                            ['13', 'Merit Certificate', '200'],
                                            ['14', 'Rechecking of Answer Book', '300'],
                                            ['15', 'Other Certificates/Duplicate certificate', '200'],
                                            ['16', 'Provisional Certificate', '200'],
                                            ['17', 'Degree/Certificate Fee', '1,500'],
                                            ['18', 'Verification Fee (degree/detail marks certificate)', '500'],
                                            ['19', 'Migration Fee', '15,000'],
                                        ])}
                                    </div>
                                </div>
                            </section>
                        </ScrollReveal>

                        {/* CHAPTER 4 */}
                        <ScrollReveal>
                            <section id="ch4" className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
                                <div className="bg-[#0D2B5A] px-6 py-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-[#C62828] flex items-center justify-center text-xs font-bold text-white">04</span>
                                    <h2 className="text-lg font-bold text-white tracking-tight">Semester Regulations</h2>
                                </div>
                                <div className="p-6 lg:p-8 space-y-6 text-[15px] leading-relaxed text-[#4A5568]">
                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Introduction</h3>
                                        <p className="mb-2">The following regulations govern the system of teaching and examination for the programs offered by the college.</p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>System of Teaching and Examination at the college shall be based on Semester System.</li>
                                            <li>The programs offered at the college are classified as: Intermediate programs (FSc/FA/ICS), Bachelor programs (BS), and Diploma programs.</li>
                                            <li>Masculine gender used in the following regulations implies male students as well as female students.</li>
                                            <li>The medium of instructions and examinations shall be English, Urdu or Chinese depending upon the type of subject.</li>
                                            <li>The term &ldquo;Academic Year&rdquo; refers to the period of study at the college spread over one calendar year period. Academic year is further divided into semesters.</li>
                                            <li>The term &ldquo;Contact Hour&rdquo; refers to a 60 minutes period of contact with the students.</li>
                                            <li>The term &ldquo;Credit Hour (CH)&rdquo; refers to a unit of academic credit during a semester.</li>
                                            <li>The term &ldquo;Pre-requisites&rdquo; refers to subjects that must be successfully completed prior to registration in a subject requiring these pre-requisites.</li>
                                            <li>The term &ldquo;Tutor&rdquo; refers to a teacher appointed as an advisor and counselor to a group of students and the term &ldquo;Tutorial&rdquo; refers to a scheduled session with their tutor.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Program Duration</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>The minimum duration of Intermediate programs shall not be less than two academic years and the maximum duration will be four academic years.</li>
                                            <li>The minimum duration of Bachelor degree programs shall not be less than four academic years and the maximum duration will be six academic years.</li>
                                            <li>The minimum duration of Diploma programs shall not be less than two academic years and the maximum duration will be four academic years.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Scheme of Studies</h3>
                                        <div className="grid md:grid-cols-3 gap-4 my-3">
                                            <div className="bg-[#F5F7FA] rounded-lg p-4 border border-black/5">
                                                <p className="text-xs text-[#64748B] uppercase tracking-wider font-semibold">Intermediate Programs</p>
                                                <p className="text-lg font-bold text-[#0D2B5A]">24-30</p>
                                                <p className="text-xs text-[#64748B]">Credit Hours (2 Years)</p>
                                            </div>
                                            <div className="bg-[#F5F7FA] rounded-lg p-4 border border-black/5">
                                                <p className="text-xs text-[#64748B] uppercase tracking-wider font-semibold">Bachelor Programs</p>
                                                <p className="text-lg font-bold text-[#0D2B5A]">130-140</p>
                                                <p className="text-xs text-[#64748B]">Credit Hours (4 Years)</p>
                                            </div>
                                            <div className="bg-[#F5F7FA] rounded-lg p-4 border border-black/5">
                                                <p className="text-xs text-[#64748B] uppercase tracking-wider font-semibold">Diploma Programs</p>
                                                <p className="text-lg font-bold text-[#0D2B5A]">60-70</p>
                                                <p className="text-xs text-[#64748B]">Credit Hours (2 Years)</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Credit Hours Requirements</h3>
                                        <p>The credit hours required for the award of degree/certificate may range from a minimum of 24 to a maximum of 140 depending upon the program duration subject to meeting the requirements of the respective Boards/Accreditation Councils.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Course Load for Fall and Spring Semesters</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>A program of instruction generally includes a 15-18 credit hours course load including exams in a regular semester. The required course load for a full time program is minimum of 12 credit hours per semester.</li>
                                            <li>In case any student wishes to enroll for one or more courses beyond 18 credit hours s/he may be allowed by the Dean/Principal with the advice of advisor/in charge department.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Semesters Nomenclature, Duration and Registration Matters</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>There shall be two regular semesters, namely Fall and Spring semesters, and an optional summer semester during each academic year.</li>
                                            <li>Fall and spring semesters will be spread over 16 to 18 weeks including examinations with at least 15 study weeks during the semester. The duration of summer semester will be 9 weeks including examinations with weekly contact hours being double from those of fall and spring semesters.</li>
                                            <li>The maximum and minimum permissible number of students to be allowed registration in a subject section will be decided by the concerned Board of Studies.</li>
                                            <li>Students may consult their tutors for registration guidelines.</li>
                                            <li>First year students may be allowed to register in at most 18 credit hours during fall and spring semesters.</li>
                                            <li>Students of second year and third year may be allowed to register in at most 20 credit hours during fall and spring semesters such that, because of repetition of subjects or fulfillment of program requirements, may apply to the Dean for up to two credit hour relaxation in the 20 credit hours registration limit.</li>
                                            <li>A student can register at most 8 credit hours during summer semester.</li>
                                            <li>Registration will only be allowed in a subject if the prerequisites, if any, of this subject have been completed successfully.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Evaluation and Contact Hours</h3>
                                        <p className="font-semibold text-[#0D2B5A] mb-1">Theory Subjects</p>
                                        <ul className="list-disc pl-5 space-y-2 mb-3">
                                            <li>In theory subjects, there shall be a mid-semester examination of at least one hour duration and a comprehensive final examination of at least one and a half hour duration. These examinations shall carry 30 and 40 percent weight, respectively. The teacher shall schedule additional assessment instruments such as quizzes, assignments, presentations, seminars, group discussions, field study reports, etc. as specified in the syllabus or as determined by the teacher. These assessment instruments shall carry the remaining 30% weight of the subject.</li>
                                            <li>There shall be one contact hour per week during Fall and Spring semesters and two contact hours per week during Summer semester for each credit hour assigned to theory subjects.</li>
                                        </ul>
                                        <p className="font-semibold text-[#0D2B5A] mb-1">Practical/Laboratory Subjects</p>
                                        <ul className="list-disc pl-5 space-y-2 mb-3">
                                            <li>In practical subjects, each Experiment, Studio work, Design, Drawing, or Assignment shall be considered as an independent assessment instrument. Cumulative performance in all independent assessment instruments shall form the basis for evaluating a student.</li>
                                            <li>There shall be two to three contact hours per week during Fall and Spring semesters and four to six contact hours per week during Summer semester for each credit hour assigned to practical subjects.</li>
                                        </ul>
                                        <p className="font-semibold text-[#0D2B5A] mb-1">Theory cum Practical Subjects</p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Theory part of the subject will be assessed independently and practical part will be assessed independently, according to the respective procedure.</li>
                                            <li>Combined assessment will be computed from the weighted average of the two assessments according to the credit hours assigned to each part.</li>
                                            <li>Contact hours per week will be in accordance with the credit hours assigned to each part.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Award of Letter Grades</h3>
                                        <p className="mb-2">The subject teacher, having interacted with the students, taught them and having assessed them over the semester, shall award letter grades to the students. Letter grades will be awarded on an absolute scale.</p>
                                        <p className="font-semibold text-[#0D2B5A] mb-2">Table-I: Letter Grades &amp; Corresponding Grade Points</p>
                                        <div className="overflow-x-auto my-4 rounded-lg border border-black/5">
                                            <table className="w-full text-sm text-center">
                                                <thead className="bg-[#0D2B5A] text-white">
                                                    <tr>
                                                        {['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F', 'W', 'I'].map(g => <th key={g} className="px-3 py-2 font-semibold">{g}</th>)}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="bg-white">
                                                        {['4.0', '3.7', '3.3', '3.0', '2.7', '2.3', '2.0', '1.7', '1.0', '0', '–', '–'].map((gp, i) => <td key={i} className="px-3 py-2 text-[#4A5568] border-b border-black/5">{gp}</td>)}
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <p className="font-semibold text-[#0D2B5A] mb-2">Table-II: Letter Grades Thresholds in Percent for Absolute Grading</p>
                                        <div className="overflow-x-auto my-4 rounded-lg border border-black/5">
                                            <table className="w-full text-sm text-center">
                                                <thead className="bg-[#0D2B5A] text-white">
                                                    <tr>
                                                        {['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F', 'W', 'I'].map(g => <th key={g} className="px-3 py-2 font-semibold">{g}</th>)}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="bg-white">
                                                        {['≥ 90', '85-89', '80-84', '75-79', '70-74', '65-69', '60-64', '55-59', '50-54', '<50', '', ''].map((t, i) => <td key={i} className="px-3 py-2 text-[#4A5568] border-b border-black/5">{t}</td>)}
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">CGPA Required for the Completion of Program</h3>
                                        <p>For completion of the program, the minimum qualifying CGPA is <strong>2.00</strong>. In case a student secures less than 2.00 CGPA (minimum qualifying CGPA) at the end of final Semester, s/he may be allowed to get re-admission in one or more courses, in which his/her Grade is below C, along with the forthcoming semester, provided that s/he is not debarred under the CGPA Improvement Regulation and time duration specified for the program.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Academic Probation and Separation</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>A student will be placed on <strong>Warning</strong> if his GPA falls below 2.0 in any semester with his CGPA remaining greater than 2.0.</li>
                                            <li>A student will be placed on <strong>Probation</strong> if his CGPA falls below 2.0 after any semester.</li>
                                            <li>A student will be <strong>separated</strong> from the college if he remains on probation for two consecutive semesters.</li>
                                            <li>Separated students can apply to the Principal for re-admission. If their application is accepted, the concerned department will transfer subjects from the previous registration in accordance with the prescribed rule and assign them to an Entry Session for computing their maximum duration. They will be allotted new entry session as per the recommendation of the department and new registration number.</li>
                                            <li>A re-admitted student will not be granted second re-admission if he is separated again from the college.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Award of Certificate/Degree and Merit Position</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Students, who are eligible for the award of certificate/degree, are required to submit a Completion Form (Form 2) to their respective Chairperson for onward submission to the Controller of Examinations.</li>
                                            <li>Students shall qualify for the award of certificate/degree if they earn a minimum CGPA of 2.0 and they satisfy the conditions: Have no compulsory outstanding subject with &ldquo;W&rdquo;, &ldquo;WF&rdquo;, &ldquo;I&rdquo; and &ldquo;F&rdquo; grades; Have completed the prescribed number of credit hours.</li>
                                            <li>Students shall qualify for a <strong>&ldquo;Certificate/Degree with Honours&rdquo;</strong> if they satisfy the following conditions: Have earned a CGPA of 3.70 or above out of a maximum of 4.00; Have not repeated a subject; Have not withdrawn from a subject with a &ldquo;W&rdquo; or &ldquo;WF&rdquo; grade; and Have not earned an &ldquo;F&rdquo; grade in any core or elective subject during the course of study.</li>
                                            <li>Medals and merit positions will only awarded to students having earned certificate/degree with honors. The awards will be based on the CGPA earned at the time of completion. Comparison will be made within the students of same entry session completing in the minimum permissible duration.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Attendance Requirements</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Students failing to maintain a minimum attendance of 75% in a subject during a semester shall be awarded a &ldquo;WF&rdquo; grade. Chairperson in consultation with the respective Dean shall review cases of students seeking relaxation of up to 10% in attendance requirement. The relaxation shall be allowed after approval by the Dean. Any relaxation in excess of 10% shall be forwarded to the Principal through the respective Dean for final decision.</li>
                                            <li>Leaves availed by a student after approval of the Chairperson will not be counted towards attendance;</li>
                                            <li>Students eligible for the award of &ldquo;I&rdquo; grade will be awarded such a grade only if their attendance is at least 50%</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">Deferment of Studies (Freezing)</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Students enrolled in the first semester cannot apply for deferment.</li>
                                            <li>There shall be no relaxation in the maximum duration period for students seeking deferment.</li>
                                            <li>A student may defer studies for at most two consecutive regular semesters, for medical or other genuine reasons, with summer semester not being counted. In such cases, the student shall apply (Form 4) to the concerned, at least 15 days before the commencement of the semester for approval of deferment by the concerned Dean for the above said purpose, while LMS data will be directed to route application (Form 4).</li>
                                            <li>No freezing during semester will be allowed.</li>
                                            <li>If a student is not enrolled in any course in a semester, he/she will not be considered a regular student of college in that period. The student may then enroll in these courses in a subsequent semester; however, s/he will have to meet pre-requisites of any course taken. In addition, it is understood that the college is not required to offer all courses in each semester.</li>
                                            <li>In special hardship cases, a semester may be freezed on medical grounds with the prior permission of the Principal on the recommendations of the committee constituted by the Principal.</li>
                                            <li>The maximum duration of Freezing is one year; a candidate who gets a semester freeze can get readmission next year with upcoming session</li>
                                            <li>Under special *hardship circumstances freezing of first semester can be considered by the approval of Principal.</li>
                                        </ul>
                                        <p className="mt-3 font-semibold text-[#0D2B5A]">Iddat</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Maternity/Delivery</li>
                                            <li>Death in the immediate family</li>
                                            <li>Any other subject to acceptance on justified rationale</li>
                                        </ul>
                                        <p className="mt-3">Note: Freezing of Semester will only be allowed after successful completion of 1st Semester as prerequisite as the case may be for other semester&apos;s predecessor to the freezing Semester</p>
                                        <p className="mt-3">A student has to generate application from his/her LMS account or submit a written application, for approval of deferment by the concerned dean through chairperson/HOD of the department. Neither tuition fee nor any other charges will be charged from students who have deferred their studies. However, an admission retention fee is applicable during this period.</p>
                                    </div>
                                </div>
                            </section>
                        </ScrollReveal>

                        {/* CHAPTER 5 */}
                        <ScrollReveal>
                            <section id="ch5" className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
                                <div className="bg-[#0D2B5A] px-6 py-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-[#C62828] flex items-center justify-center text-xs font-bold text-white">05</span>
                                    <h2 className="text-lg font-bold text-white tracking-tight">Examination Regulations</h2>
                                </div>
                                <div className="p-6 lg:p-8 space-y-6 text-[15px] leading-relaxed text-[#4A5568]">

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">5.1 Assessment Criteria</h3>
                                        <p className="mb-2">In each semester, students may be required to appear in quizzes, tests, mid semester examination, final semester examinations, presentations (individual/group), group discussion, and submit projects/ assignments/lab reports etc. These assessment marks (to be determined by the teacher concerned) will have different weightage contributing towards the overall assessment in percent marks. This weightage may be determined on the basis of following guidelines:</p>
                                        {table(['Nature of Examination', 'Weightage'], [
                                            ['Quizzes, Assignments, Presentations, etc.', '30%'],
                                            ['Mid Semester Examinations', '30%'],
                                            ['Final Semester Examinations', '40%'],
                                        ])}
                                        <p className="mt-3">In the beginning of a semester, the Instructor of each course should hand out a syllabus providing information to students that defines attendance policy, grade distribution policy, assessment criteria, paper specification, examination dates, schedule of material to be taught, take home assignment policy, required and recommended reading materials and any other information important for the successful completion of the course and its requirements.</p>
                                        <p className="mt-3">There will be no Supplementary/Special Examination in a Semester System; if a student fails in a course, s/he is required to repeat it. An incomplete (I) grade will be awarded by the faculty only in exceptional cases beyond the control of a student such as serious accidents, family tragedy, serious health ailments, etc.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">5.2 Code of Conduct of Examination Under Semester System</h3>
                                        <p className="font-semibold text-[#0D2B5A] mb-1">5.2.1 Question Papers</p>
                                        <ul className="list-disc pl-5 space-y-2 mb-3">
                                            <li>The concerned teacher sets all question papers.</li>
                                            <li>The paper setters ensure their correctness and supervise the photocopying of the papers.</li>
                                            <li>Question papers are kept in the safe custody of the teacher till the start of examination. He shall bear legal and moral responsibility for the safe custody and secrecy of the question papers.</li>
                                        </ul>
                                        <p className="font-semibold text-[#0D2B5A] mb-1">5.2.2 Reference Material During Tests / Examinations</p>
                                        <p className="mb-3">Prior to quizzes, mid-semester/final examination, the subject teacher announces such books, notes or other material that can be referred to by the students during the test or examinations. All other books, notes, papers, etc., are withdrawn from the examinees.</p>
                                        <p className="font-semibold text-[#0D2B5A] mb-1">5.2.3 Examination Schedule</p>
                                        <p className="mb-3">The Chairperson of the department publishes the mid-semester and final semester examination schedule at least two weeks before start of the examinations in accordance with the college academic calendar.</p>
                                        <p className="font-semibold text-[#0D2B5A] mb-1">5.2.4 Conduct of Mid-Semester and Final Semester Examinations</p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>The Chairperson shall depute teachers or staff as Deputy Superintendent and Invigilators for the conduct of examinations. The number of invigilators will be estimated on the basis of one invigilator for every 20 students.</li>
                                            <li>The subject teacher shall be the Superintendent for the conduct of examination. The Superintendent shall ensure the following:
                                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                                    <li>That all answer books used in the examination are signed or initialed. The teacher may require the students to answer on the question paper itself. No other answer books are to be used in these cases.</li>
                                                    <li>Answer books are issued to the invigilators five minutes before the commencement of the examination and retrieved at the end of the examination.</li>
                                                    <li>Teacher concerned will collect the answer sheets from the examination hall/room immediately but not later than within one day for checking.</li>
                                                    <li>The absentee report, if any, is prepared and forwarded to the Chairperson&apos;s office at the end of each examination.</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">5.3 Responsibilities of Invigilators</h3>
                                        <p className="mb-2">The respective Chairperson appoints the teachers or staff as invigilators. They ensure the following:</p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Students are identified through means such as college identification card or CNIC.</li>
                                            <li>That the students are warned against the use of unfair means and have been advised to surrender mobile phones, notes, papers or other unauthorized material before the commencement of the examination.</li>
                                            <li>That the students are not allowed to talk with or copy from other students during the examination.</li>
                                            <li>That no student is allowed to join the examination thirty minutes after its commencement.</li>
                                            <li>That no student is allowed to submit the answer sheet and leave the examination room within thirty minutes of commencement of examination. Visits to toilets are carefully monitored.</li>
                                            <li>That the question papers and answer books of a student detected using unfair means or assisting another candidate, are taken away and the matter is reported to the respective Chairperson. The superintendent records all available evidence to be used as written proof later on.</li>
                                            <li>That the students write their registration numbers, name and class on the front cover of each additional answer sheet used. If more than one answer book is used, these are stapled together.</li>
                                            <li>Students are seated in the examination room according to the seating plan.</li>
                                            <li>All answer books used in the examination are initialed by the invigilator. No other answer books are to be used.</li>
                                            <li>Once assigned, examination duty is compulsory, in case of emergency alternate arrangement is to be made by an invigilator.</li>
                                            <li>Faculty member who want to take leave during examinations, need to get the approval from the competent authority.</li>
                                            <li>Report within time to respective department coordinator/HOD, collect answer sheets, candidate&apos;s attendance sheet and reach to respective examination room before 15 minutes of the examination schedule time.</li>
                                            <li>Question papers will be made available by the respective question paper setter / faculty in each examination hall before 10 minutes of the examination time schedule.</li>
                                            <li>Use of mobile phone is prohibited in the examination hall.</li>
                                            <li>Distribute the answer books to the students 10 minutes before the start of the examination and ask them to fill all the details in the answer book.</li>
                                            <li>Distribute the question paper to the students, 5 minutes before the start of examination.</li>
                                            <li>Take the signature of the students on the attendance sheet and maintain attendance record of the examination hall.</li>
                                            <li>Watch the students continuously and should be vigilant.</li>
                                            <li>Move in the examination hall to prevent indiscipline / copying.</li>
                                            <li>Should not leave examination hall during examination period. In case of urgency, may be allowed for maximum 15 minutes with permission from room-in-charge.</li>
                                            <li>Other invigilators / faculty are not allowed to enter into other examination halls without consent of concerned Hall/room-in-charge/superintendent.</li>
                                            <li>Distribute the supplement answer books / graph sheets (if any) to the students when requested by students.</li>
                                            <li>Ask the students to tie (if required) their supplement answer books before 5 minutes of the end of the examination time.</li>
                                            <li>At the end of examination, subject teacher/superintendent shall collect answer scripts from the examination room/hall.</li>
                                            <li>Two copies of question papers will be submitted to HOD/department coordinator after examination of paper is completed.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">5.4 Unfair Means Committee Regulations</h3>
                                        <p>There shall be an Unfair Means Committee (UMC) to be constituted by the Principal, for three years to deal with the cases of alleged use of unfair means in the examination hall/ room. Any candidate found guilty of unfair means, his/her case will be submitted to Unfair Means Cases Committee.</p>
                                        <p className="font-semibold text-[#0D2B5A] mt-3 mb-1">5.4.1 Functions of Committee</p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>The majority decision of the Committee shall be regarded as the verdict of the committee.</li>
                                            <li>If the committee fails to reach a decision, the matter shall be referred to the Principal.</li>
                                            <li>The student accused of adopting unfair means in the examination hall/room shall be issued a show-cause notice to give him/her a reasonable opportunity to reply by the examination branch.</li>
                                            <li>If it is necessary, the committee may call the reporting examiner/ invigilator/teacher to its meeting for further confirmation.</li>
                                            <li>The student aggrieved of the decision of the Unfair Means Committee (UMC) may file an appeal to the Principal, within 05 working days of the notification of the decision of the Unfair Means Committee (UMC), who shall make the final decision. All the proceedings shall be recorded by the secretary and approved by the convener.</li>
                                            <li>The secretary shall communicate the decision of the Unfair Means Committee (UMC) to the accused student(s) and all concerned.</li>
                                        </ul>
                                        <p className="font-semibold text-[#0D2B5A] mt-3 mb-1">5.4.2 Penalties</p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>His/her case shall result in penalties keeping in view the nature and intensity of offence</li>
                                            <li>Heavy and light fine</li>
                                            <li>Cancellation of scholarships</li>
                                            <li>Cancellation of paper</li>
                                            <li>Expulsion forever from the college.</li>
                                            <li>Award of &ldquo;F&rdquo; grade in the subject*</li>
                                            <li>Suspension from program for one semester</li>
                                        </ul>
                                        <p className="mt-2">In case the student is suspended from the program for one semester, he/she shall register all the courses for the same semester again beside deposition of fees.</p>
                                        <p className="mt-2">Any other: Unfair Means Cases Committee will decide that the student will have to appear in summer semester/with regular semester for the cancelled paper.</p>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">5.5 Regulations for Summer Semester</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Summer semester will be offered as an optional semester of 09 weeks duration.</li>
                                            <li>Students will be offered courses to remove deficiencies and can enroll in up to a maximum of 08 credit hours during summer.</li>
                                            <li>Moreover, a student who has either failed or has been stopped to take the examination due to shortage of class attendance or wishes to improve his/her grade is allowed to register in summer.</li>
                                            <li>The contact hours per week during the Summer Semester will be doubled to ensure that the course is completely taught in a summer session with half of the duration as compared to a regular (Fall/Spring) semester.</li>
                                            <li>The minimum strength to offer a course in Summer Semester will be five students. Fee as prescribed by the college will be charged from all such registered students.</li>
                                            <li>Teaching shall be mandatory for all offered courses in summer Semester.</li>
                                            <li>It shall be in the best interest of the students to clear their failed courses or the courses where they want to improve their grades by repeating the courses as early as possible. The college will not be responsible to offer failed or improvement courses in the final year unless and until the other conditions of Summer Semester registration are met.</li>
                                            <li>The registration, attendance, conduct of examination and result display policies etc. during the summer semester shall be same as in regular semester.</li>
                                            <li>After necessary verifications, the Chairman of the Department will notify the list of registered students within ten days of the start of regular semester and four days of the start of summer semester. He will also forward these lists to all concerned within a week.</li>
                                            <li>In case of repetition/ improvement of a course the student shall have to pay course registration and examination fee as prescribed by the college.</li>
                                            <li>It shall be notified that a student can only improve a grade lower than C (that is C-, D and F)</li>
                                            <li>In case a student repeats an elective course, which has already been taken and in case a student takes a new course in lieu of that elective course in which he failed, both the courses along with grades will be reflected on his transcript.</li>
                                            <li>The registration, attendance, conduct of examination and result display policies etc. during the summer semester shall be same as in regular semester.</li>
                                            <li>If a student registers himself for improvement of a course and completes it, the better grade obtained by him shall be considered for the computation of SGPA and CGPA.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">5.6 Rechecking of Examination Script</h3>
                                        <p className="mb-2">In case a student is not satisfied with the final result of any course, he/she may submit an application, within 15 days of the notification of results by the controller of the examinations, for rechecking of answer scripts of one or more courses to the concerned HOD by depositing applicable rechecking fee.</p>
                                        <p className="mb-2">Whereas the re-checking does not mean re-assessment/re-evaluation/re-marking of the answer book. Any senior faculty member from the relevant discipline will be arranged by the department chairman with the approval of dean for rechecking of answer script. Senior faculty member or rechecking committee appointed shall see that:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>There is no computational mistake in the grand total on the title page of the answer book.</li>
                                            <li>The total of various parts of a question has been correctly made at the end of each question.</li>
                                            <li>All totals have been correctly brought forward on the title page of the answer book.</li>
                                            <li>No portion of any answer has been left un-marked.</li>
                                            <li>Total marks in the answer book tally with the marks sheet.</li>
                                            <li>The hand-writing of the candidate tally in the questions/answer book.</li>
                                            <li>The candidate or anybody on his behalf has no right to see or examine the answer books for any purpose.</li>
                                            <li>The marks of a candidate could even decrease in light of (iii) above. In the event of reduction of marks the record shall be corrected accordingly and revised transcript will be issued.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">5.7 Matters related to certificate/degree conferment</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Convocation will be conducted by the college to award the certificates/degrees to the qualified students as per criteria.</li>
                                            <li>Urgent certificate/degree can be issued as per policy of college upon the request of student.</li>
                                            <li>Certificate/Degree shall only be issued to the concerned candidate in person on fulfillment of all requirements and discharge of all liabilities evidenced by obtaining clearance as prescribed.</li>
                                            <li>In case a candidate desires that someone else be allowed to collect the certificate/degree on his behalf then a certificate/degree may be issued to a nominee carrying a legally acceptable Authority letter issued by the candidate. The nominee will have to provide a satisfactory proof of identity at the time of receiving certificate/degree.</li>
                                            <li>Duplicate Certificate/Degree may be issued (with completion of all requirements) to a candidate in case the original certificate/degree is lost/damaged or in case of change in the name of candidate. The candidate has to apply to the Controller of Examinations for the issuance of duplicate certificate/degree along with the relevant documentary proof as per college rules.</li>
                                            <li>In case a candidate has lost or damaged his/her original certificate/degree or changed his/her name, a duplicate certificate/degree may be issued, after the completion of prescribed requirement. In any such case, a candidate shall have to submit a request in writing, along with the relevant documentary evidence in support of the request, to the controller of the examinations for the issuance of a duplicate certificate/degree.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">5.8 Awards and Distinctions</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Medals/Prizes/Rolls of Honor/Positions will be awarded to the students passing their internal as well as external examinations/term papers in the Semester System in the first attempt.</li>
                                            <li>In the Semester System, Letter Grades will be awarded on the basis of GP / GPA / CGPA and Positions would be given on the basis of CGPA. In case two or more students are acquiring same CGPA only then the Position would be decided on the basis of percentage among those students.</li>
                                            <li>The disciplines where number of students is less than 05, no position will be awarded in semester system.</li>
                                            <li>No medal and roll of honor will be granted to candidates who passed the examination in 2nd attempt.</li>
                                            <li>The result of the candidate is not declared within the prescribed time of the program, then no medal will be awarded.</li>
                                            <li>No Medal/Roll of Honor will be awarded in the case of improving CGPA.</li>
                                        </ul>
                                    </div>

                                </div>
                            </section>
                        </ScrollReveal>

                        {/* CHAPTER 6 */}
                        <ScrollReveal>
                            <section id="ch6" className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
                                <div className="bg-[#0D2B5A] px-6 py-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-[#C62828] flex items-center justify-center text-xs font-bold text-white">06</span>
                                    <h2 className="text-lg font-bold text-white tracking-tight">Planning, Tutorial &amp; Orientation Rules</h2>
                                </div>
                                <div className="p-6 lg:p-8 space-y-6 text-[15px] leading-relaxed text-[#4A5568]">

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">6.1 Departmental Planning for The Academic Year</h3>
                                        <p className="mb-2">Each department shall plan the subjects to be offered during the complete academic year before its commencement to ensure that the students have the necessary lead time to decide subjects for registration and make their own time table before commencement of a semester. The departmental plan will comprise of the following:</p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>The number of sections for a subject during a semester and assignment of class rooms to each section planned.</li>
                                            <li>Maximum and minimum number of students allowed registration in a subject section.</li>
                                            <li>Subject allocation to faculty members over the academic year, that is, fall, spring and summer semesters, keeping in view their maximum permissible load. There may be cases when a faculty member is permitted to take a semester off from teaching while completing the assigned load during the remaining semesters of the academic year.</li>
                                            <li>Time table of each semester of the academic year showing the location, timings and teacher of each subject.</li>
                                            <li>The departmental plan will be submitted to the Quality Enhancement Cell (QEC) for incorporation in the registration software at least 8 weeks before commencement of the academic year.</li>
                                            <li>The plan will be well advertised for the information of all college students.</li>
                                            <li>Any changes in the departmental plan for a semester will be communicated to the QEC at least 4 weeks before commencement of a particular semester.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">6.2 Subject/ Course Files</h3>
                                        <p className="mb-2">Maintenance of subject file is compulsory for the teacher. It will have a complete record of everything that happened during the semester. The course file will contain:</p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Code, Title and Description of the Subject with Weekly Teaching Schedule showing date of Mid-Term Examination. The same would also be distributed to all students before commencement of semester and will preferably be available on the web.</li>
                                            <li>Grading policy will identify each activity such as homework, Quizzes, Mid-Semester Examination, Final Examination, Term Papers. The same would also be distributed to all students before commencement of semester and will preferably be available on the web.</li>
                                            <li>Solution and copies of the best, worst and average of each Homework Assignment given to students.</li>
                                            <li>Solution and copies of the best, worst and average of each Quiz given.</li>
                                            <li>Solution and copies of the best, worst and average of the Mid-term examination given.</li>
                                            <li>Solution and copies of the best, worst and average of the final examination given.</li>
                                            <li>Grading Sheets of the Course detailing Statistical data on the grades obtained by students.</li>
                                            <li>Difficulties /Problems faced during classroom / course delivery.</li>
                                            <li>Description of Course/Learning Outcomes</li>
                                            <li>Course syllabus and changes, if any, made over at least 3 semesters</li>
                                            <li>Weekly Teaching Schedule</li>
                                            <li>Dates of Mid-Semester &amp; Final Semester Examinations</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">6.3 Tutorials and Role of Tutor</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>The departmental Board of Studies will appoint a tutor for a group of students comprising of students preferably from each academic session in progress.</li>
                                            <li>There will be a one-hour formal tutorial session scheduled in the time table once each month.</li>
                                            <li>The tutor will be accessible to his advisees during scheduled office hours during a semester.</li>
                                            <li>The tutor will advise the students in matters such as registration in subjects, study difficulties, matters related to different offices of the college, scholarships and financial aid, personal counseling, leave issues, grade change requests, fees payment etc..</li>
                                            <li>Opinion of the tutor will be given due weight in assessing discipline, financial and attendance issues related to their advisees.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-[#0D2B5A] mb-2">6.4 Student Orientation and Guidance</h3>
                                        <p className="mb-2">The departments will arrange orientation for newly admitted students before commencement of first semester and guidance sessions for all students before commencement of each semester. The following information will be disseminated to the students during these sessions.</p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>Semester policies, especially warning, probation and separation policy.</li>
                                            <li>Registration guidelines, credit hour registration limits.</li>
                                            <li>Subject registration, guidelines, pre-requisites and way forward for weak students.</li>
                                            <li>Assignment of Tutors.</li>
                                            <li>Any other academic and co-curricular aspects.</li>
                                        </ul>
                                    </div>

                                </div>
                            </section>
                        </ScrollReveal>


                    </article>
                </div>
            </div>
        </div>
    );
}