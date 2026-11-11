import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SanctuaryProvider, useSanctuary } from './context/SanctuaryContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SoundscapePlayer from './components/SoundscapePlayer';
import RitualBagDrawer from './components/RitualBagDrawer';
import Preloader from './components/Preloader';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BridalPage from './pages/BridalPage';
import ApothecaryPage from './pages/ApothecaryPage';
import SpacesPage from './pages/SpacesPage';
import AboutPage from './pages/AboutPage';
import BookingPage from './pages/BookingPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/bridal" element={<BridalPage />} />
          <Route path="/apothecary" element={<ApothecaryPage />} />
          <Route path="/spaces" element={<SpacesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

function Shell() {
  const { theme } = useSanctuary();
  return (
    <div
      id="top"
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <Preloader />
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <RitualBagDrawer />
      <SoundscapePlayer />
    </div>
  );
}

export default function App() {
  return (
    <SanctuaryProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </SanctuaryProvider>
  );
}
