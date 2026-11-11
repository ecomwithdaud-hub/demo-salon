import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Calendar, Menu, X, Sun, Moon, Leaf, Sparkles } from 'lucide-react';
import { useSanctuary, ATMOSPHERE_THEMES } from '../context/SanctuaryContext';

const NAV_LINKS = [
  { to: '/', label: 'Sanctuary' },
  { to: '/services', label: 'Rituals & Menu' },
  { to: '/bridal', label: 'Bridal Couture' },
  { to: '/apothecary', label: 'Apothecary' },
  { to: '/spaces', label: 'Spaces & Journal' },
  { to: '/about', label: 'Artisans' },
];

export default function Navbar() {
  const location = useLocation();
  const { theme, themeKey, setThemeKey, bagCount, setIsBagOpen, bookingQueue } = useSanctuary();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setThemeMenuOpen(false);
  }, [location.pathname]);

  const ThemeIcon = themeKey === 'dusk' ? Moon : themeKey === 'sage' ? Leaf : Sun;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'py-3 backdrop-blur-xl shadow-sm' : 'py-5'
        }`}
        style={{
          backgroundColor: scrolled
            ? theme.isDark
              ? 'rgba(19, 17, 16, 0.86)'
              : 'rgba(246, 241, 234, 0.86)'
            : 'transparent',
          borderBottom: scrolled ? `1px solid ${theme.border}` : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="group flex items-center gap-3 shrink-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center border transition-transform duration-500 group-hover:rotate-45"
              style={{ borderColor: theme.accent }}
            >
              <Sparkles className="w-4 h-4" style={{ color: theme.accent }} />
            </div>
            <div>
              <span className="font-serif-display text-2xl tracking-[0.14em] font-medium block leading-none">
                MAISON SOLÈNE
              </span>
              <span
                className="text-[9px] uppercase tracking-[0.28em] block mt-1"
                style={{ color: theme.muted }}
              >
                Salon · Botanical Spa
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative py-1.5 text-xs uppercase tracking-[0.18em] transition-opacity hover:opacity-100"
                  style={{
                    color: active ? theme.text : theme.muted,
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[1.5px]"
                      style={{ backgroundColor: theme.accent }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Atmosphere Switcher */}
            <div className="relative">
              <button
                onClick={() => setThemeMenuOpen((o) => !o)}
                title="Switch Sanctuary Atmosphere"
                className="flex items-center gap-1.5 px-3 py-2 rounded-full border text-[11px] uppercase tracking-[0.14em] transition-all hover:scale-[1.02] cursor-pointer"
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.card,
                  color: theme.text,
                }}
              >
                <ThemeIcon className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                <span className="hidden sm:inline">Mood</span>
              </button>

              <AnimatePresence>
                {themeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 mt-2 w-64 rounded-2xl p-2 shadow-2xl border backdrop-blur-xl z-50"
                    style={{
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                    }}
                  >
                    <p
                      className="px-3 py-1.5 text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: theme.muted }}
                    >
                      Sanctuary Atmosphere
                    </p>
                    {Object.values(ATMOSPHERE_THEMES).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setThemeKey(t.id);
                          setThemeMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-colors cursor-pointer"
                        style={{
                          backgroundColor: themeKey === t.id ? theme.surface : 'transparent',
                        }}
                      >
                        <span
                          className="w-5 h-5 rounded-full border shrink-0"
                          style={{
                            backgroundColor: t.bg,
                            borderColor: t.accent,
                            boxShadow: themeKey === t.id ? `0 0 0 2px ${t.accent}` : 'none',
                          }}
                        />
                        <div>
                          <div className="text-xs font-medium">{t.label}</div>
                          <div className="text-[10px]" style={{ color: theme.muted }}>
                            {t.tagline}
                          </div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Apothecary Bag */}
            <button
              onClick={() => setIsBagOpen(true)}
              aria-label="Open Apothecary Bag"
              className="relative p-2.5 rounded-full border transition-transform hover:scale-105 cursor-pointer"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.card,
              }}
            >
              <ShoppingBag className="w-4 h-4" />
              {bagCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full text-[10px] font-semibold flex items-center justify-center text-white"
                  style={{ backgroundColor: theme.accent }}
                >
                  {bagCount}
                </span>
              )}
            </button>

            {/* Book Appointment CTA */}
            <Link
              to="/booking"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[11px] uppercase tracking-[0.18em] font-medium transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{
                backgroundColor: theme.isDark ? theme.accent : '#1A1715',
                color: theme.isDark ? '#151311' : '#F6F1EA',
              }}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve</span>
              {bookingQueue.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-white/20">
                  {bookingQueue.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2.5 rounded-full border cursor-pointer"
              style={{ borderColor: theme.border, backgroundColor: theme.card }}
              aria-label="Open Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 p-6 flex flex-col justify-between"
            style={{ backgroundColor: theme.bg, color: theme.text }}
          >
            <div className="flex items-center justify-between">
              <span className="font-serif-display text-2xl tracking-[0.14em]">MAISON SOLÈNE</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded-full border cursor-pointer"
                style={{ borderColor: theme.border }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-5 my-auto">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * idx }}
                >
                  <Link
                    to={link.to}
                    className="font-serif-display text-4xl tracking-wide block hover:italic transition-all"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              <Link
                to="/booking"
                className="w-full py-4 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-medium"
                style={{
                  backgroundColor: theme.isDark ? theme.accent : '#1A1715',
                  color: theme.isDark ? '#151311' : '#F6F1EA',
                }}
              >
                <Calendar className="w-4 h-4" />
                Reserve Your Sanctuary Visit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
