"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";

export const Categories = () => {
  const { setSearchQuery } = useCart();
  const { products } = useProducts();

  const handleCategorySelect = (catName: string) => {
    // If it's Serums & Elixirs, search "Serums"
    const term = catName.includes("Serums") ? "Serum" : catName;
    setSearchQuery(term);
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const getCategoryCount = (categoryName: string, defaultCount: string) => {
    const matchCount = products.filter((p) =>
      p.category.toLowerCase().includes(categoryName.toLowerCase().split(" ")[0])
    ).length;
    return matchCount > 0 ? `${matchCount} Formulations` : defaultCount;
  };

  return (
    <section id="categories" className="py-16 bg-cream-100/60 border-b border-cream-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/10 text-forest-900 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Botanical Collections</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
            Shop By Categories
          </h2>
          <p className="text-charcoal-700 text-sm sm:text-base mt-2">
            Targeted herbal therapies designed to nurture, balance, and rejuvenate every inch of your skin and hair.
          </p>
        </div>

        {/* Categories Grid: 8 items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.name)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-cream-200/80 shadow-sm hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-end min-h-[220px] sm:min-h-[260px] p-5"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-95"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/40 to-transparent group-hover:from-forest-950/95 transition-all" />

              {/* Text Information */}
              <div className="relative z-10 text-white space-y-1">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gold-300 block">
                  {getCategoryCount(cat.name, cat.count)}
                </span>

                <h3 className="font-serif text-lg sm:text-xl font-bold leading-tight group-hover:text-gold-200 transition-colors">
                  {cat.name}
                </h3>

                <p className="text-[11px] sm:text-xs text-cream-200/80 line-clamp-1 leading-snug">
                  {cat.description}
                </p>

                <div className="pt-2 flex items-center text-xs font-semibold text-gold-300 group-hover:translate-x-1 transition-transform">
                  <span>Explore Formulation</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

