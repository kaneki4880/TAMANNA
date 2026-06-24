import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, Clock, Users, ArrowRight, ShieldCheck, CreditCard, 
  Sparkles, Check, Gift, Layers, UtensilsCrossed 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Restaurant, Table, Booking } from '../types';

interface BookingModalProps {
  restaurant: Restaurant;
  initialType: 'table' | 'full_venue';
  userId: string;
  onClose: () => void;
  onSubmitBooking: (booking: Booking) => void;
}

export default function BookingModal({
  restaurant,
  initialType,
  userId,
  onClose,
  onSubmitBooking,
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState<'table' | 'full_venue'>(initialType);
  const [date, setDate] = useState('2026-06-25');
  const [time, setTime] = useState('19:00');
  const [guests, setGuests] = useState(2);
  
  // Table selection state
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  
  // Full Venue party states
  const [partyType, setPartyType] = useState('Birthday Party');
  const [decorAddon, setDecorAddon] = useState(false);
  const [monogramAddon, setMonogramAddon] = useState(false);
  const [dietaryNotes, setDietaryNotes] = useState('');

  // Payment states
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Auto-select first available table on load if booking a table
  useEffect(() => {
    if (bookingType === 'table') {
      const firstFree = restaurant.tables.find((t) => t.isAvailable);
      if (firstFree) {
        setSelectedTable(firstFree);
      }
    }
  }, [bookingType, restaurant]);

  // Handle card number formatting
  const handleCardNumberChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 16);
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCardNumber(formatted);
  };

  // Expiry formatting
  const handleExpiryChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 2) {
      setCardExpiry(cleaned.slice(0, 2) + '/' + cleaned.slice(2));
    } else {
      setCardExpiry(cleaned);
    }
  };

  const handleCvvChange = (val: string) => {
    setCardCvv(val.replace(/\D/g, '').slice(0, 3));
  };

  // Pricing calculations
  const baseCost = bookingType === 'table' ? restaurant.basePriceTable : restaurant.basePriceFullVenue;
  const addonCost = (decorAddon ? 120 : 0) + (monogramAddon ? 45 : 0);
  const serviceFee = 4.50;
  const totalCost = baseCost + addonCost + serviceFee;

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || cardNumber.length < 19 || cardExpiry.length < 5 || cardCvv.length < 3) {
      alert('Please fill out all payment details securely.');
      return;
    }

    setIsProcessingPayment(true);

    // Simulate luxury transaction gateway delay
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentCompleted(true);
      setStep(4);

      // Create permanent booking object
      const bookingId = 'bk-' + Math.random().toString(36).substr(2, 9);
      const newBooking: Booking = {
        id: bookingId,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        restaurantImage: restaurant.image,
        userId: userId || 'user-anonymous',
        bookingType,
        date,
        time,
        guests,
        tableId: bookingType === 'table' ? selectedTable?.id : undefined,
        tableName: bookingType === 'table' ? selectedTable?.name : 'Entire Venue Buyout',
        paymentStatus: 'paid',
        amount: totalCost,
        createdAt: new Date().toISOString(),
        notes: dietaryNotes,
        partyType: bookingType === 'full_venue' ? partyType : undefined,
        stylingPreference: bookingType === 'full_venue' 
          ? `${decorAddon ? 'Floral Styling Pack' : ''} ${monogramAddon ? 'Monogram Placements' : ''}`.trim() 
          : undefined
      };

      onSubmitBooking(newBooking);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Background close catcher */}
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-4xl rounded-sm bg-[#121212] shadow-2xl z-10 overflow-hidden border border-white/10 flex flex-col md:flex-row h-auto max-h-[90vh] md:max-h-[85vh]"
      >
        {/* Left Info Panel (Static/Themed) */}
        <div className="relative w-full md:w-80 bg-stone-950 text-white p-6 md:p-8 flex flex-col justify-between overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-20 z-0">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative z-10">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold font-sans">
              Booking Venue
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-white">
              {restaurant.name}
            </h2>
            <p className="mt-1 text-xs text-[#C5A059] font-sans italic">
              Theme: {restaurant.designTheme}
            </p>

            <p className="mt-6 text-xs text-stone-400 font-light font-sans leading-relaxed">
              {restaurant.description}
            </p>

            {/* Steps Visual Indicator */}
            <div className="mt-10 space-y-4 hidden md:block">
              {[
                { s: 1, label: 'Schedule & Type' },
                { s: 2, label: bookingType === 'table' ? 'Select Table Seat' : 'Bespoke Theme Addons' },
                { s: 3, label: 'Secure Deposit Payment' },
                { s: 4, label: 'Confirmation Receipt' },
              ].map((item) => (
                <div key={item.s} className="flex items-center space-x-3 text-xs">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold ${
                      step >= item.s
                        ? 'border-[#C5A059] bg-[#C5A059] text-black'
                        : 'border-white/10 text-stone-500'
                    }`}
                  >
                    {step > item.s ? <Check className="h-3.5 w-3.5" /> : item.s}
                  </div>
                  <span className={step === item.s ? 'text-[#C5A059] font-semibold' : 'text-stone-400'}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/10 mt-6 md:mt-0 text-[10px] font-sans tracking-widest text-stone-500 flex items-center justify-between">
            <span>SECURE GATEWAY</span>
            <span>256-BIT SSL</span>
          </div>
        </div>

        {/* Right Input / Form Panel */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-between bg-[#121212]">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h3 className="text-sm font-semibold tracking-widest text-stone-400 uppercase">
              {step === 1 && 'Step 1: Set Date, Time & Mode'}
              {step === 2 && (bookingType === 'table' ? 'Step 2: Table Selection' : 'Step 2: Design Customizer')}
              {step === 3 && 'Step 3: Secure Deposit'}
              {step === 4 && 'Reservation Confirmed!'}
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-stone-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form Content Steps */}
          <div className="my-6 flex-1">
            
            {/* STEP 1: DATE, GUESTS & BOOKING TYPE */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-stone-400 mb-2">
                    Booking Option
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setBookingType('table')}
                      className={`flex flex-col p-4 items-center justify-center rounded-sm border text-center transition-all cursor-pointer ${
                        bookingType === 'table'
                          ? 'border-[#C5A059] bg-[#C5A059] text-black'
                          : 'border-white/10 bg-white/5 text-stone-300 hover:border-[#C5A059]'
                      }`}
                    >
                      <UtensilsCrossed className="h-5 w-5 mb-2" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Reserve Table</span>
                      <span className="text-[10px] opacity-80 mt-1">Book individual dining table</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingType('full_venue')}
                      className={`flex flex-col p-4 items-center justify-center rounded-sm border text-center transition-all cursor-pointer ${
                        bookingType === 'full_venue'
                          ? 'border-[#C5A059] bg-[#C5A059] text-black'
                          : 'border-white/10 bg-white/5 text-stone-300 hover:border-[#C5A059]'
                      }`}
                    >
                      <Gift className="h-5 w-5 mb-2" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Rent Entire Venue</span>
                      <span className="text-[10px] opacity-80 mt-1">Rent full restaurant for party</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-stone-400 mb-2">
                      <Calendar className="inline h-3.5 w-3.5 mr-1 text-[#C5A059]" /> Select Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-sm text-stone-100 outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-stone-400 mb-2">
                      <Clock className="inline h-3.5 w-3.5 mr-1 text-[#C5A059]" /> Dining Time
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-sm text-[#C5A059] outline-none focus:border-[#C5A059]"
                    >
                      <option value="17:00">5:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM (Peak)</option>
                      <option value="20:00">8:00 PM (Peak)</option>
                      <option value="21:00">9:00 PM</option>
                      <option value="22:00">10:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-stone-400 mb-2">
                      <Users className="inline h-3.5 w-3.5 mr-1 text-[#C5A059]" /> Total Guests
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={bookingType === 'table' ? 10 : 120}
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 2)}
                      className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-sm text-stone-100 outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div className="bg-[#0A0A0A] p-4 border border-white/10 rounded-sm">
                  <h4 className="text-xs font-bold tracking-wider text-[#C5A059] uppercase mb-2 flex items-center">
                    <Sparkles className="h-4 w-4 mr-1 text-[#C5A059]" /> Real-time Availability
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">
                    {bookingType === 'table' 
                      ? 'Our real-time seat tracking system is online. There are tables configured to fit your design and capacity parameters. Move to step 2 to select your table location in the room.'
                      : 'The full venue is currently available for buyout on your selected slot. Security locks are active, reserving your event space.'}
                  </p>
                </div>
              </div>
            )}

            {/* STEP 2: TABLE MAP OR BESPOKE EVENT DETAILS */}
            {step === 2 && bookingType === 'table' && (
              <div>
                <p className="text-xs text-stone-400 mb-4">
                  Select a table from our interactive floor map. Click on any green table to assign your seat.
                </p>

                {/* Simulated Floor Map Grid */}
                <div className="relative border border-white/10 bg-[#0A0A0A] rounded-sm p-6 flex flex-col items-center">
                  <div className="w-full border-b border-white/5 pb-2 mb-6 text-center text-[10px] tracking-widest text-stone-500 font-semibold uppercase">
                    Entrance & Reception Lounge
                  </div>

                  <div className="grid grid-cols-3 gap-6 max-w-md w-full">
                    {restaurant.tables.map((table) => {
                      const isSelected = selectedTable?.id === table.id;
                      return (
                        <button
                          key={table.id}
                          type="button"
                          disabled={!table.isAvailable}
                          onClick={() => setSelectedTable(table)}
                          className={`relative h-20 rounded-lg flex flex-col items-center justify-center transition-all ${
                            !table.isAvailable
                              ? 'bg-stone-950 border border-red-950/40 text-stone-700 cursor-not-allowed opacity-30'
                              : isSelected
                              ? 'bg-[#C5A059] border-2 border-[#C5A059] text-black scale-105 shadow-md'
                              : 'bg-[#121212] hover:bg-white/5 border border-white/10 text-white cursor-pointer'
                          }`}
                        >
                          <span className="text-[10px] font-mono tracking-wider uppercase font-bold">
                            {table.name}
                          </span>
                          <span className="text-[9px] mt-1 font-sans opacity-85">
                            Cap: {table.capacity}
                          </span>
                          <span className={`absolute top-2 right-2 h-1.5 w-1.5 rounded-full ${
                            !table.isAvailable ? 'bg-red-500' : isSelected ? 'bg-black' : 'bg-emerald-400'
                          }`} />
                        </button>
                      );
                    })}
                  </div>

                  <div className="w-full border-t border-white/5 pt-3 mt-6 text-center text-[10px] tracking-widest text-stone-500 font-semibold uppercase">
                    Designer Kitchen & Bar Area
                  </div>

                  {/* Floor Map Legend */}
                  <div className="flex space-x-6 mt-4 text-[10px] text-stone-500">
                    <span className="flex items-center"><span className="h-2.5 w-2.5 bg-emerald-400 rounded-full mr-1.5 inline-block" /> Free</span>
                    <span className="flex items-center"><span className="h-2.5 w-2.5 bg-red-500 rounded-full mr-1.5 inline-block" /> Booked</span>
                    <span className="flex items-center"><span className="h-2.5 w-2.5 bg-[#C5A059] rounded-full mr-1.5 inline-block" /> Selected</span>
                  </div>
                </div>

                {selectedTable && (
                  <div className="mt-4 p-4 border border-white/10 bg-white/5 rounded-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                          Selected Table: {selectedTable.name}
                        </h4>
                        <p className="text-[11px] text-stone-400 font-sans mt-0.5">
                          Zone Type: {selectedTable.type} | Best fits up to {selectedTable.capacity} guests
                        </p>
                      </div>
                      <span className="text-xs font-bold text-stone-100 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                        Fee: ${restaurant.basePriceTable} (deposit)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: BESPOKE VENUE ADDONS */}
            {step === 2 && bookingType === 'full_venue' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-stone-400 mb-2">
                    Event Type
                  </label>
                  <select
                    value={partyType}
                    onChange={(e) => setPartyType(e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-sm text-stone-100 outline-none focus:border-[#C5A059]"
                  >
                    <option value="Birthday Party">Birthday Gala / Jubilee</option>
                    <option value="Corporate Event">Corporate Dinner & Presentation</option>
                    <option value="Wedding Reception">Bespoke Wedding Reception</option>
                    <option value="Design Showcase">Interior Design / Art Showcase</option>
                    <option value="Cocktail Gala">Elegant Cocktail Celebration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-stone-400 mb-2">
                    Premium Interior Design Addons
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 border border-white/10 bg-white/5 rounded-sm hover:border-[#C5A059]/40 transition-all cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={decorAddon}
                          onChange={(e) => setDecorAddon(e.target.checked)}
                          className="h-4 w-4 rounded border-white/10 bg-[#0A0A0A] text-[#C5A059] focus:ring-[#C5A059]"
                        />
                        <div>
                          <span className="text-xs font-bold text-white uppercase tracking-wide block">
                            Floral Styling Package (+$120)
                          </span>
                          <span className="text-[10px] text-stone-400 font-sans">
                            Custom floral arrangements customized to match the restaurant's material palette
                          </span>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center justify-between p-3 border border-white/10 bg-white/5 rounded-sm hover:border-[#C5A059]/40 transition-all cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={monogramAddon}
                          onChange={(e) => setMonogramAddon(e.target.checked)}
                          className="h-4 w-4 rounded border-white/10 bg-[#0A0A0A] text-[#C5A059] focus:ring-[#C5A059]"
                        />
                        <div>
                          <span className="text-xs font-bold text-white uppercase tracking-wide block">
                            Custom Monogram Placemats (+$45)
                          </span>
                          <span className="text-[10px] text-stone-400 font-sans">
                            Personalized leather-bound table settings for your honored guests
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-stone-400 mb-2">
                    Special Dietary or Interior Styling Requests
                  </label>
                  <textarea
                    rows={2}
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    placeholder="Enter any particular dietary limitations, allergies, or specific audio/lighting adjustments desired."
                    className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-sm text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENTS DEPOSIT */}
            {step === 3 && (
              <div className="space-y-6">
                
                {/* Checkout pricing summary */}
                <div className="bg-[#0A0A0A] text-stone-300 p-4 rounded-sm border border-white/10">
                  <h4 className="text-xs font-bold tracking-wider text-[#C5A059] uppercase mb-3">
                    Billing Summary
                  </h4>
                  <div className="space-y-2 text-xs font-sans">
                    <div className="flex justify-between">
                      <span>Base {bookingType === 'table' ? 'Table' : 'Venue Buyout'} Deposit:</span>
                      <span className="font-mono text-white">${baseCost}.00</span>
                    </div>
                    {bookingType === 'full_venue' && (decorAddon || monogramAddon) && (
                      <div className="flex justify-between text-stone-400">
                        <span>Custom Interior Addons:</span>
                        <span className="font-mono text-white">+${addonCost}.00</span>
                      </div>
                    )}
                    <div className="flex justify-between text-stone-400">
                      <span>Secure Processing Service Fee:</span>
                      <span className="font-mono text-white">${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-bold text-white">
                      <span>Total Secure Deposit:</span>
                      <span className="text-[#C5A059] font-mono">${totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Card input layout */}
                <form onSubmit={handleProcessPayment} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-stone-400 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="e.g. Alexis Sterling"
                      className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-sm text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-stone-400 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        placeholder="0000 0000 0000 0000"
                        className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 pl-10 text-sm text-stone-100 outline-none focus:border-[#C5A059] font-mono"
                      />
                      <CreditCard className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-stone-400 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => handleExpiryChange(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-sm text-stone-100 outline-none focus:border-[#C5A059] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-stone-400 mb-1">
                        CVV Code
                      </label>
                      <input
                        type="password"
                        required
                        value={cardCvv}
                        onChange={(e) => handleCvvChange(e.target.value)}
                        placeholder="***"
                        className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-sm text-stone-100 outline-none focus:border-[#C5A059] font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-[11px] text-stone-500 font-sans pt-2">
                    <ShieldCheck className="h-4 w-4 text-[#C5A059] shrink-0" />
                    <span>Payments are PCI-Compliant encrypted. Deposit holds are instantly released upon attendance.</span>
                  </div>

                  {/* Action payment trigger */}
                  <button
                    type="submit"
                    disabled={isProcessingPayment}
                    className="w-full rounded-sm bg-[#C5A059] text-black p-4 text-xs font-bold tracking-widest uppercase hover:bg-[#d4b578] transition-all flex items-center justify-center space-x-2 cursor-pointer mt-4"
                  >
                    {isProcessingPayment ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                        <span>Verifying Cryptographic Ledger...</span>
                      </>
                    ) : (
                      <span>Authenticate & Confirm Deposit of ${totalCost.toFixed(2)}</span>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* STEP 4: SUCCESS CONFIRMATION RECEIPT */}
            {step === 4 && (
              <div className="text-center py-8 space-y-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950/40 border border-emerald-800/30">
                  <Check className="h-8 w-8 text-emerald-400" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif text-3xl font-bold text-white">
                    Bespoke Table Booked!
                  </h4>
                  <p className="text-sm text-stone-400 font-sans">
                    Your deposit was authorized and processed securely. A premium confirmation has been logged to your account.
                  </p>
                </div>

                {/* Receipt Grid */}
                <div className="max-w-md mx-auto border border-white/10 rounded-md p-6 bg-[#0A0A0A] text-left shadow-2xl space-y-4">
                  <h5 className="text-[10px] uppercase tracking-widest text-stone-500 font-bold border-b border-white/10 pb-2">
                    Official Booking Receipt
                  </h5>
                  <div className="space-y-2.5 text-xs font-sans">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Establishment:</span>
                      <span className="font-semibold text-stone-200">{restaurant.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Theme Atmosphere:</span>
                      <span className="font-semibold text-stone-200">{restaurant.designTheme}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Scheduled:</span>
                      <span className="font-semibold text-stone-200">{date} at {time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Dining Mode:</span>
                      <span className="font-semibold text-stone-200 capitalize">
                        {bookingType === 'table' ? `Table (${selectedTable?.name})` : `Full Venue rental`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Guests Size:</span>
                      <span className="font-semibold text-stone-200">{guests} individuals</span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-2.5 font-bold text-sm text-white">
                      <span>Deposit Paid:</span>
                      <span className="text-emerald-400 font-mono">${totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={onClose}
                    className="rounded-sm bg-[#C5A059] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-black hover:bg-[#d4b578] transition-all cursor-pointer"
                  >
                    Return to Lobby
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Footer Controls (for steps 1 & 2) */}
          {step < 3 && (
            <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center">
              <button
                type="button"
                disabled={step === 1}
                onClick={() => setStep(step - 1)}
                className={`text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-white cursor-pointer ${
                  step === 1 ? 'invisible' : ''
                }`}
              >
                Back
              </button>
              
              <button
                type="button"
                onClick={handleNextStep}
                disabled={bookingType === 'table' && step === 2 && !selectedTable}
                className="flex items-center space-x-2 rounded-sm bg-[#C5A059] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black hover:bg-[#d4b578] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
