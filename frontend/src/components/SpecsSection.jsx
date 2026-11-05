import { Reveal, SectionHead } from './Reveal';

const DATA = [
  { type: 'mini', rows: [
    ['3', '24', '1 440', '0,13', '41', '377'],
    ['4', '30', '1 800', '0,16', '65', '503'],
    ['5', '36', '2 160', '0,19', '88', '625'],
  ]},
  { type: 'standard', rows: [
    ['3', '17', '1 020', '0,21', '58', '589'],
    ['4', '19', '1 140', '0,23', '72', '785'],
    ['5', '21', '1 260', '0,26', '88', '982'],
  ]},
  { type: 'long', rows: [
    ['3', '17', '1 020', '0,23', '76', '589'],
    ['4', '19', '1 140', '0,26', '95', '785'],
    ['5', '21', '1 260', '0,29', '116', '981'],
  ]},
  { type: 'large', rows: [
    ['3', '14', '840', '0,37', '115', '1 326'],
    ['4', '16', '960', '0,42', '150', '1 768'],
    ['5', '18', '1 080', '0,48', '189', '2 210'],
  ]},
];

export default function SpecsSection({ t }) {
  return (
    <section id="s3" data-testid="section-specs-table" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead num={t.s3.num} title={t.s3.title} sub={t.s3.sub} />

        <Reveal delay={0.2}>
          <div className="mt-12 overflow-x-auto rounded-sm border border-black/10 bg-white shadow-[0_20px_60px_rgba(16,21,29,0.06)]" data-testid="specs-table-wrap">
            <table className="w-full min-w-[760px] text-left border-collapse" data-testid="specs-table">
              <thead>
                <tr className="bg-[#C5B358]">
                  <th className="px-5 py-4 font-mono-tech text-[13px] uppercase tracking-[0.15em] text-[#1C1706]">REFRAM™</th>
                  {t.s3.cols.map((c) => (
                    <th key={c} className="px-5 py-4 font-mono-tech text-[13px] uppercase tracking-[0.15em] text-[#1C1706] whitespace-nowrap">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody data-testid="specs-table-body">
                {DATA.map((g) =>
                  g.rows.map((r, i) => (
                    <tr key={`${g.type}-${i}`} className="border-t border-black/10 hover:bg-[#F6F4EF] transition-colors duration-200">
                      {i === 0 && (
                        <th rowSpan={g.rows.length} className="px-5 py-4 align-top font-display text-lg font-semibold uppercase text-[#10151D] border-r border-black/10 whitespace-nowrap" data-testid={`spec-type-${g.type}`}>
                          {t.s3.types[g.type]}
                        </th>
                      )}
                      {r.map((cell, j) => (
                        <td key={j} className={`px-5 py-3.5 text-base whitespace-nowrap ${j === 0 ? 'font-mono-tech text-[#8C7A28]' : 'text-[#3A4350]'}`}>{cell}</td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-5 font-mono-tech text-sm text-[#8B929C]" data-testid="specs-note">{t.s3.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
