export default function Marquee({ text }) {
  const chunk = (
    <span className="flex items-center shrink-0">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="font-display text-lg sm:text-xl font-semibold uppercase tracking-[0.12em] text-[#64748B] whitespace-nowrap">
          {text.split('—').filter(Boolean).map((w, j) => (
            <span key={j} className="inline-flex items-center">
              <span className="hover:text-[#FF5500] transition-colors duration-500">{w.trim()}</span>
              <span className="mx-6 text-[#FF5500]">—</span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
  return (
    <div data-testid="editorial-marquee" className="relative border-y border-white/10 bg-[#0D1117] py-5 overflow-hidden" aria-hidden="true">
      <div className="marquee-track">
        {chunk}
        {chunk}
      </div>
    </div>
  );
}
