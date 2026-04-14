import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { ChevronRight, Filter, ShoppingBag, Loader2 } from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";
import AnnouncementBar from "@/components/AnnouncementBar";
import { FilterDropdown } from "@/components/FilterDropdown";
import RtwBanner from "/images/rtw2.png";

const CollectionReadyToWear = () => {
  const { data: products = [], isLoading } = useProducts("ready-to-wear");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filters = ["All", "Shirts", "Suiting", "Wedding", "Kurta Pyjama"];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (activeFilter === "All") return true;

      const filterMap: Record<string, string> = {
        "Shirts": "shirting",
        "Suiting": "suiting",
        "Wedding": "wedding-sherwani",
        "Kurta Pyjama": "kurta-pyjama",
      };

      const targetCategory = filterMap[activeFilter] || activeFilter.toLowerCase();

      const categoryMatch = p.category?.toLowerCase().includes(targetCategory);
      const fabricMatch = p.fabric?.toLowerCase().includes(activeFilter.toLowerCase());
      const tagMatch = p.tags?.some((tag) =>
        tag.toLowerCase().includes(activeFilter.toLowerCase()),
      );

      return categoryMatch || fabricMatch || tagMatch;
    });
  }, [activeFilter, products]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white font-body overflow-x-hidden">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        <section className="relative py-28 md:py-40 overflow-hidden bg-accent/10">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={RtwBanner}
              alt="Premium Ready-to-Wear Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
          <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1 border border-white/20 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase backdrop-blur-md">
                Effortless Elegance
              </span>
              <h1 className="text-6xl md:text-8xl font-display font-medium my-4 tracking-tight">
                Ready <span className="italic font-light">To Wear</span>
              </h1>
              <p className="max-w-xl mx-auto text-lg text-white/60 font-light leading-relaxed">
                Premium craftsmanship, ready for your next occasion. Impeccable
                fit met with uncompromising style.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="relative z-50 py-6 md:py-10 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-3xl">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent mb-1">
                  Instant Sophistication
                </p>
                <p className="text-white/40 text-xs font-light tracking-wide">
                  Pre-finished masterpiece selections
                </p>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto bg-white/[0.04] px-4 py-3 rounded-2xl border border-white/10 shadow-inner">
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                    <Filter className="w-4 h-4 text-white/70" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold hidden sm:block">
                    Browse Types
                  </span>
                </div>

                <div className="min-w-[140px] sm:min-w-[180px]">
                  <FilterDropdown
                    filters={filters}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-40 space-y-4">
                <Loader2 className="w-10 h-10 text-black/20 animate-spin" />
                <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-bold">
                  Assembling Modern Classics
                </p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={activeFilter}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={String(product.id)}
                      name={product.name}
                      description={product.description}
                      image={
                        Array.isArray(product.image)
                          ? product.image[0]
                          : product.image
                      }
                      fabric={product.fabric}
                      isNew={product.isNewArrival}
                      tags={product.tags}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-40">
                <ShoppingBag className="w-16 h-16 text-black/5 mx-auto mb-6" />
                <h3 className="text-3xl font-display font-medium mb-2 uppercase tracking-tight text-black/80">
                  Stock Refreshing
                </h3>
                <p className="text-black/40 font-light">
                  Our ready-to-wear artisans are replenishing the store.
                </p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default CollectionReadyToWear;
