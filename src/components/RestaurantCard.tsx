import React from 'react';
import { Star, MapPin, Eye, Palette, CheckSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  key?: string;
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant, bookingType: 'table' | 'full_venue') => void;
  onViewDetails: (restaurant: Restaurant) => void;
}

export default function RestaurantCard({ restaurant, onSelect, onViewDetails }: RestaurantCardProps) {
  // Count available tables
  const availableTablesCount = restaurant.tables.filter((t) => t.isAvailable).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-sm border border-white/10 bg-[#121212] shadow-2xl transition-all hover:border-[#C5A059]/40"
    >
      {/* High Quality Cover Image */}
      <div className="relative h-64 w-full overflow-hidden bg-[#121212]">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Design Style Badge overlay */}
        <div className="absolute top-4 left-4 rounded-sm bg-[#0A0A0A]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C5A059] border border-white/10 backdrop-blur-xs">
          {restaurant.designTheme}
        </div>

        {/* Action Quick View Button */}
        <button
          onClick={() => onViewDetails(restaurant)}
          className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#121212]/95 border border-white/10 text-[#C5A059] shadow-md transition-all hover:bg-[#C5A059] hover:text-black cursor-pointer"
          title="View Interior Details & Materials"
        >
          <Eye className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Content Space */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-[#C5A059] font-medium tracking-wide">
            <Star className="h-4 w-4 fill-[#C5A059] stroke-[#C5A059]" />
            <span className="font-bold text-white">{restaurant.rating}</span>
            <span className="text-stone-500">({restaurant.reviewsCount} reviews)</span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {availableTablesCount} of {restaurant.tables.length} free
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-3 font-serif text-2xl font-bold tracking-tight text-white group-hover:text-[#C5A059] transition-colors">
          {restaurant.name}
        </h3>

        {/* Address */}
        <p className="mt-1 flex items-center text-xs text-stone-400 font-sans">
          <MapPin className="mr-1 h-3.5 w-3.5 text-stone-500" />
          {restaurant.address}
        </p>

        {/* Short Description */}
        <p className="mt-3.5 text-sm leading-relaxed text-stone-400 font-light font-sans line-clamp-2">
          {restaurant.description}
        </p>

        {/* Material Palette Tags */}
        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="flex items-center space-x-1.5 mb-2">
            <Palette className="h-3.5 w-3.5 text-stone-500" />
            <span className="text-[10px] font-semibold tracking-wider text-[#C5A059] uppercase">Material Palette:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {restaurant.materialPalette.map((material) => (
              <span
                key={material}
                className="rounded-sm bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-medium text-stone-300 tracking-wide"
              >
                {material}
              </span>
            ))}
          </div>
        </div>

        {/* Key Design Elements */}
        <div className="mt-4 space-y-1">
          {restaurant.keyElements.slice(0, 2).map((element) => (
            <div key={element} className="flex items-start space-x-1.5 text-xs text-stone-400">
              <CheckSquare className="mt-0.5 h-3.5 w-3.5 text-[#C5A059]/70 shrink-0" />
              <span className="line-clamp-1">{element}</span>
            </div>
          ))}
        </div>

        {/* Booking Rates & Call-to-Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-stone-500 font-semibold">Table Deposit</p>
            <p className="text-lg font-bold text-white font-serif">${restaurant.basePriceTable}</p>
            <button
              onClick={() => onSelect(restaurant, 'table')}
              className="mt-2 w-full rounded-sm bg-[#C5A059] py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-black hover:bg-[#d4b578] transition-all cursor-pointer"
            >
              Book Table
            </button>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-widest text-stone-500 font-semibold">Venue Rental</p>
            <p className="text-lg font-bold text-white font-serif">${restaurant.basePriceFullVenue}</p>
            <button
              onClick={() => onSelect(restaurant, 'full_venue')}
              className="mt-2 w-full rounded-sm border border-white/10 bg-white/5 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-stone-300 hover:border-[#C5A059] hover:text-white transition-all cursor-pointer"
            >
              Rent Venue
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
