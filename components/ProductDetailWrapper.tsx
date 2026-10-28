"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Leaf } from "lucide-react";
import { Product } from "@/data/products";
import { useProducts } from "@/context/ProductContext";
import { ProductDetailClient } from "./ProductDetailClient";

interface ProductDetailWrapperProps {
  id: string;
  initialProduct?: Product;
}

export const ProductDetailWrapper: React.FC<ProductDetailWrapperProps> = ({
  id,
  initialProduct,
}) => {
  const { getProductById, products, isLoaded } = useProducts();
  const product = getProductById(id) || initialProduct;
  const relatedProducts = products.filter((p) => p.id !== id).slice(0, 3);

  if (!product && isLoaded) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-cream-50">
        <div className="w-16 h-16 rounded-full bg-forest-900/10 text-forest-900 flex items-center justify-center mb-4">
          <Leaf className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-forest-950 mb-2">
          Botanical Formulation Not Found
        </h2>
        <p className="text-sm text-charcoal-700 max-w-md mb-6">
          This organic formulation may have been archived or is temporarily out of season at our apothecary.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-900 text-cream-50 text-xs font-semibold hover:bg-forest-950 shadow-md transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-gold-300" />
          <span>Return To Botanical Storefront</span>
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-cream-50">
        <div className="flex items-center gap-2 text-forest-900 font-medium text-sm">
          <Sparkles className="w-5 h-5 text-gold-500 animate-spin" />
          <span>Infusing Botanical Details...</span>
        </div>
      </div>
    );
  }

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
};

