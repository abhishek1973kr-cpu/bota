"use client";

import React from "react";
import { Sparkles, Truck, ShieldCheck } from "lucide-react";

export const AnnouncementBar = () => {
  return (
    <div className="bg-forest-950 text-emerald-100 text-xs sm:text-sm font-medium py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center p-0.5 rounded-full bg-emerald-800/80 text-emerald-300">
            <Sparkles className="w-3 h-3" />
          </span>
          <span>🌿 Free Shipping on Orders Above ₹500 | Natural &amp; Chemical-Free Skincare</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-emerald-200/80 text-xs">
          <span className="flex items-center gap-1">
            <Truck className="w-3 h-3 text-gold-400" /> Dispatch in 24 Hrs
          </span>
          <span className="inline-block w-1 h-1 rounded-full bg-emerald-600"></span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-gold-400" /> 100% Ayurvedic &amp; Cruelty-Free
          </span>
        </div>
      </div>
    </div>
  );
};

