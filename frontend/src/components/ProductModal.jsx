import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowDownRight, CircleCheck } from 'lucide-react';
import { IMG } from '../i18n';

export default function ProductModal({ product, t, onClose, onQuote }) {
  useEffect(() => {
    if (!product) return;
    const lenis = window.__lenis;
    if (lenis) lenis.stop();
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            data-testid="product-modal-backdrop"
            className="absolute inset-0 bg-[#0A0D12]/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            data-testid="product-modal"
            role="dialog"
            aria-modal="true"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full sm:max-w-4xl max-h-[92vh] overflow-y-auto bg-white sm:mx-6 rounded-t-2xl sm:rounded-sm border border-black/10 shadow-2xl"
          >
            <button
              data-testid="product-modal-close"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 border border-black/10 text-[#10151D] hover:bg-[#FF5500] hover:text-white hover:border-[#FF5500] transition-[background-color,color,border-color] duration-300"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative spotlight flex items-center justify-center p-10 min-h-[300px] md:min-h-[480px]">
                <img
                  src={IMG[product.id]}
                  alt={`${product.ref} — ${product.name}`}
                  className="max-h-[260px] md:max-h-[380px] w-auto object-contain"
                  data-testid="product-modal-image"
                />
                <span className="absolute top-4 left-4 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#FF5500]">{product.ref}</span>
              </div>

              <div className="p-7 sm:p-10">
                <p className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#2563EB]">REFRAM™ — {product.ref}</p>
                <h3 className="mt-3 font-display text-3xl sm:text-4xl font-bold uppercase text-[#10151D]" data-testid="product-modal-title">
                  {product.name}
                </h3>
                <p className="mt-4 text-sm sm:text-base text-[#5C6470] leading-relaxed" data-testid="product-modal-desc">
                  {product.desc}
                </p>

                <p className="mt-8 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#8B929C]">{t.modalSpecs}</p>
                <dl className="mt-3 divide-y divide-black/10 border-y border-black/10" data-testid="product-modal-specs">
                  {product.specs.map(([l, v]) => (
                    <div key={l} className="flex items-baseline justify-between gap-6 py-3">
                      <dt className="text-xs uppercase tracking-wide text-[#8B929C]">{l}</dt>
                      <dd className="text-sm font-semibold text-[#10151D] text-right">{v}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-8 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#8B929C]">{t.modalOptions}</p>
                <ul className="mt-3 space-y-2" data-testid="product-modal-options">
                  {product.options.map((o) => (
                    <li key={o} className="flex items-center gap-2.5 text-sm text-[#3A4350]">
                      <CircleCheck size={15} className="text-[#FF5500] shrink-0" /> {o}
                    </li>
                  ))}
                </ul>

                <button
                  data-testid="product-modal-quote-btn"
                  onClick={() => onQuote(product)}
                  className="group mt-9 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#FF5500] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#FF6B1A] hover:shadow-[0_0_25px_rgba(255,85,0,0.35)] transition-[background-color,box-shadow] duration-300"
                >
                  {t.cta}
                  <ArrowDownRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
