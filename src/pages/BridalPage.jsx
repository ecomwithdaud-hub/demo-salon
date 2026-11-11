import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Crown, Check, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { BRIDAL_PACKAGES, BRIDAL_TIMELINE } from '../data/editorial';
import { useSanctuary } from '../context/SanctuaryContext';

const BRIDAL_MOODS = [
  {
    id: 'glow',
    label: 'Glass-Skin & Jasmine',
    image: '/images/bridal-couture.png',
    note: 'Dewy luminous complexion, rosewood velvet lip, fresh white jasmine woven into sculpted waves.',
  },
  {
    id: 'sleek',
    label: 'Modern Editorial Silk',
    image: '/images/hair-atelier.png',
    note: 'Center-parted mirror-shine chignon, feathered natural brows, warm champagne pearl highlight.',
  },
  {
    id: 'lounge',
    label: 'Mezzanine Entourage Morning',
    image: '/images/gift-blooms.png',
    note: 'Private linen-draped suite with rose-pistachio tea bar, veil steaming, and calm acoustic soundscapes.',
  },
];

export default function BridalPage() {
  const { theme, addServiceToBooking } = useSanctuary();
  const navigate = useNavigate();
  const [activePhase, setActivePhase] = useState(0);
  const [selectedMood, setSelectedMood] = useState(BRIDAL_MOODS[0]);

  const handleBookPackage = (pkg) => {
    addServiceToBooking({
      id: pkg.id,
      category: 'Bridal Couture',
      name: pkg.name,
      duration: 180,
      price: pkg.price,
    });
    navigate('/booking');
  };

  return (
    <div className="pt-28 pb-24">
      {/* Hero Banner */}
      <section className="px-5 md:px-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-6 space-y-6"
        >
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.accentDeep }}>
            <Crown className="w-3.5 h-3.5" /> Private Bridal Mezzanine
          </div>
          <h1 className="font-serif-display text-5xl md:text-6xl font-light leading-[1.03]">
            Luminous, Unhurried <span className="italic">Bridal Couture</span>
          </h1>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: theme.muted }}>
            Inspired by timeless heritage celebrations and modern minimalist silhouettes. From
            90-day skin architecture to private morning buyouts in our sunlit Mezzanine, every
            brushstroke feels weightless and looks breathtaking in both daylight and flash.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#packages"
              className="px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.18em] font-medium"
              style={{
                backgroundColor: theme.isDark ? theme.accent : '#1A1715',
                color: theme.isDark ? '#151311' : '#F6F1EA',
              }}
            >
              Explore Bridal Tiers
            </a>
            <button
              onClick={() =>
                handleBookPackage({
                  id: 'brd-trial',
                  name: 'Couture Bridal Trial Consultation',
                  price: 185,
                })
              }
              className="px-7 py-3.5 rounded-full border text-xs uppercase tracking-[0.18em] cursor-pointer"
              style={{ borderColor: theme.border, backgroundColor: theme.card }}
            >
              Reserve Trial ($185)
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6 relative"
        >
          <div className="rounded-[2rem] overflow-hidden border shadow-2xl aspect-[4/4.6]" style={{ borderColor: theme.border }}>
            <img
              src={selectedMood.image}
              alt={selectedMood.label}
              className="w-full h-full object-cover transition-all duration-700"
            />
          </div>

          {/* Interactive Lookbook Switcher */}
          <div
            className="mt-4 p-4 rounded-2xl border backdrop-blur-md space-y-3"
            style={{ borderColor: theme.border, backgroundColor: theme.card }}
          >
            <div className="flex flex-wrap gap-2">
              {BRIDAL_MOODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMood(m)}
                  className="px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.14em] transition-all cursor-pointer"
                  style={{
                    backgroundColor:
                      selectedMood.id === m.id
                        ? theme.isDark
                          ? theme.accent
                          : '#1A1715'
                        : theme.surface,
                    color:
                      selectedMood.id === m.id
                        ? theme.isDark
                          ? '#151311'
                          : '#F6F1EA'
                        : theme.text,
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: theme.muted }}>
              {selectedMood.note}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Interactive 90-Day Bridal Timeline */}
      <section className="py-20 px-5 md:px-10 border-y" style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-12 space-y-2">
            <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.accentDeep }}>
              The Countdown Blueprint
            </p>
            <h2 className="font-serif-display text-4xl md:text-5xl font-light">
              Interactive Bridal <span className="italic">Prep Timeline</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {BRIDAL_TIMELINE.map((item, idx) => {
              const active = idx === activePhase;
              return (
                <motion.button
                  key={item.phase}
                  onClick={() => setActivePhase(idx)}
                  whileHover={{ y: -4 }}
                  className="text-left p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-5"
                  style={{
                    borderColor: active ? theme.accent : theme.border,
                    backgroundColor: active ? theme.card : 'transparent',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] uppercase tracking-[0.22em] font-semibold"
                      style={{ color: theme.accentDeep }}
                    >
                      {item.phase}
                    </span>
                    <Sparkles
                      className="w-4 h-4 transition-opacity"
                      style={{ opacity: active ? 1 : 0.25, color: theme.accent }}
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif-display text-2xl">{item.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: theme.muted }}>
                      {item.detail}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bridal Couture Packages */}
      <section id="packages" className="py-20 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.accentDeep }}>
            Curated Suites
          </p>
          <h2 className="font-serif-display text-4xl md:text-5xl font-light">
            Bridal &amp; Entourage <span className="italic">Collections</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {BRIDAL_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl border p-8 flex flex-col justify-between space-y-8 transition-transform hover:-translate-y-1 ${
                pkg.featured ? 'shadow-2xl' : ''
              }`}
              style={{
                borderColor: pkg.featured ? theme.accent : theme.border,
                backgroundColor: theme.card,
              }}
            >
              <div className="space-y-4">
                <span
                  className="inline-block text-[10px] uppercase tracking-[0.24em] px-3 py-1 rounded-full"
                  style={{ backgroundColor: theme.surface, color: theme.accentDeep }}
                >
                  {pkg.tier}
                </span>
                <div>
                  <h3 className="font-serif-display text-3xl">{pkg.name}</h3>
                  <p className="text-xs mt-1" style={{ color: theme.muted }}>
                    {pkg.idealFor}
                  </p>
                </div>
                <div className="pt-2 pb-4 border-b flex items-baseline justify-between" style={{ borderColor: theme.border }}>
                  <span className="font-serif-display text-4xl">${pkg.price}</span>
                  <span className="text-xs" style={{ color: theme.muted }}>
                    {pkg.duration}
                  </span>
                </div>

                <ul className="space-y-3 pt-2">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="text-sm flex items-start gap-2.5">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.accent }} />
                      <span style={{ color: theme.muted }}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleBookPackage(pkg)}
                className="w-full py-3.5 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] font-medium cursor-pointer transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: pkg.featured
                    ? theme.accent
                    : theme.isDark
                    ? theme.surface
                    : '#1A1715',
                  color: pkg.featured
                    ? '#FFFFFF'
                    : theme.isDark
                    ? theme.text
                    : '#F6F1EA',
                }}
              >
                <Calendar className="w-3.5 h-3.5" />
                Reserve This Collection
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
