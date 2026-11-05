import { ArrowUpRight } from 'lucide-react';
import { Reveal, SectionHead } from './Reveal';
import { IMG } from '../i18n';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -96 });
  else el.scrollIntoView({ behavior: 'smooth' });
};

export default function SparePartsSection({ t }) {
  return (
    <section id="s5" data-testid="section-spare-parts" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <SectionHead num={t.s5.num} title={t.s5.title} sub={t.s5.sub} />
            <Reveal delay={0.2}>
              <ul className="mt-10 flex flex-wrap gap-2" data-testid="spare-parts-list">
                {t.s5.items.map((it, i) => (
                  <li key={it} data-testid={`spare-part-${i}`}
                    className="rounded-full border border-black/15 px-4 py-2 font-mono-tech text-sm uppercase tracking-[0.12em] text-[#5C6470] hover:border-[#C5B358] hover:text-[#10151D] transition-[border-color,color] duration-300">
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.3}>
              <button data-testid="spare-part-inquiry-btn" onClick={() => scrollTo('s6')}
                className="btn-gold-outline mt-9 inline-flex items-center gap-2 rounded-full border px-8 py-4 text-base font-semibold">
                {t.s5.cta} <ArrowUpRight size={17} />
              </button>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <figure>
                <div className="overflow-hidden rounded-sm border border-black/10 spotlight">
                  <img src={IMG.spare} alt={t.s5.fig} className="w-full h-[280px] sm:h-[360px] object-cover object-center" data-testid="spare-parts-image" />
                </div>
                <figcaption className="mt-4 font-mono-tech text-sm text-[#8B929C]" data-testid="spare-fig-caption">{t.s5.fig}</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
