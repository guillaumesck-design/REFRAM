import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Reveal, SectionHead } from './Reveal';
import ProductModal from './ProductModal';
import { IMG, EQUIPMENT_OPTION_INDEX } from '../i18n';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70 });
  else el.scrollIntoView({ behavior: 'smooth' });
};

export default function ProductsSection({ t }) {
  const [tab, setTab] = useState('wall');
  const [selected, setSelected] = useState(null);
  const tabs = ['wall', 'floor', 'crane', 'hand'];
  const items = t.s2.products.filter((p) => p.cat === tab);

  const requestQuote = (p) => {
    setSelected(null);
    window.dispatchEvent(new CustomEvent('prefill-equipment', { detail: EQUIPMENT_OPTION_INDEX[p.id] ?? 0 }));
    setTimeout(() => scrollTo('s6'), 60);
  };

  return (
    <section id="s2" data-testid="section-products" className="relative py-24 sm:py-32 bg-[#EFEDE6] border-y border-black/10">
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
                    : 'border-black/15 text-[#5C6470] hover:text-[#10151D] hover:border-black/40'
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
                onClick={() => setSelected(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelected(p)}
                className="group cursor-pointer rounded-sm border border-black/10 bg-white overflow-hidden hover:border-[#2563EB]/60 hover:shadow-[0_20px_50px_rgba(16,21,29,0.12)] transition-[border-color,box-shadow] duration-300"
              >
                <div className="relative h-56 spotlight flex items-center justify-center p-6 overflow-hidden">
                  <img
                    src={IMG[p.id]}
                    alt={`${p.ref} — ${p.name}`}
                    className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-[1.06]"
                    data-testid={`product-image-${p.id}`}
                  />
                  <span className="absolute top-3 left-3 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#FF5500]">{p.ref}</span>
                  <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" title={t.s2.modalHint}>
                    <Plus size={15} />
                  </span>
                </div>
                <div className="p-6 border-t border-black/10">
                  <h3 className="font-display text-2xl font-semibold uppercase text-[#10151D]">{p.name}</h3>
                  <p className="mt-2 text-sm text-[#5C6470]">{p.cap}</p>
                  <p className="mt-1 font-mono-tech text-xs text-[#8B929C]">{p.dia}</p>
                  <button
                    data-testid={`product-cta-${p.id}`}
                    onClick={(e) => { e.stopPropagation(); requestQuote(p); }}
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

      <ProductModal product={selected} t={t.s2} onClose={() => setSelected(null)} onQuote={requestQuote} />
    </section>
  );
}
