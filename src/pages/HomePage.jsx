import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Droplets,
  Flower2,
  Crown,
  Play,
  Quote,
} from 'lucide-react';
import { useSanctuary, ATMOSPHERE_THEMES } from '../context/SanctuaryContext';
import SanctuaryReel from '../components/SanctuaryReel';
import { SERVICES_DATA } from '../data/services';
import { PRODUCTS_DATA } from '../data/products';

const PILLARS = [
  {
    title: 'Hair Atelier',
    subtitle: 'Cashmere blowouts, sunlit balayage & scalp rituals',
    image: '/images/hair-atelier.png',
    to: '/services?cat=Hair%20Atelier',
    icon: Sparkles,
  },
  {
    title: 'Botanical Spa',
    subtitle: 'Gua sha glass-skin facials & warm basalt hammam',
    image: '/images/botanical-facial.png',
    to: '/services?cat=Botanical%20Facials',
    icon: Droplets,
  },
  {
    title: 'Bridal Couture',
    subtitle: 'Multi-day sanctuary prep & heritage bridal glam',
    image: '/images/bridal-couture.png',
    to: '/bridal',
    icon: Crown,
  },
  {
    title: 'Apothecary & Blooms',
    subtitle: 'Whipped shea soufflés, hair nectar & floral keepsakes',
    image: '/images/gift-blooms.png',
    to: '/apothecary',
    icon: Flower2,
  },
];

const TESTIMONIALS = [
  {
    quote:
      'Stepping from the sunlit Hair Atelier down into the Obsidian Hydro-Suite feels like leaving the city entirely. Best cashmere blowout and gua sha facial in town.',
    author: 'Ayla Rehman',
    service: 'The Solène Day Sanctuary',
  },
  {
    quote:
      'My bridal morning with Nadia and Sana was calm, unhurried, and completely glowing. Zero cakey texture — my skin looked lit from within for 14 hours straight.',
    author: 'Camille Laurent',
    service: 'Royal Multi-Day Atelier Suite',
  },
  {
    quote:
      'Their HEMA-free Japanese gel manicure actually healed my brittle nails while I sipped warm oat-milk matcha in silence.',
    author: 'Zoya Qureshi',
    service: 'Mellow Nail & Tea Lounge',
  },
];

export default function HomePage() {
  const { theme, themeKey, setThemeKey, toggleAudio, isPlayingAudio, addToBag, addServiceToBooking } =
    useSanctuary();

  const featuredServices = SERVICES_DATA.slice(0, 3);
  const featuredProducts = PRODUCTS_DATA.slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[94vh] flex items-end pt-28 pb-16 md:pb-24 px-5 md:px-10">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/hero-sanctuary.png"
            alt="Maison Solène Sanctuary Hydrotherapy Lounge"
            className="w-full h-full object-cover animate-kenburns"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                themeKey === 'dusk'
                  ? 'linear-gradient(180deg, rgba(19,17,16,0.45) 0%, rgba(19,17,16,0.65) 55%, rgba(19,17,16,0.95) 100%)'
                  : 'linear-gradient(180deg, rgba(21,19,17,0.38) 0%, rgba(21,19,17,0.45) 55%, rgba(21,19,17,0.86) 100%)',
            }}
          />
          {/* Floating warm botanical aura */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#D9A59B]/20 blur-[110px] animate-float-aura pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end text-[#F6F1EA]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8 space-y-6"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-[0.28em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B0A5] animate-pulse" />
              Women&apos;s Architectural Salon · Botanical Spa · Bridal Studio
            </div>

            <h1 className="font-serif-display text-5xl sm:text-7xl lg:text-[5.25rem] font-light leading-[0.98] tracking-tight">
              Where <span className="italic text-[#ECC7BD]">Ritual</span> Meets
              <br />
              Quiet Architecture.
            </h1>

            <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
              Inspired by alpine hydrotherapy sanctuaries, Japanese non-toxic nail bars, and
              effortless editorial beauty — tailored exclusively for women seeking restoration,
              luminous skin, and unhurried craft.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#F6F1EA] text-[#151311] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#ECC7BD] transition-colors"
              >
                Reserve Your Ritual
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full border border-white/35 bg-white/10 backdrop-blur-md text-white text-xs uppercase tracking-[0.2em] hover:bg-white/20 transition-colors"
              >
                Explore Full Menu
              </Link>
              <button
                onClick={toggleAudio}
                className="inline-flex items-center gap-2 px-5 py-4 rounded-full border border-white/25 bg-black/25 backdrop-blur-md text-xs uppercase tracking-[0.16em] text-white/90 hover:bg-black/40 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isPlayingAudio ? 'Soundscape Playing' : 'Play Spa Audio'}
              </button>
            </div>
          </motion.div>

          {/* Interactive Atmosphere Selector Card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-4 rounded-3xl p-5 bg-black/35 backdrop-blur-xl border border-white/15 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.24em] text-white/70">
                Set Sanctuary Mood
              </span>
              <span className="text-[10px] text-[#ECC7BD]">Live Theme</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(ATMOSPHERE_THEMES).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setThemeKey(t.id)}
                  className={`p-2.5 rounded-2xl text-left transition-all border cursor-pointer ${
                    themeKey === t.id
                      ? 'bg-white/20 border-[#ECC7BD]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full block mb-2 border border-white/40"
                    style={{ backgroundColor: t.bg }}
                  />
                  <span className="text-[11px] font-medium block leading-tight">
                    {t.label.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SILKY MARQUEE */}
      <div
        className="py-4 border-y overflow-hidden select-none"
        style={{ borderColor: theme.border, backgroundColor: theme.surface }}
      >
        <div className="animate-marquee flex items-center gap-10 text-xs uppercase tracking-[0.28em]">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-10 shrink-0">
              <span>Cashmere Hair Atelier</span>
              <span style={{ color: theme.accent }}>✦</span>
              <span>Wildflower Gua Sha Facials</span>
              <span style={{ color: theme.accent }}>✦</span>
              <span>Obsidian Hydro-Hammam</span>
              <span style={{ color: theme.accent }}>✦</span>
              <span>HEMA-Free Japanese Gel Bar</span>
              <span style={{ color: theme.accent }}>✦</span>
              <span>Heritage Bridal Mezzanine</span>
              <span style={{ color: theme.accent }}>✦</span>
              <span>Whipped Shea Apothecary</span>
              <span style={{ color: theme.accent }}>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. FOUR SANCTUARY PORTAL PAGES */}
      <section className="py-20 md:py-28 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="text-[10px] uppercase tracking-[0.28em] mb-2" style={{ color: theme.accentDeep }}>
              Dedicated Experiences
            </p>
            <h2 className="font-serif-display text-4xl md:text-5xl font-light leading-tight">
              Four Houses Under One <span className="italic">Tranquil Roof</span>
            </h2>
          </div>
          <Link
            to="/spaces"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] border-b pb-1 hover:opacity-70"
            style={{ borderColor: theme.text }}
          >
            Tour Architectural Spaces <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Link
                  to={pillar.to}
                  className="group block rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-1.5 shadow-sm hover:shadow-xl"
                  style={{ borderColor: theme.border, backgroundColor: theme.card }}
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/35 backdrop-blur-md text-white flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif-display text-2xl">{pillar.title}</h3>
                      <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: theme.muted }}>
                      {pillar.subtitle}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. INTERACTIVE MOTION REEL */}
      <div style={{ backgroundColor: theme.surface }}>
        <SanctuaryReel />
      </div>

      {/* 5. CURATED RITUALS PREVIEW */}
      <section className="py-20 md:py-28 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] mb-2" style={{ color: theme.accentDeep }}>
              Most Requested Treatments
            </p>
            <h2 className="font-serif-display text-4xl md:text-5xl font-light">
              Signature <span className="italic">Salon &amp; Spa</span> Rituals
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs uppercase tracking-[0.18em] hover:opacity-80"
            style={{ borderColor: theme.border, backgroundColor: theme.card }}
          >
            Full Service Menu ({SERVICES_DATA.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredServices.map((srv, idx) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-3xl border p-6 flex flex-col justify-between space-y-6"
              style={{ borderColor: theme.border, backgroundColor: theme.card }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
                  <span style={{ color: theme.accentDeep }}>{srv.category}</span>
                  <span
                    className="px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: theme.surface }}
                  >
                    {srv.duration} min · ${srv.price}
                  </span>
                </div>
                <h3 className="font-serif-display text-2xl">{srv.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                  {srv.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: theme.border }}>
                <Link
                  to="/services"
                  className="text-xs uppercase tracking-[0.16em] hover:underline"
                  style={{ color: theme.muted }}
                >
                  Protocol Details
                </Link>
                <Link
                  to="/booking"
                  onClick={() => addServiceToBooking(srv)}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-medium"
                  style={{ color: theme.accentDeep }}
                >
                  Reserve <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. APOTHECARY EDIT */}
      <section className="py-20 px-5 md:px-10 border-t" style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] mb-2" style={{ color: theme.accentDeep }}>
                Bring the Sanctuary Home
              </p>
              <h2 className="font-serif-display text-4xl md:text-5xl font-light">
                The Whipped Shea &amp; <span className="italic">Silk Apothecary</span>
              </h2>
            </div>
            <Link
              to="/apothecary"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] border-b pb-1"
              style={{ borderColor: theme.text }}
            >
              Visit Apothecary Boutique <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((prd) => (
              <div
                key={prd.id}
                className="group rounded-3xl overflow-hidden border flex flex-col"
                style={{ borderColor: theme.border, backgroundColor: theme.card }}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={prd.image}
                    alt={prd.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.2em]">
                    {prd.badge}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif-display text-2xl">{prd.name}</h3>
                      <span className="font-medium text-base">${prd.price}</span>
                    </div>
                    <p className="text-xs mt-1" style={{ color: theme.muted }}>
                      {prd.size} · {prd.scentNotes.top}
                    </p>
                  </div>
                  <button
                    onClick={() => addToBag(prd)}
                    className="w-full py-3 rounded-full border text-xs uppercase tracking-[0.18em] font-medium transition-colors hover:opacity-90 cursor-pointer"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.isDark ? theme.accent : '#1A1715',
                      color: theme.isDark ? '#151311' : '#F6F1EA',
                    }}
                  >
                    Add to Apothecary Bag — ${prd.price}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GUEST REFLECTIONS */}
      <section className="py-20 md:py-24 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.accentDeep }}>
            Guest Chronicles
          </p>
          <h2 className="font-serif-display text-4xl md:text-5xl font-light">
            Voices from the <span className="italic">Sanctuary</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="rounded-3xl border p-7 flex flex-col justify-between space-y-6"
              style={{ borderColor: theme.border, backgroundColor: theme.card }}
            >
              <Quote className="w-6 h-6 opacity-40" style={{ color: theme.accent }} />
              <p className="font-serif-display text-xl italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="pt-4 border-t" style={{ borderColor: theme.border }}>
                <div className="text-sm font-medium">{t.author}</div>
                <div className="text-[11px]" style={{ color: theme.muted }}>
                  {t.service}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
