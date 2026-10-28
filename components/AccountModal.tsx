"use client";

import React, { useState } from "react";
import { X, User, Lock, Mail, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const AccountModal = () => {
  const { isAccountOpen, setIsAccountOpen, showToast } = useCart();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  if (!isAccountOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(isLogin ? "Welcome back to Royal Botanica! ✨" : "Account created successfully! Welcome to the family 🌿");
    setIsAccountOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsAccountOpen(false)}
      />

      <div className="relative z-10 bg-cream-50 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-cream-200 animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={() => setIsAccountOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-cream-200 text-charcoal-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-forest-900 text-gold-300 mx-auto flex items-center justify-center mb-3 shadow-md">
            <User className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-forest-950">
            {isLogin ? "Royal Botanica Account" : "Join Our Botanical Family"}
          </h2>
          <p className="text-xs text-charcoal-700 mt-1">
            {isLogin 
              ? "Access your organic skincare orders, consultations & points."
              : "Register to earn 150 Botanica reward coins on your first order."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-charcoal-800 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Debalina Das"
                  className="w-full bg-white border border-cream-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-charcoal-800 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full bg-white border border-cream-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-800 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-white border border-cream-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-forest-900 text-cream-50 font-bold text-sm hover:bg-forest-950 transition-all shadow-md mt-2"
          >
            {isLogin ? "Sign In Securely" : "Create My Account"}
          </button>
        </form>

        <div className="mt-5 text-center border-t border-cream-200 pt-4 text-xs text-charcoal-700">
          {isLogin ? (
            <span>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-forest-900 font-bold hover:underline"
              >
                Sign up here
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-forest-900 font-bold hover:underline"
              >
                Log in
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

