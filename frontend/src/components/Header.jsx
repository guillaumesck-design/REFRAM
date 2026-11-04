import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from 'lucide-react';
import { PHONE, PHONE_TEL } from '../i18n';

export const LogoMark = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect width="48" height="48" rx="6" fill="#0A0D12" />
    <path d="M24 8 L28.5 19.5 L41 20 L31 28 L34.5 40 L24 33 L13.5 40 L17 28 L7 20 L19.5 19.5 Z" fill="#2563EB" />
    <circle cx="24" cy="24" r="4.5" fill="#FF5500" />
  </svg>
);

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70 });
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
        scrolled ? 'bg-[#0A0D12]/85 backdrop-blur-xl border-b border-white/10' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">
          <button data-testid="header-logo" onClick={() => window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo(0, 0)} className="flex items-center gap-3 text-left">
            <LogoMark />
            <span className="leading-tight">
              <span className="block font-display font-bold uppercase tracking-wide text-white text-base">{t.headerTag}</span>
              <span className="block font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#FF5500]">{t.headerSub}</span>
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-7" data-testid="header-nav">
            {links.map(([id, label]) => (
              <button key={id} data-testid={`nav-${id}`} onClick={() => scrollTo(id)}
                className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#94A3B8] hover:text-white transition-colors duration-300">
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center rounded-full border border-white/15 p-0.5" data-testid="language-switcher">
              {['fr', 'en'].map((l) => (
                <button key={l} data-testid={`lang-${l}`} onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-mono-tech text-[11px] uppercase tracking-widest transition-colors duration-300 ${
                    lang === l ? 'bg-[#FF5500] text-white' : 'text-[#94A3B8] hover:text-white'
                  }`}>
                  {l}
                </button>
              ))}
            </div>
            <a data-testid="header-phone-cta" href={PHONE_TEL}
              className="hidden xl:flex items-center gap-2 font-mono-tech text-xs text-[#94A3B8] hover:text-white transition-colors duration-300">
              <Phone size={14} className="text-[#FF5500]" /> {PHONE}
            </a>
            <button data-testid="header-quote-btn" onClick={() => scrollTo('s6')}
              className="hidden sm:inline-flex items-center rounded-full bg-[#FF5500] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#FF6B1A] hover:shadow-[0_0_25px_rgba(255,85,0,0.35)] transition-[background-color,box-shadow] duration-300">
              {t.quoteCta}
            </button>
            <button data-testid="mobile-menu-btn" onClick={() => setOpen(!open)} className="lg:hidden p-2 text-white" aria-label="Menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0A0D12]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map(([id, label]) => (
                <button key={id} data-testid={`mobile-nav-${id}`} onClick={() => { setOpen(false); scrollTo(id); }}
                  className="text-left font-display text-2xl font-semibold uppercase text-white/90">
                  {label}
                </button>
              ))}
              <button data-testid="mobile-quote-btn" onClick={() => { setOpen(false); scrollTo('s6'); }}
                className="mt-2 rounded-full bg-[#FF5500] px-6 py-3 text-sm font-semibold text-white w-fit">
                {t.quoteCta}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
