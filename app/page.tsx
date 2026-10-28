import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Categories } from "@/components/Categories";
import { AboutSection } from "@/components/AboutSection";
import { Testimonials } from "@/components/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedProducts />
      <Categories />
      <AboutSection />
      <Testimonials />
    </>
  );
}

