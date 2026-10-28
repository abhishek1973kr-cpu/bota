"use client";

import React, { useState } from "react";
import { Star, CheckCircle, MessageSquarePlus, ThumbsUp, Sparkles, Send } from "lucide-react";
import { Review } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";

interface ProductReviewsProps {
  productId: string;
  productName: string;
  initialReviews: Review[];
  rating: number;
  reviewCount: number;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  productName,
  initialReviews,
  rating,
  reviewCount,
}) => {
  const { showToast } = useCart();
  const { addReviewToProduct } = useProducts();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);
  
  // Form states
  const [author, setAuthor] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [helpfulCounts, setHelpfulCounts] = useState<{ [id: string]: number }>({});

  const handleHelpful = (id: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      rating: userRating,
      date: "Just now",
      comment: comment.trim(),
      verified: true,
    };

    setReviews([newReview, ...reviews]);
    addReviewToProduct(productId, newReview);
    showToast("Review submitted successfully! Thank you for sharing 🌿");
    setAuthor("");
    setComment("");
    setUserRating(5);
    setShowForm(false);
  };

  return (
    <section className="py-12 border-t border-cream-200">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/10 text-forest-900 text-xs font-semibold mb-2">
            <span>Real Customer Experiences</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
            Customer Reviews &amp; Ratings
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-700 mt-1">
            Read what real customers say about their experience with {productName}.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-900 text-cream-50 font-semibold text-xs sm:text-sm shadow-md hover:bg-forest-950 transition-all"
        >
          <MessageSquarePlus className="w-4 h-4 text-gold-300" />
          <span>{showForm ? "Close Review Form" : "Write a Review"}</span>
        </button>
      </div>

      {/* Rating Snapshot Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-sm mb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-4 text-center md:border-r border-cream-200 md:pr-6">
            <div className="font-serif text-5xl font-bold text-forest-950">{rating}</div>
            <div className="flex justify-center text-amber-500 my-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-cream-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-charcoal-700 font-medium">
              Based on {reviewCount + (reviews.length - initialReviews.length)} verified reviews
            </p>
            <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> 100% Genuine Buyers
            </div>
          </div>

          {/* Breakdown Bars */}
          <div className="md:col-span-8 space-y-2">
            {[
              { star: 5, pct: 88 },
              { star: 4, pct: 9 },
              { star: 3, pct: 2 },
              { star: 2, pct: 1 },
              { star: 1, pct: 0 },
            ].map((bar) => (
              <div key={bar.star} className="flex items-center gap-3 text-xs text-charcoal-700">
                <span className="w-12 text-right font-medium flex items-center justify-end gap-1">
                  {bar.star} <Star className="w-3 h-3 text-amber-400 fill-amber-400 inline" />
                </span>
                <div className="flex-1 bg-cream-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gold-500 h-full rounded-full"
                    style={{ width: `${bar.pct}%` }}
                  />
                </div>
                <span className="w-10 text-charcoal-700 font-medium text-[11px]">{bar.pct}%</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Interactive Review Form */}
      {showForm && (
        <div className="bg-cream-100/80 rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-sm mb-10 animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <h3 className="font-serif text-xl font-bold text-forest-950">Share Your Experience</h3>
          </div>

          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal-800 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Debolina Banerjee"
                  className="w-full bg-white border border-cream-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-800 mb-1.5">
                  Rating *
                </label>
                <div className="flex items-center gap-1.5 h-10 px-3 bg-white rounded-xl border border-cream-300">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setUserRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= (hoverRating || userRating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-cream-300"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-charcoal-700 ml-2 font-medium">
                    {userRating} / 5 Stars
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-800 mb-1.5">
                Your Review &amp; Skin Transformation Results *
              </label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How did this product feel on your skin? Mention fragrance, texture, and results..."
                className="w-full bg-white border border-cream-300 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-full border border-cream-300 text-xs font-semibold text-charcoal-700 hover:bg-cream-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-forest-900 text-cream-50 text-xs font-semibold hover:bg-forest-950 shadow-md"
              >
                <span>Submit Botanical Review</span>
                <Send className="w-3.5 h-3.5 text-gold-300" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Review List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-cream-200/90 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-forest-900/10 text-forest-900 font-bold font-serif flex items-center justify-center text-sm">
                  {rev.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-forest-950 text-sm">
                      {rev.author}
                    </span>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-charcoal-700">{rev.date}</span>
                </div>
              </div>

              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < rev.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-cream-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-charcoal-800 leading-relaxed">
              &ldquo;{rev.comment}&rdquo;
            </p>

            <div className="mt-4 pt-3 border-t border-cream-100 flex items-center justify-between text-xs text-charcoal-700">
              <span className="text-[11px]">Organic formulation used for daily regimen</span>
              <button
                onClick={() => handleHelpful(rev.id)}
                className="flex items-center gap-1.5 text-xs text-charcoal-700 hover:text-forest-900 transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Helpful ({helpfulCounts[rev.id] || 0})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

