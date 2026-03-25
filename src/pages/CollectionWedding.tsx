import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getProductsByCategory } from "@/data/products";
import weddingHero from "@/assets/wedding-sherwani.jpg";
import { ChevronRight, Filter, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";
import AnnouncementBar from "@/components/AnnouncementBar";

const CollectionWedding = () => {
  const allProducts = getProductsByCategory("wedding-sherwani");
  const activeGender = "men";
  const [activeFilter, setActiveFilter] = useState("All");

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
      const genderMatch = p.gender === activeGender;
      const filterMatch =
        activeFilter === "All" ||
        p.fabric?.includes(activeFilter) ||
        p.tags?.includes(activeFilter);
      return genderMatch && filterMatch;
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
        <section className="relative h-[65vh] overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={weddingHero}
              alt="Premium Wedding Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>

          <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1 border border-white/20 rounded-full text-[10px] font-medium tracking-[0.3em] uppercase mb-4 backdrop-blur-md">
                Royal Ceremonial
              </span>
              <h1 className="text-6xl md:text-8xl font-display font-medium mb-6 tracking-tight">
                Grand <span className="italic font-light">Traditions</span>
              </h1>
              <p className="max-w-xl mx-auto text-lg text-white/60 font-light leading-relaxed mb-8">
                Your legacy begins here. Discover our prestigious collection of
                ceremonial and wedding fabrics.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-4 border-b border-white/5 bg-[#0a0a0a] backdrop-blur-3xl ">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-10">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-display font-medium">
                  Royal Gallery
                </h2>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] mt-2">
                  Men's Wedding Heritage
                </p>
              </div>
              <div className="flex w-full lg:w-auto flex-row items-center gap-3 lg:gap-4 justify-center mt-6 lg:mt-0">
                <Link
                  to="/customize"
                  className="flex-1 border-none focus:outline-none"
                >
                  <Button className="w-full rounded-full px-2 lg:px-10 h-12 lg:h-14 bg-white text-black hover:bg-white/90 transition-all shadow-2xl group text-[11px] sm:text-xs lg:text-sm font-bold">
                    Customize{" "}
                    <ChevronRight className="ml-1 lg:ml-2 w-3 sm:w-4 h-3 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link
                  to="/gallery"
                  className="flex-1 border-none focus:outline-none"
                >
                  <Button className="w-full rounded-full px-2 lg:px-10 h-12 lg:h-14 bg-white text-black hover:bg-white/90 transition-all shadow-2xl group text-[11px] sm:text-xs lg:text-sm font-bold">
                    View Gallery{" "}
                    <ChevronRight className="ml-1 lg:ml-2 w-3 sm:w-4 h-3 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Filter className="w-3 h-3 text-white/60" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Refine Fabric
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-3 w-full md:w-auto">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 border text-center",
                      activeFilter === filter
                        ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        : "bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:text-white",
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
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
