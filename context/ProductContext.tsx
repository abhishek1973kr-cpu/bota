"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, FEATURED_PRODUCTS, Review } from "@/data/products";

export interface Order {
  id: string;
  customerName: string;
  items: { productName: string; quantity: number; price: number }[];
  total: number;
  status: "Pending" | "Dispatched" | "Delivered";
  date: string;
  paymentMethod: string;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: "RB-849201",
    customerName: "Debalina Das",
    items: [{ productName: "Hemp Cleansing Oil", quantity: 1, price: 749 }],
    total: 749,
    status: "Dispatched",
    date: "Today, 10:30 AM",
    paymentMethod: "UPI",
  },
  {
    id: "RB-719324",
    customerName: "Anurpeeta Mandal",
    items: [
      { productName: "Kumkumadi Youth Elixir", quantity: 1, price: 1199 },
      { productName: "Beetroot Glow Lip Butter", quantity: 1, price: 329 },
    ],
    total: 1528,
    status: "Delivered",
    date: "Yesterday, 4:15 PM",
    paymentMethod: "Card",
  },
  {
    id: "RB-512093",
    customerName: "Sritoma Das",
    items: [{ productName: "Bhringraj & Rosemary Nectar", quantity: 2, price: 1398 }],
    total: 1398,
    status: "Pending",
    date: "Yesterday, 11:20 AM",
    paymentMethod: "COD",
  },
];

interface ProductContextType {
  products: Product[];
  orders: Order[];
  addProduct: (productData: Partial<Product>) => Product;
  updateProduct: (id: string, productData: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetToDefaults: () => void;
  getProductById: (id: string) => Product | undefined;
  addReviewToProduct: (productId: string, review: Review) => void;
  isLoaded: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(FEATURED_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load products & orders from localStorage
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem("royal_botanica_products_v2");
      const savedOrders = localStorage.getItem("royal_botanica_orders_v2");
      
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      } else {
        localStorage.setItem("royal_botanica_products_v2", JSON.stringify(FEATURED_PRODUCTS));
      }

      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        localStorage.setItem("royal_botanica_orders_v2", JSON.stringify(INITIAL_ORDERS));
      }
    } catch (e) {
      console.error("Failed to load products from storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save products to localStorage on changes
  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem("royal_botanica_products_v2", JSON.stringify(newProducts));
    } catch (e) {
      console.error("Failed to save products", e);
    }
  };

  const addProduct = (data: Partial<Product>): Product => {
    const rawName = data.name || "Botanical Formulation";
    const slug = rawName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    
    // Ensure unique ID
    const uniqueId = `${slug}-${Date.now().toString().slice(-4)}`;
    const originalPrice = Number(data.originalPrice) || 999;
    const price = Number(data.price) || Number(data.discountPrice) || Math.round(originalPrice * 0.85);
    const discountPercentage = Math.max(0, Math.round(((originalPrice - price) / originalPrice) * 100));

    const newProduct: Product = {
      id: uniqueId,
      name: rawName,
      tagline: data.tagline || "Organic Small-Batch Formulation",
      category: data.category || "Face Care",
      price: price,
      discountPrice: price,
      originalPrice: originalPrice,
      discount: data.discount || `${discountPercentage}% OFF`,
      discountPercentage: discountPercentage,
      rating: data.rating || 5.0,
      reviewCount: 1,
      ratingCount: 1,
      badge: data.badge || "New Arrival",
      image: data.image || "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
      images: data.images && data.images.length > 0
        ? data.images
        : [
            data.image || "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
          ],
      shortDescription: data.shortDescription || data.description || "Freshly hand-blended organic botanical creation crafted without synthetic chemicals.",
      fullDescription: data.fullDescription || data.shortDescription || "Prepared with traditional Vedic slow-infusion methods to nourish skin back to its natural equilibrium.",
      ingredients: data.ingredients && data.ingredients.length > 0
        ? data.ingredients
        : ["Pure Botanical Extracts", "Cold-Pressed Seed Oils", "Plant Vitamin E"],
      howToUse: data.howToUse || "Apply 2-3 drops or a coin-sized amount to cleansed face and neck morning and evening.",
      size: data.size || "50 ml",
      inStock: data.inStock !== undefined ? data.inStock : true,
      reviews: [
        {
          id: `rev-${Date.now()}`,
          author: "Royal Botanica Herbalist",
          rating: 5,
          date: "Just launched",
          comment: "Fresh small-batch formulation tested for pure Ayurvedic potency and stability.",
          verified: true,
        },
      ],
    };

    const updatedList = [newProduct, ...products];
    saveProducts(updatedList);
    return newProduct;
  };

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    const updatedList = products.map((p) => {
      if (p.id === id) {
        const originalPrice = updatedData.originalPrice !== undefined ? Number(updatedData.originalPrice) : p.originalPrice;
        const price = updatedData.price !== undefined 
          ? Number(updatedData.price) 
          : (updatedData.discountPrice !== undefined ? Number(updatedData.discountPrice) : p.price);
        const discountPercentage = Math.max(0, Math.round(((originalPrice - price) / originalPrice) * 100));

        return {
          ...p,
          ...updatedData,
          price,
          discountPrice: price,
          originalPrice,
          discountPercentage,
          discount: `${discountPercentage}% OFF`,
        };
      }
      return p;
    });

    saveProducts(updatedList);
  };

  const deleteProduct = (id: string) => {
    const updatedList = products.filter((p) => p.id !== id);
    saveProducts(updatedList);
  };

  const resetToDefaults = () => {
    saveProducts(FEATURED_PRODUCTS);
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  const addReviewToProduct = (productId: string, review: Review) => {
    const updatedList = products.map((p) => {
      if (p.id === productId) {
        const existingReviews = p.reviews || [];
        const newReviews = [review, ...existingReviews];
        const newCount = (p.reviewCount || existingReviews.length) + 1;
        const totalRating = newReviews.reduce((sum, r) => sum + r.rating, 0);
        const newRating = Number((totalRating / newReviews.length).toFixed(1));

        return {
          ...p,
          reviews: newReviews,
          reviewCount: newCount,
          ratingCount: newCount,
          rating: newRating,
        };
      }
      return p;
    });

    saveProducts(updatedList);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaults,
        getProductById,
        addReviewToProduct,
        isLoaded,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

