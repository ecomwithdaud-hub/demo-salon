import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ShoppingBag, Flower2, Check } from 'lucide-react';
import { PRODUCTS_DATA, PRODUCT_CATEGORIES } from '../data/products';
import { useSanctuary } from '../context/SanctuaryContext';

export default function ApothecaryPage() {
  const { theme, addToBag } = useSanctuary();
  const [selectedCat, setSelectedCat] = useState('All Apothecary');
  const [quickView, setQuickView] = useState(null);
  const [addedId, setAddedId] = useState(null);

  const filtered =
    selectedCat === 'All Apothecary'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === selectedCat);

  const handleAdd = (prd) => {
    addToBag(prd);
    setAddedId(prd.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="pt-28 pb-24 px-5 md:px-10 max-w-7xl mx-auto">
      {/* Editorial Boutique Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
      >
        <div className="max-w-2xl space-y-4">
          <div
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em]"
            style={{ color: theme.accentDeep }}
          >
            <Flower2 className="w-3.5 h-3.5" /> Small-Batch Botanical Storefront
          </div>
          <h1 className="font-serif-display text-5xl md:text-6xl font-light leading-none">
            Apothecary &amp; <span className="italic">Floral Keepsakes</span>
          </h1>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: theme.muted }}>
            Inspired by tactile shea rituals and boutique wrapped blooms — every formulation is
            cold-blended in small weekly batches with zero silicones, parabens, or synthetic dyes.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {PRODUCT_CATEGORIES.map((cat) => {
            const active = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className="px-4 py-2 rounded-full text-xs uppercase tracking-[0.14em] transition-all cursor-pointer"
                style={{
                  backgroundColor: active
                    ? theme.isDark
                      ? theme.accent
                      : '#1A1715'
                    : theme.card,
                  color: active ? (theme.isDark ? '#151311' : '#F6F1EA') : theme.text,
                  border: `1px solid ${theme.border}`,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filtered.map((prd, idx) => (
          <motion.article
            layout
            key={prd.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
            className="group rounded-3xl overflow-hidden border flex flex-col justify-between transition-shadow hover:shadow-xl"
            style={{ borderColor: theme.border, backgroundColor: theme.card }}
          >
            {/* Hover Image Swap (WrapUpBlooms style) */}
            <div className="relative h-80 overflow-hidden cursor-pointer" onClick={() => setQuickView(prd)}>
              <img
                src={prd.image}
                alt={prd.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
              />
              <img
                src={prd.secondaryImage}
                alt={`${prd.name} texture view`}
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.2em]">
                {prd.badge}
              </span>
              <span className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-white/90 text-[#151311] text-[10px] uppercase tracking-[0.18em] opacity-0 group-hover:opacity-100 transition-opacity">
                Quick Ritual View
              </span>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: theme.accentDeep }}>
                      {prd.category}
                    </span>
                    <h2 className="font-serif-display text-2xl leading-snug">{prd.name}</h2>
                  </div>
                  <span className="font-serif-display text-2xl">${prd.price}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: theme.muted }}>
                  {prd.description}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div
                  className="p-3 rounded-2xl text-[11px]"
                  style={{ backgroundColor: theme.surface, color: theme.muted }}
                >
                  <span className="font-semibold" style={{ color: theme.text }}>
                    Notes:{' '}
                  </span>
                  {prd.scentNotes.top} · {prd.scentNotes.base}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setQuickView(prd)}
                    className="px-4 py-3 rounded-full border text-xs uppercase tracking-[0.14em] cursor-pointer"
                    style={{ borderColor: theme.border }}
                  >
                    Notes
                  </button>
                  <button
                    onClick={() => handleAdd(prd)}
                    className="flex-1 py-3 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-[0.16em] font-medium cursor-pointer transition-transform active:scale-95"
                    style={{
                      backgroundColor: theme.isDark ? theme.accent : '#1A1715',
                      color: theme.isDark ? '#151311' : '#F6F1EA',
                    }}
                  >
                    {addedId === prd.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added to Bag
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickView(null)}
            className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full rounded-3xl overflow-hidden border shadow-2xl grid grid-cols-1 md:grid-cols-2"
              style={{ borderColor: theme.border, backgroundColor: theme.card, color: theme.text }}
            >
              <div className="h-72 md:h-full">
                <img
                  src={quickView.image}
                  alt={quickView.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: theme.accentDeep }}>
                      {quickView.size}
                    </span>
                    <button
                      onClick={() => setQuickView(null)}
                      className="p-1.5 rounded-full border cursor-pointer"
                      style={{ borderColor: theme.border }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-serif-display text-3xl">{quickView.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                    {quickView.description}
                  </p>

                  <div className="p-4 rounded-2xl space-y-2 text-xs" style={{ backgroundColor: theme.surface }}>
                    <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: theme.accentDeep }}>
                      Olfactory Pyramid
                    </p>
                    <div><strong>Top:</strong> {quickView.scentNotes.top}</div>
                    <div><strong>Heart:</strong> {quickView.scentNotes.heart}</div>
                    <div><strong>Base:</strong> {quickView.scentNotes.base}</div>
                  </div>

                  <div className="flex items-start gap-2 text-xs" style={{ color: theme.muted }}>
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.accent }} />
                    <span>{quickView.ritualTip}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleAdd(quickView);
                    setQuickView(null);
                  }}
                  className="w-full py-3.5 rounded-full text-xs uppercase tracking-[0.18em] font-medium cursor-pointer"
                  style={{
                    backgroundColor: theme.isDark ? theme.accent : '#1A1715',
                    color: theme.isDark ? '#151311' : '#F6F1EA',
                  }}
                >
                  Add to Bag — ${quickView.price}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
