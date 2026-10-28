"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Star, ShieldCheck, Sparkles, Droplets, Leaf } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Hero = () => {
  const { addToCart } = useCart();

  const scrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCombos = () => {
    const el = document.getElementById("categories");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100 to-sage-50/60 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-cream-200">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-sage-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gold-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/10 border border-forest-900/15 text-forest-900 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>100% Certified Organic &amp; Ayurvedic Skincare</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-forest-950 leading-[1.15] tracking-tight">
              Natural Way To Cure Your{" "}
              <span className="text-forest-800 italic underline decoration-gold-400 decoration-wavy decoration-2">
                Skin And Hair
              </span>{" "}
              Issues
            </h1>

            {/* Sub-headline */}
            <p className="text-charcoal-700 text-base sm:text-lg lg:text-xl font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience the pure therapeutic potency of small-batch, hand-blended, cruelty-free, and eco-friendly organic formulations tailored for holistic Indian skin &amp; hair textures.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={scrollToProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-forest-900 text-cream-50 font-semibold text-base shadow-lg shadow-forest-900/20 hover:bg-forest-950 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-5 h-5 text-gold-300" />
              </button>

              <button
                onClick={scrollToCombos}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-forest-900 text-forest-900 font-semibold text-base bg-white/60 backdrop-blur-sm hover:bg-forest-900 hover:text-white transition-all"
              >
                <span>Explore Combos</span>
              </button>
            </div>

            {/* Trust Badges Minimal */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-charcoal-700 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-forest-700" />
                <span>Zero Harsh Chemicals</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-forest-700" />
                <span>Handcrafted Small Batches</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-forest-700" />
                <span>Dermatologically Safe</span>
              </div>
            </div>

            {/* Key Stats Counter */}
            <div className="pt-6 border-t border-cream-300/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold font-serif text-forest-950">20k+</div>
                <div className="text-xs sm:text-sm text-charcoal-700 font-medium">Happy Customers</div>
              </div>
              <div className="text-center lg:text-left border-x border-cream-300 px-3">
                <div className="text-2xl sm:text-3xl font-bold font-serif text-forest-950 flex items-center justify-center lg:justify-start gap-1">
                  80k+ <Star className="w-4 h-4 text-amber-500 fill-amber-500 inline" />
                </div>
                <div className="text-xs sm:text-sm text-charcoal-700 font-medium">Verified Ratings</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold font-serif text-forest-950">500+</div>
                <div className="text-xs sm:text-sm text-charcoal-700 font-medium">Organic Formulations</div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Imagery & Floating Elements */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Background Arch Shape */}
            <div className="relative w-72 h-96 sm:w-88 sm:h-[480px] rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-cream-200">
              <Image
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85"
                alt="Royal Botanica Organic Cosmetics"
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-cream-50 p-4 rounded-xl bg-forest-950/75 backdrop-blur-md border border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400">Signature Blend</span>
                <p className="font-serif text-base sm:text-lg font-semibold leading-tight mt-0.5">
                  Kumkumadi &amp; Kashmiri Saffron Nectar
                </p>
                <p className="text-xs text-cream-200/90 mt-1 line-clamp-1">Restores youthful elasticity and glass skin sheen.</p>
              </div>
            </div>

            {/* Floating Trust Badge 1 */}
            <div className="absolute -top-4 -left-2 sm:left-2 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-cream-200 flex items-center gap-3 animate-bounce [animation-duration:5s]">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                🌿
              </div>
              <div>
                <p className="text-xs font-bold text-forest-950">100% Ayurvedic</p>
                <p className="text-[10px] text-charcoal-700">Certified Pure Extract</p>
              </div>
            </div>

            {/* Floating Trust Badge 2 */}
            <div className="absolute bottom-16 -right-2 sm:right-0 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-cream-200 flex items-center gap-3">
              <div className="flex -space-x-2">
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Customer" />
              </div>
              <div className="text-left">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3 h-3 fill-amber-500" />
                  <Star className="w-3 h-3 fill-amber-500" />
                  <Star className="w-3 h-3 fill-amber-500" />
                  <Star className="w-3 h-3 fill-amber-500" />
                  <Star className="w-3 h-3 fill-amber-500" />
                </div>
                <p className="text-[10px] font-semibold text-charcoal-800">4.9 / 5 Overall Rating</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

