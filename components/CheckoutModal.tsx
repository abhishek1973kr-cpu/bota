"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Sparkles, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CheckoutModal = () => {
  const { 
    isCheckoutModalOpen, 
    setIsCheckoutModalOpen, 
    cart, 
    cartTotal, 
    amountNeededForFreeShipping,
    clearCart,
    showToast 
  } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [formData, setFormData] = useState({
    fullName: "Debalina Das",
    phone: "+91 98765 43210",
    address: "B-402, Royal Palms, Shristinagar",
    city: "Asansol",
    pincode: "713305",
    state: "West Bengal",
  });

  if (!isCheckoutModalOpen) return null;

  const grandTotal = cartTotal + (amountNeededForFreeShipping === 0 ? 0 : 50);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
    showToast("🎉 Order confirmed! Your herbal preparations are being packed.");
  };

  const handleClose = () => {
    setIsCheckoutModalOpen(false);
    setOrderPlaced(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative z-10 bg-cream-50 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-cream-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-cream-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h2 className="font-serif text-lg font-bold text-forest-950">
              {orderPlaced ? "Order Confirmation" : "Express Secure Botanical Checkout"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-cream-200 text-charcoal-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {orderPlaced ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest-950">
                Order Placed Successfully!
              </h3>
              <p className="text-sm text-charcoal-700 max-w-md mx-auto">
                Thank you for choosing Royal Botanica. Your fresh small-batch order <strong>#RB-{Math.floor(100000 + Math.random() * 900000)}</strong> will be dispatched within 24 hours.
              </p>
              
              <div className="p-4 rounded-2xl bg-white border border-cream-200 max-w-sm mx-auto text-xs text-charcoal-800 text-left space-y-1.5 shadow-xs">
                <div className="flex justify-between">
                  <span className="text-charcoal-700">Delivery To:</span>
                  <span className="font-semibold">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-700">Destination:</span>
                  <span className="font-semibold">{formData.city}, {formData.pincode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-700">Total Paid:</span>
                  <span className="font-bold text-forest-950">₹{grandTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-700">Payment:</span>
                  <span className="font-semibold uppercase text-emerald-800">{paymentMethod}</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="px-8 py-3.5 rounded-full bg-forest-900 text-cream-50 font-bold text-sm hover:bg-forest-950 transition-all shadow-md"
              >
                Continue Exploring Botanicals
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Order items preview snippet */}
              <div className="bg-white p-4 rounded-2xl border border-cream-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-forest-950 pb-2 border-b border-cream-100">
                  <span>Items in order ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                  <span>Amount: ₹{grandTotal}</span>
                </div>
                <div className="max-h-32 overflow-y-auto space-y-2 pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between text-xs">
                      <span className="text-charcoal-800 truncate max-w-xs">
                        {item.quantity}x {item.product.name} ({item.product.size})
                      </span>
                      <span className="font-semibold text-forest-950">
                        ₹{item.product.discountPrice * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-forest-950">
                  1. Shipping &amp; Contact Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white border border-cream-300 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-forest-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal-700 mb-1">
                      Phone Number (for SMS Tracking) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-cream-300 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-forest-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-charcoal-700 mb-1">
                    Street Address &amp; Apartment *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-white border border-cream-300 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-forest-800"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-white border border-cream-300 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-forest-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full bg-white border border-cream-300 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-forest-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-white border border-cream-300 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-forest-800"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3 pt-2">
                <h4 className="font-serif font-bold text-sm text-forest-950">
                  2. Select Payment Method
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <label
                    onClick={() => setPaymentMethod("upi")}
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-semibold transition-all ${
                      paymentMethod === "upi"
                        ? "border-forest-900 bg-forest-900/5 text-forest-950 ring-1 ring-forest-900"
                        : "border-cream-300 bg-white text-charcoal-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="accent-forest-900"
                    />
                    <span>UPI (GPay / PhonePe)</span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod("cards")}
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-semibold transition-all ${
                      paymentMethod === "cards"
                        ? "border-forest-900 bg-forest-900/5 text-forest-950 ring-1 ring-forest-900"
                        : "border-cream-300 bg-white text-charcoal-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cards"}
                      onChange={() => setPaymentMethod("cards")}
                      className="accent-forest-900"
                    />
                    <span>Card / NetBanking</span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-semibold transition-all ${
                      paymentMethod === "cod"
                        ? "border-forest-900 bg-forest-900/5 text-forest-950 ring-1 ring-forest-900"
                        : "border-cream-300 bg-white text-charcoal-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-forest-900"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-forest-900 text-cream-50 font-bold text-sm hover:bg-forest-950 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <span>Confirm Order • Pay ₹{grandTotal}</span>
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

