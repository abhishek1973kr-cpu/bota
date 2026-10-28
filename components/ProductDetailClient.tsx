"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Zap, 
  ShieldCheck, 
  Leaf, 
  Truck, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Minus, 
  Sparkles,
  Check,
  Share2,
  Award
} from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ProductReviews } from "./ProductReviews";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
  relatedProducts,
}) => {
  const { addToCart, buyNow, toggleWishlist, isInWishlist, showToast } = useCart();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"ingredients" | "howToUse" | "shipping">("ingredients");
  const [openAccordion, setOpenAccordion] = useState<{ [key: string]: boolean }>({
    ingredients: true,
    howToUse: false,
    shipping: false,
  });

  const inWishlist = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard! 📋");
    }
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-cream-50 min-h-screen pb-20">
      
      {/* Breadcrumb Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-charcoal-700">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-forest-900 transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/#products" className="hover:text-forest-900 transition-colors">
              Products
            </Link>
          </li>
          <li>/</li>
          <li>
            <span className="text-sage-700 font-medium">{product.category}</span>
          </li>
          <li>/</li>
          <li className="text-forest-950 font-bold truncate max-w-[200px] sm:max-w-xs">
            {product.name}
          </li>
        </ol>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        
        {/* 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Visual Gallery & Trust Badges */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Main High-Res Image Display */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-cream-200 shadow-sm group">
              <Image
                src={images[selectedImageIndex] || product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Discount / Bestseller Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.badge && (
                  <span className="bg-forest-900 text-gold-300 text-xs font-bold px-3 py-1.5 rounded-full shadow-md tracking-wider">
                    {product.badge}
                  </span>
                )}
                <span className="bg-emerald-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {product.discount || `${product.discountPercentage}% OFF`}
                </span>
              </div>

              {/* Wishlist and Share Floating Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                    inWishlist
                      ? "bg-rose-50 text-rose-600 scale-110"
                      : "bg-white/80 text-charcoal-700 hover:text-rose-600 hover:bg-white"
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? "fill-rose-600 text-rose-600" : ""}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white/80 hover:bg-white text-charcoal-700 hover:text-forest-900 shadow-md transition-all"
                  aria-label="Share product"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Previews */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-white ${
                      selectedImageIndex === idx
                        ? "border-forest-900 ring-2 ring-forest-900/20 scale-105"
                        : "border-cream-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges Underneath Visuals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="p-3.5 rounded-2xl bg-white border border-cream-200 text-center flex flex-col items-center shadow-xs">
                <Leaf className="w-5 h-5 text-emerald-700 mb-1" />
                <span className="text-[11px] font-bold text-forest-950">100% Natural</span>
                <span className="text-[9px] text-charcoal-700">Certified Herbal</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-cream-200 text-center flex flex-col items-center shadow-xs">
                <ShieldCheck className="w-5 h-5 text-rose-600 mb-1" />
                <span className="text-[11px] font-bold text-forest-950">Cruelty-Free</span>
                <span className="text-[9px] text-charcoal-700">Never Tested on Animals</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-cream-200 text-center flex flex-col items-center shadow-xs">
                <Sparkles className="w-5 h-5 text-amber-600 mb-1" />
                <span className="text-[11px] font-bold text-forest-950">Handcrafted</span>
                <span className="text-[9px] text-charcoal-700">Small Micro-Batches</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-cream-200 text-center flex flex-col items-center shadow-xs">
                <Award className="w-5 h-5 text-forest-800 mb-1" />
                <span className="text-[11px] font-bold text-forest-950">Zero Toxins</span>
                <span className="text-[9px] text-charcoal-700">Paraben &amp; Sulphate Free</span>
              </div>
            </div>

          </div>

          {/* Right Column: Product Info, Pricing, Accordions & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Title & Tagline */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs uppercase tracking-widest font-bold text-sage-600">
                  {product.category} • {product.size}
                </span>
                <span className="inline-block w-1 h-1 rounded-full bg-forest-900/40" />
                <span className="text-xs text-emerald-700 font-semibold">
                  In Stock &amp; Ready to Ship
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 leading-tight">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base text-charcoal-700 mt-1 italic">
                {product.tagline}
              </p>

              {/* Ratings */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-cream-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-forest-950">
                  {product.rating} / 5.0
                </span>
                <span className="text-xs text-charcoal-700 underline cursor-pointer">
                  ({product.reviewCount || product.ratingCount} Customer Reviews)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-white border border-cream-200 shadow-sm flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-bold font-serif text-forest-950">
                    ₹{product.price || product.discountPrice}
                  </span>
                  <span className="text-base text-charcoal-700 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                    {product.discount || `${product.discountPercentage}% OFF`}
                  </span>
                </div>
                <p className="text-[11px] text-charcoal-700 mt-1">
                  Inclusive of all taxes. Free shipping on this order.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-gold-600 block">Net Vol.</span>
                <span className="text-sm font-semibold text-charcoal-800">{product.size}</span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-charcoal-800 leading-relaxed">
              {product.shortDescription || product.fullDescription}
            </p>

            {/* Quantity Selector & Action CTAs */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800">
                  Quantity:
                </span>
                
                <div className="flex items-center border border-cream-300 rounded-full bg-white px-2 py-1 shadow-xs">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-1.5 rounded-full hover:bg-cream-100 text-charcoal-700 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-forest-950">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-1.5 rounded-full hover:bg-cream-100 text-charcoal-700 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs text-sage-700">
                  Subtotal: <strong className="text-forest-950">₹{(product.price || product.discountPrice) * quantity}</strong>
                </span>
              </div>

              {/* CTAs: Add to Cart and Buy Now */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="py-4 px-6 rounded-full bg-forest-900 text-cream-50 font-bold text-sm hover:bg-forest-950 transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <ShoppingBag className="w-4 h-4 text-gold-300 group-hover:scale-110 transition-transform" />
                  <span>Add To Cart</span>
                </button>

                <button
                  onClick={() => buyNow(product, quantity)}
                  className="py-4 px-6 rounded-full bg-gold-400 text-forest-950 font-bold text-sm hover:bg-gold-300 transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <Zap className="w-4 h-4 text-forest-950 fill-forest-950" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

            {/* Accordion Sections for Ingredients, How to Use, Policies */}
            <div className="pt-4 border-t border-cream-200 space-y-3">
              
              {/* Accordion 1: Ingredients & Formulation */}
              <div className="bg-white rounded-2xl border border-cream-200/90 overflow-hidden">
                <button
                  onClick={() => toggleAccordion("ingredients")}
                  className="w-full p-4 text-left font-serif font-bold text-forest-950 flex items-center justify-between hover:bg-cream-100/50 transition-colors"
                >
                  <span className="flex items-center gap-2 text-sm sm:text-base">
                    <Leaf className="w-4 h-4 text-forest-700" />
                    Ingredients &amp; Botanical Formulation
                  </span>
                  {openAccordion.ingredients ? (
                    <ChevronUp className="w-4 h-4 text-charcoal-700" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-charcoal-700" />
                  )}
                </button>
                {openAccordion.ingredients && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-charcoal-700 space-y-3 animate-in fade-in duration-200">
                    <p className="leading-relaxed">
                      {product.fullDescription}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.ingredients?.map((ing, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-cream-100 text-forest-950 text-xs font-medium border border-cream-200"
                        >
                          🌿 {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: How to Use / Application Guide */}
              <div className="bg-white rounded-2xl border border-cream-200/90 overflow-hidden">
                <button
                  onClick={() => toggleAccordion("howToUse")}
                  className="w-full p-4 text-left font-serif font-bold text-forest-950 flex items-center justify-between hover:bg-cream-100/50 transition-colors"
                >
                  <span className="flex items-center gap-2 text-sm sm:text-base">
                    <Sparkles className="w-4 h-4 text-forest-700" />
                    How to Use / Application Ritual
                  </span>
                  {openAccordion.howToUse ? (
                    <ChevronUp className="w-4 h-4 text-charcoal-700" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-charcoal-700" />
                  )}
                </button>
                {openAccordion.howToUse && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-charcoal-700 leading-relaxed space-y-2 animate-in fade-in duration-200">
                    <p>{product.howToUse}</p>
                    <div className="p-3 rounded-xl bg-amber-50/80 text-[11px] text-amber-900 border border-amber-200/70">
                      <strong>Ayurvedic Tip:</strong> Always perform a 24-hour patch test before introducing new organic facial elixirs to sensitive skin types.
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Return Policy */}
              <div className="bg-white rounded-2xl border border-cream-200/90 overflow-hidden">
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full p-4 text-left font-serif font-bold text-forest-950 flex items-center justify-between hover:bg-cream-100/50 transition-colors"
                >
                  <span className="flex items-center gap-2 text-sm sm:text-base">
                    <Truck className="w-4 h-4 text-forest-700" />
                    Shipping &amp; 15-Day Return Policy
                  </span>
                  {openAccordion.shipping ? (
                    <ChevronUp className="w-4 h-4 text-charcoal-700" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-charcoal-700" />
                  )}
                </button>
                {openAccordion.shipping && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-charcoal-700 leading-relaxed space-y-2 animate-in fade-in duration-200">
                    <p>
                      • <strong>Free Pan-India Delivery:</strong> On all orders above ₹500. Standard dispatch within 24 hours from our Asansol apothecary.
                    </p>
                    <p>
                      • <strong>15-Day Quality Guarantee:</strong> If our botanical remedy does not suit your skin type, return the remaining portion within 15 days for a no-questions-asked refund or exchange.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Product Customer Reviews Section */}
        <div className="mt-16">
          <ProductReviews
            productId={product.id}
            productName={product.name}
            initialReviews={product.reviews || []}
            rating={product.rating}
            reviewCount={product.reviewCount || product.ratingCount}
          />
        </div>

        {/* Related Botanical Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-cream-200">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs uppercase font-bold tracking-widest text-sage-600">
                Holistic Combinations
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 mt-1">
                You May Also Nurture With
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-cream-200 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all p-4 flex gap-4 items-center"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-100 shrink-0">
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-sage-600 font-semibold">{rel.category}</span>
                    <h4 className="font-serif font-bold text-forest-950 text-sm truncate group-hover:text-forest-700">
                      {rel.name}
                    </h4>
                    <p className="text-xs font-bold text-forest-900 mt-1">
                      ₹{rel.price || rel.discountPrice}{" "}
                      <span className="text-charcoal-700 font-normal line-through text-[11px]">
                        ₹{rel.originalPrice}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
