import React, { useState } from 'react';
import { Star, Compass, Utensils, HeartHandshake, User, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { Review, User as UserType } from '../types';

interface ReviewSectionProps {
  restaurantId: string;
  reviews: Review[];
  currentUser: UserType | null;
  onAddReview: (review: Review) => void;
  onOpenAuth: () => void;
}

export default function ReviewSection({
  restaurantId,
  reviews,
  currentUser,
  onAddReview,
  onOpenAuth,
}: ReviewSectionProps) {
  const filteredReviews = reviews.filter((r) => r.restaurantId === restaurantId);

  // New review input states
  const [ratingInterior, setRatingInterior] = useState(5);
  const [ratingFood, setRatingFood] = useState(5);
  const [ratingService, setRatingService] = useState(5);
  const [comment, setComment] = useState('');

  // Calculations
  const avgInterior = filteredReviews.length 
    ? (filteredReviews.reduce((acc, r) => acc + r.ratingInterior, 0) / filteredReviews.length).toFixed(1) 
    : '5.0';
  const avgFood = filteredReviews.length 
    ? (filteredReviews.reduce((acc, r) => acc + r.ratingFood, 0) / filteredReviews.length).toFixed(1) 
    : '4.8';
  const avgService = filteredReviews.length 
    ? (filteredReviews.reduce((acc, r) => acc + r.ratingService, 0) / filteredReviews.length).toFixed(1) 
    : '4.9';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    if (!currentUser) {
      onOpenAuth();
      return;
    }

    const newReview: Review = {
      id: 'rev-' + Math.random().toString(36).substr(2, 9),
      restaurantId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      ratingInterior,
      ratingFood,
      ratingService,
      comment,
      createdAt: new Date().toISOString()
    };

    onAddReview(newReview);
    setComment('');
    // Reset star ratings to default 5
    setRatingInterior(5);
    setRatingFood(5);
    setRatingService(5);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-white/10 pt-12 mt-16">
      
      {/* Left Column: Aggregated Ambiance Stats */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl font-bold text-white">
          Interior & Culinary Ratings
        </h3>
        <p className="text-xs text-stone-400 font-sans leading-relaxed">
          Guests evaluate their dining encounters on our distinct artistic pillars.
        </p>

        <div className="space-y-4 bg-[#0A0A0A] p-6 rounded-sm border border-white/10">
          {/* Rating 1: Interior */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-300 flex items-center">
                <Compass className="h-3.5 w-3.5 mr-1.5 text-[#C5A059]" />
                Interior Design & Decor
              </span>
              <span className="font-bold text-white font-mono">{avgInterior} / 5</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(parseFloat(avgInterior) / 5) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-full bg-[#C5A059]"
              />
            </div>
          </div>

          {/* Rating 2: Food Quality */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-300 flex items-center">
                <Utensils className="h-3.5 w-3.5 mr-1.5 text-[#C5A059]" />
                Culinary Experience
              </span>
              <span className="font-bold text-white font-mono">{avgFood} / 5</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(parseFloat(avgFood) / 5) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-full bg-[#C5A059]"
              />
            </div>
          </div>

          {/* Rating 3: Ambiance & Service */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-300 flex items-center">
                <HeartHandshake className="h-3.5 w-3.5 mr-1.5 text-[#C5A059]" />
                Staff hospitality
              </span>
              <span className="font-bold text-white font-mono">{avgService} / 5</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(parseFloat(avgService) / 5) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-full bg-[#C5A059]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Center & Right Column: Existing Reviews and Input */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Review Form */}
        <div className="border border-white/10 p-6 rounded-sm bg-[#121212]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
            Pen your architectural review
          </h4>

          {currentUser ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Score inputs */}
                <div>
                  <span className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                    Design & Decor
                  </span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingInterior(star)}
                        className="p-0.5 text-stone-600 hover:text-[#C5A059] transition-colors cursor-pointer"
                      >
                        <Star className={`h-4.5 w-4.5 ${star <= ratingInterior ? 'fill-[#C5A059] text-[#C5A059]' : 'text-stone-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                    Culinary Taste
                  </span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingFood(star)}
                        className="p-0.5 text-stone-600 hover:text-[#C5A059] transition-colors cursor-pointer"
                      >
                        <Star className={`h-4.5 w-4.5 ${star <= ratingFood ? 'fill-[#C5A059] text-[#C5A059]' : 'text-stone-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                    Ambiance/Service
                  </span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingService(star)}
                        className="p-0.5 text-stone-600 hover:text-[#C5A059] transition-colors cursor-pointer"
                      >
                        <Star className={`h-4.5 w-4.5 ${star <= ratingService ? 'fill-[#C5A059] text-[#C5A059]' : 'text-stone-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details on what you felt of the restaurant's spatial architecture, material selections, layout harmony, and taste menu..."
                  className="w-full rounded-sm border border-white/10 bg-[#0A0A0A] p-3 text-sm text-stone-100 outline-none focus:border-[#C5A059] font-sans"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center space-x-2 rounded-sm bg-[#C5A059] px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-black hover:bg-[#d4b578] transition-all cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Submit Review</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 bg-[#0A0A0A] border border-white/10 rounded-sm">
              <p className="text-xs text-stone-400 font-sans">
                You must be authenticated to leave a review.
              </p>
              <button
                type="button"
                onClick={onOpenAuth}
                className="mt-3 inline-flex items-center space-x-2 rounded-sm bg-[#C5A059] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-black hover:bg-[#d4b578] transition-all cursor-pointer"
              >
                <span>Authorize Account</span>
              </button>
            </div>
          )}
        </div>

        {/* Existing Reviews List */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Guest Testimonials ({filteredReviews.length})
          </h4>

          {filteredReviews.length === 0 ? (
            <p className="text-xs text-stone-400 font-sans italic">No reviews logged yet. Be the first to share your thoughts!</p>
          ) : (
            <div className="divide-y divide-white/10">
              {filteredReviews.map((review) => (
                <div key={review.id} className="py-5 flex space-x-4 items-start">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    referrerPolicy="no-referrer"
                    className="h-9 w-9 rounded-full object-cover border border-white/10 shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-white">{review.userName}</h5>
                        <p className="text-[10px] text-stone-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      {/* Aggregate rating display for individual */}
                      <div className="flex items-center space-x-1 bg-[#0A0A0A] px-2 py-0.5 rounded border border-white/10">
                        <Star className="h-3.5 w-3.5 fill-[#C5A059] stroke-[#C5A059]" />
                        <span className="text-[10px] font-bold text-[#C5A059] font-mono">
                          {((review.ratingInterior + review.ratingFood + review.ratingService) / 3).toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed text-stone-400 font-sans font-light">
                      {review.comment}
                    </p>

                    {/* Breakdown stars */}
                    <div className="flex space-x-4 text-[9px] text-stone-500 uppercase font-semibold">
                      <span>Design: <span className="text-[#C5A059]">{review.ratingInterior}★</span></span>
                      <span>Taste: <span className="text-[#C5A059]">{review.ratingFood}★</span></span>
                      <span>Staff: <span className="text-[#C5A059]">{review.ratingService}★</span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
