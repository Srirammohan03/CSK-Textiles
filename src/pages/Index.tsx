import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCarousel from "@/components/ProductCarousel";
import ServicesGrid from "@/components/ServicesGrid";
import WhyChooseSection from "@/components/WhyChooseSection";
import AboutPreview from "@/components/AboutPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import { categories } from "@/data/categories";
import { useNewArrivals } from "@/hooks/useProducts";
import { testimonials } from "@/data/testimonials";
import EthosSection from "@/components/EthosSection";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import InstagramReelsHighlights from "@/components/InstagramReelsHighlights";
import ClientsSection from "./clients-section";

const Index = () => {
  const featuredCategories = categories.filter((c) => c.featured);
  const { data: newArrivals = [], isLoading } = useNewArrivals();
  const chooseRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: chooseRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="h-screen flex flex-col font-body">
      <Header />
      <main>
        <div className="relative h-auto md:h-[200dvh] z-30">
          <HeroSection />
          <EthosSection />
        </div>

        <CategoryGrid categories={featuredCategories} />

        <ServicesGrid />

        <TestimonialsSection testimonials={testimonials} />

        <div ref={chooseRef} className="h-auto md:h-[200vh]">
          <WhyChooseSection />
          <AboutPreview />
        </div>

        <CTABanner />
        <InstagramReelsHighlights />
        <ClientsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
