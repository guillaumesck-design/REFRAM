import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, FileDown } from 'lucide-react';
import { IMG, BROCHURE_URL } from '../i18n';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -96 });
  else el.scrollIntoView({ behavior: 'smooth' });
};

export default function Hero({ t }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const glowO = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative pt-36 sm:pt-44 pb-16 sm:pb-24 overflow-hidden">
      <motion.div style={{ opacity: glowO }} className="absolute -top-40 right-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#2563EB]/10 blur-[120px]" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="font-mono-tech text-sm uppercase tracking-[0.25em] text-[#2563EB]"
              data-testid="hero-eyebrow"
            >
              {t.hero.eyebrow}
            </motion.p>

            <h1 data-testid="hero-title" className="mt-6 font-display font-bold uppercase text-[#10151D] text-4xl sm:text-5xl lg:text-6xl leading-[1.04] tracking-tight">
              {t.hero.lines.map((line, i) => (
                <span key={line} className="line-mask">
                  <motion.span
                    className="block"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {i === 1 ? <span className="text-[#2563EB]">{line}</span> : line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-7 max-w-xl text-base sm:text-lg text-[#3A4350] leading-relaxed"
              data-testid="hero-sub"
            >
              {t.hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <button data-testid="hero-quote-cta" onClick={() => scrollTo('s6')}
                className="btn-gold group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold">
                {t.hero.cta1}
                <ArrowDownRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>
              <button data-testid="hero-specs-cta" onClick={() => scrollTo('s2')}
                className="btn-gold-outline inline-flex items-center gap-2 rounded-full border px-8 py-4 text-base font-semibold">
                {t.hero.cta2}
              </button>
              <a data-testid="hero-brochure-link" href={BROCHURE_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono-tech text-[13px] uppercase tracking-[0.15em] text-[#5C6470] hover:text-[#10151D] transition-colors duration-300">
                <FileDown size={15} /> {t.hero.brochure}
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.figure
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -inset-3 border border-[#C5B358]/40 rounded-sm" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-sm border border-black/10 spotlight">
                <motion.img
                  style={{ y: imgY }}
                  src={IMG.heroWall}
                  alt={t.hero.fig}
                  className="w-full h-[420px] sm:h-[520px] object-cover object-center scale-110"
                  data-testid="hero-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12]/60 via-transparent to-transparent" aria-hidden="true" />
              </div>
              <figcaption className="mt-4 font-mono-tech text-sm text-[#8B929C]" data-testid="hero-fig-caption">{t.hero.fig}</figcaption>
            </motion.figure>
          </div>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 border border-black/10"
          data-testid="hero-stats"
        >
          {t.hero.stats.map((s, i) => (
            <div key={i} className="bg-white px-6 py-6" data-testid={`hero-stat-${i}`}>
              <dt className="font-display text-3xl sm:text-4xl font-bold text-[#10151D]">{s.v}</dt>
              <dd className="mt-1 font-mono-tech text-[13px] uppercase tracking-[0.15em] text-[#8B929C]">{s.l}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
