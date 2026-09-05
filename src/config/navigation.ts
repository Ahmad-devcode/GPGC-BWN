export interface NavItem {
  href?: string;
  label: string;
  children?: NavItem[];
}

export const navLinks: NavItem[] = [
  { href: '/', label: 'Home' },
  {
    label: 'About Us',
    children: [
      { href: '/about', label: 'About' },
      { href: '#', label: 'History' },
      { href: '#', label: 'Vision & Mission' },
      { href: '/academic-regulations', label: 'Academic Regulations' },
      { href: '/act-2018', label: 'ACT 2018' },
    ],
  },
  {
    label: 'Academics',
    children: [
      {
        label: 'Faculty of Electric, Auto & Mechanical',
        children: [
          { href: '/programs/electrical-engineering-technology', label: 'Electrical' },
          { href: '/programs/automotive-engineering-technology', label: 'Automotive' },
          { href: '/programs/mechanical-engineering-technology', label: 'Mechanical' },
        ],
      },
      {
        label: 'Faculty of Business & IT',
        children: [
          { href: '/programs/software-engineering-technology', label: 'Software Engineering' },
          { href: '/programs/information-security-engineering-technology', label: 'Information Security' },
          { href: '/programs/bachelor-of-business-and-information-technology', label: 'BBIT' },
        ],
      },
      {
        label: 'Faculty of Civil & Architectural',
        children: [
          { href: '/programs/architectural-engineering-technology', label: 'Architectural' },
          { href: '/programs/civil-engineering-technology', label: 'Civil' },
        ],
      },
      {
        label: 'Faculty of Fashion & Textile',
        children: [
          { href: '/programs/garment-engineering-technology', label: 'Garment' },
          { href: '/programs/fashion-design-technology', label: 'Fashion Design' },
        ],
      },
    ],
  },
  { href: '/faculty', label: 'Faculty' },
  { href: '/leadership', label: 'Leadership' },
  // Administration now points to /administration without sub‑items
  { href: '/administration', label: 'Administration' },
  {
    label: 'Admission',
    children: [
      { href: '#', label: 'Merit List' },
      { href: '#', label: 'Admissions Fall 2026' },
      { href: '#', label: 'Short Course' },
    ],
  },
  { href: '/contact', label: 'Contact' },
];