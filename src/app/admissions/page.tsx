'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import {
    GraduationCap, FileText, ClipboardList, Calendar, Wallet, Award,
    PieChart, CheckCircle, BookOpen, ShieldCheck, Phone, Download,
    MapPin, Mail, PhoneCall, MessageCircle, ArrowRight, AlertCircle,
    Sparkles, Users, Clock, BadgeCheck, ExternalLink
} from 'lucide-react';

const tabs = [
    { id: 'programs', label: 'Offer Programs', icon: GraduationCap },
    { id: 'ads', label: 'Admission ADs', icon: FileText },
    { id: 'apply', label: 'How To Apply', icon: ClipboardList },
    { id: 'dates', label: 'Important Dates', icon: Calendar },
    { id: 'fees', label: 'Fee Structure', icon: Wallet },
    { id: 'scholarships', label: 'Scholarships', icon: Award },
    { id: 'quota', label: 'Admission Quota', icon: PieChart },
    { id: 'eligibility', label: 'Eligibility Criteria', icon: CheckCircle },
    { id: 'test', label: 'Test Subjects', icon: BookOpen },
    { id: 'exemption', label: 'Test Exemption', icon: ShieldCheck },
    { id: 'contact', label: 'Quick Contact', icon: Phone },
];

const bachelorPrograms = [
    'Garment Engineering Technology',
    'Electrical Engineering Technology',
    'Automotive Engineering Technology',
    'Mechanical Engineering Technology',
    'Fashion Design Technology',
    'Architectural Engineering Technology',
    'Civil Engineering Technology',
    'Software Engineering Technology',
    'Bachelor of Business & Information Technology (BBIT)',
];

const newPrograms = [
    'B.Sc. Information Security Engineering Technology',
    'B.Sc. Artificial Intelligence (AI) Engineering Technology',
    'Bachelor of Printing, Packaging and Graphics Engineering Technology',
];

const masterPrograms = [
    'MSc. Mechanical Engineering Technology',
    'MSc. Electrical Engineering Technology',
];

const limitedSeatPrograms = [
    'B.Sc. Architectural Engineering Technology',
    'B.Sc. Civil Engineering Technology',
    'B.Sc. Mechanical Engineering Technology',
    'B.Sc. Electrical Engineering Technology',
    'B.Sc. Garments Engineering Technology',
    'Bachelor in Fashion Design Technology',
    'Bachelor of Business and Information Technology',
    'Bachelor of Printing, Packaging and Graphics Engineering Technology',
    'M.Sc. Mechanical Engineering Technology',
    'M.Sc. Electrical Engineering Technology',
];

const quotaItems = [
    { label: 'Open Merit', value: '90%' },
    { label: 'Merged districts of FATA in KPK (One seat for each District)', value: '02%' },
    { label: 'Balochistan (One seat for each Civil Division)', value: '02%' },
    { label: 'Sports based seats', value: '02%' },
    { label: 'Minorities', value: '02%' },
    { label: 'Disable', value: '02%' },
];

const testSubjects = [
    { subject: 'English', percent: '20%' },
    { subject: 'Basic Mathematics', percent: '20%' },
    { subject: 'Computer', percent: '20%' },
    { subject: 'General Knowledge / Current Affairs', percent: '40%' },
];

export default function AdmissionsPage() {
    const [activeTab, setActiveTab] = useState('programs');

    const TabContent = () => {
        switch (activeTab) {
            case 'programs':
                return (
                    <div className="space-y-10">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-[#C62828]/10 text-[#C62828]">
                                    <GraduationCap size={22} />
                                </div>
                                <h3 className="text-xl font-bold text-[#0D2B5A]">
                                    Bachelors of Engineering Technology
                                </h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3">
                                {bachelorPrograms.map((p) => (
                                    <div
                                        key={p}
                                        className="flex items-center gap-3 bg-white rounded-xl border border-black/5 p-4 shadow-sm hover:shadow-md transition-shadow hover:border-[#C62828]/20 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#C62828] shrink-0" />
                                        <span className="text-[#1A202C] font-medium text-sm group-hover:text-[#0D2B5A] transition-colors">
                                            {p}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0D2B5A] to-[#1A3F7A] p-8">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C62828]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                            <div className="relative">
                                <div className="flex items-center gap-3 mb-4">
                                    <Sparkles size={20} className="text-[#C62828]" />
                                    <h3 className="text-lg font-bold text-white">New Programs</h3>
                                </div>
                                <div className="space-y-3">
                                    {newPrograms.map((p) => (
                                        <div key={p} className="flex items-start gap-3 text-white/90">
                                            <span className="text-[#C62828] font-bold text-lg leading-none">•</span>
                                            <span className="text-sm leading-relaxed">{p}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-[#C62828]/10 text-[#C62828]">
                                    <Award size={22} />
                                </div>
                                <h3 className="text-xl font-bold text-[#0D2B5A]">
                                    Masters of Engineering Technology
                                </h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3">
                                {masterPrograms.map((p) => (
                                    <div
                                        key={p}
                                        className="flex items-center gap-3 bg-white rounded-xl border border-black/5 p-4 shadow-sm hover:shadow-md transition-shadow hover:border-[#C62828]/20 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#C62828] shrink-0" />
                                        <span className="text-[#1A202C] font-medium text-sm group-hover:text-[#0D2B5A] transition-colors">
                                            {p}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'ads':
                return (
                    <div className="space-y-6">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#C62828] to-[#D32F2F] p-8 text-white shadow-xl">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
                            <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1 text-xs font-semibold tracking-wider uppercase mb-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                        Fall 2026
                                    </div>
                                    <h3 className="text-2xl font-bold">Admissions Open</h3>
                                    <p className="text-white/80 text-sm mt-1">
                                        Applications are now being accepted for Fall 2026.
                                    </p>
                                </div>
                                <div className="shrink-0 flex items-center gap-2 bg-white/10 rounded-full px-6 py-3 backdrop-blur-sm">
                                    <Clock size={18} />
                                    <span className="text-sm font-medium">Apply by Aug 15</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
                            <h4 className="text-lg font-bold text-[#0D2B5A] mb-4 flex items-center gap-2">
                                <FileText size={18} className="text-[#C62828]" />
                                Latest Admission Notices
                            </h4>
                            <div className="space-y-3">
                                {[
                                    'Fall 2026 Admission Schedule Announced',
                                    'Entry Test Registration Now Open',
                                    'Scholarship Application Deadline Extended',
                                ].map((notice, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between p-4 bg-[#F7FAFC] rounded-xl hover:bg-[#EDF2F7] transition-colors"
                                    >
                                        <span className="text-[#2D3748] font-medium text-sm">
                                            {notice}
                                        </span>
                                        <span className="text-[10px] font-bold text-[#C62828] bg-[#C62828]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                                            New
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'apply':
                return (
                    <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-8 shadow-sm">
                        <h3 className="text-xl font-bold text-[#0D2B5A] mb-8 flex items-center gap-3">
                            <ClipboardList size={22} className="text-[#C62828]" />
                            How To Apply
                        </h3>
                        <div className="relative">
                            {/* Vertical line */}
                            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-[#C62828]/10 hidden md:block" />

                            <div className="space-y-8">
                                {[
                                    {
                                        step: '01',
                                        title: 'Online Application',
                                        desc: 'Click Here to Apply (For online admission). Fill out the application form with accurate details.',
                                        icon: FileText,
                                    },
                                    {
                                        step: '02',
                                        title: 'Fee Challan Generation',
                                        desc: 'After submission of the online application form, a fee challan will be generated for the applied program. Take a printout of the application form and challan.',
                                        icon: Wallet,
                                    },
                                    {
                                        step: '03',
                                        title: 'Fee Deposit & Document Submission',
                                        desc: 'After depositing the fee at Bank of Punjab, submit or courier the application form along with the original fee challan, copies of CNIC, educational documents & all other required documents to the Admission Office, PTUT.',
                                        icon: CheckCircle,
                                    },
                                ].map((item, idx) => (
                                    <div key={item.step} className="flex gap-5 relative">
                                        <div className="shrink-0 relative z-10">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#0D2B5A] to-[#1A3F7A] text-white flex items-center justify-center font-bold text-sm md:text-lg shadow-lg shadow-[#0D2B5A]/20">
                                                {item.step}
                                            </div>
                                            <div className="absolute -inset-1 rounded-full bg-[#0D2B5A]/5 blur-md" />
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <item.icon size={16} className="text-[#C62828]" />
                                                <h4 className="text-base md:text-lg font-bold text-[#0D2B5A]">
                                                    {item.title}
                                                </h4>
                                            </div>
                                            <p className="text-[#4A5568] text-sm leading-relaxed">
                                                {item.desc}
                                            </p>
                                            {idx < 2 && (
                                                <div className="hidden md:block absolute left-5 top-12 bottom-0 w-0.5 bg-[#C62828]/10 -translate-x-1/2" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-[#C62828]/5 border border-[#C62828]/10 rounded-xl flex items-start gap-3">
                            <AlertCircle size={18} className="text-[#C62828] shrink-0 mt-0.5" />
                            <p className="text-sm text-[#C62828] font-medium">
                                Ensure all documents are attested before submission. Incomplete applications will not be processed.
                            </p>
                        </div>
                    </div>
                );

            case 'dates':
                return (
                    <div className="space-y-6">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0D2B5A] to-[#1A3F7A] p-8 text-white shadow-xl">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C62828]/10 rounded-full blur-3xl" />
                            <div className="relative">
                                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1 text-xs font-semibold tracking-wider uppercase mb-3">
                                    <Calendar size={14} />
                                    Fall 2026
                                </div>
                                <h3 className="text-2xl font-bold mb-1">Admissions Open for Fall 2026</h3>
                                <div className="flex items-center gap-3 mt-4 text-white/90">
                                    <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
                                        <Clock size={18} className="text-[#C62828]" />
                                        <span className="text-sm">
                                            Classes Start: <strong className="text-white">31 August 2026</strong>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 rounded-lg bg-[#C62828]/10 text-[#C62828]">
                                    <AlertCircle size={20} />
                                </div>
                                <h4 className="text-lg font-bold text-[#0D2B5A]">
                                    Limited Seats Available
                                </h4>
                            </div>
                            <div className="grid md:grid-cols-2 gap-2.5">
                                {limitedSeatPrograms.map((p) => (
                                    <div
                                        key={p}
                                        className="flex items-center gap-2.5 bg-[#F7FAFC] px-4 py-3 rounded-xl text-sm text-[#2D3748] border border-transparent hover:border-[#C62828]/20 hover:bg-white transition-all"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#C62828] shrink-0" />
                                        {p}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'fees':
                return (
                    <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-8 shadow-sm">
                        <h3 className="text-xl font-bold text-[#0D2B5A] mb-6 flex items-center gap-3">
                            <Wallet size={22} className="text-[#C62828]" />
                            Fee Structure
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            {[
                                { label: 'DAE Programs Fee', file: 'dae-fee.pdf', icon: FileText },
                                { label: 'Undergraduate Program Fee', file: 'ug-fee.pdf', icon: GraduationCap },
                                { label: 'Master Program Fee', file: 'masters-fee.pdf', icon: Award },
                            ].map((fee) => (
                                <a
                                    key={fee.label}
                                    href={`/downloads/${fee.file}`}
                                    className="group flex flex-col items-center gap-4 p-8 bg-[#F7FAFC] rounded-2xl border-2 border-dashed border-[#0D2B5A]/10 hover:border-[#C62828] hover:bg-[#C62828]/5 transition-all duration-300"
                                >
                                    <div className="p-3 rounded-full bg-[#0D2B5A]/5 group-hover:bg-[#C62828]/10 transition-colors">
                                        <Download size={28} className="text-[#0D2B5A] group-hover:text-[#C62828] transition-colors" />
                                    </div>
                                    <span className="text-sm font-semibold text-[#0D2B5A] text-center group-hover:text-[#C62828] transition-colors">
                                        {fee.label}
                                    </span>
                                    <span className="text-xs text-[#4A5568] group-hover:text-[#C62828]/70 transition-colors flex items-center gap-1">
                                        Download PDF <ArrowRight size={12} />
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                );

            case 'scholarships':
                return (
                    <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-10 shadow-sm text-center">
                        <div className="inline-flex p-4 rounded-full bg-[#C62828]/10 text-[#C62828] mb-4">
                            <Award size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0D2B5A] mb-1">Scholarships at PTUT</h3>
                        <p className="text-[#4A5568] text-lg">Academic Year 2026-27</p>
                        <div className="mt-6 max-w-2xl mx-auto p-6 bg-[#F7FAFC] rounded-2xl text-left">
                            <p className="text-[#4A5568] leading-relaxed text-sm">
                                Merit-based and need-based scholarships are available for deserving students. Details regarding application procedures, eligibility, and award amounts will be published on the official notice board and communicated to enrolled students at the commencement of the session.
                            </p>
                        </div>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <span className="px-4 py-2 bg-[#0D2B5A]/5 rounded-full text-xs font-semibold text-[#0D2B5A]">
                                Merit Based
                            </span>
                            <span className="px-4 py-2 bg-[#0D2B5A]/5 rounded-full text-xs font-semibold text-[#0D2B5A]">
                                Need Based
                            </span>
                            <span className="px-4 py-2 bg-[#0D2B5A]/5 rounded-full text-xs font-semibold text-[#0D2B5A]">
                                Special Quota
                            </span>
                        </div>
                    </div>
                );

            case 'quota':
                return (
                    <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-8 shadow-sm">
                        <h3 className="text-xl font-bold text-[#0D2B5A] mb-6 flex items-center gap-3">
                            <PieChart size={22} className="text-[#C62828]" />
                            Admission Quota Distribution
                        </h3>
                        <div className="space-y-3">
                            {quotaItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-[#F7FAFC] rounded-xl hover:bg-[#EDF2F7] transition-colors"
                                >
                                    <span className="text-[#2D3748] font-medium text-sm">
                                        {item.label}
                                    </span>
                                    <span className="text-lg font-bold text-[#C62828] bg-white px-4 py-1 rounded-lg shadow-sm self-start sm:self-auto">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 p-4 bg-[#0D2B5A]/5 rounded-xl flex items-start gap-3">
                            <BadgeCheck size={18} className="text-[#0D2B5A] shrink-0 mt-0.5" />
                            <p className="text-sm text-[#4A5568]">
                                All quotas are strictly adhered to as per the admission policy of Punjab Tianjin University of Technology.
                            </p>
                        </div>
                    </div>
                );

            case 'eligibility':
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-[#0D2B5A] mb-5 flex items-center gap-3">
                                <GraduationCap size={22} className="text-[#C62828]" />
                                Bachelor Degree Requirements
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="p-1 rounded-full bg-[#C62828]/10 text-[#C62828] shrink-0 mt-0.5">
                                        <CheckCircle size={16} />
                                    </div>
                                    <span className="text-[#4A5568] text-sm leading-relaxed">
                                        Candidates should have at least <strong className="text-[#0D2B5A]">50% marks</strong> in the relevant discipline of DAE / FSC / ICS / FA or Equivalent.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="p-1 rounded-full bg-[#C62828]/10 text-[#C62828] shrink-0 mt-0.5">
                                        <CheckCircle size={16} />
                                    </div>
                                    <span className="text-[#4A5568] text-sm leading-relaxed">
                                        FSc (Pre-medical) is also eligible with the condition to pass deficiency courses.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-[#0D2B5A] mb-5 flex items-center gap-3">
                                <Award size={22} className="text-[#C62828]" />
                                Masters Degree Requirements
                            </h3>
                            <p className="text-[#4A5568] text-sm leading-relaxed mb-5">
                                Candidates must have earned 16 years of education: <strong className="text-[#0D2B5A]">B.Sc / B.E / B.Tech (Hons.)</strong> degree in the relevant disciplines in:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="p-1 rounded-full bg-[#C62828]/10 text-[#C62828] shrink-0 mt-0.5">
                                        <CheckCircle size={16} />
                                    </div>
                                    <span className="text-[#4A5568] text-sm leading-relaxed">
                                        First division (60% of the Annual System), <strong className="text-[#0D2B5A]">OR</strong>
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="p-1 rounded-full bg-[#C62828]/10 text-[#C62828] shrink-0 mt-0.5">
                                        <CheckCircle size={16} />
                                    </div>
                                    <span className="text-[#4A5568] text-sm leading-relaxed">
                                        At least <strong className="text-[#0D2B5A]">CGPA 2.50 out of 4.00</strong> (Semester System).
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0D2B5A] to-[#1A3F7A] p-6 md:p-8 text-white shadow-xl">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C62828]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                            <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Admission Criterion</h4>
                                    <p className="text-sm text-white/70">Go to the online application portal of PTUT</p>
                                </div>
                                <a
                                    href="#"
                                    className="shrink-0 inline-flex items-center gap-2 bg-[#C62828] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#D32F2F] transition-colors shadow-lg shadow-[#C62828]/20"
                                >
                                    Download Criterion <Download size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                );

            case 'test':
                return (
                    <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-8 shadow-sm">
                        <h3 className="text-xl font-bold text-[#0D2B5A] mb-6 flex items-center gap-3">
                            <BookOpen size={22} className="text-[#C62828]" />
                            Entrance Test Subjects & Weightage
                        </h3>
                        <div className="grid gap-3">
                            {testSubjects.map((t) => (
                                <div
                                    key={t.subject}
                                    className="flex items-center justify-between p-5 bg-[#F7FAFC] rounded-xl hover:bg-[#EDF2F7] transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[#0D2B5A]" />
                                        <span className="text-[#2D3748] font-medium text-sm">
                                            {t.subject}
                                        </span>
                                    </div>
                                    <span className="text-lg font-bold text-[#C62828] bg-white px-4 py-1 rounded-lg shadow-sm">
                                        {t.percent}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 p-4 bg-[#C62828]/5 border border-[#C62828]/10 rounded-xl flex items-start gap-3">
                            <AlertCircle size={18} className="text-[#C62828] shrink-0 mt-0.5" />
                            <p className="text-sm text-[#C62828] font-medium">
                                The total test is cumulative. Prepare all subjects thoroughly for maximum scoring potential.
                            </p>
                        </div>
                    </div>
                );

            case 'exemption':
                return (
                    <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-10 shadow-sm text-center">
                        <div className="inline-flex p-4 rounded-full bg-[#C62828]/10 text-[#C62828] mb-4">
                            <ShieldCheck size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0D2B5A] mb-3">Test Exemption Policy</h3>
                        <p className="text-[#4A5568] leading-relaxed max-w-2xl mx-auto text-sm">
                            The university will conduct its own Entrance Test. However, candidates holding valid scores from the following recognised examinations are also acceptable in lieu of the PTUT entry test.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 mt-6">
                            {['UET Entry Test', 'E-CAT', 'USAT'].map((test) => (
                                <span
                                    key={test}
                                    className="px-6 py-3 bg-gradient-to-br from-[#0D2B5A] to-[#1A3F7A] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#0D2B5A]/20 hover:shadow-xl transition-shadow"
                                >
                                    {test}
                                </span>
                            ))}
                        </div>
                        <div className="mt-6 p-4 bg-[#F7FAFC] rounded-xl max-w-md mx-auto">
                            <p className="text-xs text-[#4A5568]">
                                <span className="font-bold text-[#0D2B5A]">Note:</span> Valid scores must be from the last 2 years.
                            </p>
                        </div>
                    </div>
                );

            case 'contact':
                return (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-[#0D2B5A] mb-6 flex items-center gap-3">
                                <Phone size={22} className="text-[#C62828]" />
                                Admission Office
                            </h3>
                            <div className="space-y-5">
                                <div className="flex items-start gap-4 p-4 bg-[#F7FAFC] rounded-xl">
                                    <div className="p-2 rounded-lg bg-[#C62828]/10 text-[#C62828] shrink-0">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#0D2B5A] text-sm">Punjab Tianjin University of Technology</p>
                                        <p className="text-[#4A5568] text-xs">Sector C-II Township Lahore, Punjab 54770, Pakistan</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-[#F7FAFC] rounded-xl">
                                    <div className="p-2 rounded-lg bg-[#C62828]/10 text-[#C62828] shrink-0">
                                        <PhoneCall size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#64748B]">Call us</p>
                                        <p className="font-bold text-[#0D2B5A] text-sm">+92 42 9933 2439</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-[#F7FAFC] rounded-xl">
                                    <div className="p-2 rounded-lg bg-[#C62828]/10 text-[#C62828] shrink-0">
                                        <MessageCircle size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#64748B]">WhatsApp</p>
                                        <p className="font-bold text-[#0D2B5A] text-sm">0309-7888547</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-[#F7FAFC] rounded-xl">
                                    <div className="p-2 rounded-lg bg-[#C62828]/10 text-[#C62828] shrink-0">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#64748B]">Email</p>
                                        <p className="font-bold text-[#0D2B5A] text-sm">admissions@ptut.edu.pk</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0D2B5A] to-[#1A3F7A] p-6 md:p-8 text-white shadow-xl flex flex-col justify-center">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C62828]/10 rounded-full blur-3xl" />
                            <div className="relative">
                                <div className="inline-flex p-3 rounded-full bg-white/10 text-[#C62828] mb-4">
                                    <Users size={24} />
                                </div>
                                <h4 className="text-xl font-bold mb-2">Need Assistance?</h4>
                                <p className="text-white/70 leading-relaxed text-sm mb-6">
                                    Our admission office is open Monday through Friday, 9:00 AM to 4:00 PM. Feel free to visit us or reach out via phone or email for any queries regarding Fall 2026 admissions.
                                </p>
                                <a
                                    href="mailto:admissions@ptut.edu.pk"
                                    className="inline-flex items-center justify-center gap-2 bg-[#C62828] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#D32F2F] transition-colors shadow-lg shadow-[#C62828]/20"
                                >
                                    Email Admission Office <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <Header />
            <main className="pt-[72px]">
                {/* Page Hero */}
                <section className="bg-[#0D2B5A] text-white py-16 border-b-4 border-[#C62828] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#C62828]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C62828]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
                    <div className="max-w-[1240px] mx-auto px-6 lg:px-8 relative">
                        <ScrollReveal>
                            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C62828] uppercase tracking-widest mb-3 bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C62828] animate-pulse" />
                                Fall 2026
                            </div>
                            <h1 className="text-[clamp(32px,4vw,56px)] font-extrabold leading-tight tracking-tight">
                                Admissions <span className="text-[#C62828]">Fall 2026</span>
                            </h1>
                            <p className="mt-4 text-white/80 max-w-[60ch] leading-relaxed text-sm md:text-base">
                                Begin your journey at Pakistan&apos;s First Technology University. Explore programs, check eligibility, and apply online today.
                            </p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Sidebar Tabs Layout */}
                <section className="py-8 bg-[#F7FAFC] min-h-[60vh]">
                    <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Sidebar */}
                            <aside className="md:w-64 lg:w-72 shrink-0">
                                <div className="sticky top-[88px] bg-white rounded-2xl border border-black/5 shadow-sm p-3 max-h-[calc(100vh-120px)] overflow-y-auto">
                                    <nav className="space-y-1">
                                        {tabs.map((tab) => {
                                            const Icon = tab.icon;
                                            const isActive = activeTab === tab.id;
                                            return (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => setActiveTab(tab.id)}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                                                        isActive
                                                            ? 'bg-[#0D2B5A] text-white shadow-md shadow-[#0D2B5A]/10'
                                                            : 'text-[#4A5568] hover:bg-[#F7FAFC] hover:text-[#0D2B5A]'
                                                    }`}
                                                >
                                                    <Icon size={18} className={isActive ? 'text-[#C62828]' : 'opacity-70'} />
                                                    <span className="flex-1">{tab.label}</span>
                                                    {isActive && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#C62828] animate-pulse" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </nav>
                                </div>
                            </aside>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, x: 12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -12 }}
                                        transition={{ duration: 0.25, ease: 'easeOut' }}
                                    >
                                        <TabContent />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}