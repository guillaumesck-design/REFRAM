import { Reveal, SectionHead } from './Reveal';
import { IMG } from '../i18n';

export default function AutomationSection({ t }) {
  return (
    <section id="s4" data-testid="section-plc-automation" className="relative py-24 sm:py-32 bg-[#0D1117] border-y border-white/10 overflow-hidden">
      <div className="absolute -bottom-40 left-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#FF5500]/8 blur-[120px]" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead num={t.s4.num} title={t.s4.title} sub={t.s4.sub} />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-1">
            {t.s4.steps.map((s, i) => (
              <Reveal key={s.t} delay={0.08 * i}>
                <div
                  data-testid={`plc-step-${i + 1}`}
                  className="group flex gap-6 py-7 border-b border-white/10 last:border-b-0"
                >
                  <span className="font-display text-4xl font-bold text-white/15 group-hover:text-[#FF5500] transition-colors duration-300 leading-none pt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold uppercase text-white">{s.t}</h3>
                    <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={0.1}>
              <figure>
                <div className="overflow-hidden rounded-sm border border-white/10 spotlight">
                  <img src={IMG.plcPanel} alt={t.s4.fig1} className="w-full h-[300px] sm:h-[380px] object-cover" data-testid="plc-panel-image" />
                </div>
                <figcaption className="mt-4 font-mono-tech text-xs text-[#64748B]" data-testid="plc-fig1-caption">{t.s4.fig1}</figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.2}>
              <figure>
                <div className="overflow-hidden rounded-sm border border-white/10 spotlight">
                  <img src={IMG.floorReal} alt={t.s4.fig2} className="w-full h-[240px] sm:h-[300px] object-cover" data-testid="floor-rammer-image" />
                </div>
                <figcaption className="mt-4 font-mono-tech text-xs text-[#64748B]" data-testid="plc-fig2-caption">{t.s4.fig2}</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
