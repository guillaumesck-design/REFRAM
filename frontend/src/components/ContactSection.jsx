import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Phone, Mail, MapPin, Loader2, ArrowDownRight } from 'lucide-react';
import { Reveal, SectionHead } from './Reveal';
import { PHONE, PHONE_TEL, EMAIL, ADDRESS } from '../i18n';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
  'w-full rounded-sm border border-black/15 bg-[#FBFAF7] px-4 py-3 text-sm text-[#10151D] placeholder:text-[#8B929C] focus:outline-none focus:border-[#FF5500]/70 focus:ring-1 focus:ring-[#FF5500]/40 transition-[border-color,box-shadow] duration-300';

export default function ContactSection({ t }) {
  const f = t.s6.form;
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', furnace_capacity: f.capacityOpts[0], equipment: f.equipmentOpts[0], message: '', consent: false });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setForm((prev) => ({ ...prev, furnace_capacity: f.capacityOpts[0], equipment: f.equipmentOpts[0] }));
    const handler = (e) => {
      const idx = e.detail;
      setForm((prev) => ({ ...prev, equipment: f.equipmentOpts[idx] || prev.equipment }));
    };
    window.addEventListener('prefill-equipment', handler);
    return () => window.removeEventListener('prefill-equipment', handler);
  }, [t]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success(f.success);
      setForm({ name: '', company: '', phone: '', email: '', furnace_capacity: f.capacityOpts[0], equipment: f.equipmentOpts[0], message: '', consent: false });
    } catch (err) {
      toast.error(f.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="s6" data-testid="section-contact" className="relative py-24 sm:py-32 bg-[#EFEDE6] border-t border-black/10 overflow-hidden">
      <div className="absolute -top-40 right-[-8%] w-[40vw] h-[40vw] rounded-full bg-[#2563EB]/10 blur-[120px]" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <SectionHead num={t.s6.num} title={t.s6.title} sub={t.s6.sub} />
            <Reveal delay={0.2}>
              <div className="mt-12 space-y-6" data-testid="contact-direct">
                <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#8B929C]">{t.s6.direct}</p>
                <a data-testid="contact-phone-link" href={PHONE_TEL} className="group flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FF5500]/60 text-[#FF5500] group-hover:bg-[#FF5500] group-hover:text-white transition-[background-color,color] duration-300">
                    <Phone size={17} />
                  </span>
                  <span className="font-display text-2xl font-semibold tracking-wide text-[#10151D]">{PHONE}</span>
                </a>
                <a data-testid="contact-email-link" href={`mailto:${EMAIL}`} className="group flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 text-[#5C6470] group-hover:border-[#2563EB] group-hover:text-[#2563EB] transition-[border-color,color] duration-300">
                    <Mail size={17} />
                  </span>
                  <span className="text-base text-[#3A4350] group-hover:text-[#10151D] transition-colors duration-300">{EMAIL}</span>
                </a>
                <div className="flex items-start gap-4" data-testid="contact-address">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 text-[#5C6470]">
                    <MapPin size={17} />
                  </span>
                  <span className="pt-2 text-sm text-[#5C6470] leading-relaxed">{ADDRESS}</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <form onSubmit={submit} data-testid="quote-form" className="rounded-sm border border-black/10 bg-white p-6 sm:p-10 shadow-[0_24px_70px_rgba(16,21,29,0.08)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input data-testid="quote-form-name" required value={form.name} onChange={set('name')} placeholder={f.name} className={inputCls} />
                  <input data-testid="quote-form-company" required value={form.company} onChange={set('company')} placeholder={f.company} className={inputCls} />
                  <input data-testid="quote-form-phone" required type="tel" value={form.phone} onChange={set('phone')} placeholder={f.phone} className={inputCls} />
                  <input data-testid="quote-form-email" required type="email" value={form.email} onChange={set('email')} placeholder={f.email} className={inputCls} />
                  <select data-testid="quote-form-capacity" value={form.furnace_capacity} onChange={set('furnace_capacity')} className={inputCls} aria-label={f.capacity}>
                    {f.capacityOpts.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <select data-testid="quote-form-equipment" value={form.equipment} onChange={set('equipment')} className={inputCls} aria-label={f.equipment}>
                    {f.equipmentOpts.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <textarea data-testid="quote-form-message" rows={4} value={form.message} onChange={set('message')} placeholder={f.message} className={`${inputCls} mt-5 resize-none`} />
                <label className="mt-5 flex items-start gap-3 cursor-pointer" data-testid="quote-form-consent-label">
                  <input data-testid="quote-form-consent" required type="checkbox" checked={form.consent} onChange={set('consent')}
                    className="mt-0.5 h-4 w-4 rounded-sm border-black/20 accent-[#FF5500]" />
                  <span className="text-xs text-[#5C6470] leading-relaxed">{f.consent}</span>
                </label>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <button data-testid="quote-form-submit-btn" type="submit" disabled={sending}
                    className="group inline-flex items-center gap-2 rounded-full bg-[#FF5500] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#FF6B1A] hover:shadow-[0_0_30px_rgba(255,85,0,0.4)] disabled:opacity-60 transition-[background-color,box-shadow,opacity] duration-300">
                    {sending ? (<><Loader2 size={16} className="animate-spin" /> {f.sending}</>) : (<>{f.submit} <ArrowDownRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" /></>)}
                  </button>
                  <p className="text-xs text-[#8B929C]" data-testid="quote-form-secure-note">{f.secure}</p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
