import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Thermometer, Sun, Wind, Users, BookOpen, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SPACES_DATA, JOURNAL_ARTICLES } from '../data/editorial';
import { useSanctuary } from '../context/SanctuaryContext';

export default function SpacesPage() {
  const { theme } = useSanctuary();
  const [activeSpace, setActiveSpace] = useState(SPACES_DATA[0]);
  const [readingArticle, setReadingArticle] = useState(null);

  return (
    <div className="pt-28 pb-24">
      {/* Architectural Tour Explorer */}
      <section className="px-5 md:px-10 max-w-7xl mx-auto pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl space-y-4 mb-12"
        >
          <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.accentDeep }}>
            Architectural Wellness Suites
          </p>
          <h1 className="font-serif-display text-5xl md:text-6xl font-light leading-none">
            Spaces Tuned to <span className="italic">Calm Cortisol</span>
          </h1>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: theme.muted }}>
            Explore our four climate-, scent-, and acoustic-calibrated zones — shifting gracefully
            from sunlit travertine clarity upstairs to candlelit basalt water suites below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Suite Selector */}
          <div className="lg:col-span-4 space-y-3 flex flex-col justify-center">
            {SPACES_DATA.map((sp) => {
              const selected = activeSpace.id === sp.id;
              return (
                <button
                  key={sp.id}
                  onClick={() => setActiveSpace(sp)}
                  className="w-full text-left p-5 rounded-3xl border transition-all cursor-pointer"
                  style={{
                    borderColor: selected ? theme.accent : theme.border,
                    backgroundColor: selected ? theme.card : theme.surface,
                  }}
                >
                  <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: theme.accentDeep }}>
                    {sp.subtitle}
                  </span>
                  <h2 className="font-serif-display text-2xl mt-1">{sp.name}</h2>
                </button>
              );
            })}
          </div>

          {/* Interactive Spatial Preview */}
          <div
            className="lg:col-span-8 rounded-[2rem] border overflow-hidden flex flex-col"
            style={{ borderColor: theme.border, backgroundColor: theme.card }}
          >
            <div className="relative h-80 md:h-[420px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSpace.id}
                  src={activeSpace.image}
                  alt={activeSpace.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            <div className="p-7 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif-display text-3xl">{activeSpace.name}</h3>
                  <p className="text-sm mt-2 max-w-2xl leading-relaxed" style={{ color: theme.muted }}>
                    {activeSpace.description}
                  </p>
                </div>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs uppercase tracking-[0.16em] shrink-0"
                  style={{
                    backgroundColor: theme.isDark ? theme.accent : '#1A1715',
                    color: theme.isDark ? '#151311' : '#F6F1EA',
                  }}
                >
                  Book Suite <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl" style={{ backgroundColor: theme.surface }}>
                  <Thermometer className="w-4 h-4 mb-1.5" style={{ color: theme.accent }} />
                  <div className="text-[10px] uppercase tracking-wider" style={{ color: theme.muted }}>Climate</div>
                  <div className="text-xs font-medium mt-0.5">{activeSpace.temp}</div>
                </div>
                <div className="p-3.5 rounded-2xl" style={{ backgroundColor: theme.surface }}>
                  <Sun className="w-4 h-4 mb-1.5" style={{ color: theme.accent }} />
                  <div className="text-[10px] uppercase tracking-wider" style={{ color: theme.muted }}>Lighting</div>
                  <div className="text-xs font-medium mt-0.5">{activeSpace.lighting}</div>
                </div>
                <div className="p-3.5 rounded-2xl" style={{ backgroundColor: theme.surface }}>
                  <Wind className="w-4 h-4 mb-1.5" style={{ color: theme.accent }} />
                  <div className="text-[10px] uppercase tracking-wider" style={{ color: theme.muted }}>Botanical Note</div>
                  <div className="text-xs font-medium mt-0.5">{activeSpace.scent}</div>
                </div>
                <div className="p-3.5 rounded-2xl" style={{ backgroundColor: theme.surface }}>
                  <Users className="w-4 h-4 mb-1.5" style={{ color: theme.accent }} />
                  <div className="text-[10px] uppercase tracking-wider" style={{ color: theme.muted }}>Scale</div>
                  <div className="text-xs font-medium mt-0.5">{activeSpace.capacity}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Wellness Journal */}
      <section
        id="journal"
        className="py-20 px-5 md:px-10 border-t"
        style={{ borderColor: theme.border, backgroundColor: theme.surface }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-12 space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.accentDeep }}>
              <BookOpen className="w-3.5 h-3.5" /> The Solène Journal
            </div>
            <h2 className="font-serif-display text-4xl md:text-5xl font-light">
              Essays on <span className="italic">Ritual &amp; Clean Beauty</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {JOURNAL_ARTICLES.map((art) => (
              <article
                key={art.id}
                onClick={() => setReadingArticle(art)}
                className="group rounded-3xl overflow-hidden border cursor-pointer flex flex-col justify-between transition-transform hover:-translate-y-1"
                style={{ borderColor: theme.border, backgroundColor: theme.card }}
              >
                <div>
                  <div className="h-56 overflow-hidden">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em]" style={{ color: theme.accentDeep }}>
                      <span>{art.category}</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h3 className="font-serif-display text-2xl leading-snug">{art.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: theme.muted }}>
                      {art.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <span className="text-xs uppercase tracking-[0.16em] underline">Read Essay →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {readingArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setReadingArticle(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl border p-7 md:p-10 space-y-6 shadow-2xl"
              style={{ borderColor: theme.border, backgroundColor: theme.card, color: theme.text }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.24em]" style={{ color: theme.accentDeep }}>
                  {readingArticle.category} · {readingArticle.readTime}
                </span>
                <button
                  onClick={() => setReadingArticle(null)}
                  className="p-2 rounded-full border cursor-pointer"
                  style={{ borderColor: theme.border }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h2 className="font-serif-display text-3xl md:text-4xl leading-tight">
                {readingArticle.title}
              </h2>
              <img
                src={readingArticle.image}
                alt={readingArticle.title}
                className="w-full h-64 object-cover rounded-2xl"
              />
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: theme.muted }}>
                {readingArticle.body.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
