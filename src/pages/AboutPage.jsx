import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronDown, ArrowRight, Leaf, ShieldCheck, Heart } from 'lucide-react';
import { ARTISANS_DATA } from '../data/editorial';
import { useSanctuary } from '../context/SanctuaryContext';

const FAQS = [
  {
    q: 'Are all spaces inside Maison Solène exclusively for women?',
    a: 'Yes. Every treatment suite, the Hydro-Hammam, the Hair Atelier, and the Mellow Nail Lounge are designed as a serene, private sanctuary exclusively for women.',
  },
  {
    q: 'What makes Japanese Soft Gel healthier than regular salon acrylics?',
    a: 'Our Japanese potted builder gels are 100% HEMA-free, non-toxic, and breathable. Removal relies on gentle warm botanical soaking rather than harsh electric drills that thin your natural nail plate.',
  },
  {
    q: 'How early should I reserve a Bridal Mezzanine or Multi-Day Suite?',
    a: 'We welcome bridal inquiries 3 to 9 months ahead for peak spring and autumn dates, though our Concierge also accommodates intimate civil ceremonies on shorter notice.',
  },
  {
    q: 'Do you formulate your hair and spa oils in-house?',
    a: 'Our Whipped Shea Soufflés, Saffron Hair Nectar, and Wildflower Dew Mists are compounded weekly in our cold-process apothecary lab using fair-trade botanical lipids.',
  },
];

export default function AboutPage() {
  const { theme } = useSanctuary();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="pt-28 pb-24 px-5 md:px-10 max-w-7xl mx-auto space-y-24">
      {/* Brand Story */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-6 space-y-6"
        >
          <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.accentDeep }}>
            Our Philosophy &amp; Artisans
          </p>
          <h1 className="font-serif-display text-5xl md:text-6xl font-light leading-none">
            Crafted by Women Who <span className="italic">Respect Quiet</span>
          </h1>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: theme.muted }}>
            Born from a longing to unite the recovery architecture of boutique luxury hotels, the
            warmth of heritage South Asian bridal hospitality, and the clean precision of Tokyo nail
            and skin studios.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {[
              { icon: Leaf, title: 'Botanical First', text: 'Zero ammonia, parabens, or harsh acrylic fumes' },
              { icon: ShieldCheck, title: 'Hospital-Grade Clean', text: 'Autoclaved tools & filtered hydro-mineral air' },
              { icon: Heart, title: 'Unhurried Pace', text: 'Generous 15-minute buffers between every guest' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-4 rounded-2xl border space-y-2"
                  style={{ borderColor: theme.border, backgroundColor: theme.card }}
                >
                  <Icon className="w-4 h-4" style={{ color: theme.accent }} />
                  <div className="text-xs font-semibold">{item.title}</div>
                  <p className="text-[11px]" style={{ color: theme.muted }}>
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="lg:col-span-6">
          <div className="rounded-[2rem] overflow-hidden border shadow-xl h-[440px]" style={{ borderColor: theme.border }}>
            <img
              src="/images/hero-sanctuary.png"
              alt="Maison Solène Sanctuary Courtyard"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Master Artisans */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] mb-2" style={{ color: theme.accentDeep }}>
              Meet the Directors
            </p>
            <h2 className="font-serif-display text-4xl md:text-5xl font-light">
              Our Master <span className="italic">Artisans</span>
            </h2>
          </div>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] underline"
          >
            Request an Artisan by Name <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTISANS_DATA.map((art, i) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-3xl overflow-hidden border flex flex-col justify-between"
              style={{ borderColor: theme.border, backgroundColor: theme.card }}
            >
              <div>
                <div className="h-64 overflow-hidden">
                  <img src={art.image} alt={art.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: theme.accentDeep }}>
                    {art.specialty}
                  </span>
                  <h3 className="font-serif-display text-2xl">{art.name}</h3>
                  <div className="text-xs font-medium">{art.role}</div>
                  <div className="text-[11px]" style={{ color: theme.muted }}>
                    {art.experience}
                  </div>
                  <p className="text-xs leading-relaxed pt-1" style={{ color: theme.muted }}>
                    {art.bio}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <Link
                  to={`/booking?artisan=${encodeURIComponent(art.name)}`}
                  className="w-full py-2.5 rounded-full border text-[11px] uppercase tracking-[0.16em] flex items-center justify-center gap-1.5 hover:opacity-80"
                  style={{ borderColor: theme.border, backgroundColor: theme.surface }}
                >
                  <Sparkles className="w-3 h-3" style={{ color: theme.accent }} />
                  Book with {art.name.split(' ')[0]}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="max-w-3xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.accentDeep }}>
            Sanctuary Etiquette
          </p>
          <h2 className="font-serif-display text-4xl font-light">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const open = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border overflow-hidden"
                style={{ borderColor: theme.border, backgroundColor: theme.card }}
              >
                <button
                  onClick={() => setOpenFaq(open ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-medium text-sm">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </button>
                {open && (
                  <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: theme.muted }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
