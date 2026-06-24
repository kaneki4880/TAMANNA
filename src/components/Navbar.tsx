import { useState } from 'react';
import { Bell, User, LogOut, Compass, CalendarRange, Heart, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Notification, User as UserType } from '../types';

interface NavbarProps {
  currentUser: UserType | null;
  notifications: Notification[];
  onOpenAuth: () => void;
  onOpenNotifications: () => void;
  onLogout: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  websiteName?: string;
  brandInitial?: string;
}

export default function Navbar({
  currentUser,
  notifications,
  onOpenAuth,
  onOpenNotifications,
  onLogout,
  activeSection,
  setActiveSection,
  websiteName = 'TAMANNA',
  brandInitial = 'T',
}: NavbarProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0A0A0A]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveSection('home')}
          className="flex cursor-pointer items-center space-x-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#C5A059] text-black font-serif text-xl font-bold tracking-widest">
            {brandInitial}
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold tracking-wider text-white uppercase">{websiteName}</h1>
            <p className="text-[10px] tracking-widest uppercase text-stone-500 -mt-1 font-sans">Tables & Interiors</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wider uppercase text-stone-400">
          <button
            onClick={() => setActiveSection('home')}
            className={`relative py-2 transition-colors hover:text-white ${
              activeSection === 'home' ? 'text-[#C5A059] font-semibold' : ''
            }`}
          >
            Home
            {activeSection === 'home' && (
              <motion.div
                layoutId="navUnderline"
                className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C5A059]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveSection('restaurants')}
            className={`relative py-2 transition-colors hover:text-white ${
              activeSection === 'restaurants' ? 'text-[#C5A059] font-semibold' : ''
            }`}
          >
            Design Styles & Listings
            {activeSection === 'restaurants' && (
              <motion.div
                layoutId="navUnderline"
                className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C5A059]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveSection('about')}
            className={`relative py-2 transition-colors hover:text-white ${
              activeSection === 'about' ? 'text-[#C5A059] font-semibold' : ''
            }`}
          >
            Design Principles
            {activeSection === 'about' && (
              <motion.div
                layoutId="navUnderline"
                className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C5A059]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveSection('admin')}
            className={`relative py-2 transition-colors text-stone-400 hover:text-[#C5A059] flex items-center gap-1 border border-dashed border-[#C5A059]/30 rounded px-2.5 py-1 text-xs bg-[#C5A059]/5 ${
              activeSection === 'admin' ? 'text-[#C5A059] font-semibold border-solid border-[#C5A059]/80' : ''
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059] animate-pulse" />
            <span>Admin Panel</span>
            {activeSection === 'admin' && (
              <motion.div
                layoutId="navUnderline"
                className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C5A059]"
              />
            )}
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-6">
          
          {/* Notifications Trigger */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-stone-400 transition-colors hover:text-white"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 stroke-[1.5]" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C5A059] text-[9px] font-bold text-black animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Controls */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 border border-white/10 pl-2 pr-3 py-1.5 rounded-full hover:border-[#C5A059] transition-all bg-white/5"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  className="h-7 w-7 rounded-full object-cover border border-white/10"
                />
                <span className="text-xs font-semibold tracking-wide text-stone-200 hidden sm:inline">
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setProfileDropdownOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-60 origin-top-right rounded-md border border-white/10 bg-[#121212] p-2 shadow-2xl z-50 text-xs"
                    >
                      <div className="px-3 py-2 border-b border-white/10 mb-2">
                        <p className="text-sm font-bold text-white">{currentUser.name}</p>
                        <p className="text-xs text-stone-500 truncate">{currentUser.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          setActiveSection('profile');
                          setProfileDropdownOpen(false);
                        }}
                        className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-left text-sm text-stone-300 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        <User className="h-4 w-4 stroke-[1.5]" />
                        <span>Profile & Bookings</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveSection('restaurants');
                          setProfileDropdownOpen(false);
                        }}
                        className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-left text-sm text-stone-300 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        <CalendarRange className="h-4 w-4 stroke-[1.5]" />
                        <span>Reserve Table / Venue</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveSection('admin');
                          setProfileDropdownOpen(false);
                        }}
                        className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-left text-sm text-[#C5A059] transition-colors hover:bg-white/5"
                      >
                        <Settings className="h-4 w-4 stroke-[1.5]" />
                        <span>Admin Console (CMS)</span>
                      </button>

                      <hr className="my-1 border-white/10" />

                      <button
                        onClick={() => {
                          onLogout();
                          setProfileDropdownOpen(false);
                        }}
                        className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-red-950/30"
                      >
                        <LogOut className="h-4 w-4 stroke-[1.5]" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-2 rounded-full bg-[#C5A059] px-5 py-2 text-xs font-semibold tracking-widest uppercase text-black hover:bg-[#d4b578] transition-all shadow-sm"
            >
              <User className="h-3.5 w-3.5" />
              <span>Login</span>
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}
