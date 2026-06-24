import { Restaurant, Review, Notification } from './types';

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-gatsby',
    name: 'The Gilded Gatsby',
    designTheme: 'Art Deco Glamour',
    description: 'A luxurious return to the Roaring Twenties, featuring geometric brass accents, bold velvet seating, and ambient crystal chandeliers.',
    longDescription: 'The Gilded Gatsby transport guests into the opulence of 1920s high society. Inspired by classic Art Deco architecture, every detail of this dining space has been meticulously curated—from the symmetrical chevron wall paneling and polished brass trim to the striking black lacquer furniture and royal emerald velvet seating. Under the warm, amber glow of custom crystal chandeliers, guests can experience an evening of culinary excellence that feels both historic and timeless. Perfect for glamorous birthday galas, milestone celebrations, and high-profile cocktail receptions.',
    rating: 4.9,
    reviewsCount: 148,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    additionalImages: [
      'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&q=80&w=600'
    ],
    materialPalette: ['Polished Brass', 'Black Lacquer', 'Emerald Velvet', 'Verde Marble'],
    colorScheme: {
      name: 'Emerald & Gold Luxury',
      hexes: ['#064e3b', '#d97706', '#1e293b', '#f1f5f9']
    },
    keyElements: ['Fluted wall details', 'Sunburst decorative mirrors', 'Geometric inlaid flooring', 'Monolithic marble bar counter'],
    basePriceTable: 50,
    basePriceFullVenue: 1200,
    address: '428 Park Avenue, Manhattan, NY',
    tables: [
      { id: 'gatsby-t1', name: 'Flapper Booth 1', capacity: 2, isAvailable: true, type: 'VIP Booth' },
      { id: 'gatsby-t2', name: 'Flapper Booth 2', capacity: 2, isAvailable: true, type: 'VIP Booth' },
      { id: 'gatsby-t3', name: 'Jazz Alcove 1', capacity: 4, isAvailable: false, type: 'Window Side' },
      { id: 'gatsby-t4', name: 'Great Gatsby Round', capacity: 6, isAvailable: true, type: 'Main Salon' },
      { id: 'gatsby-t5', name: 'The Speakeasy Vault', capacity: 8, isAvailable: true, type: 'Chef\'s Table' },
      { id: 'gatsby-t6', name: 'Promenade View 1', capacity: 4, isAvailable: true, type: 'Window Side' }
    ]
  },
  {
    id: 'rest-canopy',
    name: 'Verdant Canopy',
    designTheme: 'Biophilic Botanical',
    description: 'An organic oasis blending living plant walls, reclaimed oak timber, and cascading warm-spectrum fairylights.',
    longDescription: 'Escape the concrete jungle inside Verdant Canopy, a restaurant designed with the core principles of biophilic design. Our interior fosters an innate human connection with nature, featuring high ceilings covered in cascading ivy, full-grown indoor olive trees, and multiple vertical living walls containing over twenty species of air-purifying foliage. The dining tables are crafted from cross-sections of fallen white oak trees, paired with tactile linen upholstery and soft terracotta ceramics. Strategically placed skylights and a highly adaptive warm-light grid simulate natural forest-canopy sunbeams throughout the day. It provides a peaceful, restorative atmosphere ideal for intimate garden-themed weddings, botanical baby showers, and organic wellness gatherings.',
    rating: 4.8,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=800',
    additionalImages: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&q=80&w=600'
    ],
    materialPalette: ['Reclaimed White Oak', 'Raw Terracotta', 'Handwoven Linen', 'Preserved Fern Moss'],
    colorScheme: {
      name: 'Forest Earth & Clay',
      hexes: ['#14532d', '#78350f', '#fef3c7', '#f4ebe1']
    },
    keyElements: ['12-foot vertical plant wall', 'Suspended micro-green lighting pendants', 'Water feature soundscape', 'Fallen tree live-edge communal tables'],
    basePriceTable: 35,
    basePriceFullVenue: 850,
    address: '88 Greenhouse Blvd, Brooklyn, NY',
    tables: [
      { id: 'canopy-t1', name: 'Under the Olive Tree', capacity: 2, isAvailable: true, type: 'Main Salon' },
      { id: 'canopy-t2', name: 'Ivy Trellis Nook', capacity: 2, isAvailable: true, type: 'Garden Terrace' },
      { id: 'canopy-t3', name: 'Skylight Arbor 1', capacity: 4, isAvailable: true, type: 'Main Salon' },
      { id: 'canopy-t4', name: 'Waterfall Alcove', capacity: 4, isAvailable: false, type: 'VIP Booth' },
      { id: 'canopy-t5', name: 'The Root Table', capacity: 8, isAvailable: true, type: 'Chef\'s Table' },
      { id: 'canopy-t6', name: 'Terracotta Terrace', capacity: 6, isAvailable: true, type: 'Garden Terrace' }
    ]
  },
  {
    id: 'rest-shibui',
    name: 'Shibui Zen',
    designTheme: 'Japanese Minimalist',
    description: 'A serene sanctuary featuring sliding shoji screens, tatami lounge mats, hand-carved stone, and absolute architectural silence.',
    longDescription: 'Rooted in the Zen philosophy of "Shibui" (beauty in simplicity, restraint, and natural texture), Shibui Zen is an architectural masterpiece of quiet design. The space strips away all visual clutter to reveal the raw elegance of structural cryptomeria wood, premium shoji rice-paper partitions, and smoothed river stones. The acoustics are engineered to mimic a quiet bamboo forest, utilizing hidden sound-absorbing wool panels behind wood slats. Guests remove their shoes to dine either at low-slung oak tables with ergonomic tatami floor pillows, or at the magnificent monolithic Hinoki wood cypress chef bar. This spiritual dining atmosphere is unparalleled for peaceful corporate retreats, focus group assemblies, and minimalist aesthetic celebrations.',
    rating: 4.95,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1493857671297-66f1a4ec2941?auto=format&fit=crop&q=80&w=800',
    additionalImages: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600'
    ],
    materialPalette: ['Hinoki Wood', 'Shoji Rice Paper', 'Tatami Sedge Straw', 'Raw Slate'],
    colorScheme: {
      name: 'Ash & Charcoal Calm',
      hexes: ['#1e1b4b', '#475569', '#cbd5e1', '#f8fafc']
    },
    keyElements: ['Shoji room dividers', 'Dry rock dry-landscape (Karesansui) garden', 'Hinoki cypress sushi bar counter', 'Concealed linear soft-amber LEDs'],
    basePriceTable: 60,
    basePriceFullVenue: 1500,
    address: '15 Kyoto Way, Tribeca, NY',
    tables: [
      { id: 'shibui-t1', name: 'Tatami Room A', capacity: 2, isAvailable: true, type: 'VIP Booth' },
      { id: 'shibui-t2', name: 'Tatami Room B', capacity: 4, isAvailable: true, type: 'VIP Booth' },
      { id: 'shibui-t3', name: 'Hinoki Counter 1', capacity: 1, isAvailable: true, type: 'Chef\'s Table' },
      { id: 'shibui-t4', name: 'Hinoki Counter 2', capacity: 1, isAvailable: true, type: 'Chef\'s Table' },
      { id: 'shibui-t5', name: 'Stone Garden View 1', capacity: 4, isAvailable: false, type: 'Window Side' },
      { id: 'shibui-t6', name: 'Shoji Salon Main', capacity: 6, isAvailable: true, type: 'Main Salon' }
    ]
  },
  {
    id: 'rest-velvet',
    name: 'Velvet Neoclassical',
    designTheme: 'Royal Neoclassical',
    description: 'Grand scale arches, Corinthian pillars, deep burgundy velvet, and intricate gold plaster carvings for royal dining.',
    longDescription: 'Immerse yourself in Parisian grandeur at Velvet Neoclassical. This restaurant celebrates the dramatic forms and noble scales of 18th-century French architecture. Boasting 18-foot soaring ceilings adorned with gilded plaster friezes and custom-sculpted crown moldings, the venue feels like a sovereign palace. Dining booths are enveloped in rich burgundy velvet, bordered by mini-columns and ivory arches. Heavy silk drapery frames towering arched windows, casting classical shadows over herringbone parquetry floors. Perfect for high-tier corporate dinners, royal wedding banquets, and theatrical birthday celebrations that demand supreme elegance.',
    rating: 4.75,
    reviewsCount: 86,
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800',
    additionalImages: [
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600'
    ],
    materialPalette: ['Burgundy Silk Velvet', 'Gold Leaf Plaster', 'Statuary White Marble', 'Smoked Oak Herringbone'],
    colorScheme: {
      name: 'Imperial Burgundy & Gold',
      hexes: ['#881337', '#b45309', '#1e293b', '#fafaf9']
    },
    keyElements: ['18-foot plaster arches', 'Crystal tear-drop candelabras', 'Herringbone timber floorboards', 'Classical oil paintings in gilded frames'],
    basePriceTable: 45,
    basePriceFullVenue: 1100,
    address: '112 Sovereign Plaza, Upper East Side, NY',
    tables: [
      { id: 'velvet-t1', name: 'Imperial Throne 1', capacity: 2, isAvailable: true, type: 'VIP Booth' },
      { id: 'velvet-t2', name: 'Imperial Throne 2', capacity: 2, isAvailable: true, type: 'VIP Booth' },
      { id: 'velvet-t3', name: 'Palace Window Nook', capacity: 4, isAvailable: true, type: 'Window Side' },
      { id: 'velvet-t4', name: 'Court Salon Central', capacity: 4, isAvailable: true, type: 'Main Salon' },
      { id: 'velvet-t5', name: 'The Sovereign Circle', capacity: 6, isAvailable: false, type: 'Main Salon' },
      { id: 'velvet-t6', name: 'The Royal Alcove', capacity: 10, isAvailable: true, type: 'Chef\'s Table' }
    ]
  },
  {
    id: 'rest-bauhaus',
    name: 'Moderne Bauhaus',
    designTheme: 'Industrial Mid-Century',
    description: 'An architectural nod to form-follows-function, with tubular chrome, exposed concrete brick, and primary-color glass panels.',
    longDescription: 'Moderne Bauhaus is a celebration of modernist design philosophy, combining clean industrial aesthetics with warmth and comfort. Echoing the teachings of Walter Gropius, the space strips back architecture to raw essentials—featuring walls of sealed gray concrete bricks, exposed blackened steel beams, and polished concrete floors. Iconic tubular chrome chairs with woven cane webbing (Wassily and Cesca designs) provide ergonomic seating around brushed steel-rimmed walnut dining tables. Vibrant red, blue, and yellow stained glass panels act as modern room partitioners, tinting the incoming daylight into beautiful geometric floor shadows. An ideal creative environment for modern tech seminars, design launches, and brutalist-minimalist art mixers.',
    rating: 4.82,
    reviewsCount: 105,
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800',
    additionalImages: [
      'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=600'
    ],
    materialPalette: ['Exposed Concrete', 'Blackened Steel', 'Tubular Chrome', 'Natural Walnut Wood'],
    colorScheme: {
      name: 'Primary Bauhaus Contrast',
      hexes: ['#1d4ed8', '#b91c1c', '#1f2937', '#f3f4f6']
    },
    keyElements: ['Stained-glass geometric dividers', 'Tubular chrome furniture', 'Exposed ventilation conduits', 'Blackened steel architectural columns'],
    basePriceTable: 40,
    basePriceFullVenue: 950,
    address: '74 Bauhaus Avenue, SoHo, NY',
    tables: [
      { id: 'bauhaus-t1', name: 'Chrome Pod 1', capacity: 2, isAvailable: true, type: 'Main Salon' },
      { id: 'bauhaus-t2', name: 'Chrome Pod 2', capacity: 2, isAvailable: true, type: 'Main Salon' },
      { id: 'bauhaus-t3', name: 'Cantilever Booth 1', capacity: 4, isAvailable: true, type: 'VIP Booth' },
      { id: 'bauhaus-t4', name: 'Brutalist Window Side', capacity: 4, isAvailable: true, type: 'Window Side' },
      { id: 'bauhaus-t5', name: 'The Grid Lounge', capacity: 6, isAvailable: true, type: 'Main Salon' },
      { id: 'bauhaus-t6', name: 'The Gropius Table', capacity: 8, isAvailable: false, type: 'Chef\'s Table' }
    ]
  },
  {
    id: 'rest-hygge',
    name: 'Nordic Hygge',
    designTheme: 'Scandinavian Minimalist',
    description: 'Cozy blonde timbers, fluffy sheepskin rugs, a crackling central fireplace, and neutral organic textures.',
    longDescription: 'Rooted in the Scandinavian pursuit of "Hygge" (coziness, connection, and wellbeing), Nordic Hygge is designed to be the ultimate warm sanctuary. The interior boasts soft, blonde ashwood timber ceilings, floor-to-ceiling windows with wool insulated curtains, and a spectacular circular stone fireplace crackling directly in the center of the main dining lounge. Dining chairs and benches are draped in genuine plush sheepskin rugs, inviting guests to linger for hours over artisanal Scandinavian pastries and seasonal slow-cooked foods. The atmospheric lighting is soft, relying heavily on candlelight, creating a glowing hearth effect. It is the perfect cozy environment for intimate birthday dinners, snug winter family reunions, and relaxing brunch get-togethers.',
    rating: 4.88,
    reviewsCount: 130,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
    additionalImages: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600'
    ],
    materialPalette: ['Blonde Ashwood', 'Shorn Sheepskin', 'Riverbed Stone Hearth', 'Bouclé Woven Wool'],
    colorScheme: {
      name: 'Sand, Snow & Ash',
      hexes: ['#4b5563', '#9ca3af', '#e5e7eb', '#fff7ed']
    },
    keyElements: ['Circular central glass fireplace', 'Sheepskin draped seating benches', 'Warm micro-candle arrangements', 'Blonde timber acoustic ceiling slats'],
    basePriceTable: 30,
    basePriceFullVenue: 800,
    address: '290 Fjord Lane, Greenwich Village, NY',
    tables: [
      { id: 'hygge-t1', name: 'Hearthside Bench 1', capacity: 2, isAvailable: true, type: 'Main Salon' },
      { id: 'hygge-t2', name: 'Hearthside Bench 2', capacity: 2, isAvailable: false, type: 'Main Salon' },
      { id: 'hygge-t3', name: 'Snowy Window Alcove', capacity: 4, isAvailable: true, type: 'Window Side' },
      { id: 'hygge-t4', name: 'Fjord Terrace (Heated)', capacity: 4, isAvailable: true, type: 'Garden Terrace' },
      { id: 'hygge-t5', name: 'The Cozy Den', capacity: 6, isAvailable: true, type: 'VIP Booth' },
      { id: 'hygge-t6', name: 'The Nordic Hearth Table', capacity: 8, isAvailable: true, type: 'Chef\'s Table' }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    restaurantId: 'rest-gatsby',
    userId: 'user-2',
    userName: 'Samantha Sterling',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    ratingInterior: 5,
    ratingFood: 5,
    ratingService: 4,
    comment: 'The interior design here is absolutely breathtaking. The brass inlay work on the floors is exquisite and the custom emerald velvet booths feel so private. Booking was seamless!',
    createdAt: '2026-06-15T19:30:00Z'
  },
  {
    id: 'rev-2',
    restaurantId: 'rest-canopy',
    userId: 'user-3',
    userName: 'Marcus Aurel',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    ratingInterior: 5,
    ratingFood: 4,
    ratingService: 5,
    comment: 'It really does feel like dining under an olive grove canopy! The air feels fresh, the skylights render beautiful shadows, and the live-edge tables are wonderful to touch.',
    createdAt: '2026-06-20T18:45:00Z'
  },
  {
    id: 'rev-3',
    restaurantId: 'rest-shibui',
    userId: 'user-4',
    userName: 'Yuki Tanaka',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    ratingInterior: 5,
    ratingFood: 5,
    ratingService: 5,
    comment: 'Supreme tranquility. The architectural acoustics are flawless—you cannot hear neighboring conversations, and the Hinoki wood smell is divine. Highly recommend Tatami Room A.',
    createdAt: '2026-06-22T20:15:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    title: 'Welcome to Elegant Reserve!',
    message: 'Browse our interior-design-themed restaurants and make table or full venue bookings with real-time tracking.',
    time: 'Just Now',
    isRead: false,
    type: 'info'
  },
  {
    id: 'notif-2',
    title: 'Interior Design Spotlight',
    message: '"The Gilded Gatsby" has newly added the Speakeasy Chef\'s Table. Check out its brass fluting details!',
    time: '2 hours ago',
    isRead: false,
    type: 'success'
  }
];
