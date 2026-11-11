export const BRIDAL_PACKAGES = [
  {
    id: 'brd-classic',
    tier: 'Tier I',
    name: 'The Solène Classic Bride',
    price: 680,
    duration: 'Trial + Wedding Day (5 hrs)',
    idealFor: 'Intimate ceremonies & civil celebrations',
    features: [
      '90-minute Hair & Glass-Skin Makeup Trial Consultation',
      'Wedding Day HD Editorial Skin Prep & Airbrush Luminosity',
      'Couture Chignon or Silk Hollywood Waves with Veil Placement',
      'Custom Lash Clusters & Touch-Up Lip Kit to Keep',
      'Complimentary Wildflower Facial 5 Days Prior',
    ],
  },
  {
    id: 'brd-royal',
    tier: 'Tier II — Most Requested',
    name: 'Royal Multi-Day Atelier Suite',
    price: 1450,
    duration: 'Mehendi / Sangeet + Ceremony + Reception',
    idealFor: 'Traditional multi-day cultural & heritage brides',
    features: [
      'Private Bridal Mezzanine Access for All Three Events',
      '3 Distinct Couture Hair & Makeup Looks + Fresh Floral Styling',
      'Pre-Wedding Whipped Shea Hammam & Brightening Facial Series',
      'Japanese Gel Bridal French Manicure & Pedicure Lounge',
      'Dedicated Junior Stylist for Dupatta/Veil Draping & Jewelry Setting',
    ],
    featured: true,
  },
  {
    id: 'brd-entourage',
    tier: 'Tier III',
    name: 'Bridal Party Sanctuary Lounge',
    price: 980,
    duration: '4 Guests + Host Bride Perks',
    idealFor: 'Sisters, mothers & bridesmaids morning prep',
    features: [
      'Exclusive Morning Buyout of our sunlit Silk Salon Lounge',
      '4 Signature Blowouts + Luminous Soft-Glam Makeup',
      'Botanical Mimosa & Rose-Pistachio Grazing Table',
      'Curated Polaroid Keepsakes & Mini Silk Hair Elixirs',
    ],
  },
];

export const BRIDAL_TIMELINE = [
  {
    phase: '90 Days Out',
    title: 'Skin Architecture & Hair Health',
    detail: 'Begin monthly Wildflower Glass-Skin Facials, mineral hair detox, and customized apothecary home ritual.',
  },
  {
    phase: '30 Days Out',
    title: 'Couture Trial & Floral Mapping',
    detail: 'Private 2-hour look trial under daylight & candlelight with veil, headpiece, and jewelry harmony check.',
  },
  {
    phase: '5 Days Out',
    title: 'Hammam Glow & Japanese Gel',
    detail: 'Whipped Shea Hammam body polish, feather brow sculpting, and breathable HEMA-free bridal nails.',
  },
  {
    phase: 'The Morning Of',
    title: 'Unhurried Sanctuary Morning',
    detail: 'Step into our tranquil Bridal Mezzanine with crystal soundscapes, herbal elixirs, and serene editorial artistry.',
  },
];

export const SPACES_DATA = [
  {
    id: 'space-hydro',
    name: 'The Obsidian Hydro-Suite',
    subtitle: 'Inspired by Architectural Urban Recovery',
    image: '/images/hydro-suite.png',
    temp: '39°C Mineral Vitality / 12°C Plunge',
    lighting: '2400K Candlelit Basalt Glow',
    scent: 'Smoked Hinoki, Eucalyptus & Black Fig',
    capacity: 'Private Duo or Solo Sanctuary',
    description:
      'Carved from honed dark basalt and warm Venetian plaster, our lower-level hydrotherapy sanctuary buffers the city outside with acoustic stone insulation and warm vitality waters.',
  },
  {
    id: 'space-hair',
    name: 'The Alabaster Hair Atelier',
    subtitle: 'Effortless Downtown Chic & Light',
    image: '/images/hair-atelier.png',
    temp: '21°C Crisp Botanical Air',
    lighting: 'Natural North Skylight + 98 CRI Mirrors',
    scent: 'White Neroli & Camellia Blossom',
    capacity: '8 Sculpted Linen Styling Stations',
    description:
      'Flooded with gallery-grade daylight, travertine archways, and dusty-rose velvet chairs designed so color looks true in life, not only under salon bulbs.',
  },
  {
    id: 'space-nail',
    name: 'Mellow Nail & Tea Lounge',
    subtitle: 'Japandi Minimalism & Non-Toxic Care',
    image: '/images/nail-lounge.png',
    temp: '22°C Quiet Whisper Zone',
    lighting: 'Filtered Paper Lantern Diffused Sun',
    scent: 'Steamed Matcha, Oat Milk & Yuzu',
    capacity: '6 Zero-Gravity Travertine Loungers',
    description:
      'Zero harsh acrylic fumes. Every station features medical-grade ventilation, handmade Kyoto ceramic teaware, and breathable Japanese soft gels.',
  },
  {
    id: 'space-bridal',
    name: 'Private Bridal Mezzanine',
    subtitle: 'Intimate Celebration & Couture Prep',
    image: '/images/bridal-couture.png',
    temp: '21.5°C Private Climate Control',
    lighting: 'Dimmable Golden Hour & Flash Preview',
    scent: 'Damask Rose Otto & Jasmine Sambac',
    capacity: 'Up to 10 Bridal Entourage Guests',
    description:
      'A sequestered upstairs atelier featuring floor-to-ceiling silk curtains, garment steamers, bespoke photography backdrops, and a private tea pantry.',
  },
];

export const ARTISANS_DATA = [
  {
    id: 'art-nadia',
    name: 'Nadia Mansoor',
    role: 'Creative Director & Master Colorist',
    specialty: 'Hair Atelier',
    experience: '14 Years · Paris & Karachi',
    image: '/images/hair-atelier.png',
    bio: 'Trained in effortless French balayage and textured hair architecture, Nadia leads our zero-ammonia color philosophy.',
  },
  {
    id: 'art-elena',
    name: 'Elena Vance',
    role: 'Lead Holistic Esthetician',
    specialty: 'Botanical Facials',
    experience: '11 Years · NYC & Kyoto',
    image: '/images/botanical-facial.png',
    bio: 'Merges sculptural buccal lifting with wild-harvested botanical serums for luminous glass-skin results.',
  },
  {
    id: 'art-sana',
    name: 'Sana Al-Rashid',
    role: 'Couture Bridal & Editorial Artist',
    specialty: 'Bridal Studio',
    experience: '12 Years · London & Lahore',
    image: '/images/bridal-couture.png',
    bio: 'Celebrated for skin-first heritage bridal artistry that stays weightless and radiant through 14-hour celebrations.',
  },
  {
    id: 'art-hana',
    name: 'Hana Takahashi',
    role: 'Master Japanese Gel & Brow Artisan',
    specialty: 'Nail & Brow Bar',
    experience: '9 Years · Tokyo & Brooklyn',
    image: '/images/nail-lounge.png',
    bio: 'Specializes in structured HEMA-free Japanese soft gels, minimalist botanical micro-art, and natural keratin brow framing.',
  },
];

export const JOURNAL_ARTICLES = [
  {
    id: 'jrn-slow-beauty',
    category: 'Philosophy',
    readTime: '4 min read',
    title: 'The Architecture of Slow Beauty: Why Lighting & Acoustics Shape How You Heal',
    excerpt: 'Inside the architectural blueprint of Maison Solène — where travertine acoustics, 2400K lighting, and natural circadian shifts lower cortisol within 8 minutes of arrival.',
    image: '/images/hero-sanctuary.png',
    body: [
      'Most salons overwhelm the nervous system before a treatment even begins: harsh fluorescent mirrors, overlapping blow-dryers, and chemical odors spike cortisol rather than soothing it.',
      'Drawing cues from urban architectural sanctuaries and desert apothecaries, every threshold inside Maison Solène is calibrated sequentially. As you move from the sunlit Hair Atelier toward the Obsidian Hydro-Suite, acoustic plaster absorbs ambient noise by 60% and color temperatures gradually drop from daylight clarity to 2400K candlelight.',
      'When your nervous system feels deeply safe, lymphatic fluid flows more freely, facial tension melts faster, and beauty becomes an effortless side effect of restoration.',
    ],
  },
  {
    id: 'jrn-japanese-gel',
    category: 'Clean Nail Craft',
    readTime: '3 min read',
    title: 'Why Japanese Soft Gel Replaced Traditional Acrylics in Our Sanctuary',
    excerpt: 'Breathable, solvent-light, and shockingly durable — discover how potted Japanese gels protect natural nail keratin while keeping sheer shades luminous for 4 weeks.',
    image: '/images/nail-lounge.png',
    body: [
      'Traditional dip powders and harsh monomer acrylics dehydrate the nail plate and strip away protective lipid layers with aggressive filing.',
      'Our Mellow Nail & Tea Lounge exclusively uses HEMA-free potted Japanese builder gels infused with trace calcium and silk fibers. Because they flex naturally with your fingertip rather than snapping rigidly, your natural nail grows stronger underneath every single appointment.',
    ],
  },
  {
    id: 'jrn-shea-ritual',
    category: 'Body Care',
    readTime: '5 min read',
    title: 'From Raw Shea & Rose Otto: Crafting Our Signature 12-Hour Whipped Soufflé',
    excerpt: 'How pairing tactile whipped botanical butters with warm hydrotherapy transforms dry winter skin into luminous cashmere.',
    image: '/images/apothecary-ritual.png',
    body: [
      'Thick balms often sit on top of skin without sinking in, while watery lotions evaporate within an hour. By cold-whipping unrefined West African ivory shea with cold-pressed rosehip seed oil and hydrosol droplets, we capture micro-bubbles of moisture that dissolve at exact body temperature (37°C).',
      'Applied within three minutes of stepping out of our Hammam steam suite, the lipid veil locks in deep hydration without leaving a trace on silk dresses.',
    ],
  },
];
