<div align="center">

# 🌿 Royal Botanica
### *Pure Organic Alchemy • Handmade Ayurvedic Beauty & Wellness*

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

<p align="center">
  A luxury, high-converting Full-Stack E-Commerce web application featuring a customer-facing <strong>User Storefront</strong>, <strong>Dynamic Product Detail Pages</strong>, and an intuitive <strong>Admin Dashboard & Real-Time Inventory Manager</strong>.
</p>

[Explore Storefront](#-key-features) • [Admin Dashboard](#-admin-dashboard-features) • [Getting Started](#-getting-started) • [Tech Architecture](#-tech-architecture)

---

</div>

## 🌿 Highlights

- **Aesthetic Earthy Theme:** Custom palette tailored for botanical cosmetics (*Forest Green `#1b4332`, Warm Cream `#fdfbf7`, Soft Gold `#c5a880`*).
- **Dual Architecture:** 
  - 🛍️ **User Panel:** Dynamic storefront, live search, categories, testimonials, cart drawer & 1-click Express Checkout.
  - 🛡️ **Admin Portal:** Live metrics, "Add Product" form with instant live preview, inventory table with edit/delete, and order management.
- **Zero-Latency Sync:** Real-time state synchronization via React Context & LocalStorage — newly published products appear on the storefront instantly!
- **Dynamic Routing:** Individual PDPs (`/products/[id]`) with image gallery, interactive customer review submission, and accordion rituals.

---

## 📸 Key Features

### 🛍️ Public User Storefront (`/`)
* **Top Announcement Bar:** Real-time free shipping threshold tracker with dispatch guarantees.
* **Sticky Navigation Bar:** Glassmorphism header with live search filtering, Wishlist counter, User modal, Shopping Cart counter, and Admin portal launcher.
* **Hero Section:** Nature-inspired gradients, key metrics (*20k+ Customers, 80k+ Ratings, 500+ Formulations*), and CTA anchors.
* **USP Trust Badges:** 5 clinical validation icons (*Chemical-Free, Cruelty-Free, Comprehensive Range, Clinical Efficacy, Innovative Formulations*).
* **Featured Products Grid:** Discount badges (*14% Off, Bestseller*), star rating counters, original vs. discounted pricing (₹), and instant Quick View modal.
* **Shop by Categories:** 8 Ayurvedic categories with dynamically calculated live product counts.
* **Brand Heritage Story:** Dual-column visual collage highlighting small-batch Vedic decoction and natural actives (*Saffron, Green Tea, Shea Butter, Jojoba*).
* **Customer Reviews:** Verified buyer stories (*Anurpeeta Mandal, Debalina Das, Sritoma Das*) with responsive carousel and grid layouts.
* **Floating Consultation Button:** WhatsApp Ayurvedic expert chat bubble fixed at the bottom-right corner.

---

### 🛡️ Admin Dashboard & Inventory Manager (`/admin`)
* **Apothecary Overview:** Live metrics tracking Total Products, Active Categories, Total Orders, and Revenue Volume.
* **Product Management Form:**
  - Product Name, Category dropdown, Net Volume / Size, and Badge customizer.
  - Discounted & Original Price (in ₹) with automated discount calculations.
  - **Live Image Preview** with quick preset pickers for popular cosmetic bottles and jars.
  - Rich textareas for Ingredients, Catchphrases, Descriptions, and How-to-Use rituals.
  - **"Publish Product"** button that immediately adds the item to the public store.
* **Product Inventory Table:** Live search filter, edit modal, delete confirmations, and direct links to view the live product page.
* **Order Tracking Center:** Overview of pan-India customer orders, status pills (*Dispatched, Delivered, Pending*), and payment method indicators.
* **1-Click Reset to Defaults:** Restore original 8 seed products anytime for testing or demonstration.

---

### 📦 Dynamic Product Detail Page (`/products/[id]`)
* **Visual Gallery:** High-res main preview with clickable multi-thumbnail gallery.
* **Trust Pills:** 100% Natural, Cruelty-Free, Handcrafted, Zero Parabens.
* **Interactive Quantity Counter:** Increment (`+`) and Decrement (`-`) buttons with real-time subtotal.
* **Dual Action CTAs:**
  - 🛒 **Add To Cart:** Triggers toast notification and opens the sliding cart drawer.
  - ⚡ **Buy Now:** Direct 1-click Express Checkout modal with address and payment method selector.
* **Interactive Accordions:** Detailed breakdowns for *Ingredients & Botanical Formulation*, *How to Use Ritual*, and *Shipping & Return Guarantee*.
* **Customer Reviews & Rating Breakdown:** Overall star rating progress bars + interactive **"Write a Review"** form.

---

## 🏗️ Project Structure

```bash
royal-botanica/
├── app/
│   ├── admin/
│   │   └── page.tsx              # Admin Dashboard & Product Manager
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx          # Dynamic Product Detail Page
│   ├── globals.css               # Tailwind styling & custom scrollbars
│   ├── layout.tsx                # Root layout, fonts, and global providers
│   └── page.tsx                  # User Storefront landing page
├── components/
│   ├── AboutSection.tsx          # Brand story and active ingredients
│   ├── AccountModal.tsx          # Customer authentication dialog
│   ├── AnnouncementBar.tsx       # Top promotional shipping banner
│   ├── CartDrawer.tsx            # Slide-over cart with free shipping bar
│   ├── Categories.tsx            # Shop by category card grid
│   ├── CheckoutModal.tsx         # Express Checkout modal with UPI/COD
│   ├── FeaturedProducts.tsx      # Interactive product grid with filters
│   ├── Features.tsx              # Trust badge highlights
│   ├── Footer.tsx                # Multi-column footer and policies
│   ├── Hero.tsx                  # Nature gradient hero banner
│   ├── Navbar.tsx                # Sticky header with search & badges
│   ├── ProductDetailClient.tsx   # PDP interactive 2-column client view
│   ├── ProductDetailWrapper.tsx  # Dynamic route resolver for admin items
│   ├── ProductReviews.tsx        # Customer reviews and review submit form
│   ├── Toast.tsx                 # Notification feedback pill
│   ├── WhatsAppButton.tsx        # Fixed WhatsApp consultation button
│   └── WishlistModal.tsx         # Saved favorite products modal
├── context/
│   ├── CartContext.tsx           # Global cart, wishlist & modal states
│   └── ProductContext.tsx        # Dynamic inventory & order sync state
├── data/
│   └── products.ts               # Core types & Ayurvedic seed dataset
├── public/                       # Static public assets
├── tailwind.config.js            # Custom earthy color extensions
├── tsconfig.json                 # TypeScript compiler configuration
└── package.json                  # Dependencies & build scripts
```

---

## ⚡ Tech Architecture

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) with Custom Earthy Palette |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Typography** | `Inter` (sans-serif) & `Playfair Display` (serif) via `next/font/google` |
| **State Management** | React Context API + LocalStorage Synchronization |
| **Images** | High-Res Unsplash Botanicals |

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18.17+ or v20+) installed on your machine.

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/abhishek1973kr-cpu/bota.git
cd bota
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 👨‍💻 Author & Attribution

* **Brand Concept:** Royal Botanica - Pure Organic Alchemy
* **Repository:** [https://github.com/abhishek1973kr-cpu/bota.git](https://github.com/abhishek1973kr-cpu/bota.git)
* **Handcrafted with love in India 🌿**
