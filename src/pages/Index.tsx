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

const Index = () => {
  const featuredCategories = categories.filter(c => c.featured);
  const newArrivals = getNewArrivals();

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />
        <CategoryGrid categories={featuredCategories} />
        <ProductCarousel products={newArrivals} />
        <ServicesGrid />
        <WhyChooseSection />
        <AboutPreview />
        <InstagramReels />
        <TestimonialsSection testimonials={testimonials} />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
