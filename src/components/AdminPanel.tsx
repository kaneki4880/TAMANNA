import React, { useState } from 'react';
import { 
  Settings, Image, Trash2, Plus, RotateCcw, Sparkles, 
  Save, FileText, Check, Layers, AlignLeft, MapPin, 
  DollarSign, Hash, Palette, RefreshCw, Star, X
} from 'lucide-react';
import { Restaurant, Table } from '../types';

interface AdminPanelProps {
  // General website customization
  websiteName: string;
  setWebsiteName: (val: string) => void;
  brandInitial: string;
  setBrandInitial: (val: string) => void;
  heroBadge: string;
  setHeroBadge: (val: string) => void;
  heroHeading: string;
  setHeroHeading: (val: string) => void;
  heroSubtitle: string;
  setHeroSubtitle: (val: string) => void;
  heroBg: string;
  setHeroBg: (val: string) => void;

  // Restaurant list customization
  restaurants: Restaurant[];
  onUpdateRestaurants: (updated: Restaurant[]) => void;
  onResetAllData: () => void;
}

export default function AdminPanel({
  websiteName,
  setWebsiteName,
  brandInitial,
  setBrandInitial,
  heroBadge,
  setHeroBadge,
  heroHeading,
  setHeroHeading,
  heroSubtitle,
  setHeroSubtitle,
  heroBg,
  setHeroBg,
  restaurants,
  onUpdateRestaurants,
  onResetAllData
}: AdminPanelProps) {
  // Navigation inside Admin Panel
  const [activeTab, setActiveTab] = useState<'branding' | 'listings'>('branding');
  
  // Selected restaurant to edit (or 'new' for creating)
  const [selectedRestId, setSelectedRestId] = useState<string>(restaurants[0]?.id || '');
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);

  // Local state for the selected restaurant being edited
  const currentRest = restaurants.find(r => r.id === selectedRestId);

  // Form states for the selected restaurant
  const [editName, setEditName] = useState('');
  const [editTheme, setEditTheme] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editLongDesc, setEditLongDesc] = useState('');
  const [editRating, setEditRating] = useState(4.8);
  const [editReviewsCount, setEditReviewsCount] = useState(100);
  const [editImage, setEditImage] = useState('');
  const [editAddImages, setEditAddImages] = useState(''); // comma-separated
  const [editMaterials, setEditMaterials] = useState(''); // comma-separated
  const [editColorSchemeName, setEditColorSchemeName] = useState('');
  const [editColorSchemeHexes, setEditColorSchemeHexes] = useState(''); // comma-separated
  const [editKeyElements, setEditKeyElements] = useState(''); // comma-separated
  const [editPriceTable, setEditPriceTable] = useState(40);
  const [editPriceVenue, setEditPriceVenue] = useState(1000);
  const [editAddress, setEditAddress] = useState('');
  const [editTables, setEditTables] = useState<Table[]>([]);

  // Feedback notifications
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Synchronize local edit states when a restaurant is selected
  React.useEffect(() => {
    if (currentRest && !isCreatingNew) {
      setEditName(currentRest.name);
      setEditTheme(currentRest.designTheme);
      setEditDesc(currentRest.description);
      setEditLongDesc(currentRest.longDescription);
      setEditRating(currentRest.rating);
      setEditReviewsCount(currentRest.reviewsCount || 0);
      setEditImage(currentRest.image);
      setEditAddImages(currentRest.additionalImages.join(', '));
      setEditMaterials(currentRest.materialPalette.join(', '));
      setEditColorSchemeName(currentRest.colorScheme.name);
      setEditColorSchemeHexes(currentRest.colorScheme.hexes.join(', '));
      setEditKeyElements(currentRest.keyElements.join(', '));
      setEditPriceTable(currentRest.basePriceTable);
      setEditPriceVenue(currentRest.basePriceFullVenue);
      setEditAddress(currentRest.address);
      setEditTables([...currentRest.tables]);
    }
  }, [selectedRestId, isCreatingNew, currentRest]);

  // Initiate creation of a new restaurant
  const handleStartCreate = () => {
    setIsCreatingNew(true);
    setEditName('Grand Golden Palace');
    setEditTheme('Neo-Classical Baroque');
    setEditDesc('A breathtaking dining hall featuring soaring marble statues, gilded ceiling murals, and royal gold-trimmed banquet tables.');
    setEditLongDesc('The Grand Golden Palace is a showcase of spatial design over-indulgence. Inspired by late 17th-century European baroque palaces, every design element demands absolute attention. Features authentic Corinthian white marble colonnades, bespoke dome murals hand-painted with celestial allegories, and massive tables crafted from ancient mahogany. It offers a majestic dining experience.');
    setEditRating(4.9);
    setEditReviewsCount(1);
    setEditImage('https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800');
    setEditAddImages('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=600, https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&q=80&w=600');
    setEditMaterials('Carved Mahogany, Gilded Plaster, White Calacatta Marble, Damask Silk');
    setEditColorSchemeName('Imperial Ivory & Gold');
    setEditColorSchemeHexes('#b45309, #d97706, #1e293b, #fafaf9');
    setEditKeyElements('16-foot ceiling frescoes, Monolithic mahogany throne chairs, Custom-carved stone statuary, Hand-spun glass chandeliers');
    setEditPriceTable(75);
    setEditPriceVenue(2200);
    setEditAddress('777 Versailles Boulevard, Queens, NY');
    setEditTables([
      { id: 'new-t1', name: 'Throne Table 1', capacity: 2, isAvailable: true, type: 'VIP Booth' },
      { id: 'new-t2', name: 'Palace Window Bench', capacity: 4, isAvailable: true, type: 'Window Side' },
      { id: 'new-t3', name: 'Baroque Round Center', capacity: 6, isAvailable: true, type: 'Main Salon' }
    ]);
  };

  const showFeedback = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleSaveListing = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedAddImages = editAddImages.split(',').map(s => s.trim()).filter(Boolean);
    const formattedMaterials = editMaterials.split(',').map(s => s.trim()).filter(Boolean);
    const formattedKeyElements = editKeyElements.split(',').map(s => s.trim()).filter(Boolean);
    const formattedHexes = editColorSchemeHexes.split(',').map(s => s.trim()).filter(Boolean);

    const updatedRestaurantData: Restaurant = {
      id: isCreatingNew ? `rest-${Math.random().toString(36).substr(2, 9)}` : selectedRestId,
      name: editName,
      designTheme: editTheme,
      description: editDesc,
      longDescription: editLongDesc,
      rating: Number(editRating),
      reviewsCount: Number(editReviewsCount),
      image: editImage,
      additionalImages: formattedAddImages,
      materialPalette: formattedMaterials,
      colorScheme: {
        name: editColorSchemeName,
        hexes: formattedHexes
      },
      keyElements: formattedKeyElements,
      basePriceTable: Number(editPriceTable),
      basePriceFullVenue: Number(editPriceVenue),
      address: editAddress,
      tables: editTables
    };

    let nextRestaurants: Restaurant[];
    if (isCreatingNew) {
      nextRestaurants = [...restaurants, updatedRestaurantData];
      onUpdateRestaurants(nextRestaurants);
      setSelectedRestId(updatedRestaurantData.id);
      setIsCreatingNew(false);
      showFeedback('Successfully added and configured a new elegant venue!');
    } else {
      nextRestaurants = restaurants.map(r => r.id === selectedRestId ? updatedRestaurantData : r);
      onUpdateRestaurants(nextRestaurants);
      showFeedback('Restaurant properties synchronized and saved successfully!');
    }
  };

  const handleDeleteListing = (id: string) => {
    if (restaurants.length <= 1) {
      alert('The website requires at least one culinary establishment to render. Cannot delete.');
      return;
    }
    if (window.confirm('Are you absolutely sure you want to permanently delete this spatial listing? This will erase all configured seat layouts.')) {
      const nextR = restaurants.filter(r => r.id !== id);
      onUpdateRestaurants(nextR);
      setSelectedRestId(nextR[0].id);
      showFeedback('Listing purged from TAMANNA listings database.');
    }
  };

  // Dynamic table editing handlers
  const handleUpdateTable = (index: number, field: keyof Table, value: any) => {
    const updated = [...editTables];
    updated[index] = { ...updated[index], [field]: value };
    setEditTables(updated);
  };

  const handleAddTable = () => {
    const newTable: Table = {
      id: `tbl-${Math.random().toString(36).substr(2, 9)}`,
      name: `Table ${editTables.length + 1}`,
      capacity: 4,
      isAvailable: true,
      type: 'Main Salon'
    };
    setEditTables([...editTables, newTable]);
  };

  const handleRemoveTable = (index: number) => {
    const updated = editTables.filter((_, i) => i !== index);
    setEditTables(updated);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 space-y-10">
      
      {/* Header and Quick Actions */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold font-sans">
            Secure Web Configuration Panel
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Settings className="h-7 w-7 text-[#C5A059]" />
            TAMANNA Admin Console
          </h2>
          <p className="text-xs text-stone-400 font-sans mt-1">
            Dynamic real-time CMS to modify website branding, hero images, and full restaurant list configurations.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => {
              if (window.confirm('Reset all website data, titles, and listings back to default mock templates? This overrides local storage.')) {
                onResetAllData();
                showFeedback('CMS defaults loaded successfully!');
              }
            }}
            className="inline-flex items-center space-x-2 rounded-sm border border-red-500/30 bg-red-950/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-red-400 hover:bg-red-950/40 transition-all cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset to Defaults</span>
          </button>
        </div>
      </div>

      {/* Save Status Notification Banner */}
      {saveStatus && (
        <div className="rounded-sm bg-emerald-950/40 border border-emerald-500/30 p-4 text-xs text-emerald-400 font-sans flex items-center space-x-2 animate-bounce">
          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Tab Selectors */}
      <div className="flex border-b border-white/10 text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => { setActiveTab('branding'); setIsCreatingNew(false); }}
          className={`px-6 py-3.5 border-b-2 transition-all ${
            activeTab === 'branding' 
              ? 'border-[#C5A059] text-white bg-white/5' 
              : 'border-transparent text-stone-400 hover:text-white'
          }`}
        >
          1. Branding & Hero Settings
        </button>
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-6 py-3.5 border-b-2 transition-all ${
            activeTab === 'listings' 
              ? 'border-[#C5A059] text-white bg-white/5' 
              : 'border-transparent text-stone-400 hover:text-white'
          }`}
        >
          2. Restaurant Properties Manager ({restaurants.length})
        </button>
      </div>

      {/* Tab 1: Branding and Hero Panel */}
      {activeTab === 'branding' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Side */}
          <div className="lg:col-span-2 bg-[#121212] p-8 rounded-sm border border-white/10 space-y-6">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Sparkles className="h-4 w-4 text-[#C5A059]" />
              Website Identity Configuration
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                  Website Name Label
                </label>
                <input
                  type="text"
                  value={websiteName}
                  onChange={(e) => setWebsiteName(e.target.value)}
                  placeholder="e.g. TAMANNA"
                  className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                />
                <span className="text-[10px] text-stone-500">Alters navbar and footer branding across the app.</span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                  Brand Logo Letter Icon
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={brandInitial}
                  onChange={(e) => setBrandInitial(e.target.value)}
                  placeholder="e.g. T"
                  className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                />
                <span className="text-[10px] text-stone-500">Icon letter shown inside the golden block (Max 2 chars).</span>
              </div>
            </div>

            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3 pt-4">
              <Image className="h-4 w-4 text-[#C5A059]" />
              Front Hero Banner & Copy Editor
            </h3>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                  Animated Badge Title
                </label>
                <input
                  type="text"
                  value={heroBadge}
                  onChange={(e) => setHeroBadge(e.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                  Majestic Main Heading
                </label>
                <input
                  type="text"
                  value={heroHeading}
                  onChange={(e) => setHeroHeading(e.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-sans font-medium"
                />
                <span className="text-[10px] text-stone-500">Supports normal text. Try to make it feel premium!</span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                  Descriptive Subtitle Paragraph
                </label>
                <textarea
                  rows={4}
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-sans leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                  Hero Background Image URL
                </label>
                <input
                  type="text"
                  value={heroBg}
                  onChange={(e) => setHeroBg(e.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                />
                <span className="text-[10px] text-stone-500">Enter a high-resolution Unsplash or direct web link to alter the background.</span>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => showFeedback('General branding parameters applied and saved inside localStorage context.')}
                className="flex items-center space-x-2 rounded-sm bg-[#C5A059] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black hover:bg-[#d4b578] transition-all cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>Apply Branding Changes</span>
              </button>
            </div>
          </div>

          {/* Visual Live Preview Column */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Live Image & Hero Preview
            </h4>
            
            {/* Miniature Hero Mockup */}
            <div className="relative overflow-hidden rounded-sm border border-white/10 bg-[#0A0A0A] p-6 text-white min-h-[350px] flex flex-col justify-between">
              {/* Fake Background */}
              <div className="absolute inset-0 z-0 opacity-40">
                <img
                  src={heroBg || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400'}
                  alt="Hero Preview"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover filter brightness-50"
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              </div>

              {/* Header simulator */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-1.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-[#C5A059] text-black text-[10px] font-serif font-bold">
                    {brandInitial || 'T'}
                  </div>
                  <span className="text-[10px] font-serif font-bold tracking-wider text-white uppercase">{websiteName || 'TAMANNA'}</span>
                </div>
                <span className="text-[9px] text-stone-400 uppercase font-sans font-bold">Live Portal Preview</span>
              </div>

              {/* Main Text Simulator */}
              <div className="relative z-10 space-y-3 my-auto pt-4">
                <span className="inline-block rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-[8px] text-[#C5A059] uppercase tracking-wider">
                  {heroBadge || 'Curated Design Spaces'}
                </span>
                <h5 className="font-serif text-lg font-bold text-white leading-tight">
                  {heroHeading || 'Dine in architectural perfection.'}
                </h5>
                <p className="text-[9px] text-stone-300 font-sans font-light leading-relaxed line-clamp-3">
                  {heroSubtitle || 'We curate fine-dining establishments crafted by world-class interior designers.'}
                </p>
              </div>

              {/* Action mockup */}
              <div className="relative z-10 flex space-x-2 pt-2 border-t border-white/5">
                <div className="rounded bg-[#C5A059] px-3 py-1.5 text-[8px] font-bold text-black uppercase">
                  Explore Listings
                </div>
                <div className="rounded border border-white/10 bg-white/5 px-3 py-1.5 text-[8px] font-bold text-stone-300 uppercase">
                  Our Philosophy
                </div>
              </div>
            </div>

            {/* Quick Helper Tips */}
            <div className="bg-[#121212] p-6 rounded-sm border border-white/10 space-y-3">
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <AlignLeft className="h-3.5 w-3.5 text-[#C5A059]" />
                Image Asset Guidance
              </h5>
              <p className="text-[11px] text-stone-400 font-sans leading-relaxed">
                For optimal visual elegance, prefer wide-angle interior photograph URLs from <strong>Unsplash</strong> with the <code>&q=80&w=1200</code> parameters to preserve high responsiveness without degrading download rates.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Restaurant Listings Properties CMS */}
      {activeTab === 'listings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* List Sidebar (Col span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Select Establishment
              </h4>
              <button
                onClick={handleStartCreate}
                className="inline-flex items-center space-x-1.5 rounded-sm bg-[#C5A059] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black hover:bg-[#d4b578] transition-all cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Create New</span>
              </button>
            </div>

            {/* Restaurant Selection Grid / Column */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {restaurants.map((rest) => {
                const isSelected = rest.id === selectedRestId && !isCreatingNew;
                return (
                  <div
                    key={rest.id}
                    onClick={() => {
                      setSelectedRestId(rest.id);
                      setIsCreatingNew(false);
                    }}
                    className={`group relative p-4 rounded-sm border transition-all cursor-pointer text-left flex items-center gap-3 ${
                      isSelected 
                        ? 'border-[#C5A059] bg-[#C5A059]/5' 
                        : 'border-white/10 bg-[#121212] hover:border-white/20'
                    }`}
                  >
                    <img
                      src={rest.image}
                      alt={rest.name}
                      referrerPolicy="no-referrer"
                      className="h-12 w-12 rounded object-cover shrink-0 border border-white/10"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=100';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate ${isSelected ? 'text-[#C5A059]' : 'text-white'}`}>
                        {rest.name}
                      </p>
                      <p className="text-[10px] text-stone-400 truncate mt-0.5">{rest.designTheme}</p>
                      <p className="text-[9px] text-stone-500 mt-1 font-mono">{rest.tables.length} table holds configured</p>
                    </div>

                    {/* Delete Quick Trigger */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteListing(rest.id);
                      }}
                      className="p-1 text-stone-500 hover:text-red-400 transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                      title="Permanently remove restaurant"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Quick instructions */}
            <div className="rounded-sm border border-white/10 bg-[#121212] p-5 text-xs text-stone-400 space-y-2">
              <p className="font-semibold text-white">Interactive Venue Holds</p>
              <p className="leading-relaxed text-[11px]">
                Any changes made to table capacities, counts, or naming conventions will immediately update the active bookings and reservation calendar matrices inside the user view.
              </p>
            </div>
          </div>

          {/* Editor Form (Col span 8) */}
          <div className="lg:col-span-8 bg-[#121212] p-8 rounded-sm border border-white/10">
            <form onSubmit={handleSaveListing} className="space-y-8">
              
              <div className="border-b border-white/5 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    {isCreatingNew ? 'Configure New Establishment Profile' : `Modify Profile: ${editName}`}
                  </h3>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    {isCreatingNew ? 'Input bespoke material metrics and pricing bounds.' : `Properties of ID: ${selectedRestId}`}
                  </p>
                </div>
                {isCreatingNew && (
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(false)}
                    className="p-1.5 text-stone-400 hover:text-white rounded border border-white/10"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                    Interior Design Theme / Aesthetic Style
                  </label>
                  <input
                    type="text"
                    required
                    value={editTheme}
                    onChange={(e) => setEditTheme(e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                    Short Description (Home Listings Cards)
                  </label>
                  <input
                    type="text"
                    required
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                    Long Detailed Description (Detailed Inspect Drawer)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={editLongDesc}
                    onChange={(e) => setEditLongDesc(e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-sans leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                    Physical Map Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-500" />
                    <input
                      type="text"
                      required
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] pl-11 pr-3 py-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                    />
                  </div>
                </div>

                {/* Rating and count */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                    Review Score (1.0 to 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    max="5"
                    required
                    value={editRating}
                    onChange={(e) => setEditRating(Number(e.target.value))}
                    className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                    Simulated Historical Reviews Count
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editReviewsCount}
                    onChange={(e) => setEditReviewsCount(Number(e.target.value))}
                    className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-mono"
                  />
                </div>

              </div>

              {/* Images configuration */}
              <div className="space-y-4 border-t border-white/5 pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-1.5">
                  <Image className="h-3.5 w-3.5" />
                  Establishment Imagery
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                      Main Banner Image URL
                    </label>
                    <input
                      type="text"
                      required
                      value={editImage}
                      onChange={(e) => setEditImage(e.target.value)}
                      className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                    />
                    <div className="mt-2 h-24 w-full rounded border border-white/5 overflow-hidden">
                      <img
                        src={editImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=200'}
                        alt="Main preview"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=200';
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                      Gallery Images (Additional Images, Comma Separated)
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={editAddImages}
                      onChange={(e) => setEditAddImages(e.target.value)}
                      placeholder="URL 1, URL 2, URL 3"
                      className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-sans leading-normal"
                    />
                    <span className="text-[10px] text-stone-500 block">Separated by commas. These will render in the detailed photo gallery modal.</span>
                  </div>
                </div>
              </div>

              {/* Material Palettes & Color Schemes */}
              <div className="space-y-4 border-t border-white/5 pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-1.5">
                  <Palette className="h-3.5 w-3.5" />
                  Tactile Material Palette & Accents
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                      Raw Tactile Materials (Comma Separated)
                    </label>
                    <input
                      type="text"
                      required
                      value={editMaterials}
                      onChange={(e) => setEditMaterials(e.target.value)}
                      placeholder="e.g. Hinoki Wood, Raw Slate, Sedge Tatami"
                      className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                    />
                    <span className="text-[10px] text-stone-500 block">Key surface materials shown in detailed inspect circles.</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                      Key Architectural Accents & Elements (Comma Separated)
                    </label>
                    <input
                      type="text"
                      required
                      value={editKeyElements}
                      onChange={(e) => setEditKeyElements(e.target.value)}
                      placeholder="e.g. Symmetrical Arches, Fluted Panels, Living Walls"
                      className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                    />
                    <span className="text-[10px] text-stone-500 block">Highlights listed under architectural notes.</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                      Color Scheme Collection Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editColorSchemeName}
                      onChange={(e) => setEditColorSchemeName(e.target.value)}
                      placeholder="e.g. Ash & Charcoal Calm"
                      className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                      Color Hex Codes (Comma Separated, 4 Required)
                    </label>
                    <input
                      type="text"
                      required
                      value={editColorSchemeHexes}
                      onChange={(e) => setEditColorSchemeHexes(e.target.value)}
                      placeholder="e.g. #1e1b4b, #475569, #cbd5e1, #f8fafc"
                      className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-mono"
                    />
                    
                    {/* Visual Color Dots Preview */}
                    <div className="flex gap-2.5 mt-2">
                      {editColorSchemeHexes.split(',').map((hex, idx) => {
                        const trimmed = hex.trim();
                        if (!trimmed.startsWith('#')) return null;
                        return (
                          <div key={idx} className="flex flex-col items-center gap-1">
                            <div 
                              className="h-6 w-6 rounded border border-white/20 shadow"
                              style={{ backgroundColor: trimmed }}
                            />
                            <span className="text-[9px] text-stone-400 font-mono">{trimmed}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing details */}
              <div className="space-y-4 border-t border-white/5 pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5" />
                  Financial Hold & Booking Rates (Deposits)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                      Table Booking Deposit ($ USD)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={editPriceTable}
                      onChange={(e) => setEditPriceTable(Number(e.target.value))}
                      className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-mono"
                    />
                    <span className="text-[10px] text-stone-500 block">Deducted and fully refundable upon attending.</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                      Full Venue Buyout Deposit ($ USD)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={editPriceVenue}
                      onChange={(e) => setEditPriceVenue(Number(e.target.value))}
                      className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-xs text-stone-100 outline-none focus:border-[#C5A059] font-mono"
                    />
                    <span className="text-[10px] text-stone-500 block">Initial venue lock deposit for full-scale celebrations.</span>
                  </div>
                </div>
              </div>

              {/* Table Seats Grid Configurations */}
              <div className="space-y-4 border-t border-white/5 pt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5" />
                    Configure Seating Grid Layout
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddTable}
                    className="inline-flex items-center space-x-1 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:text-[#C5A059] transition-all cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add Table Hold</span>
                  </button>
                </div>

                {editTables.length === 0 ? (
                  <p className="text-[11px] text-stone-500 italic py-4">No seating tables configured. Please add tables to allow bookings.</p>
                ) : (
                  <div className="space-y-3 bg-[#0A0A0A] p-4 rounded-sm border border-white/5 max-h-[300px] overflow-y-auto">
                    {editTables.map((tbl, idx) => (
                      <div key={tbl.id} className="flex flex-col sm:flex-row items-center gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                        
                        <div className="w-full sm:w-1/3 space-y-1">
                          <label className="block text-[9px] text-stone-500 uppercase tracking-wider font-semibold">Table Label/Name</label>
                          <input
                            type="text"
                            required
                            value={tbl.name}
                            onChange={(e) => handleUpdateTable(idx, 'name', e.target.value)}
                            placeholder="e.g. VIP Booth 1"
                            className="w-full rounded bg-[#121212] border border-white/10 p-2 text-xs text-white"
                          />
                        </div>

                        <div className="w-full sm:w-1/4 space-y-1">
                          <label className="block text-[9px] text-stone-500 uppercase tracking-wider font-semibold">Capacity (Guests)</label>
                          <input
                            type="number"
                            min="1"
                            max="50"
                            required
                            value={tbl.capacity}
                            onChange={(e) => handleUpdateTable(idx, 'capacity', Number(e.target.value))}
                            className="w-full rounded bg-[#121212] border border-white/10 p-2 text-xs text-white font-mono"
                          />
                        </div>

                        <div className="w-full sm:w-1/4 space-y-1">
                          <label className="block text-[9px] text-stone-500 uppercase tracking-wider font-semibold">Location / Style Type</label>
                          <select
                            value={tbl.type}
                            onChange={(e) => handleUpdateTable(idx, 'type', e.target.value)}
                            className="w-full rounded bg-[#121212] border border-white/10 p-2 text-xs text-white"
                          >
                            <option value="Main Salon">Main Salon</option>
                            <option value="VIP Booth">VIP Booth</option>
                            <option value="Window Side">Window Side</option>
                            <option value="Chef's Table">Chef's Table</option>
                            <option value="Garden Terrace">Garden Terrace</option>
                          </select>
                        </div>

                        <div className="w-full sm:w-1/12 space-y-1 text-center">
                          <label className="block text-[9px] text-stone-500 uppercase tracking-wider font-semibold">Open</label>
                          <div className="pt-2">
                            <input
                              type="checkbox"
                              checked={tbl.isAvailable}
                              onChange={(e) => handleUpdateTable(idx, 'isAvailable', e.target.checked)}
                              className="h-4 w-4 rounded border-white/10 accent-[#C5A059]"
                            />
                          </div>
                        </div>

                        <div className="pt-4 sm:pt-3">
                          <button
                            type="button"
                            onClick={() => handleRemoveTable(idx)}
                            className="p-1.5 text-stone-400 hover:text-red-400 transition-colors"
                            title="Remove Table"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="border-t border-white/5 pt-6 flex justify-end gap-3">
                {isCreatingNew ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsCreatingNew(false)}
                      className="rounded-sm border border-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-stone-300 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center space-x-2 rounded-sm bg-[#C5A059] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black hover:bg-[#d4b578] transition-all cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Insert New Establishment</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center space-x-2 rounded-sm bg-[#C5A059] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black hover:bg-[#d4b578] transition-all cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>Synchronize & Save Listing</span>
                  </button>
                )}
              </div>

            </form>
          </div>

        </div>
      )}

    </div>
  );
}
