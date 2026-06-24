import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onFilterTheme: (theme: string) => void;
  badgeText?: string;
  heading?: string;
  subtitle?: string;
  bgImage?: string;
}

export default function Hero({ 
  onExploreClick, 
  onFilterTheme,
  badgeText = 'Curated Interior Masterpieces & Event Spaces',
  heading = 'Dine in architectural perfection.',
  subtitle = 'We curate fine-dining establishments crafted by world-class interior designers. Select your preferred aesthetic—from glamorous 1920s Art Deco to peaceful Japanese Zen—and book individual tables or hire entire venues for bespoke gatherings.',
  bgImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920'
}: HeroProps) {
  const themes = [
    { name: 'All Themes', tag: '' },
    { name: 'Art Deco Glamour', tag: 'Art Deco Glamour' },
    { name: 'Biophilic Botanical', tag: 'Biophilic Botanical' },
    { name: 'Japanese Minimalist', tag: 'Japanese Minimalist' },
    { name: 'Royal Neoclassical', tag: 'Royal Neoclassical' },
    { name: 'Industrial Mid-Century', tag: 'Industrial Mid-Century' },
    { name: 'Scandinavian Minimalist', tag: 'Scandinavian Minimalist' },
  ];

  return (
    <div className="relative overflow-hidden bg-[#0A0A0A] text-white py-24 sm:py-32">
      {/* Background Image Panel with Blur/Fade */}
      <div className="absolute inset-0 z-0 opacity-30">
        <img
          src={bgImage}
          alt="Luxury Restaurant Interior Design Background"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover filter brightness-75 contrast-125"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/75 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Animated Header Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[#C5A059] tracking-wider uppercase backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{badgeText}</span>
          </motion.div>

          {/* Majestic Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-serif text-4xl font-extrabold tracking-tight sm:text-6xl text-white leading-[1.1]"
          >
            {heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-stone-300 font-sans font-light"
          >
            {subtitle}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              onClick={onExploreClick}
              className="flex items-center space-x-2.5 rounded-sm bg-[#C5A059] px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-black hover:bg-[#d4b578] transition-all shadow-lg hover:shadow-[#C5A059]/10 cursor-pointer"
            >
              <span>Explore Listings</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#design-principles"
              className="flex items-center space-x-2 rounded-sm border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-stone-300 hover:text-white hover:border-[#C5A059] transition-all"
            >
              <span>Our Style Philosophy</span>
            </a>
          </motion.div>
        </div>

        {/* Quick Style Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 border-t border-white/10 pt-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] mb-4">
            Filter by Interior Design Aesthetic:
          </p>
          <div className="flex flex-wrap gap-2">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => onFilterTheme(theme.tag)}
                className="rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C5A059] px-4 py-2.5 text-xs font-medium tracking-wide text-stone-300 hover:text-white transition-all cursor-pointer"
              >
                {theme.name}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Grid Metrics */}
      <div className="absolute right-0 bottom-0 hidden lg:block p-10 opacity-15">
        <div className="grid grid-cols-3 gap-6 text-stone-400 font-mono text-[10px] tracking-widest uppercase">
          <div>
            <span className="block text-xl font-serif text-white font-bold">06</span>
            CURATED ARCHITECTS
          </div>
          <div>
            <span className="block text-xl font-serif text-white font-bold">100%</span>
            DESIGN VERIFIED
          </div>
          <div>
            <span className="block text-xl font-serif text-white font-bold">4.9★</span>
            AVERAGE AMBIANCE
          </div>
        </div>
      </div>
    </div>
  );
}
