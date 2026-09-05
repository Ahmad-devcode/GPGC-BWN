// src/data/faculty.ts

export interface StaffMember {
  slug: string;
  name: string;
  designation: string;
  image: string;
  email: string;
  department: string;
}

export const staffMembers: StaffMember[] = [
  // ========== ELECTRICAL DEPARTMENT ==========
  {
    slug: 'hafiz-muhammad-obaid',
    name: 'Dr. Hafiz Muhammad Obaid',
    designation: 'Head of the Department',
    image: '/faculty/obaid.jpg',
    email: 'muhammad.obaid@ptut.edu.pk',
    department: 'Electrical Department',
  },
  {
    slug: 'hafiz-abdul-muqeet',
    name: 'Dr. Hafiz Abdul Muqeet',
    designation: 'Chief Laboratory Instructor',
    image: '/faculty/muqeet.jpg',
    email: 'abdul.muqeet@ptut.edu.pk',
    department: 'Electrical Department',
  },
  {
    slug: 'hafiz-faiz-rasool',
    name: 'Dr. Hafiz Faiz Rasool',
    designation: 'Chief Lab Instructor',
    image: '/faculty/faiz.jpg',
    email: 'faiz.rasool@ptut.edu.pk',
    department: 'Electrical Department',
  },
  {
    slug: 'maaz-tahir-malik',
    name: 'Maaz Tahir Malik',
    designation: 'Lecturer',
    image: '/faculty/maaz.jpg',
    email: 'maaz.tahir@ptut.edu.pk',
    department: 'Electrical Department',
  },
  {
    slug: 'arooj-unbreen',
    name: 'Arooj Unbreen',
    designation: 'Lecturer',
    image: '/faculty/arooj.jpg',
    email: 'arooj.unbreen@ptut.edu.pk',
    department: 'Electrical Department',
  },
  {
    slug: 'muhammad-adeel',
    name: 'Muhammad Adeel',
    designation: 'Lab Technologist',
    image: '/faculty/adeel.jpg',
    email: 'm.adeel@ptut.edu.pk',
    department: 'Electrical Department',
  },

  // ========== AUTOMOTIVE DEPARTMENT ==========
  {
    slug: 'muhammad-noman',
    name: 'Engr. Muhammad Noman',
    designation: 'Head of Department',
    image: '/faculty/noman.jpg',
    email: 'muhammad.noman@ptut.edu.pk',
    department: 'Automotive Department',
  },
  {
    slug: 'waqas-sabir',
    name: 'Engr. Waqas Sabir',
    designation: 'Lecturer',
    image: '/faculty/waqas.jpg',
    email: 'waqas.sabir@ptut.edu.pk',
    department: 'Automotive Department',
  },
  {
    slug: 'kashif-ijaz',
    name: 'Engr. Kashif Ijaz',
    designation: 'Senior Laboratory Instructor',
    image: '/faculty/kashif.jpg',
    email: 'kashif.ijaz@ptut.edu.pk',
    department: 'Automotive Department',
  },
  {
    slug: 'hafiz-muhammad-fayyaz',
    name: 'Engr. Hafiz Muhammad Fayyaz',
    designation: 'Lab Technologist',
    image: '/faculty/fayyaz.jpg',
    email: 'hafiz.fayyaz@ptut.edu.pk',
    department: 'Automotive Department',
  },

  // ========== CIVIL / ARCHITECTURE DEPARTMENT ==========
  {
    slug: 'usman-rashid',
    name: 'Prof. Dr. Muhammad Usman Rashid',
    designation: 'Dean / Chairman',
    image: '/faculty/usman-rashid.jpg',
    email: 'usman.rashid@ptut.edu.pk',
    department: 'Civil & Architectural Department',
  },
  {
    slug: 'amir-sohail',
    name: 'Engr. Amir Sohail',
    designation: 'Lecturer',
    image: '/faculty/amir-sohail.jpg',
    email: 'amir.sohail@ptut.edu.pk',
    department: 'Civil & Architectural Department',
  },
  {
    slug: 'hasnain-ahmad-awan',
    name: 'Engr. Hasnain Ahmad Awan',
    designation: 'Lecturer',
    image: '/faculty/hasnain.jpg',
    email: 'husnain.ahmad@ptut.edu.pk',
    department: 'Civil & Architectural Department',
  },
  {
    slug: 'usman-ali',
    name: 'Engr. Usman Ali',
    designation: 'Senior Laboratory Instructor',
    image: '/faculty/usman-ali.jpg',
    email: 'usman.ali@ptut.edu.pk',
    department: 'Civil & Architectural Department',
  },
  {
    slug: 'shahid-ameen',
    name: 'Engr. Shahid Ameen',
    designation: 'Lab Technologist',
    image: '/faculty/shahid-ameen.jpg',
    email: 'shahid.ameen@ptut.edu.pk',
    department: 'Civil & Architectural Department',
  },
  {
    slug: 'sanoober-noureen',
    name: 'Engr. Sanoober Noureen',
    designation: 'Lab Technologist',
    image: '/faculty/sanoober.jpg',
    email: 'sanoober.noureen@ptut.edu.pk',
    department: 'Civil & Architectural Department',
  },

  // ========== SOFTWARE / IT DEPARTMENT ==========
  {
    slug: 'zaigham-mushtaq',
    name: 'Dr. Zaigham Mushtaq',
    designation: 'Head of Department',
    image: '/faculty/zaigham.jpg',
    email: 'zaigham.mushtaq@ptut.edu.pk',
    department: 'Software Engineering Department',
  },
  {
    slug: 'wahab-ahmad',
    name: 'Mr. Wahab Ahmad',
    designation: 'Lecturer',
    image: '/faculty/wahab.jpg',
    email: 'wahab.ahmad@ptut.edu.pk',
    department: 'Software Engineering Department',
  },
  {
    slug: 'hassan-kazmi',
    name: 'Mr. Hassan Kazmi',
    designation: 'Lab Technologist',
    image: '/faculty/hassan.jpg',
    email: 'hassan.kazmi@ptut.edu.pk',
    department: 'Software Engineering Department',
  },
  
];
export const departments = [
  'All',
  'Electrical Department',
  'Automotive Department',
  'Civil & Architectural Department',
  'Software Engineering Department',
];