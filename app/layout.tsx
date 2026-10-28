import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistModal } from "@/components/WishlistModal";
import { AccountModal } from "@/components/AccountModal";
import { CheckoutModal } from "@/components/CheckoutModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Toast } from "@/components/Toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Royal Botanica | 100% Organic Handmade Beauty & Wellness",
  description:
    "Natural way to cure your skin and hair issues. Small batch, hand-blended, cruelty-free, and chemical-free Ayurvedic skincare formulations.",
  keywords: [
    "organic skincare",
    "ayurvedic beauty",
    "Royal Botanica",
    "handmade cosmetics",
    "ubtan face wash",
    "kumkumadi serum",
    "hemp cleansing oil",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-cream-50 text-charcoal-900">
        <ProductProvider>
          <CartProvider>
            <AnnouncementBar />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <WishlistModal />
            <AccountModal />
            <CheckoutModal />
            <WhatsAppButton />
            <Toast />
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}

