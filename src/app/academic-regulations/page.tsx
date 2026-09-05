import Header from '../components/Header';
import Footer from '../components/Footer';
import AcademicContent from '../sections/AcademicContent';

export const metadata = {
  title: 'Academic Regulations — PTUT Lahore',
  description: 'Comprehensive academic, fee and discipline regulations for Punjab Tianjin University of Technology.',
};

export default function AcademicRegulationsPage() {
  return (
    <>
      <Header />
      <main>
        <AcademicContent />
      </main>
      <Footer />
    </>
  );
}