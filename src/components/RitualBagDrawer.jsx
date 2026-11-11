import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSanctuary } from '../context/SanctuaryContext';

export default function RitualBagDrawer() {
  const {
    theme,
    bagItems,
    isBagOpen,
    setIsBagOpen,
    updateBagQty,
    removeFromBag,
    bagSubtotal,
  } = useSanctuary();

  const [checkedOut, setCheckedOut] = useState(false);

  const handleCheckout = () => {
    setCheckedOut(true);
    setTimeout(() => {
      setCheckedOut(false);
      setIsBagOpen(false);
    }, 2600);
  };

  return (
    <AnimatePresence>
      {isBagOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsBagOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs z-50"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 flex flex-col shadow-2xl"
            style={{ backgroundColor: theme.card, color: theme.text }}
          >
            {/* Header */}
            <div
              className="px-6 py-5 border-b flex items-center justify-between"
              style={{ borderColor: theme.border }}
            >
              <div>
                <h3 className="font-serif-display text-2xl">Apothecary Bag</h3>
                <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: theme.muted }}>
                  Complimentary Botanical Gift Wrap Included
                </p>
              </div>
              <button
                onClick={() => setIsBagOpen(false)}
                className="p-2 rounded-full border hover:opacity-75 cursor-pointer"
                style={{ borderColor: theme.border }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {checkedOut ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4"
                >
                  <CheckCircle2 className="w-12 h-12" style={{ color: theme.accent }} />
                  <h4 className="font-serif-display text-3xl">Your Ritual Parcel is Reserved</h4>
                  <p className="text-sm max-w-xs" style={{ color: theme.muted }}>
                    Prepared with dried garden roses and linen ribbon for boutique pickup or same-day courier.
                  </p>
                </motion.div>
              ) : bagItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <Sparkles className="w-8 h-8" style={{ color: theme.accent }} />
                  <p className="font-serif-display text-2xl">Your Sanctuary Bag is Empty</p>
                  <p className="text-sm max-w-xs" style={{ color: theme.muted }}>
                    Explore whipped shea elixirs, silk hair nectar, or preserved rose gift blooms.
                  </p>
                  <Link
                    to="/apothecary"
                    onClick={() => setIsBagOpen(false)}
                    className="px-6 py-3 rounded-full text-xs uppercase tracking-[0.18em]"
                    style={{
                      backgroundColor: theme.isDark ? theme.accent : '#1A1715',
                      color: theme.isDark ? '#151311' : '#F6F1EA',
                    }}
                  >
                    Browse Apothecary
                  </Link>
                </div>
              ) : (
                bagItems.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex gap-4 p-3.5 rounded-2xl border"
                    style={{ borderColor: theme.border, backgroundColor: theme.bg }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded-xl shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm leading-snug">{item.name}</h4>
                          <button
                            onClick={() => removeFromBag(item.id)}
                            className="opacity-50 hover:opacity-100 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] mt-0.5" style={{ color: theme.muted }}>
                          {item.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div
                          className="inline-flex items-center gap-3 px-2.5 py-1 rounded-full border text-xs"
                          style={{ borderColor: theme.border }}
                        >
                          <button
                            onClick={() => updateBagQty(item.id, -1)}
                            className="hover:opacity-60 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span>{item.qty}</span>
                          <button
                            onClick={() => updateBagQty(item.id, 1)}
                            className="hover:opacity-60 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-medium text-sm">${item.price * item.qty}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {bagItems.length > 0 && !checkedOut && (
              <div
                className="p-6 border-t space-y-4"
                style={{ borderColor: theme.border, backgroundColor: theme.surface }}
              >
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between" style={{ color: theme.muted }}>
                    <span>Botanical Gift Wrapping</span>
                    <span>Complimentary</span>
                  </div>
                  <div className="flex justify-between font-medium text-base pt-1">
                    <span>Subtotal</span>
                    <span>${bagSubtotal}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-medium transition-transform hover:scale-[1.01] cursor-pointer"
                  style={{
                    backgroundColor: theme.isDark ? theme.accent : '#1A1715',
                    color: theme.isDark ? '#151311' : '#F6F1EA',
                  }}
                >
                  <span>Complete Apothecary Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
