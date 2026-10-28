"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  LayoutDashboard, 
  PackagePlus, 
  Boxes, 
  ShoppingBag, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  TrendingUp, 
  Layers, 
  RefreshCw,
  Eye,
  X,
  Upload,
  Leaf
} from "lucide-react";
import { useProducts, Order } from "@/context/ProductContext";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const SAMPLE_PRESET_IMAGES = [
  { label: "Cleansing Oil / Bottle", url: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80" },
  { label: "Herbal Cream Jar", url: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&w=800&q=80" },
  { label: "Ayurvedic Serum Dropper", url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80" },
  { label: "Botanical Hair Nectar", url: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80" },
  { label: "Sun Fluid Tube", url: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80" },
  { label: "Whipped Body Butter", url: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80" },
];

export default function AdminDashboardPage() {
  const { products, orders, addProduct, updateProduct, deleteProduct, resetToDefaults } = useProducts();
  const { showToast } = useCart();
  
  const [activeTab, setActiveTab] = useState<"overview" | "add-product" | "products" | "orders">("overview");
  const [searchFilter, setSearchFilter] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for Add Product
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    category: "Face Care",
    price: "",
    originalPrice: "",
    size: "50 ml",
    badge: "New Arrival",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
    shortDescription: "",
    fullDescription: "",
    ingredientsText: "Kashmiri Saffron, Cold-Pressed Almond Oil, Aloe Leaf Extract, Vitamin E",
    howToUse: "Gently massage onto cleansed skin in circular motions every morning and night.",
  });

  // Calculate quick metrics
  const totalProductsCount = products.length;
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price || !formData.originalPrice) {
      showToast("Please fill in the required fields! 🌿");
      return;
    }

    const ingredientsList = formData.ingredientsText
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const created = addProduct({
      name: formData.name.trim(),
      tagline: formData.tagline.trim() || "Handcrafted Ayurvedic formulation",
      category: formData.category,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      size: formData.size.trim() || "50 ml",
      badge: formData.badge.trim() || "New Arrival",
      image: formData.image.trim(),
      images: [formData.image.trim()],
      shortDescription: formData.shortDescription.trim() || "Pure hand-blended organic herbal preparation.",
      fullDescription: formData.fullDescription.trim() || formData.shortDescription.trim(),
      ingredients: ingredientsList,
      howToUse: formData.howToUse.trim(),
    });

    showToast(`Published "${created.name}" to storefront! 🌿✨`);
    
    // Reset form & go to inventory list
    setFormData({
      name: "",
      tagline: "",
      category: "Face Care",
      price: "",
      originalPrice: "",
      size: "50 ml",
      badge: "New Arrival",
      image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
      shortDescription: "",
      fullDescription: "",
      ingredientsText: "Kashmiri Saffron, Cold-Pressed Almond Oil, Aloe Leaf Extract, Vitamin E",
      howToUse: "Gently massage onto cleansed skin in circular motions every morning and night.",
    });

    setActiveTab("products");
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      name: editingProduct.name,
      category: editingProduct.category,
      price: Number(editingProduct.price),
      originalPrice: Number(editingProduct.originalPrice),
      size: editingProduct.size,
      badge: editingProduct.badge,
      image: editingProduct.image,
      shortDescription: editingProduct.shortDescription,
    });

    showToast(`Updated "${editingProduct.name}" successfully!`);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from inventory?`)) {
      deleteProduct(id);
      showToast(`Removed "${name}" from storefront.`);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      
      {/* Top Admin Bar */}
      <header className="bg-forest-950 text-cream-50 border-b border-forest-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-gold-300 hover:text-white bg-forest-900/80 px-3 py-1.5 rounded-full border border-forest-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Public Storefront</span>
          </Link>
          <div className="hidden sm:block w-px h-5 bg-forest-800" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gold-400 text-forest-950 flex items-center justify-center font-bold">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif font-bold text-base sm:text-lg leading-none block">
                Royal Botanica Admin
              </span>
              <span className="text-[10px] text-emerald-300/80">
                Inventory &amp; Store Management Portal
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 text-xs border border-emerald-700/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Sync Active
          </span>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 space-y-2 bg-white rounded-3xl p-4 border border-cream-200/90 shadow-sm self-start">
          <div className="text-xs uppercase font-bold tracking-wider text-sage-600 px-3 py-2">
            Control Center
          </div>

          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "overview"
                ? "bg-forest-900 text-cream-50 shadow-md"
                : "text-charcoal-700 hover:bg-cream-100"
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-gold-400" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("add-product")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "add-product"
                ? "bg-forest-900 text-cream-50 shadow-md"
                : "text-charcoal-700 hover:bg-cream-100"
            }`}
          >
            <PackagePlus className="w-4 h-4 text-gold-400" />
            <span>Add New Product</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "products"
                ? "bg-forest-900 text-cream-50 shadow-md"
                : "text-charcoal-700 hover:bg-cream-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <Boxes className="w-4 h-4 text-gold-400" />
              <span>Product Inventory</span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-cream-200 text-forest-950 font-bold">
              {totalProductsCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "orders"
                ? "bg-forest-900 text-cream-50 shadow-md"
                : "text-charcoal-700 hover:bg-cream-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4 text-gold-400" />
              <span>Customer Orders</span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              {totalOrdersCount}
            </span>
          </button>

          <div className="pt-4 mt-4 border-t border-cream-200">
            <button
              onClick={() => {
                if (confirm("Reset inventory to the 8 standard Ayurvedic products?")) {
                  resetToDefaults();
                  showToast("Inventory restored to default botanical products 🌿");
                }
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-charcoal-700 hover:text-rose-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white rounded-3xl p-6 sm:p-8 border border-cream-200/90 shadow-sm">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
                  Apothecary Overview
                </h1>
                <p className="text-xs sm:text-sm text-charcoal-700 mt-1">
                  Real-time metrics for Royal Botanica handmade beauty and wellness storefront.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 shadow-xs">
                  <div className="flex items-center justify-between text-sage-600 mb-2">
                    <span className="text-xs font-semibold uppercase">Total Products</span>
                    <Boxes className="w-4 h-4 text-forest-800" />
                  </div>
                  <div className="text-3xl font-bold font-serif text-forest-950">
                    {totalProductsCount}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium">In active catalog</span>
                </div>

                <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 shadow-xs">
                  <div className="flex items-center justify-between text-sage-600 mb-2">
                    <span className="text-xs font-semibold uppercase">Active Categories</span>
                    <Layers className="w-4 h-4 text-forest-800" />
                  </div>
                  <div className="text-3xl font-bold font-serif text-forest-950">
                    {uniqueCategories.length}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium">Across Skin &amp; Hair</span>
                </div>

                <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 shadow-xs">
                  <div className="flex items-center justify-between text-sage-600 mb-2">
                    <span className="text-xs font-semibold uppercase">Total Orders</span>
                    <ShoppingBag className="w-4 h-4 text-forest-800" />
                  </div>
                  <div className="text-3xl font-bold font-serif text-forest-950">
                    {totalOrdersCount}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium">100% Fulfilled</span>
                </div>

                <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 shadow-xs">
                  <div className="flex items-center justify-between text-sage-600 mb-2">
                    <span className="text-xs font-semibold uppercase">Sales Volume</span>
                    <TrendingUp className="w-4 h-4 text-gold-600" />
                  </div>
                  <div className="text-3xl font-bold font-serif text-forest-950">
                    ₹{totalRevenue}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium">Average order ₹720</span>
                </div>

              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
                
                {/* Left: Quick Actions */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-forest-900 text-cream-50 space-y-4 shadow-md">
                  <span className="text-xs uppercase font-bold tracking-widest text-gold-400">Quick Actions</span>
                  <h3 className="font-serif text-xl font-bold leading-snug">
                    Introduce a New Organic Botanical Creation
                  </h3>
                  <p className="text-xs text-cream-200/80 leading-relaxed">
                    Upload images, set pricing, list herbal active ingredients, and instantly publish directly to the public home page.
                  </p>
                  <button
                    onClick={() => setActiveTab("add-product")}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gold-400 text-forest-950 font-bold text-xs hover:bg-gold-300 transition-all shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Launch New Formulation</span>
                  </button>
                </div>

                {/* Right: Recent Orders Table */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-cream-50 border border-cream-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-base text-forest-950">Recent Orders</h3>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-xs font-semibold text-forest-900 hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div className="divide-y divide-cream-200">
                    {orders.slice(0, 3).map((ord) => (
                      <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-forest-950">{ord.customerName}</p>
                          <p className="text-charcoal-700 text-[11px]">{ord.id} • {ord.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-forest-950 font-serif">₹{ord.total}</p>
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                            {ord.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: ADD PRODUCT MANAGER FORM */}
          {activeTab === "add-product" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-sage-600">Product Manager</span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 mt-0.5">
                  Publish New Botanical Formulation
                </h1>
                <p className="text-xs sm:text-sm text-charcoal-700 mt-1">
                  Newly created products will immediately appear on the storefront grid and will be fully purchasable.
                </p>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-6">
                
                {/* 2-col inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Saffron & Vetiver Glow Mist"
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                    >
                      <option value="Face Care">Face Care</option>
                      <option value="Face Cream">Face Cream</option>
                      <option value="Serums">Serums &amp; Elixirs</option>
                      <option value="Hair Care">Hair Care</option>
                      <option value="Face Gel">Face Gel</option>
                      <option value="Sun Protection">Sun Protection</option>
                      <option value="Body Care">Body Care</option>
                      <option value="Lip Care">Lip Care</option>
                      <option value="Night Cream">Night Cream</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Discounted Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="e.g. 699"
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Original Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      placeholder="e.g. 899"
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Net Volume / Size
                    </label>
                    <input
                      type="text"
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      placeholder="e.g. 100 ml or 50 g"
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Badge Label
                    </label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="e.g. New Launch or 20% Off"
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                    />
                  </div>
                </div>

                {/* Image URL & Live Preview */}
                <div className="space-y-3 p-4 rounded-2xl bg-cream-50 border border-cream-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="block text-xs font-bold text-charcoal-800">
                      Product Image URL * (With Live Preview)
                    </label>
                    <span className="text-[11px] text-sage-600">Pick from presets below or paste custom image link</span>
                  </div>

                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-white border border-cream-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />

                  {/* Preset quick picker */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] text-charcoal-700 font-semibold">Quick Presets:</span>
                    {SAMPLE_PRESET_IMAGES.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setFormData({ ...formData, image: preset.url })}
                        className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                          formData.image === preset.url
                            ? "bg-forest-900 text-white border-forest-900"
                            : "bg-white text-charcoal-700 border-cream-300 hover:bg-cream-200"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {/* Live Image Preview Card */}
                  <div className="mt-2 flex items-center gap-4 p-3 bg-white rounded-xl border border-cream-200">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-cream-200 shrink-0">
                      <Image
                        src={formData.image || SAMPLE_PRESET_IMAGES[0].url}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-forest-950">Live Image Preview</p>
                      <p className="text-charcoal-700 text-[11px] line-clamp-1">
                        {formData.name || "Product Name"} • {formData.category}
                      </p>
                      <p className="text-forest-900 font-bold font-serif mt-0.5">
                        ₹{formData.price || "0"} {formData.originalPrice ? `(₹${formData.originalPrice})` : ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Descriptions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Short Tagline &amp; Catchphrase
                    </label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="e.g. Ultra-Hydrating Cell Awakening Nectar"
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Key Ingredients (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.ingredientsText}
                      onChange={(e) => setFormData({ ...formData, ingredientsText: e.target.value })}
                      placeholder="e.g. Kashmiri Saffron, Cold-Pressed Jojoba, Vitamin E"
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Brief 1-2 sentence overview shown on product cards and preview modal..."
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    How To Use / Application Ritual
                  </label>
                  <textarea
                    rows={2}
                    value={formData.howToUse}
                    onChange={(e) => setFormData({ ...formData, howToUse: e.target.value })}
                    placeholder="Step by step application guide for customers..."
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-end gap-3 border-t border-cream-200">
                  <button
                    type="button"
                    onClick={() => setActiveTab("products")}
                    className="px-6 py-3 rounded-full border border-cream-300 text-xs font-semibold text-charcoal-700 hover:bg-cream-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-forest-900 text-cream-50 font-bold text-sm hover:bg-forest-950 shadow-lg transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold-300" />
                    <span>Publish Product To Storefront</span>
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* TAB 3: PRODUCT MANAGEMENT TABLE */}
          {activeTab === "products" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
                    Product Inventory ({products.length})
                  </h1>
                  <p className="text-xs sm:text-sm text-charcoal-700 mt-0.5">
                    Manage prices, descriptions, and active catalog formulations.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab("add-product")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-900 text-cream-50 font-bold text-xs hover:bg-forest-950 shadow-md shrink-0"
                >
                  <Plus className="w-4 h-4 text-gold-300" />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Table Search Input */}
              <div className="relative">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter inventory by name or category..."
                  className="w-full bg-cream-50 border border-cream-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
                <Search className="w-4 h-4 text-charcoal-700 absolute left-3.5 top-3" />
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-cream-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-cream-100/80 text-forest-950 font-serif font-bold uppercase text-[11px] border-b border-cream-200">
                    <tr>
                      <th className="p-3.5">Product</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5">Badge</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-100">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-cream-50/60 transition-colors">
                        <td className="p-3.5 flex items-center gap-3">
                          <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-cream-200 shrink-0">
                            <Image
                              src={prod.image}
                              alt={prod.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-forest-950 text-sm line-clamp-1">{prod.name}</p>
                            <p className="text-[11px] text-charcoal-700">{prod.size} • ID: {prod.id}</p>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <span className="px-2.5 py-1 rounded-full bg-cream-200 text-forest-950 font-semibold text-[11px]">
                            {prod.category}
                          </span>
                        </td>

                        <td className="p-3.5">
                          <span className="font-bold font-serif text-sm text-forest-950">
                            ₹{prod.price || prod.discountPrice}
                          </span>
                          <span className="text-[11px] text-charcoal-700 line-through ml-1.5">
                            ₹{prod.originalPrice}
                          </span>
                        </td>

                        <td className="p-3.5">
                          {prod.badge ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              {prod.badge}
                            </span>
                          ) : (
                            <span className="text-charcoal-700 text-[11px]">—</span>
                          )}
                        </td>

                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/products/${prod.id}`}
                              target="_blank"
                              className="p-2 rounded-lg text-charcoal-700 hover:text-forest-900 hover:bg-cream-200"
                              title="View on Storefront"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>

                            <button
                              onClick={() => setEditingProduct(prod)}
                              className="p-2 rounded-lg text-charcoal-700 hover:text-forest-900 hover:bg-cream-200"
                              title="Edit Formulation"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteProduct(prod.id, prod.name)}
                              className="p-2 rounded-lg text-charcoal-700 hover:text-rose-600 hover:bg-rose-50"
                              title="Delete from Catalog"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 4: ORDERS */}
          {activeTab === "orders" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
                  Customer Orders ({orders.length})
                </h1>
                <p className="text-xs sm:text-sm text-charcoal-700 mt-0.5">
                  Live dispatch management for Pan-India express deliveries.
                </p>
              </div>

              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-2xl bg-cream-50 border border-cream-200 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-cream-200">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-sage-600">Order ID</span>
                        <h4 className="font-bold text-forest-950 text-base">{order.id}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-charcoal-700">{order.date}</span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
                      <div>
                        <p className="font-semibold text-charcoal-800">Customer: {order.customerName}</p>
                        <p className="text-charcoal-700 mt-0.5">Payment: {order.paymentMethod} • Shipping: FREE</p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-charcoal-700 block">Total Amount</span>
                        <span className="text-lg font-bold font-serif text-forest-950">₹{order.total}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-cream-200/80">
                      <p className="text-[11px] font-semibold text-sage-700 mb-1">Ordered Formulations:</p>
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, i) => (
                          <span
                            key={i}
                            className="text-[11px] bg-white px-2.5 py-1 rounded-lg border border-cream-200 text-forest-950 font-medium"
                          >
                            {item.quantity}x {item.productName} (₹{item.price})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-cream-50 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-cream-200">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-cream-200 text-charcoal-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-forest-950 mb-1">
              Edit Product Formulation
            </h3>
            <p className="text-xs text-charcoal-700 mb-5">
              Update pricing, badge, or details for {editingProduct.name}.
            </p>

            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-800 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-white border border-cream-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price || editingProduct.discountPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-white border border-cream-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.originalPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                    className="w-full bg-white border border-cream-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">Badge</label>
                  <input
                    type="text"
                    value={editingProduct.badge || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="w-full bg-white border border-cream-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">Size / Volume</label>
                  <input
                    type="text"
                    value={editingProduct.size}
                    onChange={(e) => setEditingProduct({ ...editingProduct, size: e.target.value })}
                    className="w-full bg-white border border-cream-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-800 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full bg-white border border-cream-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-full border border-cream-300 text-xs font-semibold text-charcoal-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-forest-900 text-cream-50 text-xs font-semibold hover:bg-forest-950"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

