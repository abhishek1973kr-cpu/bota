"use client";

import React from "react";
import { Leaf, HeartHandshake, Layers, Activity, Sparkles } from "lucide-react";

export const Features = () => {
  const usps = [
    {
      icon: Leaf,
      title: "Natural & Chemical-Free",
      desc: "Zero parabens, SLS, silicones, artificial fragrances, or toxic preservatives.",
      color: "text-emerald-700 bg-emerald-100/70",
    },
    {
      icon: HeartHandshake,
      title: "Cruelty-Free & Eco-Friendly",
      desc: "Never tested on animals. Packaged in recyclable amber glass & compostable boxes.",
      color: "text-rose-700 bg-rose-100/70",
    },
    {
      icon: Layers,
      title: "Comprehensive Range",
      desc: "Over 500 hand-blended solutions addressing every unique Indian skin & hair concern.",
      color: "text-amber-700 bg-amber-100/70",
    },
    {
      icon: Activity,
      title: "Clinical Efficacy",
      desc: "Time-tested Ayurvedic herbs clinically validated for visible skin texture transformation.",
      color: "text-sky-700 bg-sky-100/70",
    },
    {
      icon: Sparkles,
      title: "Innovative Formulations",
      desc: "Synergistic union of ancient Vedic rasayanas with modern green biotics.",
      color: "text-purple-700 bg-purple-100/70",
    },
  ];

  return (
    <section className="bg-cream-100/80 border-b border-cream-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {usps.map((usp, idx) => {
            const IconComponent = usp.icon;
            return (
              <div
                key={idx}
                className="bg-cream-50 p-5 rounded-2xl border border-cream-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${usp.color}`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-base text-forest-950 mb-1">
                  {usp.title}
                </h3>
                <p className="text-xs text-charcoal-700 leading-relaxed">
                  {usp.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

