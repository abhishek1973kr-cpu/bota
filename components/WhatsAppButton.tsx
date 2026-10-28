"use client";

import React, { useState } from "react";
import { MessageCircle, Sparkles, X } from "lucide-react";

export const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const phoneNumber = "+919876543210";
  const defaultMessage = encodeURIComponent(
    "Hello Royal Botanica Team! 🌿 I would like to consult about organic skincare remedies for my skin type."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="mb-2 bg-white text-forest-950 px-3.5 py-2 rounded-2xl shadow-xl border border-cream-200 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-xs">
          <Sparkles className="w-3.5 h-3.5 text-gold-500 shrink-0" />
          <span className="font-medium">Need free Ayurvedic skin advice? Chat with us!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-charcoal-700 hover:text-charcoal-800 p-0.5 ml-1"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-900/40 transition-all duration-300 transform hover:scale-105 active:scale-95"
        title="Chat on WhatsApp"
        aria-label="WhatsApp Skin Consultation"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">
          Ayurvedic Expert
        </span>
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
      </a>
    </div>
  );
};

