import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — PTUT',
  robots: { index: false, follow: false },
};

// Note: the root layout already renders the public site Header above this,
// so admin pages just add top padding to clear the fixed header.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#121826]">
      <main className="max-w-[1100px] mx-auto px-6 pt-28 pb-16">{children}</main>
    </div>
  );
}
