import Header from './components/Header';
import Hero from './sections/Hero';
import VCMessage from './sections/VCMessage';
import Programs from './sections/Programs';
import Facts from './sections/Facts';
import Campus from './sections/Campus';
import News from './sections/News';
import CTA from './sections/CTA';
import Footer from './components/Footer';
 
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <VCMessage />
        <Programs />
        <Facts />
        <Campus />
        <News />
        <CTA />
      </main>
      <Footer />
    </>
  );
}