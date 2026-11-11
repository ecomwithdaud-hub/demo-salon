import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Clock, Sparkles, ChevronDown, Check, Plus } from 'lucide-react';
import { SERVICES_DATA, SERVICE_CATEGORIES } from '../data/services';
import { useSanctuary } from '../context/SanctuaryContext';

export default function ServicesPage() {
  const { theme, bookingQueue, addServiceToBooking, removeServiceFromBooking } = useSanctuary();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialCat = searchParams.get('cat') || 'All Rituals';
  const [selectedCat, setSelectedCat] = useState(
    SERVICE_CATEGORIES.includes(initialCat) ? initialCat : 'All Rituals'
  );
  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState(SERVICES_DATA[0].id);

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat && SERVICE_CATEGORIES.includes(cat)) {
      setSelectedCat(cat);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return SERVICES_DATA.filter((item) => {
      const catMatch = selectedCat === 'All Rituals' || item.category === selectedCat;
      const textMatch =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.summary.toLowerCase().includes(query.toLowerCase()) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(query.toLowerCase()));
      return catMatch && textMatch;
    });
  }, [selectedCat, query]);

  const handleCatClick = (cat) => {
    setSelectedCat(cat);
    if (cat === 'All Rituals') {
      setSearchParams({});
    } else {
      setSearchParams({ cat });
    }
  };

  return (
    <div className="pt-28 pb-24 px-5 md:px-10 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl space-y-4 mb-12"
      >
        <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.accentDeep }}>
          Curated Treatment Menu
        </p>
        <h1 className="font-serif-display text-5xl md:text-6xl font-light leading-none">
          Rituals of <span className="italic">Restoration</span> &amp; Craft
        </h1>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: theme.muted }}>
          Every appointment includes our signature welcome botanical tea, organic aromatherapy
          consultation, and customized post-ritual apothecary guidance.
        </p>
      </motion.div>

      {/* Filter Bar & Search */}
      <div
        className="p-4 rounded-3xl border mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        style={{ borderColor: theme.border, backgroundColor: theme.card }}
      >
        <div className="flex flex-wrap gap-2">
          {SERVICE_CATEGORIES.map((cat) => {
            const active = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCatClick(cat)}
                className="px-4 py-2 rounded-full text-xs uppercase tracking-[0.14em] transition-all cursor-pointer"
                style={{
                  backgroundColor: active
                    ? theme.isDark
                      ? theme.accent
                      : '#1A1715'
                    : theme.surface,
                  color: active ? (theme.isDark ? '#151311' : '#F6F1EA') : theme.text,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div
          className="flex items-center gap-2.5 px-4 py-2 rounded-full border w-full lg:w-72"
          style={{ borderColor: theme.border, backgroundColor: theme.bg }}
        >
          <Search className="w-4 h-4 shrink-0" style={{ color: theme.muted }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search saffron, gua sha, gel..."
            className="bg-transparent outline-none text-xs w-full"
          />
        </div>
      </div>

      {/* Selected Booking Tray Banner */}
      <AnimatePresence>
        {bookingQueue.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mb-8 p-5 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{ borderColor: theme.accent, backgroundColor: theme.surface }}
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: theme.accentDeep }}>
                Your Custom Ritual Stack ({bookingQueue.length})
              </span>
              <div className="text-sm font-medium mt-1">
                {bookingQueue.map((s) => s.name).join(' + ')}
              </div>
            </div>
            <button
              onClick={() => navigate('/booking')}
              className="px-6 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium shrink-0 cursor-pointer"
              style={{
                backgroundColor: theme.isDark ? theme.accent : '#1A1715',
                color: theme.isDark ? '#151311' : '#F6F1EA',
              }}
            >
              Proceed to Time Selection →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((srv, idx) => {
          const isExpanded = expandedId === srv.id;
          const isAdded = bookingQueue.some((item) => item.id === srv.id);

          return (
            <motion.div
              layout
              key={srv.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="rounded-3xl border overflow-hidden flex flex-col"
              style={{ borderColor: theme.border, backgroundColor: theme.card }}
            >
              <div className="p-6 md:p-7 space-y-5 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="text-[10px] uppercase tracking-[0.22em]"
                        style={{ color: theme.accentDeep }}
                      >
                        {srv.category}
                      </span>
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider"
                        style={{ backgroundColor: theme.surface }}
                      >
                        {srv.tag}
                      </span>
                    </div>
                    <h2 className="font-serif-display text-3xl leading-snug">{srv.name}</h2>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-serif-display text-3xl">${srv.price}</div>
                    <div className="inline-flex items-center gap-1 text-[11px]" style={{ color: theme.muted }}>
                      <Clock className="w-3 h-3" /> {srv.duration} min
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                  {srv.summary}
                </p>

                {/* Botanical Ingredients */}
                <div className="flex flex-wrap gap-1.5">
                  {srv.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border"
                      style={{ borderColor: theme.border, backgroundColor: theme.bg }}
                    >
                      <Sparkles className="w-2.5 h-2.5" style={{ color: theme.accent }} />
                      {ing}
                    </span>
                  ))}
                </div>

                {/* Expandable Protocol */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pt-2"
                    >
                      <div
                        className="p-4 rounded-2xl space-y-2.5"
                        style={{ backgroundColor: theme.surface }}
                      >
                        <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: theme.muted }}>
                          Step-by-Step Ritual Flow
                        </p>
                        <ul className="space-y-2">
                          {srv.protocol.map((step, i) => (
                            <li key={i} className="text-xs flex items-start gap-2.5">
                              <span
                                className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center shrink-0 mt-0.5"
                                style={{ backgroundColor: theme.accent, color: '#fff' }}
                              >
                                {i + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card Footer Actions */}
              <div
                className="px-6 py-4 border-t flex items-center justify-between gap-3"
                style={{ borderColor: theme.border, backgroundColor: theme.bg }}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : srv.id)}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] cursor-pointer hover:opacity-75"
                  style={{ color: theme.muted }}
                >
                  <span>{isExpanded ? 'Hide Protocol' : 'View Ritual Steps'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      isAdded ? removeServiceFromBooking(srv.id) : addServiceToBooking(srv)
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs uppercase tracking-[0.14em] transition-all cursor-pointer"
                    style={{
                      borderColor: isAdded ? theme.accent : theme.border,
                      backgroundColor: isAdded ? theme.surface : theme.card,
                    }}
                  >
                    {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    {isAdded ? 'Added' : 'Queue'}
                  </button>

                  <button
                    onClick={() => {
                      addServiceToBooking(srv);
                      navigate('/booking');
                    }}
                    className="px-4 py-2 rounded-full text-xs uppercase tracking-[0.14em] font-medium cursor-pointer"
                    style={{
                      backgroundColor: theme.isDark ? theme.accent : '#1A1715',
                      color: theme.isDark ? '#151311' : '#F6F1EA',
                    }}
                  >
                    Book
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
