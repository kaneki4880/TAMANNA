import React, { useState } from 'react';
import { 
  User as UserIcon, Mail, Phone, Palette, Calendar, 
  Trash2, ShieldCheck, Clock, Check, RefreshCw 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Booking } from '../types';

interface ProfileCenterProps {
  currentUser: User | null;
  bookings: Booking[];
  onUpdateProfile: (updated: User) => void;
  onCancelBooking: (bookingId: string) => void;
  onOpenAuth: () => void;
}

export default function ProfileCenter({
  currentUser,
  bookings,
  onUpdateProfile,
  onCancelBooking,
  onOpenAuth,
}: ProfileCenterProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [preferredStyle, setPreferredStyle] = useState(currentUser?.preferredStyle || 'Art Deco Glamour');

  if (!currentUser) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20 text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/5 border border-white/10 text-stone-400">
          <UserIcon className="h-8 w-8" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-white">Personalized Dining Profiles</h2>
        <p className="max-w-md mx-auto text-sm text-stone-400 font-sans leading-relaxed">
          Log in to track your upcoming table reservations, coordinate full venue buyout details, customize seating preferences, and log design reviews.
        </p>
        <button
          onClick={onOpenAuth}
          className="rounded-sm bg-[#C5A059] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black hover:bg-[#d4b578] transition-all cursor-pointer"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...currentUser,
      name,
      email,
      phone,
      preferredStyle
    });
    setIsEditing(false);
  };

  const userBookings = bookings.filter((b) => b.userId === currentUser.id);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Column: Profile Card & Style Settings */}
        <div className="space-y-6">
          <div className="rounded-sm border border-white/10 bg-[#121212] p-6 shadow-2xl">
            <div className="flex flex-col items-center text-center pb-6 border-b border-white/10">
              <div className="relative group">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  className="h-24 w-24 rounded-full object-cover border border-white/10 shadow-inner"
                />
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold text-white">{currentUser.name}</h3>
              <p className="text-xs text-[#C5A059] font-semibold tracking-wider uppercase mt-1">
                Style Preference: {currentUser.preferredStyle}
              </p>
            </div>

            {/* Profile Fields View/Edit */}
            {!isEditing ? (
              <div className="mt-6 space-y-4 text-xs text-stone-400 font-sans">
                <div className="flex items-center space-x-3 py-1">
                  <UserIcon className="h-4 w-4 text-stone-500" />
                  <div>
                    <p className="text-[10px] text-stone-500 font-bold uppercase">Full Name</p>
                    <p className="text-stone-200 font-medium">{currentUser.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 py-1">
                  <Mail className="h-4 w-4 text-stone-500" />
                  <div>
                    <p className="text-[10px] text-stone-500 font-bold uppercase">Email Address</p>
                    <p className="text-stone-200 font-medium">{currentUser.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 py-1">
                  <Phone className="h-4 w-4 text-stone-500" />
                  <div>
                    <p className="text-[10px] text-stone-500 font-bold uppercase">Contact Phone</p>
                    <p className="text-stone-200 font-medium">{currentUser.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 py-1">
                  <Palette className="h-4 w-4 text-stone-500" />
                  <div>
                    <p className="text-[10px] text-stone-500 font-bold uppercase">Interior Style Profile</p>
                    <p className="text-stone-200 font-medium">{currentUser.preferredStyle}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setName(currentUser.name);
                    setEmail(currentUser.email);
                    setPhone(currentUser.phone);
                    setPreferredStyle(currentUser.preferredStyle);
                    setIsEditing(true);
                  }}
                  className="mt-6 w-full text-center rounded-sm border border-white/10 bg-white/5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-200 hover:border-[#C5A059] transition-all cursor-pointer"
                >
                  Edit Profile Fields
                </button>
              </div>
            ) : (
              <form onSubmit={handleSave} className="mt-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-semibold tracking-wider uppercase text-stone-400 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs rounded-sm border border-white/10 bg-[#0A0A0A] p-2.5 text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold tracking-wider uppercase text-stone-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs rounded-sm border border-white/10 bg-[#0A0A0A] p-2.5 text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold tracking-wider uppercase text-stone-400 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs rounded-sm border border-white/10 bg-[#0A0A0A] p-2.5 text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold tracking-wider uppercase text-stone-400 mb-1">
                    Preferred Space Aesthetic
                  </label>
                  <select
                    value={preferredStyle}
                    onChange={(e) => setPreferredStyle(e.target.value)}
                    className="w-full text-xs rounded-sm border border-white/10 bg-[#0A0A0A] p-2.5 text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                  >
                    <option value="Art Deco Glamour">Art Deco Glamour</option>
                    <option value="Biophilic Botanical">Biophilic Botanical</option>
                    <option value="Japanese Minimalist">Japanese Minimalist</option>
                    <option value="Royal Neoclassical">Royal Neoclassical</option>
                    <option value="Industrial Mid-Century">Industrial Mid-Century</option>
                    <option value="Scandinavian Minimalist">Scandinavian Minimalist</option>
                  </select>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="w-1/2 text-center rounded-sm border border-white/10 bg-white/5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 text-center rounded-sm bg-[#C5A059] py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-[#d4b578] transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="rounded-sm border border-white/10 bg-[#121212] p-6 flex items-start space-x-3">
            <ShieldCheck className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">PCI Compliant Identity</h4>
              <p className="text-[11px] text-stone-400 font-sans mt-1 leading-relaxed">
                All reservation profile details and transactional security tokens are managed locally with premium client-side storage rules.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Bookings History Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-sm border border-white/10 bg-[#121212] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-serif text-xl font-bold text-white flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-stone-400 stroke-[1.5]" />
                Your Booking Ledger
              </h3>
              <span className="text-xs font-semibold text-stone-400 font-sans">
                {userBookings.length} Active Reservations
              </span>
            </div>

            {userBookings.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <p className="text-sm text-stone-400 font-sans">No bookings recorded on this profile yet.</p>
                <p className="text-xs text-stone-500 font-sans">Discover our elegant dining halls and reserve a table or full room venue!</p>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {userBookings.map((booking) => {
                  return (
                    <div key={booking.id} className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={booking.restaurantImage}
                          alt={booking.restaurantName}
                          referrerPolicy="no-referrer"
                          className="h-16 w-16 rounded-sm object-cover border border-white/10 shrink-0"
                        />
                        <div className="space-y-1">
                          <h4 className="text-base font-bold text-white">{booking.restaurantName}</h4>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-400 font-sans">
                            <span className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1 text-[#C5A059]" />
                              {booking.date}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1 text-[#C5A059]" />
                              {booking.time}
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-500 font-sans font-light">
                            Mode: <span className="font-semibold text-stone-300 capitalize">{booking.bookingType}</span> | Guests: <span className="font-semibold text-stone-300">{booking.guests}</span>
                            {booking.tableName && ` | Seat: ${booking.tableName}`}
                          </div>
                        </div>
                      </div>

                      {/* Right Booking Details & Action */}
                      <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-3">
                        <div className="text-right">
                          <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Paid Hold Deposit</p>
                          <p className="text-sm font-bold text-emerald-400 font-mono">${booking.amount.toFixed(2)}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="flex items-center space-x-1 rounded-full bg-emerald-950/40 border border-emerald-800/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                            <Check className="h-3 w-3" />
                            <span>Confirmed</span>
                          </span>

                          <button
                            onClick={() => onCancelBooking(booking.id)}
                            className="p-1.5 rounded text-stone-500 hover:text-red-400 hover:bg-red-950/30 transition-all cursor-pointer"
                            title="Cancel Reservation"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
