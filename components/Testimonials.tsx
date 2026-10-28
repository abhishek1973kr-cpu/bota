"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Quote, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/data/products";

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-20 bg-cream-100/70 border-b border-cream-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/10 text-forest-900 text-xs font-semibold mb-2">
            <span>Verified Customer Stories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
            Real Transformations, Real Skin
          </h2>
          <p className="text-charcoal-700 text-sm sm:text-base mt-2">
            Discover why thousands of mindful customers trust Royal Botanica for clean, holistic beauty.
          </p>
        </div>

        {/* Desktop Grid Layout: 3 cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-200/90 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative"
            >
              <div className="absolute top-6 right-6 text-cream-300">
                <Quote className="w-8 h-8 opacity-40 text-forest-900" />
              </div>

              <div>
                {/* Rating stars */}
                <div className="flex items-center text-amber-500 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs font-semibold uppercase tracking-wider text-sage-600 mb-2">
                  Reviewed: <span className="text-forest-900 font-bold">{review.product}</span>
                </p>

                <p className="text-sm text-charcoal-800 leading-relaxed italic mb-6">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* User profile */}
              <div className="flex items-center gap-3 pt-4 border-t border-cream-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-forest-900/20">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif font-bold text-forest-950 text-sm">{review.name}</h4>
                    {review.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    )}
                  </div>
                  <p className="text-[11px] text-charcoal-700">{review.city} • {review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-sm">
            <div className="flex items-center text-amber-500 mb-2">
              {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-sage-600 mb-1">
              Reviewed: <span className="text-forest-900 font-bold">{TESTIMONIALS[currentIndex].product}</span>
            </p>

            <p className="text-sm text-charcoal-800 leading-relaxed italic mb-6">
              &ldquo;{TESTIMONIALS[currentIndex].comment}&rdquo;
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-cream-100">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-forest-900/20">
                <Image
                  src={TESTIMONIALS[currentIndex].avatar}
                  alt={TESTIMONIALS[currentIndex].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-serif font-bold text-forest-950 text-sm">
                    {TESTIMONIALS[currentIndex].name}
                  </h4>
                  <CheckCircle className="w-3 h-3 text-emerald-600 fill-emerald-100" />
                </div>
                <p className="text-[10px] text-charcoal-700">
                  {TESTIMONIALS[currentIndex].city} • {TESTIMONIALS[currentIndex].date}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={prevReview}
              className="p-2 rounded-full bg-cream-200 text-forest-950 hover:bg-cream-300"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold text-charcoal-700">
              {currentIndex + 1} / {TESTIMONIALS.length}
            </span>
            <button
              onClick={nextReview}
              className="p-2 rounded-full bg-cream-200 text-forest-950 hover:bg-cream-300"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

