import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header'; // ✅ relative path
 
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'GPGC - Govt. Graduate College Bahawalnagr',
  description: "Pakistan's First Technology College. Innovation with Purpose, Excellence with Vision.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-[#121826]">
        {/* ✅ Header added here */}
        <Header />
        {/* ✅ padding to avoid content hiding under fixed header */}
        <main className="">{children}</main>
      </body>
    </html>
  );
}