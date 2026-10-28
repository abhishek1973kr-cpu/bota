"use client";

import React from "react";
import Image from "next/image";
import { X, Heart, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const WishlistModal = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="relative z-10 bg-cream-50 rounded-3xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-cream-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-cream-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h2 className="font-serif text-lg font-bold text-forest-950">
              Saved Favorites ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 rounded-full hover:bg-cream-200 text-charcoal-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {wishlist.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest-950">Your Wishlist is Empty</h3>
              <p className="text-xs text-charcoal-700 max-w-xs mx-auto">
                Tap the heart icon on any botanical preparation to save it for your next skincare routine.
              </p>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-cream-200 shadow-sm"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-cream-100 shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-sm text-forest-950 truncate">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-sage-600">{product.size}</p>
                  <p className="text-sm font-bold font-serif text-forest-950 mt-1">
                    ₹{product.discountPrice}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                    }}
                    className="p-2.5 rounded-xl bg-forest-900 text-cream-50 hover:bg-forest-950 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4 text-gold-300" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="p-2.5 rounded-xl text-charcoal-700 hover:text-rose-600 hover:bg-cream-100"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

