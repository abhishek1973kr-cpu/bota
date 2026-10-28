"use client";

import React from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartDrawer = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    freeShippingThreshold, 
    amountNeededForFreeShipping, 
    clearCart,
    showToast,
    setIsCheckoutModalOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-50 shadow-2xl flex flex-col border-l border-cream-200">
          
          {/* Header */}
          <div className="p-5 border-b border-cream-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-forest-900" />
              <h2 className="font-serif text-lg font-bold text-forest-950">
                Your Botanical Basket ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-cream-200 text-charcoal-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="p-4 bg-emerald-50 border-b border-emerald-100">
            {amountNeededForFreeShipping > 0 ? (
              <p className="text-xs text-forest-900 font-medium">
                Add <span className="font-bold text-forest-950">₹{amountNeededForFreeShipping}</span> more to unlock <strong>FREE Shipping</strong>! 🌿
              </p>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Congratulations! You qualify for FREE Shipping across India!</span>
              </div>
            )}
            <div className="w-full bg-emerald-200/80 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-forest-800 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center text-forest-800">
                  <ShoppingBag className="w-10 h-10 stroke-1" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-forest-950">Your basket is empty</h3>
                  <p className="text-xs text-charcoal-700 mt-1 max-w-xs">
                    Explore our botanical preparations to revitalize your skin and hair naturally.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-forest-900 text-white font-semibold text-xs shadow-md hover:bg-forest-950"
                >
                  Discover Bestsellers
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white rounded-2xl border border-cream-200 shadow-sm"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-100 shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-forest-950 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-[11px] text-sage-600">{item.product.size}</span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-charcoal-400 hover:text-rose-600 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-cream-300 rounded-lg overflow-hidden bg-cream-50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-cream-200 text-charcoal-700"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-charcoal-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-cream-200 text-charcoal-700"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold font-serif text-forest-950">
                          ₹{item.product.discountPrice * item.quantity}
                        </span>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-charcoal-700">
                            (₹{item.product.discountPrice} each)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-cream-200 bg-white space-y-3">
              <div className="flex justify-between text-xs text-charcoal-700">
                <span>Estimated Taxes &amp; GST</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between text-xs text-charcoal-700">
                <span>Shipping Charges</span>
                <span>{amountNeededForFreeShipping === 0 ? "FREE" : "₹50"}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-cream-100 font-serif">
                <span className="text-base font-bold text-forest-950">Grand Subtotal</span>
                <span className="text-2xl font-bold text-forest-950">
                  ₹{cartTotal + (amountNeededForFreeShipping === 0 ? 0 : 50)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 rounded-full bg-forest-900 text-cream-50 font-bold text-sm hover:bg-forest-950 transition-all shadow-xl flex items-center justify-center gap-2 group"
              >
                <span>Proceed To Secure Checkout</span>
                <ArrowRight className="w-4 h-4 text-gold-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-charcoal-700 hover:text-rose-600 transition-colors py-1"
              >
                Clear entire basket
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

