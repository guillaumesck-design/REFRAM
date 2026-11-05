import { Layers, Clock, TrendingUp, Package, Users, Repeat } from 'lucide-react';
import { Reveal, SectionHead } from './Reveal';
import { IMG } from '../i18n';

const ICONS = [Layers, Clock, TrendingUp, Package, Users, Repeat];

export default function WhySection({ t }) {
  return (
    <section id="s1" data-testid="section-critical" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead num={t.s1.num} title={t.s1.title} />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <p className="text-base sm:text-lg text-[#5C6470] leading-relaxed border-l-2 border-[#FF5500] pl-6" data-testid="s1-p1">{t.s1.p1}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base sm:text-lg text-[#10151D] leading-relaxed border-l-2 border-[#2563EB] pl-6" data-testid="s1-p2">{t.s1.p2}</p>
            </Reveal>

            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {t.s1.benefits.map((b, i) => {
                const Icon = ICONS[i];
                return (
                  <Reveal key={b.t} delay={0.06 * i}>
                    <div
                      data-testid={`benefit-card-${i}`}
                      className="group h-full rounded-sm border border-black/10 bg-white p-6 hover:border-[#FF5500]/60 hover:shadow-[0_16px_40px_rgba(255,85,0,0.10)] transition-[border-color,box-shadow] duration-300"
                    >
                      <Icon size={22} className="text-[#FF5500]" strokeWidth={1.8} />
                      <h3 className="mt-4 font-display text-xl font-semibold uppercase text-[#10151D]">{b.t}</h3>
                      <p className="mt-2 text-sm text-[#5C6470] leading-relaxed">{b.d}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal delay={0.15}>
              <figure className="relative">
                <div className="absolute -inset-3 border border-[#FF5500]/30 rounded-sm" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-sm border border-black/10 spotlight">
                  <img src={IMG.lining} alt={t.s1.fig} className="w-full h-[480px] sm:h-[560px] object-cover object-center" data-testid="s1-lining-image" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12]/40 via-transparent to-transparent" aria-hidden="true" />
                </div>
                <figcaption className="mt-4 font-mono-tech text-xs text-[#8B929C]" data-testid="s1-fig-caption">{t.s1.fig}</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
