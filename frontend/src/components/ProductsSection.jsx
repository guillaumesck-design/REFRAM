import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, SectionHead } from './Reveal';
import { IMG } from '../i18n';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70 });
  else el.scrollIntoView({ behavior: 'smooth' });
};

export default function ProductsSection({ t }) {
  const [tab, setTab] = useState('wall');
  const tabs = ['wall', 'floor', 'crane', 'hand'];
  const items = t.s2.products.filter((p) => p.cat === tab);

  return (
    <section id="s2" data-testid="section-products" className="relative py-24 sm:py-32 bg-[#0D1117] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead num={t.s2.num} title={t.s2.title} sub={t.s2.sub} />

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap gap-2" role="tablist" data-testid="product-tabs">
            {tabs.map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                data-testid={`product-tab-${k}`}
                onClick={() => setTab(k)}
                className={`rounded-full px-5 py-2.5 font-mono-tech text-xs uppercase tracking-[0.15em] transition-[background-color,color,border-color] duration-300 border ${
                  tab === k
                    ? 'bg-[#2563EB] border-[#2563EB] text-white'
                    : 'border-white/15 text-[#94A3B8] hover:text-white hover:border-white/40'
                }`}
              >
                {t.s2.tabs[k]}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-testid="product-grid"
          >
            {items.map((p) => (
              <article
                key={p.id}
                data-testid={`product-card-${p.id}`}
                className="group rounded-sm border border-white/10 bg-[#0A0D12] overflow-hidden hover:border-[#2563EB]/60 hover:shadow-[0_0_30px_rgba(37,99,235,0.18)] transition-[border-color,box-shadow] duration-300"
              >
                <div className="relative h-56 spotlight flex items-center justify-center p-6 overflow-hidden">
                  <img
                    src={IMG[p.id]}
                    alt={`${p.ref} — ${p.name}`}
                    className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-[1.06]"
                    data-testid={`product-image-${p.id}`}
                  />
                  <span className="absolute top-3 left-3 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#FF5500]">{p.ref}</span>
                </div>
                <div className="p-6 border-t border-white/10">
                  <h3 className="font-display text-2xl font-semibold uppercase text-white">{p.name}</h3>
                  <p className="mt-2 text-sm text-[#94A3B8]">{p.cap}</p>
                  <p className="mt-1 font-mono-tech text-xs text-[#64748B]">{p.dia}</p>
                  <button
                    data-testid={`product-cta-${p.id}`}
                    onClick={() => scrollTo('s6')}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF5500] hover:text-[#FF6B1A] transition-colors duration-300"
                  >
                    {t.s2.cta}
                    <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
