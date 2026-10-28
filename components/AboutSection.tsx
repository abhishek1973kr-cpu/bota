"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Sparkles, Award, ShieldCheck, Heart } from "lucide-react";

export const AboutSection = () => {
  const ingredients = [
    { name: "Kashmiri Saffron", role: "Cellular Glow & Depigmentation" },
    { name: "Darjeeling Green Tea", role: "Antioxidant Barrier Shield" },
    { name: "Raw Shea Butter", role: "Deep Lipid Replenishment" },
    { name: "Golden Jojoba Oil", role: "Sebum-Balancing Hydration" },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-cream-50 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=85"
                alt="Hand-blended Ayurvedic skincare ritual"
                fill
                className="object-cover"
              />
            </div>

            {/* Inset Secondary Image */}
            <div className="hidden sm:block absolute -bottom-10 -right-8 w-56 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20">
              <Image
                src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=85"
                alt="Organic botanicals in amber glass"
                fill
                className="object-cover"
              />
            </div>

            {/* Experience Pill */}
            <div className="absolute top-8 -left-6 z-30 bg-forest-900 text-cream-50 p-4 rounded-2xl shadow-xl border border-gold-400/30 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gold-400/20 text-gold-300 flex items-center justify-center font-bold">
                <Award className="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <p className="text-xl font-bold font-serif leading-none">100%</p>
                <p className="text-xs text-cream-200 mt-0.5">Pure Handcrafted Batches</p>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-900/10 text-forest-900 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>The Royal Botanica Heritage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 leading-tight">
              Rooted in Nature, <br />
              <span className="text-forest-800 italic">Perfected by Ancient Alchemy</span>
            </h2>

            <p className="text-charcoal-700 text-sm sm:text-base leading-relaxed">
              At <strong>Royal Botanica</strong>, we reject mass-produced commercial skincare filled with synthetic emulsifiers, parabens, and micro-plastics. Every formula is carefully <strong>hand-blended in small micro-batches</strong> to preserve the living botanical energy and enzymatic potency of whole plants.
            </p>

            <p className="text-charcoal-700 text-sm sm:text-base leading-relaxed">
              Our master herbalists harness time-honored Ayurvedic decoction and cold-pressing methods. By merging clinical efficacy with pure floral distillates and unrefined seed butters, we restore skin texture, smooth hyperpigmentation, and calm cellular inflammation.
            </p>

            {/* Active Ingredients Grid */}
            <div className="pt-2">
              <h4 className="text-xs uppercase font-bold tracking-widest text-sage-700 mb-3">
                Signature Active Botanical Complex:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ingredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-cream-100 border border-cream-200/90"
                  >
                    <CheckCircle2 className="w-5 h-5 text-forest-800 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-forest-950">{ing.name}</p>
                      <p className="text-[11px] text-charcoal-700">{ing.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission quote */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border-l-4 border-gold-500 text-xs sm:text-sm text-forest-950 italic flex items-center gap-3">
              <Heart className="w-5 h-5 text-gold-600 shrink-0" />
              <span>
                &ldquo;We don&apos;t mask skin issues; we nourish skin back to its innate cellular equilibrium.&rdquo;
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

