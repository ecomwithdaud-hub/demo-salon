# MAISON SOLÈNE — Women's Salon, Botanical Spa & Bridal Sanctuary

A multi-page luxury women's salon, botanical hydro-spa, and bridal couture atelier web application built with **React 19**, **Vite**, **React Router**, **Tailwind CSS**, and **Framer Motion**.

## Design Inspiration
Maison Solène synthesizes architectural wellness, effortless downtown beauty, clean non-toxic care, and boutique e-commerce craft:
- Moody stone & hydrotherapy recovery architecture (*Equinox Hotels NYC*)
- Organic botanical warmth and calm (*Wildflower Spas*)
- Non-toxic HEMA-free Japanese gel & minimalist tea bar (*Mellow Bar*)
- Effortless modern salon chic (*Maeve in June*, *The Leisure Salons*)
- Tactile whipped body care & heritage bridal glam (*Tree Hut Shea*, *Looks*, *Mulk*)
- Curated hover-reveal apothecary & gift blooms commerce (*WrapUpBlooms*)

## Pages & Routes
| Route | Page | Highlights |
| :--- | :--- | :--- |
| `/` | **Sanctuary Home** | Ken Burns hero, Live Mood Switcher, Marquee, Experience Portals, Auto-Playing Sanctuary Motion Reel |
| `/services` | **Rituals & Menu** | Category filtering, ingredient search, expandable step-by-step protocols, Ritual Stack Booking Queue |
| `/bridal` | **Bridal Couture** | Bridal mood lookbook switcher, interactive 90-day Countdown Blueprint, multi-day & entourage packages |
| `/apothecary` | **Botanical Apothecary** | Category filtering, hover image swap, Quick Ritual modal with Top/Heart/Base scent notes, Slide-over Shopping Bag |
| `/spaces` | **Spaces & Journal** | Interactive architectural suite explorer (climate, lighting, scent, scale) + modal Wellness Journal essays |
| `/about` | **Philosophy & Artisans** | Clean beauty ethos, Master Artisan profiles with direct booking links, interactive FAQ accordion |
| `/booking` | **Concierge Booking** | Multi-ritual queue, 7-day calendar strip, time slots, artisan preference, herbal tea/scent customization, confirmation pass |

## Interactive Features & "Playing Stuff"
- **Live Atmosphere Theme Switcher**: Toggle across the entire multi-page app between **Alabaster Daylight**, **Velvet Dusk** (dark obsidian mode), and **Botanical Mist** (soft sage mode).
- **Web Audio Spa Soundscape Engine** (`src/utils/soundscape.js`): Synthesizes 3 soothing ambient tracks (*Crystal Bowls & Morning Mist*, *Obsidian Hammam Sanctuary*, *Wildflower Courtyard Chimes*) natively via the Web Audio API with live equalizer bars and volume control.
- **Interactive Sanctuary Motion Reel** (`src/components/SanctuaryReel.jsx`): Multi-chapter auto-playing showcase with story progress bars, Ken Burns transitions, and audio pairing.

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```
