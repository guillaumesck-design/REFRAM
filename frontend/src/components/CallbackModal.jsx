import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { X, Loader2, PhoneOutgoing } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function CallbackModal({ open, t, onClose }) {
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!open) return;
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
  }, [open, onClose]);

  const submit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      await axios.post(`${API}/callback`, { phone, consent });
      toast.success(t.success);
      setPhone('');
      setConsent(false);
      onClose();
    } catch (err) {
      toast.error(err?.response?.status === 422 && phone ? t.invalid : t.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div data-testid="callback-modal-backdrop" className="absolute inset-0 bg-[#0A0D12]/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            data-testid="callback-modal"
            role="dialog"
            aria-modal="true"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full sm:max-w-md bg-white sm:mx-6 rounded-t-2xl sm:rounded-sm border border-black/10 shadow-2xl p-7 sm:p-10"
          >
            <button
              data-testid="callback-modal-close"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 border border-black/10 text-[#10151D] hover:bg-[#C5B358] hover:text-[#1C1706] hover:border-[#C5B358] transition-[background-color,color,border-color] duration-300"
            >
              <X size={18} />
            </button>

            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C5B358]/15 text-[#8C7A28]">
              <PhoneOutgoing size={20} />
            </span>
            <h3 className="mt-5 font-display text-3xl font-bold uppercase text-[#10151D]" data-testid="callback-modal-title">{t.title}</h3>
            <p className="mt-2 text-base text-[#3A4350] leading-relaxed">{t.sub}</p>

            <form onSubmit={submit} className="mt-7" data-testid="callback-form">
              <input
                data-testid="callback-form-phone"
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.phone}
                className="w-full rounded-sm border border-black/15 bg-[#FBFAF7] px-4 py-3 text-base text-[#10151D] placeholder:text-[#8B929C] focus:outline-none focus:border-[#C5B358] focus:ring-1 focus:ring-[#C5B358]/50 transition-[border-color,box-shadow] duration-300"
              />
              <label className="mt-4 flex items-start gap-3 cursor-pointer" data-testid="callback-form-consent-label">
                <input data-testid="callback-form-consent" required type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded-sm border-black/20 accent-[#C5B358]" />
                <span className="text-sm text-[#3A4350] leading-relaxed">{t.consent}</span>
              </label>
              <button data-testid="callback-form-submit-btn" type="submit" disabled={sending}
                className="btn-gold mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold disabled:opacity-60">
                {sending ? (<><Loader2 size={18} className="animate-spin" /> {t.sending}</>) : t.submit}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
