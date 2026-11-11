import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Camera, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { useSanctuary } from '../context/SanctuaryContext';

export default function Footer() {
  const { theme } = useSanctuary();

  return (
    <footer
      className="border-t pt-16 pb-24 md:pb-12 px-5 md:px-10 transition-colors duration-500"
      style={{
        borderColor: theme.border,
        backgroundColor: theme.surface,
        color: theme.text,
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b" style={{ borderColor: theme.border }}>
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center border"
              style={{ borderColor: theme.accent }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: theme.accent }} />
            </div>
            <span className="font-serif-display text-2xl tracking-[0.14em]">MAISON SOLÈNE</span>
          </div>
          <p className="text-sm leading-relaxed max-w-sm" style={{ color: theme.muted }}>
            A sanctuary uniting architectural hydrotherapy, non-toxic Japanese nail artistry,
            effortless hair couture, and botanical skincare rituals designed exclusively for women.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <span
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border"
              style={{ borderColor: theme.border, backgroundColor: theme.card }}
            >
              <MapPin className="w-3.5 h-3.5" style={{ color: theme.accent }} />
              48 Mercer Sanctuary Courtyard
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border"
              style={{ borderColor: theme.border, backgroundColor: theme.card }}
            >
              <Clock className="w-3.5 h-3.5" style={{ color: theme.accent }} />
              Tue–Sun · 9 AM – 9 PM
            </span>
          </div>
        </div>

        <div className="md:col-span-2 space-y-3">
          <p className="text-[10px] uppercase tracking-[0.24em]" style={{ color: theme.muted }}>
            Sanctuary
          </p>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:underline">Home Sanctuary</Link></li>
            <li><Link to="/services" className="hover:underline">Rituals &amp; Menu</Link></li>
            <li><Link to="/bridal" className="hover:underline">Bridal Atelier</Link></li>
            <li><Link to="/apothecary" className="hover:underline">Apothecary Shop</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-3">
          <p className="text-[10px] uppercase tracking-[0.24em]" style={{ color: theme.muted }}>
            Experience
          </p>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/spaces" className="hover:underline">Architectural Spaces</Link></li>
            <li><Link to="/spaces#journal" className="hover:underline">Editorial Journal</Link></li>
            <li><Link to="/about" className="hover:underline">Master Artisans</Link></li>
            <li><Link to="/booking" className="hover:underline">Concierge Booking</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-4">
          <p className="text-[10px] uppercase tracking-[0.24em]" style={{ color: theme.muted }}>
            Private Concierge
          </p>
          <p className="text-sm" style={{ color: theme.muted }}>
            Join our seasonal guest list for moonlit hydro-suite hours and limited apothecary harvests.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: theme.isDark ? theme.accent : '#1A1715',
              color: theme.isDark ? '#151311' : '#F6F1EA',
            }}
          >
            Reserve a Suite
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: theme.muted }}>
        <p>© {new Date().getFullYear()} Maison Solène Sanctuary. Botanical Women&apos;s Salon &amp; Spa.</p>
        <div className="flex items-center gap-5">
          <span>Clean Formulations</span>
          <span>HEMA-Free Studio</span>
          <a href="#top" className="inline-flex items-center gap-1 hover:opacity-100 opacity-80">
            <Camera className="w-3.5 h-3.5" /> @maisonsolene
          </a>
        </div>
      </div>
    </footer>
  );
}
