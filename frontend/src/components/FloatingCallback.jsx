import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneIncoming } from 'lucide-react';
import CallbackModal from './CallbackModal';

export default function FloatingCallback({ t }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let contactVisible = false;
    let scrolled = false;
    const update = () => setVisible(scrolled && !contactVisible);

    const onScroll = () => {
      scrolled = window.scrollY > 350;
      update();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const target = document.getElementById('s6');
    let observer;
    if (target) {
      observer = new IntersectionObserver(([entry]) => {
        contactVisible = entry.isIntersecting;
        update();
      }, { threshold: 0.08 });
      observer.observe(target);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && !open && (
          <motion.button
            data-testid="floating-callback-btn"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="btn-gold fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 rounded-full pl-5 pr-6 py-3.5 text-sm font-semibold shadow-xl"
            aria-label={t.cta}
          >
            <PhoneIncoming size={18} />
            <span className="whitespace-nowrap">{t.cta}</span>
          </motion.button>
        )}
      </AnimatePresence>
      <CallbackModal open={open} t={t} onClose={() => setOpen(false)} />
    </>
  );
}
