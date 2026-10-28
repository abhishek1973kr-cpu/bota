"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Toast = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-24 right-5 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-forest-950 text-cream-50 px-5 py-3.5 rounded-2xl shadow-2xl border border-gold-400/30 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gold-400/20 text-gold-300 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-gold-400" />
        </div>
        <p className="text-xs sm:text-sm font-medium">{toastMessage}</p>
      </div>
    </div>
  );
};

