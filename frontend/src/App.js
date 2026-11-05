import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Toaster } from 'sonner';
import '@/App.css';
import { LANG } from '@/i18n';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import WhySection from '@/components/WhySection';
import ProductsSection from '@/components/ProductsSection';
import SpecsSection from '@/components/SpecsSection';
import VideoSection from '@/components/VideoSection';
import AutomationSection from '@/components/AutomationSection';
import SparePartsSection from '@/components/SparePartsSection';
import ContactSection from '@/components/ContactSection';
import FloatingCallback from '@/components/FloatingCallback';
import Footer from '@/components/Footer';

function App() {
  const [lang, setLang] = useState('fr');
  const t = LANG[lang];

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === 'fr'
      ? 'REFRAM™ — Vibrateurs de pissetage réfractaire | OVERKKAST × IDEALMODEL'
      : 'REFRAM™ — Refractory ramming systems | OVERKKAST × IDEALMODEL';
  }, [lang]);

  return (
    <div className="grain min-h-screen bg-[#F7F5F1]" data-testid="app-root">
      <Toaster theme="light" position="bottom-right" />
      <Header t={t} lang={lang} setLang={setLang} />
      <main>
        <Hero t={t} />
        <Marquee text={t.marquee} />
        <WhySection t={t} />
        <ProductsSection t={t} />
        <SpecsSection t={t} />
        <VideoSection t={t} />
        <AutomationSection t={t} />
        <SparePartsSection t={t} />
        <ContactSection t={t} />
      </main>
      <Footer t={t} lang={lang} setLang={setLang} />
      <FloatingCallback t={t.cb} />
    </div>
  );
}

export default App;
