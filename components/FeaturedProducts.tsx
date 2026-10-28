"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Heart, Eye, Check, ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";

export const FeaturedProducts = () => {
  const { addToCart, toggleWishlist, isInWishlist, searchQuery } = useCart();
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedIds, setAddedIds] = useState<{ [id: string]: boolean }>({});

  const categories = ["All", "Face Care", "Face Cream", "Serums", "Hair Care", "Body Care", "Lip Care", "Night Cream", "Sun Protection"];

  // Filter products by category and active search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(product);
  };

  return (
    <section id="products" className="py-16 lg:py-24 bg-cream-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/10 text-forest-900 text-xs font-semibold mb-2">
              <span>Botanical Bestsellers</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
              Curated Natural Formulations
            </h2>
            <p className="text-charcoal-700 text-sm sm:text-base mt-1 max-w-xl">
              Handcrafted in small hygienic batches with farm-fresh herbs, cold-pressed oils, and zero synthetic fillers.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-forest-900 text-cream-50 shadow-md"
                    : "bg-cream-200/70 text-charcoal-800 hover:bg-cream-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Notice if applicable */}
        {searchQuery && (
          <div className="mb-6 p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-sm flex items-center justify-between">
            <span>
              Showing results matching: <strong>&ldquo;{searchQuery}&rdquo;</strong> ({filteredProducts.length} items found)
            </span>
          </div>
        )}

        {/* Product Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-cream-100 rounded-3xl border border-cream-200">
            <p className="text-lg font-serif text-forest-950 font-semibold">No botanical products found</p>
            <p className="text-sm text-charcoal-700 mt-1">Try resetting the category filter or searching for another herb.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-forest-900 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inWishlist = isInWishlist(product.id);
              const isJustAdded = addedIds[product.id];

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-cream-200/90 shadow-sm hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-square bg-cream-100 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-forest-900 text-gold-300 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wider">
                        {product.badge}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => handleToggleWishlist(e, product)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md z-10 ${
                        inWishlist
                          ? "bg-rose-50 text-rose-600 scale-110"
                          : "bg-white/80 text-charcoal-700 hover:text-rose-600 hover:bg-white"
                      }`}
                      aria-label="Wishlist toggle"
                    >
                      <Heart className={`w-4 h-4 ${inWishlist ? "fill-rose-600" : ""}`} />
                    </button>

                    {/* Quick View Pill */}
                    <button
                      onClick={(e) => handleQuickView(e, product)}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/95 text-forest-950 text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 hover:bg-forest-900 hover:text-white z-10"
                    >
                      <Eye className="w-3.5 h-3.5" /> Quick View
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-sage-600 font-medium mb-1">
                        <span>{product.category}</span>
                        <span>{product.size}</span>
                      </div>

                      <h3 className="font-serif font-bold text-lg text-forest-950 group-hover:text-forest-800 transition-colors line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-xs text-charcoal-700/80 mt-1 line-clamp-1">
                        {product.tagline}
                      </p>

                      {/* Ratings */}
                      <div className="flex items-center gap-1.5 mt-2.5">
                        <div className="flex items-center text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(product.rating)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-cream-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-charcoal-800">
                          {product.rating}
                        </span>
                        <span className="text-[11px] text-charcoal-700">
                          ({product.reviewCount || product.ratingCount})
                        </span>
                      </div>
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="pt-4 mt-3 border-t border-cream-100 flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-bold text-forest-950 font-serif">
                            ₹{product.price || product.discountPrice}
                          </span>
                          <span className="text-xs text-charcoal-700 line-through">
                            ₹{product.originalPrice}
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-800 font-semibold">
                          Save ₹{product.originalPrice - (product.price || product.discountPrice)} ({product.discount || `${product.discountPercentage}% OFF`})
                        </span>
                      </div>

                      {/* Add To Cart Button */}
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all duration-300 transform active:scale-95 shadow-sm z-10 ${
                          isJustAdded
                            ? "bg-emerald-600 text-white"
                            : "bg-forest-900 text-cream-50 hover:bg-forest-950 hover:shadow-md"
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-4 h-4" /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-gold-300" /> Add To Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-cream-50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-cream-200 overflow-hidden">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream-200 text-charcoal-800 hover:bg-cream-300 flex items-center justify-center font-bold text-lg"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream-200">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-sage-600">
                  {selectedProduct.category} • {selectedProduct.size}
                </span>

                <h3 className="font-serif text-2xl font-bold text-forest-950">
                  {selectedProduct.name}
                </h3>

                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                  {selectedProduct.shortDescription || selectedProduct.fullDescription}
                </p>

                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-forest-950">
                    {selectedProduct.rating} / 5 ({selectedProduct.reviewCount || selectedProduct.ratingCount} reviews)
                  </span>
                </div>

                <div className="flex items-baseline gap-2 pt-2 border-t border-cream-200">
                  <span className="text-2xl font-bold font-serif text-forest-950">
                    ₹{selectedProduct.price || selectedProduct.discountPrice}
                  </span>
                  <span className="text-sm text-charcoal-700 line-through">
                    ₹{selectedProduct.originalPrice}
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {selectedProduct.discount || `${selectedProduct.discountPercentage}% OFF`}
                  </span>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        addToCart(selectedProduct, 1);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 py-3 px-4 rounded-xl bg-forest-900 text-white font-semibold text-sm hover:bg-forest-950 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <ShoppingBag className="w-4 h-4 text-gold-300" /> Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(selectedProduct)}
                      className="p-3 rounded-xl border border-cream-300 text-charcoal-800 hover:text-rose-600 hover:bg-cream-100"
                    >
                      <Heart className={`w-5 h-5 ${isInWishlist(selectedProduct.id) ? "fill-rose-600 text-rose-600" : ""}`} />
                    </button>
                  </div>
                  
                  <Link
                    href={`/products/${selectedProduct.id}`}
                    onClick={() => setSelectedProduct(null)}
                    className="text-center py-2.5 text-xs font-semibold text-forest-900 hover:text-forest-700 flex items-center justify-center gap-1"
                  >
                    <span>View Full Product Details &amp; Ingredients</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
