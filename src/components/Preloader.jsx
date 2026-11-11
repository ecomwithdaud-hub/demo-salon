import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] bg-[#151311] text-[#F6F1EA] flex flex-col items-center justify-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <p className="text-[10px] uppercase tracking-[0.42em] text-[#C88E83]">
              Women&apos;s Salon · Botanical Sanctuary
            </p>
            <h1 className="font-serif-display text-4xl sm:text-6xl tracking-[0.18em] font-light">
              MAISON SOLÈNE
            </h1>
            <div className="w-40 h-[1px] bg-white/15 mx-auto overflow-hidden mt-4">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-[#C88E83]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
