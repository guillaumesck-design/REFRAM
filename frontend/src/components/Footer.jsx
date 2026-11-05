import { BadgeCheck } from 'lucide-react';
import { PHONE, PHONE_TEL, EMAIL } from '../i18n';

export default function Footer({ t, lang, setLang }) {
  return (
    <footer data-testid="main-footer" className="relative border-t border-white/10 bg-[#0A0D12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <img src="/img/logo-white.png" alt="Overkkast" className="h-10 w-auto" />
              <span className="w-px h-8 bg-white/20" aria-hidden="true" />
              <span className="font-mono-tech text-[13px] uppercase tracking-[0.2em] text-[#60A5FA]">{t.headerSub}</span>
            </div>
            <p className="mt-5 max-w-sm text-base text-[#94A3B8] leading-relaxed" data-testid="footer-line">{t.footer.line}</p>
          </div>
          <div className="md:col-span-4">
            <p className="font-mono-tech text-sm uppercase tracking-[0.2em] text-[#64748B]">Contact</p>
            <a data-testid="footer-phone" href={PHONE_TEL} className="mt-4 block font-display text-2xl font-semibold text-white hover:text-[#C5B358] transition-colors duration-300">{PHONE}</a>
            <a data-testid="footer-email" href={`mailto:${EMAIL}`} className="mt-1 block text-base text-[#94A3B8] hover:text-white transition-colors duration-300">{EMAIL}</a>
            <a data-testid="footer-site" href="https://www.overkkast.com" target="_blank" rel="noopener noreferrer" className="mt-1 block text-base text-[#94A3B8] hover:text-white transition-colors duration-300">{t.footer.site}</a>
          </div>
          <div className="md:col-span-3">
            <p className="font-mono-tech text-sm uppercase tracking-[0.2em] text-[#64748B]">Certifications</p>
            <div className="mt-4 flex flex-wrap gap-2" data-testid="footer-iso-badge">
              {['ISO 9001', 'ISO 10002', 'ISO 14001', 'ISO 45001', 'CE'].map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 font-mono-tech text-[13px] uppercase tracking-widest text-[#94A3B8]">
                  <BadgeCheck size={14} className="text-[#C5B358]" /> {c}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-sm text-[#64748B]" data-testid="footer-legal">{t.footer.legal}</p>
          <div className="flex items-center rounded-full border border-white/15 p-0.5" data-testid="footer-language-switcher">
            {['fr', 'en'].map((l) => (
              <button key={l} data-testid={`footer-lang-${l}`} onClick={() => setLang(l)}
                className={`px-3 py-1.5 rounded-full font-mono-tech text-[13px] uppercase tracking-widest transition-colors duration-300 ${
                  lang === l ? 'bg-[#C5B358] text-[#1C1706]' : 'text-[#94A3B8] hover:text-white'
                }`}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
