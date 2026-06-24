import { useState } from 'react';
import { X, CheckCircle2, Copy, Palette, Sparkles, MapPin, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Restaurant } from '../types';

interface RestaurantDetailDrawerProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  onSelectBooking: (restaurant: Restaurant, type: 'table' | 'full_venue') => void;
}

export default function RestaurantDetailDrawer({
  restaurant,
  onClose,
  onSelectBooking,
}: RestaurantDetailDrawerProps) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  if (!restaurant) return null;

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => {
      setCopiedHex(null);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-xs">
        {/* Mask */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Sliding Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.35 }}
          className="relative w-full max-w-3xl bg-[#121212] h-full shadow-2xl z-10 overflow-y-auto flex flex-col border-l border-white/10 text-stone-100"
        >
          {/* Cover Hero Banner */}
          <div className="relative h-72 sm:h-96 w-full overflow-hidden shrink-0">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
            
            {/* Overlay indicators */}
            <div className="absolute top-6 left-6 rounded-sm bg-[#121212]/95 border border-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#C5A059] backdrop-blur-xs">
              {restaurant.designTheme}
            </div>

            <button
              onClick={onClose}
              className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full bg-[#121212]/80 text-[#C5A059] hover:bg-black transition-all cursor-pointer shadow-lg border border-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Core Body Content */}
          <div className="flex-1 p-6 sm:p-10 space-y-10">
            
            {/* Title & Style overview */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold font-sans">
                Architectural Identity Summary
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-white">
                {restaurant.name}
              </h2>
              <p className="flex items-center text-xs text-stone-400 font-sans font-light">
                <MapPin className="mr-1.5 h-4 w-4 text-[#C5A059]" />
                {restaurant.address}
              </p>
            </div>

            {/* In-depth narrative block */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">
                The Design Narrative
              </h4>
              <p className="text-sm leading-relaxed text-stone-450 font-sans font-light text-justify">
                {restaurant.longDescription}
              </p>
            </div>

            {/* Palette & Hex Blocks */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Palette className="h-4.5 w-4.5 text-[#C5A059]" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">
                  Color Palette Blueprint: <span className="text-stone-200 font-sans normal-case font-bold">{restaurant.colorScheme.name}</span>
                </h4>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {restaurant.colorScheme.hexes.map((hex) => (
                  <div
                    key={hex}
                    className="group relative cursor-pointer"
                    onClick={() => handleCopyHex(hex)}
                    title="Click to copy color hex"
                  >
                    <div
                      className="h-14 rounded-sm border border-white/10 shadow-inner group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: hex }}
                    />
                    <div className="mt-1 flex items-center justify-between px-1 text-[9px] font-mono text-stone-450 uppercase">
                      <span>{copiedHex === hex ? 'COPIED' : hex}</span>
                      <Copy className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Structural Accents & Materials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">
                  Key Design Accents
                </h4>
                <ul className="space-y-2 text-xs text-stone-400 font-sans">
                  {restaurant.keyElements.map((element) => (
                    <li key={element} className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>{element}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">
                  Selected Materials Profile
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {restaurant.materialPalette.map((material) => (
                    <span
                      key={material}
                      className="rounded-sm bg-[#0A0A0A] text-stone-300 border border-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider"
                    >
                      {material}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-stone-500 leading-relaxed font-sans font-light">
                  All listed materials have been selected based on ecological durability, tactile comfort, and architectural authenticity.
                </p>
              </div>
            </div>

            {/* Additional Photos Showcase */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">
                Atmosphere Gallery
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {restaurant.additionalImages.map((img, idx) => (
                  <div key={idx} className="relative h-28 sm:h-36 rounded-sm overflow-hidden bg-stone-950 border border-white/10">
                    <img
                      src={img}
                      alt={`Gallery view ${idx}`}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Floating booking sticky foot */}
          <div className="sticky bottom-0 bg-[#0A0A0A] text-white p-6 border-t border-white/10 flex items-center justify-between shrink-0">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-400">Base Deposit Rates</p>
              <p className="text-sm font-light font-sans mt-0.5">
                Tables: <span className="font-bold text-[#C5A059] font-mono">${restaurant.basePriceTable}</span> | Full Buyout: <span className="font-bold text-[#C5A059] font-mono">${restaurant.basePriceFullVenue}</span>
              </p>
            </div>
            
            <div className="flex space-x-3 text-xs uppercase tracking-widest font-bold">
              <button
                onClick={() => onSelectBooking(restaurant, 'table')}
                className="rounded-sm bg-[#C5A059] px-5 py-3 text-black hover:bg-[#d4b578] transition-all cursor-pointer"
              >
                Book Table
              </button>
              <button
                onClick={() => onSelectBooking(restaurant, 'full_venue')}
                className="rounded-sm border border-white/10 bg-white/5 px-5 py-3 text-stone-200 hover:border-[#C5A059] hover:text-white transition-all cursor-pointer"
              >
                Rent Venue
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
