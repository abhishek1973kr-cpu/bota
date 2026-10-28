import type { Metadata } from "next";
import { FEATURED_PRODUCTS } from "@/data/products";
import { ProductDetailWrapper } from "@/components/ProductDetailWrapper";

export const dynamicParams = true;

interface Props {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return FEATURED_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = FEATURED_PRODUCTS.find((p) => p.id === params.id);
  if (!product) {
    return {
      title: "Botanical Formulation | Royal Botanica",
    };
  }

  return {
    title: `${product.name} | Royal Botanica Organic Skincare`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} - Royal Botanica`,
      description: product.shortDescription,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = FEATURED_PRODUCTS.find((p) => p.id === params.id);

  return (
    <ProductDetailWrapper
      id={params.id}
      initialProduct={product}
    />
  );
}
