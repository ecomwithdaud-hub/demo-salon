import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, ArrowUpRight, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSanctuary } from '../context/SanctuaryContext';

const REEL_CHAPTERS = [
  {
    id: 'chap-hydro',
    code: '01 · HYDROTHERAPY',
    title: 'Obsidian Thermal Immersion',
    caption: 'Equinox-inspired contrast recovery pools & warm basalt hammam mist.',
    image: '/images/hydro-suite.png',
    link: '/spaces',
    linkLabel: 'Tour the Hydro-Suite',
    durationSec: 6,
  },
  {
    id: 'chap-hair',
    code: '02 · HAIR ATELIER',
    title: 'Cashmere Silk Blowouts',
    caption: 'Downtown chic effortless movement, sunlit mirrors, zero-ammonia gloss.',
    image: '/images/hair-atelier.png',
    link: '/services',
    linkLabel: 'View Hair Menu',
    durationSec: 6,
  },
  {
    id: 'chap-facial',
    code: '03 · BOTANICAL SKIN',
    title: 'Wildflower Glass-Skin Ritual',
    caption: 'Chilled nephrite gua sha sculpting and micro-mist botanical hydrosols.',
    image: '/images/botanical-facial.png',
    link: '/services',
    linkLabel: 'Explore Facials',
    durationSec: 6,
  },
  {
    id: 'chap-bridal',
    code: '04 · BRIDAL COUTURE',
    title: 'Luminous Heritage Bridal',
    caption: 'Private mezzanine morning prep with jasmine florals & skin-first artistry.',
    image: '/images/bridal-couture.png',
    link: '/bridal',
    linkLabel: 'Enter Bridal Studio',
    durationSec: 6,
  },
  {
    id: 'chap-nails',
    code: '05 · MELLOW NAIL BAR',
    title: 'Breathable Japanese Soft Gel',
    caption: 'HEMA-free structured overlays paired with warm oat-milk & hinoki tea.',
    image: '/images/nail-lounge.png',
    link: '/services',
    linkLabel: 'Book Nail Lounge',
    durationSec: 6,
  },
  {
    id: 'chap-apothecary',
    code: '06 · APOTHECARY',
    title: 'Whipped Shea & Rose Soufflé',
    caption: 'Tactile small-batch elixirs and preserved floral keepsake gift boxes.',
    image: '/images/gift-blooms.png',
    link: '/apothecary',
    linkLabel: 'Shop Apothecary',
    durationSec: 6,
  },
];

export default function SanctuaryReel() {
  const { theme, isPlayingAudio, toggleAudio } = useSanctuary();
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const current = REEL_CHAPTERS[activeIdx];

  useEffect(() => {
    if (!playing) return;
    const stepMs = 80;
    const totalMs = current.durationSec * 1000;
    const increment = (stepMs / totalMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          setActiveIdx((idx) => (idx + 1) % REEL_CHAPTERS.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [playing, activeIdx, current.durationSec]);

  const jumpTo = (idx) => {
    setActiveIdx(idx);
    setProgress(0);
  };

  return (
    <section className="py-20 md:py-28 px-5 md:px-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] mb-2" style={{ color: theme.accentDeep }}>
            Interactive Sanctuary Motion Reel
          </p>
          <h2 className="font-serif-display text-4xl md:text-5xl font-light">
            Step Inside the <span className="italic">Ritual Flow</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs uppercase tracking-[0.16em] cursor-pointer transition-all hover:scale-[1.02]"
            style={{ borderColor: theme.border, backgroundColor: theme.card }}
          >
            {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {playing ? 'Pause Reel' : 'Play Reel'}
          </button>

          <button
            onClick={toggleAudio}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs uppercase tracking-[0.16em] cursor-pointer transition-all hover:scale-[1.02]"
            style={{
              borderColor: isPlayingAudio ? theme.accent : theme.border,
              backgroundColor: isPlayingAudio ? theme.accent : theme.card,
              color: isPlayingAudio ? '#FFFFFF' : theme.text,
            }}
          >
            <Volume2 className="w-3.5 h-3.5" />
            {isPlayingAudio ? 'Audio Active' : 'Pair Spa Audio'}
          </button>
        </div>
      </div>

      {/* Motion Viewport + Chapter Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Cinematic Playing Stage */}
        <div
          className="lg:col-span-8 relative rounded-3xl overflow-hidden min-h-[420px] md:min-h-[540px] border shadow-xl"
          style={{ borderColor: theme.border }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover animate-kenburns"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/15" />
            </motion.div>
          </AnimatePresence>

          {/* Top Reel Progress Bars */}
          <div className="absolute top-5 left-5 right-5 z-10 grid grid-cols-6 gap-2">
            {REEL_CHAPTERS.map((chap, idx) => (
              <button
                key={chap.id}
                onClick={() => jumpTo(idx)}
                aria-label={`Jump to ${chap.title}`}
                className="h-1 rounded-full bg-white/25 overflow-hidden cursor-pointer"
              >
                <div
                  className="h-full bg-white transition-all duration-75"
                  style={{
                    width:
                      idx < activeIdx ? '100%' : idx === activeIdx ? `${progress}%` : '0%',
                  }}
                />
              </button>
            ))}
          </div>

          {/* Floating Overlay Info */}
          <div className="absolute bottom-6 left-6 right-6 z-10 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
                className="space-y-1.5 max-w-lg"
              >
                <span className="text-[10px] uppercase tracking-[0.26em] text-[#E6BEB6]">
                  {current.code}
                </span>
                <h3 className="font-serif-display text-3xl md:text-4xl font-light">
                  {current.title}
                </h3>
                <p className="text-sm text-white/80">{current.caption}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                to={current.link}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#151311] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#F6F1EA] transition-colors"
              >
                {current.linkLabel}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => jumpTo((activeIdx + 1) % REEL_CHAPTERS.length)}
                className="p-2.5 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 cursor-pointer"
                aria-label="Next chapter"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Chapter Selector */}
        <div
          className="lg:col-span-4 rounded-3xl border p-4 md:p-5 flex flex-col justify-between gap-2"
          style={{ borderColor: theme.border, backgroundColor: theme.card }}
        >
          <div className="px-2 pb-2 border-b flex items-center justify-between" style={{ borderColor: theme.border }}>
            <span className="text-[10px] uppercase tracking-[0.24em]" style={{ color: theme.muted }}>
              Reel Chapters
            </span>
            <span className="text-[11px]" style={{ color: theme.accentDeep }}>
              0{activeIdx + 1} / 0{REEL_CHAPTERS.length}
            </span>
          </div>

          <div className="space-y-2 my-auto">
            {REEL_CHAPTERS.map((chap, idx) => {
              const isCurrent = idx === activeIdx;
              return (
                <button
                  key={chap.id}
                  onClick={() => jumpTo(idx)}
                  className="w-full text-left p-3 rounded-2xl transition-all flex items-center gap-3.5 cursor-pointer border"
                  style={{
                    backgroundColor: isCurrent ? theme.surface : 'transparent',
                    borderColor: isCurrent ? theme.accent : 'transparent',
                  }}
                >
                  <img
                    src={chap.image}
                    alt={chap.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span
                      className="text-[9px] uppercase tracking-[0.2em] block"
                      style={{ color: isCurrent ? theme.accentDeep : theme.muted }}
                    >
                      {chap.code}
                    </span>
                    <div className="text-sm font-medium truncate">{chap.title}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
