import { motion } from 'framer-motion';

export const Reveal = ({ children, delay = 0, className = '', y = 32 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const SectionHead = ({ num, title, sub }) => (
  <div className="max-w-3xl">
    <Reveal>
      <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-[#FF5500]">{num}</p>
    </Reveal>
    <Reveal delay={0.08}>
      <h2 className="mt-5 font-display text-4xl sm:text-5xl font-bold uppercase leading-[1.02] tracking-tight text-[#10151D]">
        {title.map((l, i) => (
          <span key={i} className="block">{l}</span>
        ))}
      </h2>
    </Reveal>
    {sub && (
      <Reveal delay={0.16}>
        <p className="mt-6 text-base sm:text-lg text-[#5C6470] leading-relaxed">{sub}</p>
      </Reveal>
    )}
  </div>
);
