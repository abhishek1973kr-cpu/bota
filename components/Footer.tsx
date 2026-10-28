"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Leaf, 
  MapPin, 
  Mail, 
  Phone, 
  Send, 
  ShieldCheck, 
  Check, 
  Instagram, 
  Facebook, 
  Youtube, 
  CreditCard 
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useCart();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    showToast("Thank you for joining our Ayurvedic Circle! 🌿");
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-forest-950 text-cream-100 pt-16 pb-12 border-t-4 border-gold-500/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Card */}
        <div className="bg-forest-900/80 rounded-3xl p-8 sm:p-10 mb-16 border border-forest-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gold-400/10 blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-gold-400">Join The Herbal Circle</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50">
                Receive 15% Off Your First Botanical Order
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/80">
                Subscribe for private invitations to seasonal wild-harvest batches, Ayurvedic beauty consultations, and wellness guides.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-1 bg-forest-950/90 border border-forest-700 text-cream-50 placeholder-emerald-300/40 text-sm rounded-full px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-gold-400 text-forest-950 font-bold text-sm hover:bg-gold-300 transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-4 h-4" /> Subscribed!
                    </>
                  ) : (
                    <>
                      <span>Join Now</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Multi-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-forest-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gold-400 text-forest-950 flex items-center justify-center font-bold shadow-md">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-cream-50 tracking-tight">
                Royal Botanica
              </span>
            </div>

            <p className="text-xs sm:text-sm text-emerald-200/70 leading-relaxed">
              Hand-blended organic beauty and wellness apothecary. Inspired by centuries-old Vedic recipes, ethically formulated for wholesome skin and lustrous hair.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-forest-900 hover:bg-gold-400 hover:text-forest-950 transition-colors flex items-center justify-center text-cream-200">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-forest-900 hover:bg-gold-400 hover:text-forest-950 transition-colors flex items-center justify-center text-cream-200">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-forest-900 hover:bg-gold-400 hover:text-forest-950 transition-colors flex items-center justify-center text-cream-200">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-base font-bold text-cream-50">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-200/80">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-gold-300 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("about")} className="hover:text-gold-300 transition-colors">
                  Our Brand Story
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("products")} className="hover:text-gold-300 transition-colors">
                  Bestseller Products
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("categories")} className="hover:text-gold-300 transition-colors">
                  Shop By Category
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("testimonials")} className="hover:text-gold-300 transition-colors">
                  Customer Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-cream-50">Customer Care</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-200/80">
              <li className="hover:text-gold-300 cursor-pointer">Shipping &amp; Delivery Policy</li>
              <li className="hover:text-gold-300 cursor-pointer">15-Day Return &amp; Refund Guarantee</li>
              <li className="hover:text-gold-300 cursor-pointer">Privacy &amp; Cookie Policy</li>
              <li className="hover:text-gold-300 cursor-pointer">Terms &amp; Conditions</li>
              <li className="hover:text-gold-300 cursor-pointer">Track Your Order Status</li>
              <li className="hover:text-gold-300 cursor-pointer">Ayurvedic Dosha Skin Quiz</li>
            </ul>
          </div>

          {/* Col 4: Contact Details (Asansol Store) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-cream-50">Flagship Apothecary</h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-emerald-200/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Royal Botanica, Shristinagar, Asansol, West Bengal - 713305, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+91 98765 43210 / +91 87654 32109</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>care@royalbotanica.com</span>
              </div>
              <div className="p-3 bg-forest-900 rounded-xl border border-forest-800 text-[11px] text-cream-200">
                <p className="font-bold text-gold-300">Consultation Hours:</p>
                <p>Mon - Sat: 10:00 AM – 7:30 PM IST</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Payment Partner Badges & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-300/60">
          <div>
            &copy; {new Date().getFullYear()} Royal Botanica Inc. All rights reserved. Handcrafted with love in India.
          </div>

          {/* Payment Partner Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-medium mr-1 text-emerald-200/80">100% Secure Checkout:</span>
            <span className="px-2.5 py-1 rounded-md bg-forest-900 border border-forest-800 text-[11px] font-bold text-white">
              UPI
            </span>
            <span className="px-2.5 py-1 rounded-md bg-forest-900 border border-forest-800 text-[11px] font-bold text-white">
              RuPay
            </span>
            <span className="px-2.5 py-1 rounded-md bg-forest-900 border border-forest-800 text-[11px] font-bold text-white">
              VISA
            </span>
            <span className="px-2.5 py-1 rounded-md bg-forest-900 border border-forest-800 text-[11px] font-bold text-white">
              Mastercard
            </span>
            <span className="px-2.5 py-1 rounded-md bg-forest-900 border border-forest-800 text-[11px] font-bold text-white">
              NetBanking
            </span>
            <span className="px-2.5 py-1 rounded-md bg-forest-900 border border-forest-800 text-[11px] font-bold text-gold-400">
              COD Available
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

