import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Phone, Palette, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [preferredStyle, setPreferredStyle] = useState('Art Deco Glamour');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    // Create a personalized user object
    const finalName = name || (email.split('@')[0]);
    const mockUser: User = {
      id: 'usr-' + Math.random().toString(36).substr(2, 9),
      name: finalName.charAt(0).toUpperCase() + finalName.slice(1),
      email,
      phone: phone || '+1 (555) 234-5678',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150`,
      preferredStyle
    };

    onLoginSuccess(mockUser);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          {/* Mask */}
          <div className="fixed inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md bg-[#121212] p-8 rounded-sm shadow-2xl border border-white/10 z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 text-stone-500 hover:text-white hover:bg-white/5 transition-all rounded-full cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm bg-[#C5A059] text-black font-serif text-lg font-bold">
                A
              </div>
              <h3 className="mt-4 font-serif text-2xl font-bold text-white">
                {isRegister ? 'Create Style Ledger' : 'Access Spatial Portal'}
              </h3>
              <p className="text-xs text-stone-400 mt-1 font-sans">
                {isRegister ? 'Register your high-end design preferences' : 'Enter your credentials to book and manage reservations'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {isRegister && (
                <>
                  <div>
                    <label className="block font-semibold tracking-wider uppercase text-stone-400 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Alexis Sterling"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 pl-10 text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                      />
                      <UserIcon className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold tracking-wider uppercase text-stone-400 mb-1">
                      Contact Phone
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="+1 (555) 234-5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 pl-10 text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                      />
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold tracking-wider uppercase text-stone-400 mb-1">
                      Favored Space Aesthetic
                    </label>
                    <div className="relative">
                      <select
                        value={preferredStyle}
                        onChange={(e) => setPreferredStyle(e.target.value)}
                        className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 pl-10 text-stone-100 outline-none focus:border-[#C5A059] font-sans appearance-none"
                      >
                        <option value="Art Deco Glamour">Art Deco Glamour</option>
                        <option value="Biophilic Botanical">Biophilic Botanical</option>
                        <option value="Japanese Minimalist">Japanese Minimalist</option>
                        <option value="Royal Neoclassical">Royal Neoclassical</option>
                        <option value="Industrial Mid-Century">Industrial Mid-Century</option>
                        <option value="Scandinavian Minimalist">Scandinavian Minimalist</option>
                      </select>
                      <Palette className="absolute left-3 top-3.5 h-4 w-4 text-stone-500" />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block font-semibold tracking-wider uppercase text-stone-400 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="alexis@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 pl-10 text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                </div>
              </div>

              <div>
                <label className="block font-semibold tracking-wider uppercase text-stone-400 mb-1">
                  Account Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 pl-10 text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                </div>
              </div>

              {/* Login/Signup Submission */}
              <button
                type="submit"
                className="w-full rounded-sm bg-[#C5A059] text-black p-3.5 font-bold tracking-widest uppercase hover:bg-[#d4b578] transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <KeyRound className="h-4 w-4" />
                <span>{isRegister ? 'Authorize Ledger' : 'Enter Portal'}</span>
              </button>
            </form>

            <div className="mt-6 text-center text-xs">
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-stone-400 hover:text-[#C5A059] transition-all cursor-pointer"
              >
                {isRegister ? 'Already have an account? Log In' : 'Create a customized style profile? Register'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
