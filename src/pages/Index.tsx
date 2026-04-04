import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCarousel from "@/components/ProductCarousel";
import ServicesGrid from "@/components/ServicesGrid";
import WhyChooseSection from "@/components/WhyChooseSection";
import AboutPreview from "@/components/AboutPreview";
import InstagramReels from "@/components/InstagramReels";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

import { categories } from "@/data/categories";
import { getNewArrivals } from "@/data/products";
import { testimonials } from "@/data/testimonials";
import EthosSection from "@/components/EthosSection";
import VisitUs from "@/components/VisitUs";
import { useScroll } from "framer-motion";
import { useRef } from "react";

const Index = () => {
  const featuredCategories = categories.filter((c) => c.featured);
  const newArrivals = getNewArrivals();
  const chooseRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: chooseRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* <AnnouncementBar /> */}
      <Header />
      <main>
        <div className="relative h-auto md:h-[200dvh] z-30">
          <HeroSection />
          <EthosSection />
        </div>
        <CategoryGrid categories={featuredCategories} />
        {/* <ProductCarousel products={newArrivals} /> */}
        <ServicesGrid />
        <TestimonialsSection testimonials={testimonials} />
        <div ref={chooseRef} className="h-auto md:h-[200vh]">
          <WhyChooseSection />
          <AboutPreview />
        </div>
        {/* <InstagramReels /> */}
        <CTABanner />
        <VisitUs />

        {/* <div className="h-auto md:h-[160vh] relative z-30">
          <CTABanner />
          <Footer variant="sticky" />
        </div> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
