import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Reveal, SectionHead } from './Reveal';

export default function VideoSection({ t }) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    setStarted(true);
    v.play();
  };

  return (
    <section id="film" data-testid="section-video" className="relative py-24 sm:py-32 bg-[#EFEDE6] border-y border-black/10 overflow-hidden">
      <div className="absolute -top-32 left-[-8%] w-[38vw] h-[38vw] rounded-full bg-[#C5B358]/15 blur-[120px]" aria-hidden="true" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead num={t.sv.num} title={t.sv.title} sub={t.sv.sub} />

        <Reveal delay={0.2}>
          <figure className="mt-14">
            <div className="relative">
              <div className="absolute -inset-3 border border-[#C5B358]/40 rounded-sm pointer-events-none" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-sm border border-black/10 bg-[#0A0D12] shadow-[0_30px_80px_rgba(16,21,29,0.25)]">
                <video
                  ref={videoRef}
                  data-testid="video-player"
                  className="w-full aspect-video"
                  poster="/img/video-poster.webp"
                  preload="metadata"
                  playsInline
                  controls={started}
                  onPlay={() => setStarted(true)}
                >
                  <source src="/video/presentation-2025.mp4" type="video/mp4" />
                </video>

                {!started && (
                  <motion.button
                    data-testid="video-play-btn"
                    onClick={play}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-gradient-to-t from-[#0A0D12]/70 via-transparent to-[#0A0D12]/20 group cursor-pointer"
                    aria-label={t.sv.play}
                  >
                    <span className="relative flex items-center justify-center">
                      <span className="absolute h-24 w-24 rounded-full bg-[#C5B358]/40 animate-ping" aria-hidden="true" />
                      <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#C5B358] text-[#1C1706] shadow-[0_0_40px_rgba(197,179,88,0.5)] transition-transform duration-300 group-hover:scale-110">
                        <Play size={30} fill="currentColor" className="ml-1" />
                      </span>
                    </span>
                    <span className="font-mono-tech text-sm uppercase tracking-[0.25em] text-white/90">{t.sv.play}</span>
                  </motion.button>
                )}
              </div>
            </div>
            <figcaption className="mt-4 font-mono-tech text-sm text-[#8B929C]" data-testid="video-fig-caption">{t.sv.fig}</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
