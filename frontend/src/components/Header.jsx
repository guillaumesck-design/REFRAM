import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from 'lucide-react';
import { PHONE, PHONE_TEL } from '../i18n';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -96 });
  else el.scrollIntoView({ behavior: 'smooth' });
};

export default function Header({ t, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['s1', t.nav.why], ['s2', t.nav.range], ['s3', t.nav.specs],
    ['s4', t.nav.plc], ['s5', t.nav.parts],
  ];

  return (
    <header
      data-testid="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled ? 'bg-white/85 backdrop-blur-xl border-b border-black/10' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          <button data-testid="header-logo" onClick={() => window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo(0, 0)} className="flex items-center gap-4 text-left shrink-0">
            <img src="/img/logo-dark.png" alt="Overkkast" className="h-10 sm:h-12 w-auto max-w-none shrink-0" />
          </button>

          <nav className="hidden lg:flex items-center gap-8" data-testid="header-nav">
            {links.map(([id, label]) => (
              <button key={id} data-testid={`nav-${id}`} onClick={() => scrollTo(id)}
                className="font-mono-tech text-sm uppercase tracking-[0.15em] text-[#3A4350] hover:text-[#10151D] transition-colors duration-300">
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center rounded-full border border-black/15 p-0.5" data-testid="language-switcher">
              {['fr', 'en'].map((l) => (
                <button key={l} data-testid={`lang-${l}`} onClick={() => setLang(l)}
                  className={`px-3 py-1.5 rounded-full font-mono-tech text-[13px] uppercase tracking-widest transition-colors duration-300 ${
                    lang === l ? 'bg-[#C5B358] text-[#1C1706]' : 'text-[#5C6470] hover:text-[#10151D]'
                  }`}>
                  {l}
                </button>
              ))}
            </div>
            <a data-testid="header-phone-cta" href={PHONE_TEL}
              className="hidden xl:flex items-center gap-2 font-mono-tech text-sm whitespace-nowrap text-[#3A4350] hover:text-[#10151D] transition-colors duration-300">
              <Phone size={16} className="text-[#C5B358]" /> {PHONE}
            </a>
            <button data-testid="header-quote-btn" onClick={() => scrollTo('s6')}
              className="btn-gold hidden sm:inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap">
              {t.quoteCta}
            </button>
            <button data-testid="mobile-menu-btn" onClick={() => setOpen(!open)} className="lg:hidden p-2 text-[#10151D]" aria-label="Menu">
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-black/10 overflow-hidden"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map(([id, label]) => (
                <button key={id} data-testid={`mobile-nav-${id}`} onClick={() => { setOpen(false); scrollTo(id); }}
                  className="text-left font-display text-2xl font-semibold uppercase text-[#10151D]">
                  {label}
                </button>
              ))}
              <button data-testid="mobile-quote-btn" onClick={() => { setOpen(false); scrollTo('s6'); }}
                className="btn-gold mt-2 rounded-full px-7 py-3.5 text-sm font-semibold w-fit">
                {t.quoteCta}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
