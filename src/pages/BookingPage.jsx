import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  Plus,
  Trash2,
  User,
  Coffee,
  ArrowRight,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { ARTISANS_DATA } from '../data/editorial';
import { useSanctuary } from '../context/SanctuaryContext';

const TIME_SLOTS = ['09:30 AM', '11:15 AM', '01:00 PM', '02:45 PM', '04:30 PM', '06:15 PM'];
const TEA_PREFERENCES = [
  'Rose-Pistachio Saffron Infusion',
  'Iced Kyoto Ceremonial Matcha Oat',
  'Chamomile & Wild Honey Dew',
  'Sparkling White Peach Botanical',
];
const SCENT_MOODS = ['Quiet Silence', 'Damask Rose Mist', 'Hinoki Cypress Steam'];

export default function BookingPage() {
  const { theme, bookingQueue, addServiceToBooking, removeServiceFromBooking, clearBookingQueue } =
    useSanctuary();
  const [searchParams] = useSearchParams();

  const initialArtisan = searchParams.get('artisan') || 'First Available Master Artisan';
  const [selectedArtisan, setSelectedArtisan] = useState(initialArtisan);
  const [selectedDateIdx, setSelectedDateIdx] = useState(1);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[1]);
  const [teaChoice, setTeaChoice] = useState(TEA_PREFERENCES[0]);
  const [scentMood, setScentMood] = useState(SCENT_MOODS[1]);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [confirmedRef, setConfirmedRef] = useState(null);

  const upcomingDays = useMemo(() => {
    const arr = [];
    const base = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i + 1);
      arr.push({
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        full: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      });
    }
    return arr;
  }, []);

  const activeTreatments =
    bookingQueue.length > 0 ? bookingQueue : [SERVICES_DATA[3]];

  const totalPrice = activeTreatments.reduce((acc, s) => acc + s.price, 0);
  const totalDuration = activeTreatments.reduce((acc, s) => acc + (s.duration || 60), 0);

  const handleConfirm = (e) => {
    e.preventDefault();
    const code = `SOL-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedRef({
      code,
      guest: guestName || 'Valued Guest',
      date: upcomingDays[selectedDateIdx].full,
      time: selectedTime,
      artisan: selectedArtisan,
      tea: teaChoice,
      scent: scentMood,
      treatments: activeTreatments,
      total: totalPrice,
    });
    clearBookingQueue();
  };

  return (
    <div className="pt-28 pb-24 px-5 md:px-10 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl space-y-3 mb-12"
      >
        <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.accentDeep }}>
          Sanctuary Concierge
        </p>
        <h1 className="font-serif-display text-5xl md:text-6xl font-light leading-none">
          Reserve Your <span className="italic">Time &amp; Ritual</span>
        </h1>
        <p className="text-sm md:text-base" style={{ color: theme.muted }}>
          Stack multiple salon and spa rituals into a seamless visit, tailor your herbal tea and
          aromatherapy oil, and receive instant suite confirmation.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {confirmedRef ? (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto rounded-[2rem] border p-8 md:p-12 text-center space-y-6 shadow-2xl"
            style={{ borderColor: theme.accent, backgroundColor: theme.card }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
              style={{ backgroundColor: theme.surface }}
            >
              <CheckCircle2 className="w-9 h-9" style={{ color: theme.accent }} />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.28em]" style={{ color: theme.accentDeep }}>
                Reservation Pass · {confirmedRef.code}
              </span>
              <h2 className="font-serif-display text-4xl">
                We Await You, {confirmedRef.guest}
              </h2>
              <p className="text-sm" style={{ color: theme.muted }}>
                Your suite will be warmed with {confirmedRef.scent.toLowerCase()} and{' '}
                {confirmedRef.tea.toLowerCase()} 15 minutes before arrival.
              </p>
            </div>

            <div
              className="p-6 rounded-2xl text-left space-y-3 text-sm"
              style={{ backgroundColor: theme.surface }}
            >
              <div className="flex justify-between">
                <span style={{ color: theme.muted }}>Date &amp; Arrival</span>
                <span className="font-medium">
                  {confirmedRef.date} at {confirmedRef.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: theme.muted }}>Artisan</span>
                <span className="font-medium">{confirmedRef.artisan}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: theme.muted }}>Rituals</span>
                <span className="font-medium text-right">
                  {confirmedRef.treatments.map((t) => t.name).join(', ')}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t" style={{ borderColor: theme.border }}>
                <span>Estimated Total</span>
                <span className="font-serif-display text-2xl">${confirmedRef.total}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => setConfirmedRef(null)}
                className="px-6 py-3 rounded-full border text-xs uppercase tracking-[0.16em] cursor-pointer"
                style={{ borderColor: theme.border }}
              >
                Book Another Visit
              </button>
              <Link
                to="/apothecary"
                className="px-6 py-3 rounded-full text-xs uppercase tracking-[0.16em]"
                style={{
                  backgroundColor: theme.isDark ? theme.accent : '#1A1715',
                  color: theme.isDark ? '#151311' : '#F6F1EA',
                }}
              >
                Browse Pre-Visit Apothecary →
              </Link>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleConfirm} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Configurator */}
            <div className="lg:col-span-8 space-y-8">
              {/* 1. Selected & Quick-Add Treatments */}
              <div
                className="rounded-3xl border p-6 md:p-7 space-y-5"
                style={{ borderColor: theme.border, backgroundColor: theme.card }}
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-serif-display text-3xl">1. Curate Your Ritual Stack</h2>
                  <Link
                    to="/services"
                    className="text-xs uppercase tracking-[0.16em] underline"
                    style={{ color: theme.accentDeep }}
                  >
                    Full Menu
                  </Link>
                </div>

                <div className="space-y-2.5">
                  {activeTreatments.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl flex items-center justify-between gap-4"
                      style={{ backgroundColor: theme.surface }}
                    >
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: theme.accentDeep }}>
                          {item.category}
                        </div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs" style={{ color: theme.muted }}>
                          {item.duration || 60} min · ${item.price}
                        </div>
                      </div>
                      {bookingQueue.length > 0 && (
                        <button
                          type="button"
                          onClick={() => removeServiceFromBooking(item.id)}
                          className="p-2 rounded-full hover:opacity-70 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] mb-2.5" style={{ color: theme.muted }}>
                    Quick Add Pairings:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES_DATA.slice(0, 5).map((srv) => {
                      const already = activeTreatments.some((a) => a.id === srv.id);
                      if (already) return null;
                      return (
                        <button
                          type="button"
                          key={srv.id}
                          onClick={() => addServiceToBooking(srv)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs cursor-pointer hover:opacity-80"
                          style={{ borderColor: theme.border, backgroundColor: theme.bg }}
                        >
                          <Plus className="w-3 h-3" style={{ color: theme.accent }} />
                          {srv.name} (${srv.price})
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 2. Date & Time Picker */}
              <div
                className="rounded-3xl border p-6 md:p-7 space-y-6"
                style={{ borderColor: theme.border, backgroundColor: theme.card }}
              >
                <h2 className="font-serif-display text-3xl">2. Select Date, Time &amp; Artisan</h2>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5">
                  {upcomingDays.map((d, idx) => {
                    const active = idx === selectedDateIdx;
                    return (
                      <button
                        type="button"
                        key={d.dayNum}
                        onClick={() => setSelectedDateIdx(idx)}
                        className="p-3 rounded-2xl border text-center transition-all cursor-pointer"
                        style={{
                          borderColor: active ? theme.accent : theme.border,
                          backgroundColor: active ? theme.surface : theme.bg,
                        }}
                      >
                        <div className="text-[10px] uppercase tracking-wider" style={{ color: theme.muted }}>
                          {d.dayName}
                        </div>
                        <div className="font-serif-display text-2xl my-0.5">{d.dayNum}</div>
                        <div className="text-[10px]">{d.month}</div>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const active = selectedTime === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className="py-2.5 px-4 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        style={{
                          borderColor: active ? theme.accent : theme.border,
                          backgroundColor: active
                            ? theme.isDark
                              ? theme.accent
                              : '#1A1715'
                            : theme.bg,
                          color: active ? (theme.isDark ? '#151311' : '#F6F1EA') : theme.text,
                        }}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {slot}
                      </button>
                    );
                  })}
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.18em] block mb-2" style={{ color: theme.muted }}>
                    Preferred Artisan
                  </label>
                  <select
                    value={selectedArtisan}
                    onChange={(e) => setSelectedArtisan(e.target.value)}
                    className="w-full p-3.5 rounded-2xl border text-sm outline-none"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.bg,
                      color: theme.text,
                    }}
                  >
                    <option value="First Available Master Artisan">
                      First Available Master Artisan
                    </option>
                    {ARTISANS_DATA.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name} — {a.specialty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3. Sensory & Guest Details */}
              <div
                className="rounded-3xl border p-6 md:p-7 space-y-6"
                style={{ borderColor: theme.border, backgroundColor: theme.card }}
              >
                <h2 className="font-serif-display text-3xl">3. Suite Hospitality &amp; Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.18em] block mb-2" style={{ color: theme.muted }}>
                      <Coffee className="w-3.5 h-3.5 inline mr-1" /> Welcome Herbal Tea
                    </label>
                    <select
                      value={teaChoice}
                      onChange={(e) => setTeaChoice(e.target.value)}
                      className="w-full p-3.5 rounded-2xl border text-xs outline-none"
                      style={{
                        borderColor: theme.border,
                        backgroundColor: theme.bg,
                        color: theme.text,
                      }}
                    >
                      {TEA_PREFERENCES.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-[0.18em] block mb-2" style={{ color: theme.muted }}>
                      <Sparkles className="w-3.5 h-3.5 inline mr-1" /> Suite Aromatherapy
                    </label>
                    <select
                      value={scentMood}
                      onChange={(e) => setScentMood(e.target.value)}
                      className="w-full p-3.5 rounded-2xl border text-xs outline-none"
                      style={{
                        borderColor: theme.border,
                        backgroundColor: theme.bg,
                        color: theme.text,
                      }}
                    >
                      {SCENT_MOODS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Your Full Name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="p-3.5 rounded-2xl border text-sm outline-none"
                    style={{ borderColor: theme.border, backgroundColor: theme.bg }}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="p-3.5 rounded-2xl border text-sm outline-none"
                    style={{ borderColor: theme.border, backgroundColor: theme.bg }}
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Mobile / WhatsApp"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="p-3.5 rounded-2xl border text-sm outline-none"
                    style={{ borderColor: theme.border, backgroundColor: theme.bg }}
                  />
                </div>
              </div>
            </div>

            {/* Sticky Reservation Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <div
                className="rounded-3xl border p-6 md:p-7 space-y-5 shadow-xl"
                style={{ borderColor: theme.border, backgroundColor: theme.card }}
              >
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em]" style={{ color: theme.accentDeep }}>
                  <Calendar className="w-3.5 h-3.5" /> Visit Summary
                </div>
                <h3 className="font-serif-display text-3xl">Your Sanctuary Pass</h3>

                <div className="space-y-3 text-xs border-y py-4" style={{ borderColor: theme.border }}>
                  <div className="flex justify-between">
                    <span style={{ color: theme.muted }}>Date</span>
                    <span className="font-medium">{upcomingDays[selectedDateIdx].full}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: theme.muted }}>Arrival</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: theme.muted }}>Total Duration</span>
                    <span className="font-medium">{totalDuration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: theme.muted }}>Artisan</span>
                    <span className="font-medium text-right max-w-[160px] truncate">
                      {selectedArtisan}
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-sm" style={{ color: theme.muted }}>
                    Estimated Investment
                  </span>
                  <span className="font-serif-display text-4xl">${totalPrice}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-medium cursor-pointer transition-transform hover:scale-[1.01]"
                  style={{
                    backgroundColor: theme.isDark ? theme.accent : '#1A1715',
                    color: theme.isDark ? '#151311' : '#F6F1EA',
                  }}
                >
                  Confirm Sanctuary Booking
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-center" style={{ color: theme.muted }}>
                  No deposit charged today · Free rescheduling up to 12 hours prior.
                </p>
              </div>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
