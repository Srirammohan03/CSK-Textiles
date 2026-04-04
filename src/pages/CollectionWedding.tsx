import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getProductsByCategory } from "@/data/products";
import weddingHero from "/images/wedding-banner.png";
import { ChevronRight, Filter, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";
import AnnouncementBar from "@/components/AnnouncementBar";
import { FilterDropdown } from "@/components/FilterDropdown";

const CollectionWedding = () => {
  const allProducts = getProductsByCategory("wedding-sherwani");
  const activeGender = "men";
  const [activeFilter, setActiveFilter] = useState("All");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const filters = [
    "All",
    "Silk",
    "Brocade",
    "Velvet",
    "Jacquard",
    "Handloom",
    "Embroidered",
    "Textured",
  ];

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const filterMatch =
        activeFilter === "All" ||
        p.fabric?.includes(activeFilter) ||
        p.tags?.includes(activeFilter);
      return filterMatch;
    });
  }, [activeFilter, allProducts]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        <section className="relative py-28 md:py-40 overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={weddingHero}
              alt="Premium Wedding Collection"
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
              <span className="inline-block px-4 py-1 border border-white/20 rounded-full text-[10px] font-medium tracking-[0.3em] uppercase  backdrop-blur-md">
                Royal Ceremonial
              </span>
              <h1 className="text-2xl md:text-5xl font-display font-medium tracking-tight my-4">
                Grand <span className="italic font-light">Traditions</span>
              </h1>
              <p className="max-w-xl mx-auto text-lg text-white/60 font-light leading-relaxed">
                Your legacy begins here. Discover our prestigious collection of
                ceremonial and wedding fabrics.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="relative z-50 py-8 md:py-12 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-3xl">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl md:flex justify-around">
            {/* Top Row: Title & Action */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-5 md:mb-5">
              <Link
                to="/customize"
                state={{ outfit: "Wedding outfit" }}
                className="w-full sm:w-auto shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full"
              >
                <Button className="w-full sm:w-auto rounded-full px-8 h-12 md:h-14 bg-white text-black hover:bg-gray-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] group text-xs md:text-sm font-bold tracking-wide">
                  Customize
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Bottom Row: Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/10">
              {/* Left */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Filter className="w-4 h-4 text-white/70" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-medium">
                  Refine Fabric
                </span>
              </div>

              {/* Right */}
              <FilterDropdown
                filters={filters}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
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
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    image={product.image[0]}
                    fabric={product.fabric}
                    isNew={product.isNew}
                    tags={product.tags}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-40">
                <ShoppingBag className="w-16 h-16 text-white/10 mx-auto mb-6" />
                <h3 className="text-3xl font-display font-medium mb-2 uppercase tracking-tight">
                  Archives empty
                </h3>
                <p className="text-white/40 font-light">
                  New prestigious fabrics arriving soon.
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

export default CollectionWedding;
