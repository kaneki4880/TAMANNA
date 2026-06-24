import React, { useState, useEffect } from 'react';
import { 
  Compass, Sparkles, Palette, CheckCircle, MapPin, Heart, 
  Award, Smile, Share2, HelpCircle, AlertCircle, Quote 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RestaurantCard from './components/RestaurantCard';
import BookingModal from './components/BookingModal';
import ReviewSection from './components/ReviewSection';
import ProfileCenter from './components/ProfileCenter';
import NotificationsDrawer from './components/NotificationsDrawer';
import AuthModal from './components/AuthModal';
import RestaurantDetailDrawer from './components/RestaurantDetailDrawer';
import AdminPanel from './components/AdminPanel';

// Data & Types
import { INITIAL_RESTAURANTS, INITIAL_REVIEWS, INITIAL_NOTIFICATIONS } from './data';
import { Restaurant, Booking, Review, Notification, User } from './types';

// Pre-logged in mock user for supreme instant interaction
const DEFAULT_USER: User = {
  id: 'usr-alexis',
  name: 'Alexis Sterling',
  email: 'alexis.sterling@editorial.com',
  phone: '+1 (555) 890-4321',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  preferredStyle: 'Art Deco Glamour'
};

const DEFAULT_BOOKING: Booking = {
  id: 'bk-historical-1',
  restaurantId: 'rest-gatsby',
  restaurantName: 'The Gilded Gatsby',
  restaurantImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
  userId: 'usr-alexis',
  bookingType: 'table',
  date: '2026-06-20',
  time: '20:00',
  guests: 4,
  tableId: 'gatsby-t4',
  tableName: 'Great Gatsby Round',
  paymentStatus: 'paid',
  amount: 54.50,
  createdAt: '2026-06-14T15:00:00Z',
  notes: 'Celebrating promotion. Appreciate geometric candle decorations.'
};

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(DEFAULT_USER);
  
  // General website customization (CMS / Admin)
  const [websiteName, setWebsiteName] = useState<string>(() => {
    return localStorage.getItem('tamanna_website_name') || 'TAMANNA';
  });
  const [brandInitial, setBrandInitial] = useState<string>(() => {
    return localStorage.getItem('tamanna_brand_initial') || 'T';
  });
  const [heroBadge, setHeroBadge] = useState<string>(() => {
    return localStorage.getItem('tamanna_hero_badge') || 'Curated Interior Masterpieces & Event Spaces';
  });
  const [heroHeading, setHeroHeading] = useState<string>(() => {
    return localStorage.getItem('tamanna_hero_heading') || 'Dine in architectural perfection.';
  });
  const [heroSubtitle, setHeroSubtitle] = useState<string>(() => {
    return localStorage.getItem('tamanna_hero_subtitle') || 'We curate fine-dining establishments crafted by world-class interior designers. Select your preferred aesthetic—from glamorous 1920s Art Deco to peaceful Japanese Zen—and book individual tables or hire entire venues for bespoke gatherings.';
  });
  const [heroBg, setHeroBg] = useState<string>(() => {
    return localStorage.getItem('tamanna_hero_bg') || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920';
  });

  const [restaurants, setRestaurants] = useState<Restaurant[]>(() => {
    const saved = localStorage.getItem('tamanna_restaurants');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading custom restaurants:', e);
      }
    }
    return INITIAL_RESTAURANTS;
  });

  const [bookings, setBookings] = useState<Booking[]>([DEFAULT_BOOKING]);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  // Synchronize dynamic values to localStorage
  useEffect(() => {
    localStorage.setItem('tamanna_website_name', websiteName);
  }, [websiteName]);

  useEffect(() => {
    localStorage.setItem('tamanna_brand_initial', brandInitial);
  }, [brandInitial]);

  useEffect(() => {
    localStorage.setItem('tamanna_hero_badge', heroBadge);
  }, [heroBadge]);

  useEffect(() => {
    localStorage.setItem('tamanna_hero_heading', heroHeading);
  }, [heroHeading]);

  useEffect(() => {
    localStorage.setItem('tamanna_hero_subtitle', heroSubtitle);
  }, [heroSubtitle]);

  useEffect(() => {
    localStorage.setItem('tamanna_hero_bg', heroBg);
  }, [heroBg]);

  useEffect(() => {
    localStorage.setItem('tamanna_restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  const handleResetAllData = () => {
    localStorage.removeItem('tamanna_website_name');
    localStorage.removeItem('tamanna_brand_initial');
    localStorage.removeItem('tamanna_hero_badge');
    localStorage.removeItem('tamanna_hero_heading');
    localStorage.removeItem('tamanna_hero_subtitle');
    localStorage.removeItem('tamanna_hero_bg');
    localStorage.removeItem('tamanna_restaurants');
    
    setWebsiteName('TAMANNA');
    setBrandInitial('T');
    setHeroBadge('Curated Interior Masterpieces & Event Spaces');
    setHeroHeading('Dine in architectural perfection.');
    setHeroSubtitle('We curate fine-dining establishments crafted by world-class interior designers. Select your preferred aesthetic—from glamorous 1920s Art Deco to peaceful Japanese Zen—and book individual tables or hire entire venues for bespoke gatherings.');
    setHeroBg('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920');
    setRestaurants(INITIAL_RESTAURANTS);
  };
  
  // Modal controllers
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedBookingType, setSelectedBookingType] = useState<'table' | 'full_venue'>('table');
  const [detailedRestaurant, setDetailedRestaurant] = useState<Restaurant | null>(null);
  const [filterTheme, setFilterTheme] = useState<string>('');

  // Auto push notification when booking occurs
  const handleBookingSubmit = (newBooking: Booking) => {
    // Add booking to list
    setBookings((prev) => [newBooking, ...prev]);

    // Update real-time table availability state
    if (newBooking.bookingType === 'table' && newBooking.tableId) {
      setRestaurants((prevList) =>
        prevList.map((rest) => {
          if (rest.id === newBooking.restaurantId) {
            return {
              ...rest,
              tables: rest.tables.map((t) =>
                t.id === newBooking.tableId ? { ...t, isAvailable: false } : t
              ),
            };
          }
          return rest;
        })
      );
    }

    // Trigger instant push notification
    const newNotif: Notification = {
      id: 'notif-' + Math.random().toString(36).substr(2, 9),
      title: 'Reservation Receipt Secured!',
      message: `Your booking hold at "${newBooking.restaurantName}" has been synchronized securely. Confirm details in profile.`,
      time: 'Just Now',
      isRead: false,
      type: 'success',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Add review and trigger a notification of gratitude
  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);

    // Update reviews average for the restaurant
    setRestaurants((prevRest) =>
      prevRest.map((r) => {
        if (r.id === newReview.restaurantId) {
          const matchingReviews = [newReview, ...reviews.filter((rev) => rev.restaurantId === r.id)];
          const newAvg = matchingReviews.reduce((sum, rev) => sum + (rev.ratingInterior + rev.ratingFood + rev.ratingService) / 3, 0) / matchingReviews.length;
          return {
            ...r,
            rating: parseFloat(newAvg.toFixed(2)),
            reviewsCount: matchingReviews.length,
          };
        }
        return r;
      })
    );

    const gratitudeNotif: Notification = {
      id: 'notif-' + Math.random().toString(36).substr(2, 9),
      title: 'Design Feedback Logged',
      message: `Thank you for sharing your design insights on architectural harmony. Your feedback has been verified.`,
      time: '1 second ago',
      isRead: false,
      type: 'info',
    };
    setNotifications((prev) => [gratitudeNotif, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    const bookingToCancel = bookings.find((b) => b.id === bookingId);
    if (!bookingToCancel) return;

    if (window.confirm('Are you sure you want to cancel this reservation? This release will reopen table seat holds instantly.')) {
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));

      // Reopen table
      if (bookingToCancel.bookingType === 'table' && bookingToCancel.tableId) {
        setRestaurants((prevList) =>
          prevList.map((rest) => {
            if (rest.id === bookingToCancel.restaurantId) {
              return {
                ...rest,
                tables: rest.tables.map((t) =>
                  t.id === bookingToCancel.tableId ? { ...t, isAvailable: true } : t
                ),
              };
            }
            return rest;
          })
        );
      }

      // Add cancellation warning push notification
      const cancelNotif: Notification = {
        id: 'notif-' + Math.random().toString(36).substr(2, 9),
        title: 'Table Released',
        message: `Your reservation at "${bookingToCancel.restaurantName}" has been successfully voided. Your deposit hold has been released.`,
        time: 'Just Now',
        isRead: false,
        type: 'alert',
      };
      setNotifications((prev) => [cancelNotif, ...prev]);
    }
  };

  // Notification tools
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleClearAllNotifs = () => {
    setNotifications([]);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    const welcomeNotif: Notification = {
      id: 'notif-' + Math.random().toString(36).substr(2, 9),
      title: 'Portal Access Approved',
      message: `Greetings, ${user.name}! Your style preference has been loaded. Your experience has been customized to "${user.preferredStyle}".`,
      time: 'Just Now',
      isRead: false,
      type: 'info',
    };
    setNotifications((prev) => [welcomeNotif, ...prev]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setBookings([]);
    const logoutNotif: Notification = {
      id: 'notif-' + Math.random().toString(36).substr(2, 9),
      title: 'Session Dissolved',
      message: 'You have logged out of your spatial profile securely.',
      time: 'Just Now',
      isRead: false,
      type: 'alert',
    };
    setNotifications([logoutNotif]);
    setActiveSection('home');
  };

  const filteredRestaurants = restaurants.filter((r) =>
    filterTheme ? r.designTheme === filterTheme : true
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-stone-100 antialiased flex flex-col justify-between selection:bg-[#C5A059] selection:text-black">
      
      {/* Navigation Header */}
      <Navbar
        currentUser={currentUser}
        notifications={notifications}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onLogout={handleLogout}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        websiteName={websiteName}
        brandInitial={brandInitial}
      />

      {/* Main Sections */}
      <main className="flex-1">
        
        {/* SECTION 1: HOMEPAGE */}
        {activeSection === 'home' && (
          <div>
            {/* Hero Banner Component */}
            <Hero
              onExploreClick={() => setActiveSection('restaurants')}
              onFilterTheme={(theme) => {
                setFilterTheme(theme);
                setActiveSection('restaurants');
              }}
              badgeText={heroBadge}
              heading={heroHeading}
              subtitle={heroSubtitle}
              bgImage={heroBg}
            />

            {/* Design Principles / Features Highlight Bar */}
            <div className="bg-white/5 border-y border-white/10 py-12">
              <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-[#C5A059] text-black shrink-0">
                    <Palette className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">Theme Specific Materials</h3>
                    <p className="mt-1.5 text-xs text-stone-400 leading-relaxed font-sans font-light">
                      Every restaurant has a custom-modeled material palette matching raw textures like Hinoki timber, raw slate, and royal velvet to stimulate sensory authenticity.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-[#C5A059] text-black shrink-0">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">Acoustic & Lighting Integrity</h3>
                    <p className="mt-1.5 text-xs text-stone-400 leading-relaxed font-sans font-light">
                      Decibel profiles and luminary temperatures are tuned specifically to align with design concepts, offering peaceful isolation and visual perfection.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-[#C5A059] text-black shrink-0">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">Secure Hold Deposits</h3>
                    <p className="mt-1.5 text-xs text-stone-400 leading-relaxed font-sans font-light">
                      Full transparency. Deposits are securely logged with immediate instant-release mechanisms upon attending, preventing unneeded overhead fees.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Quote Section */}
            <section className="py-20 bg-white/5 border-b border-white/10 flex items-center justify-center text-center">
              <div className="max-w-3xl px-6 space-y-6">
                <Quote className="h-8 w-8 text-[#C5A059] mx-auto" />
                <blockquote className="font-serif text-2xl sm:text-3xl italic font-light text-white leading-relaxed">
                  "Design is not just what it looks like and feels like. Design is how it coexists with the human sensory palette during dining."
                </blockquote>
                <cite className="block text-xs uppercase tracking-widest font-bold text-stone-500 font-sans mt-2">
                  — TAMANNA Arch. Design Team
                </cite>
              </div>
            </section>

            {/* Featured Spots Showcase */}
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 space-y-8">
              <div className="flex items-end justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-white">Featured Establishments</h2>
                  <p className="text-xs text-stone-400 font-sans mt-0.5">Exquisite, hand-picked spaces crafted by design masters.</p>
                </div>
                <button
                  onClick={() => setActiveSection('restaurants')}
                  className="text-xs font-semibold uppercase tracking-widest text-stone-400 hover:text-[#C5A059] transition-colors"
                >
                  View All Listings
                </button>
              </div>

              {/* Grid of 3 selected listings */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {restaurants.slice(0, 3).map((rest) => (
                  <RestaurantCard
                    key={rest.id}
                    restaurant={rest}
                    onSelect={(r, type) => {
                      setSelectedRestaurant(r);
                      setSelectedBookingType(type);
                    }}
                    onViewDetails={(r) => setDetailedRestaurant(r)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: LISTINGS / THEMES PAGE */}
        {activeSection === 'restaurants' && (
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 space-y-8">
            <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-white">Design Styles & Listings</h2>
                <p className="text-xs text-stone-400 font-sans mt-1">
                  Explore full restaurant buyouts and private table configurations structured by architectural theme.
                </p>
              </div>

              {/* Filter selections */}
              <div className="flex flex-wrap gap-2 items-center text-xs">
                <span className="font-semibold text-stone-400 uppercase tracking-wider mr-2">Filter Aesthetics:</span>
                <select
                  value={filterTheme}
                  onChange={(e) => setFilterTheme(e.target.value)}
                  className="rounded-sm border border-white/10 bg-[#121212] p-2.5 outline-none focus:border-[#C5A059] font-sans font-medium text-stone-200"
                >
                  <option value="">All Architectures</option>
                  <option value="Art Deco Glamour">Art Deco Glamour</option>
                  <option value="Biophilic Botanical">Biophilic Botanical</option>
                  <option value="Japanese Minimalist">Japanese Minimalist</option>
                  <option value="Royal Neoclassical">Royal Neoclassical</option>
                  <option value="Industrial Mid-Century">Industrial Mid-Century</option>
                  <option value="Scandinavian Minimalist">Scandinavian Minimalist</option>
                </select>
              </div>
            </div>

            {filteredRestaurants.length === 0 ? (
              <p className="text-center text-stone-400 font-sans py-20">No matching restaurants found for your filter selection.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRestaurants.map((rest) => (
                  <RestaurantCard
                    key={rest.id}
                    restaurant={rest}
                    onSelect={(r, type) => {
                      setSelectedRestaurant(r);
                      setSelectedBookingType(type);
                    }}
                    onViewDetails={(r) => setDetailedRestaurant(r)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 3: DESIGN PRINCIPLES (ABOUT) */}
        {activeSection === 'about' && (
          <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8 space-y-12">
            <div className="space-y-4 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold font-sans">
                Acoustics, Texture & Light
              </span>
              <h2 id="design-principles" className="font-serif text-4xl font-extrabold tracking-tight text-white">
                Spatial Design Principles
              </h2>
              <p className="max-w-xl mx-auto text-sm text-stone-400 font-sans leading-relaxed">
                We believe that fine dining is a multi-sensory journey where spatial design, raw architectural textures, and luminous harmony play as much of a role as the culinary profile itself.
              </p>
            </div>

            {/* Showcase details */}
            <div className="space-y-8">
              {[
                {
                  theme: 'Art Deco Glamour',
                  accent: 'Symmetry & Radiance',
                  desc: 'Utilizes highly geometric, symmetrical forms, sunburst mirrors, fluted wall motifs, and heavy reflective metals like polished brass and chrome. Best paired with dark, high-contrast wood lacquer and plush jewel-toned velvet.',
                  image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=400'
                },
                {
                  theme: 'Japanese Minimalist',
                  accent: 'Shibui Restraint',
                  desc: 'Employs Hinoki cypress woods, handmade sliding shoji paper dividers, tactile tatami sedge straw flooring, and smooth stones. Spaces are acoustically isolated to encourage soft contemplation, focusing purely on natural simplicity.',
                  image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400'
                },
                {
                  theme: 'Biophilic Botanical',
                  accent: 'Organic Symbiosis',
                  desc: 'Integrates real, air-purifying foliage, full-grown indoor olive trees, living moss walls, live-edge wood dining slabs, and skylight configurations that cast warm natural leaf shadows throughout the day.',
                  image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=400'
                }
              ].map((style, idx) => (
                <div 
                  key={style.theme}
                  className={`flex flex-col md:flex-row items-stretch border border-white/10 rounded-sm overflow-hidden bg-[#121212] ${
                    idx % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="w-full md:w-80 shrink-0 h-48 md:h-auto overflow-hidden">
                    <img
                      src={style.image}
                      alt={style.theme}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold font-sans">
                      {style.accent}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white">{style.theme}</h3>
                    <p className="text-xs text-stone-400 font-sans leading-relaxed font-light">{style.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-sm border border-white/10 bg-[#121212] p-8 text-center space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#C5A059]">Are you an Interior Architect?</h3>
              <p className="text-xs text-stone-400 font-sans leading-relaxed max-w-md mx-auto">
                We collaborate with visual space designers and high-end restaurant owners to list, certify, and audit sensory dining halls around the metropolis. Join our exclusive layout catalog.
              </p>
              <button
                type="button"
                onClick={() => alert('Sensory Design submission portal is temporarily undergoing standard quarterly maintenance. Please check back next week!')}
                className="inline-flex items-center space-x-2 rounded-sm bg-[#C5A059] text-black px-5 py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-[#d4b578] transition-all cursor-pointer"
              >
                <span>Submit Space Draft</span>
              </button>
            </div>
          </div>
        )}

        {/* SECTION 4: USER PROFILE MANAGEMENT */}
        {activeSection === 'profile' && (
          <ProfileCenter
            currentUser={currentUser}
            bookings={bookings}
            onUpdateProfile={(updated) => {
              setCurrentUser(updated);
              alert('Profile fields synchronized successfully!');
            }}
            onCancelBooking={handleCancelBooking}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {/* SECTION 5: ADMIN CONFIGURATION CMS */}
        {activeSection === 'admin' && (
          <AdminPanel
            websiteName={websiteName}
            setWebsiteName={setWebsiteName}
            brandInitial={brandInitial}
            setBrandInitial={setBrandInitial}
            heroBadge={heroBadge}
            setHeroBadge={setHeroBadge}
            heroHeading={heroHeading}
            setHeroHeading={setHeroHeading}
            heroSubtitle={heroSubtitle}
            setHeroSubtitle={setHeroSubtitle}
            heroBg={heroBg}
            setHeroBg={setHeroBg}
            restaurants={restaurants}
            onUpdateRestaurants={(updated) => setRestaurants(updated)}
            onResetAllData={handleResetAllData}
          />
        )}

      </main>

      {/* Review Section (Attached to details drawer when inspect) */}
      {detailedRestaurant && (
        <div className="bg-[#0A0A0A] border-t border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ReviewSection
              restaurantId={detailedRestaurant.id}
              reviews={reviews}
              currentUser={currentUser}
              onAddReview={handleAddReview}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          </div>
        </div>
      )}

      {/* Footer copyright */}
      <footer className="border-t border-white/10 bg-[#0F0F0F] py-12 text-center text-xs text-stone-400 font-sans shrink-0">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 flex items-center justify-center rounded-sm bg-[#C5A059] text-black font-serif text-xs font-bold">{brandInitial}</div>
            <span className="font-serif font-bold text-white uppercase tracking-widest">{websiteName}</span>
            <span className="text-stone-700">|</span>
            <span className="text-stone-300">Elegant Table & Venue Booking Portal</span>
          </div>
          <div className="flex space-x-6 text-stone-400">
            <button onClick={() => alert('Terms of spatial holds: Holds must be validated inside the premise within 20 minutes of reservation time.')} className="hover:text-[#C5A059]">Hold Terms</button>
            <button onClick={() => alert('PCI Compliance Security details: All transactions undergo end-to-end sandbox authorization.')} className="hover:text-[#C5A059]">Security & Integrity</button>
            <button onClick={() => alert('Web-push notification configuration: System relies on background worker alert threads.')} className="hover:text-[#C5A059]">Push Specifications</button>
          </div>
          <p className="text-stone-500">© 2026 {websiteName} Ltd. All rights reserved.</p>
        </div>
      </footer>

      {/* SIDE/MODAL DRAWERS AND UTILITIES */}

      {/* 1. Real-time Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        notifications={notifications}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkAsRead={handleMarkAsRead}
        onClearAll={handleClearAllNotifs}
      />

      {/* 2. Authentication Modal Sheet */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* 3. Detailed Architectural Inspector Drawer */}
      <RestaurantDetailDrawer
        restaurant={detailedRestaurant}
        onClose={() => setDetailedRestaurant(null)}
        onSelectBooking={(rest, type) => {
          setDetailedRestaurant(null);
          setSelectedRestaurant(rest);
          setSelectedBookingType(type);
        }}
      />

      {/* 4. Multi-Step Secure Booking Modal */}
      {selectedRestaurant && (
        <BookingModal
          restaurant={selectedRestaurant}
          initialType={selectedBookingType}
          userId={currentUser?.id || 'usr-alexis'}
          onClose={() => setSelectedRestaurant(null)}
          onSubmitBooking={handleBookingSubmit}
        />
      )}

    </div>
  );
}
