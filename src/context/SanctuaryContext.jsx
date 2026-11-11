import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundEngine } from '../utils/soundscape';

const SanctuaryContext = createContext(null);

export const ATMOSPHERE_THEMES = {
  alabaster: {
    id: 'alabaster',
    label: 'Alabaster Daylight',
    tagline: 'Wildflower Linen & Travertine',
    bg: '#F6F1EA',
    surface: '#EFE8DD',
    card: '#FBF8F3',
    text: '#1A1715',
    muted: '#6C6259',
    accent: '#C88E83',
    accentDeep: '#7A544A',
    border: 'rgba(26, 23, 21, 0.10)',
    isDark: false,
  },
  dusk: {
    id: 'dusk',
    label: 'Velvet Dusk',
    tagline: 'Equinox Obsidian & Rose Gold',
    bg: '#131110',
    surface: '#1D1917',
    card: '#231E1B',
    text: '#F5EFE7',
    muted: '#B5AAA0',
    accent: '#D9A59B',
    accentDeep: '#E8C5B8',
    border: 'rgba(245, 239, 231, 0.12)',
    isDark: true,
  },
  sage: {
    id: 'sage',
    label: 'Botanical Mist',
    tagline: 'Mellow Japandi & Eucalyptus',
    bg: '#EDF0EA',
    surface: '#E1E6DC',
    card: '#F6F8F4',
    text: '#182019',
    muted: '#5D685E',
    accent: '#63755E',
    accentDeep: '#3E4D3A',
    border: 'rgba(24, 32, 25, 0.10)',
    isDark: false,
  },
};

export function SanctuaryProvider({ children }) {
  const [themeKey, setThemeKey] = useState('alabaster');
  const [bagItems, setBagItems] = useState([
    {
      id: 'prd-whipped-shea',
      type: 'product',
      name: 'Velvet Rose & Raw Shea Soufflé',
      price: 48,
      qty: 1,
      image: '/images/apothecary-ritual.png',
      subtitle: '240 ml / Apothecary',
    },
  ]);
  const [bookingQueue, setBookingQueue] = useState([]);
  const [isBagOpen, setIsBagOpen] = useState(false);

  // Audio player state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.35);

  const theme = ATMOSPHERE_THEMES[themeKey];

  useEffect(() => {
    document.body.style.backgroundColor = theme.bg;
    document.body.style.color = theme.text;
    document.body.style.transition = 'background-color 0.6s ease, color 0.6s ease';
  }, [theme]);

  const addToBag = (product) => {
    setBagItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          type: 'product',
          name: product.name,
          price: product.price,
          qty: 1,
          image: product.image,
          subtitle: product.size || product.category,
        },
      ];
    });
    setIsBagOpen(true);
  };

  const updateBagQty = (id, delta) => {
    setBagItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromBag = (id) => {
    setBagItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addServiceToBooking = (service) => {
    setBookingQueue((prev) => {
      if (prev.some((s) => s.id === service.id)) return prev;
      return [...prev, service];
    });
  };

  const removeServiceFromBooking = (id) => {
    setBookingQueue((prev) => prev.filter((s) => s.id !== id));
  };

  const clearBookingQueue = () => setBookingQueue([]);

  const toggleAudio = () => {
    if (isPlayingAudio) {
      soundEngine.pause();
      setIsPlayingAudio(false);
    } else {
      soundEngine.play(trackIndex);
      setIsPlayingAudio(true);
    }
  };

  const changeTrack = (nextIdx) => {
    const idx = (nextIdx + soundEngine.tracks.length) % soundEngine.tracks.length;
    setTrackIndex(idx);
    if (isPlayingAudio) {
      soundEngine.play(idx);
    }
  };

  const updateVolume = (val) => {
    setVolume(val);
    soundEngine.setVolume(val);
  };

  const bagCount = bagItems.reduce((acc, item) => acc + item.qty, 0);
  const bagSubtotal = bagItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <SanctuaryContext.Provider
      value={{
        themeKey,
        setThemeKey,
        theme,
        bagItems,
        addToBag,
        updateBagQty,
        removeFromBag,
        bagCount,
        bagSubtotal,
        isBagOpen,
        setIsBagOpen,
        bookingQueue,
        addServiceToBooking,
        removeServiceFromBooking,
        clearBookingQueue,
        isPlayingAudio,
        toggleAudio,
        trackIndex,
        changeTrack,
        volume,
        updateVolume,
        tracks: soundEngine.tracks,
      }}
    >
      {children}
    </SanctuaryContext.Provider>
  );
}

export function useSanctuary() {
  const ctx = useContext(SanctuaryContext);
  if (!ctx) throw new Error('useSanctuary must be used inside SanctuaryProvider');
  return ctx;
}
