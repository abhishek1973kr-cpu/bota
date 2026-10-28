"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  Search, 
  Heart, 
  User, 
  ShoppingBag, 
  Menu, 
  X, 
  Leaf, 
  PhoneCall,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsAccountOpen, 
    searchQuery, 
    setSearchQuery 
  } = useCart();

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.push("/#products");
    } else {
      const el = document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-md border-b border-cream-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-charcoal-800 hover:text-forest-900 hover:bg-cream-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-forest-900 text-gold-300 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-gold-400 fill-gold-400/20" />
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-forest-900 block leading-tight">
                Royal Botanica
              </span>
              <span className="text-[10px] uppercase tracking-widest text-sage-600 font-semibold block -mt-1">
                Pure Organic Alchemy
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search herbal face cream, ubtan, serums..."
                className="w-full bg-cream-100 border border-cream-300 text-charcoal-800 placeholder-charcoal-700/60 text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent transition-all"
              />
              <Search className="w-4 h-4 text-charcoal-700/60 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-3 text-xs text-charcoal-700/60 hover:text-charcoal-900"
                >
                  Clear
                </button>
              )}
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-7 text-sm font-medium text-charcoal-800">
            <Link
              href="/"
              className="hover:text-forest-900 transition-colors"
            >
              Home
            </Link>
            <button
              onClick={() => handleNavClick("about")}
              className="hover:text-forest-900 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick("products")}
              className="hover:text-forest-900 transition-colors"
            >
              Products
            </button>
            <button
              onClick={() => handleNavClick("categories")}
              className="hover:text-forest-900 transition-colors"
            >
              Categories
            </button>
            <button
              onClick={() => handleNavClick("testimonials")}
              className="hover:text-forest-900 transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="hover:text-forest-900 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-full text-charcoal-800 hover:text-forest-900 hover:bg-cream-200 transition-colors"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account */}
            <button
              onClick={() => setIsAccountOpen(true)}
              className="p-2.5 rounded-full text-charcoal-800 hover:text-forest-900 hover:bg-cream-200 transition-colors"
              title="My Account"
              aria-label="My Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-forest-900 text-cream-50 hover:bg-forest-950 px-3.5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-95"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-gold-300" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-gold-400 text-forest-950 text-xs font-bold rounded-full flex items-center justify-center shadow-inner">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Dashboard Button */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-forest-900 text-gold-300 hover:bg-forest-950 hover:text-white text-xs font-bold shadow-md border border-gold-400/40 transition-all transform hover:scale-105 active:scale-95"
              title="Go to Admin Dashboard"
            >
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Admin</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar below header */}
        <div className="lg:hidden pb-3 pt-1">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search organic skincare..."
              className="w-full bg-cream-100 border border-cream-300 text-charcoal-800 placeholder-charcoal-700/60 text-sm rounded-full pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-forest-800"
            />
            <Search className="w-4 h-4 text-charcoal-700/60 absolute left-3 top-2.5" />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-50 border-b border-cream-300 px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="flex flex-col space-y-2 text-base font-medium text-charcoal-800">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left px-3 py-2 rounded-lg hover:bg-cream-200"
            >
              Home
            </Link>
            <button
              onClick={() => handleNavClick("about")}
              className="text-left px-3 py-2 rounded-lg hover:bg-cream-200"
            >
              About Royal Botanica
            </button>
            <button
              onClick={() => handleNavClick("products")}
              className="text-left px-3 py-2 rounded-lg hover:bg-cream-200"
            >
              Bestseller Products
            </button>
            <button
              onClick={() => handleNavClick("categories")}
              className="text-left px-3 py-2 rounded-lg hover:bg-cream-200"
            >
              Shop By Categories
            </button>
            <button
              onClick={() => handleNavClick("testimonials")}
              className="text-left px-3 py-2 rounded-lg hover:bg-cream-200"
            >
              Customer Reviews
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="text-left px-3 py-2 rounded-lg hover:bg-cream-200"
            >
              Contact Us &amp; Asansol Store
            </button>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-left px-3 py-2.5 rounded-xl bg-forest-900 text-gold-300 font-bold hover:bg-forest-950 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Admin Dashboard</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-cream-200 flex items-center justify-between text-xs text-charcoal-700">
            <span className="flex items-center gap-1.5 font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-forest-700" /> +91 98765 43210
            </span>
            <span className="flex items-center gap-1 text-forest-800 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" /> Handmade in India
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
