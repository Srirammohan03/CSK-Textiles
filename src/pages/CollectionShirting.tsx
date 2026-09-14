import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import shirtingBanner from "/images/shirtingBanner.png";
import {
  ChevronRight,
  ChevronLeft,
  Filter,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";
import AnnouncementBar from "@/components/AnnouncementBar";
import { FilterDropdown } from "@/components/FilterDropdown";
import { cn } from "@/lib/utils";

const PRODUCTS_PER_PAGE = 16;

const CollectionShirting = () => {
  const { data: products = [], isLoading } = useProducts("shirting");

  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const productsSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filters = ["All", "Cotton", "Linen", "Plain", "Striped", "Checkered"];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const filterMatch =
        activeFilter === "All" ||
        p.fabric?.toLowerCase().includes(activeFilter.toLowerCase()) ||
        p.tags?.some((tag) =>
          tag.toLowerCase().includes(activeFilter.toLowerCase()),
        );

      return filterMatch;
    });
  }, [activeFilter, products]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;

    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setCurrentPage(page);

    requestAnimationFrame(() => {
      productsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };
  const paginationItems = useMemo(() => {
    const items: Array<number | "ellipsis-left" | "ellipsis-right"> = [];

    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page++) {
        items.push(page);
      }

      return items;
    }

    items.push(1);

    if (currentPage > 4) {
      items.push("ellipsis-left");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let page = startPage; page <= endPage; page++) {
      items.push(page);
    }

    if (currentPage < totalPages - 3) {
      items.push("ellipsis-right");
    }

    items.push(totalPages);

    return items;
  }, [currentPage, totalPages]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white font-body">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        <section className="relative py-28 md:py-40 overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
            className="absolute inset-0"
          >
            <img
              src={shirtingBanner}
              alt="Premium Shirting"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
            <motion.div
              initial={{
                y: 30,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.5,
                duration: 0.8,
              }}
            >
              <span className="inline-block px-4 py-1 border border-white/20 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase backdrop-blur-md">
                Essential Weaves
              </span>

              <h1 className="text-2xl md:text-6xl font-display font-medium my-4 tracking-tight">
                Noble <span className="italic font-light">Shirting</span>
              </h1>

              <p className="max-w-xl mx-auto text-lg text-white/60 font-light leading-relaxed">
                The foundation of a master's wardrobe. Explore our collection of
                hand-picked luxury shirt fabrics.
              </p>
            </motion.div>
          </div>
        </section>
        <section className="relative z-10 py-6 md:py-10 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-3xl">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Link
                to="/customize"
                state={{ outfit: "Shirt" }}
                className="w-full md:w-auto"
              >
                <Button className="w-full md:w-auto rounded-full px-8 h-12 md:h-14 bg-white text-black hover:bg-gray-200 transition-all duration-300 shadow-xl group text-xs md:text-sm font-bold tracking-wide">
                  Customize
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto bg-white/[0.04] px-4 py-3 rounded-2xl border border-white/10 shadow-inner">
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                    <Filter className="w-4 h-4 text-white/70" />
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold hidden sm:block">
                    Refine Fabric
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
        <section
          ref={productsSectionRef}
          className="py-24 bg-white relative scroll-mt-10"
        >
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-40 space-y-4">
                <Loader2 className="w-10 h-10 text-black/20 animate-spin" />

                <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-bold">
                  Unveiling Shirting Collection
                </p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-12">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-black/40 font-bold">
                      Shirting Collection
                    </p>

                    <h2 className="text-2xl md:text-3xl font-display font-medium text-black mt-2">
                      {activeFilter === "All"
                        ? "All Fabrics"
                        : `${activeFilter} Fabrics`}
                    </h2>
                  </div>

                  <div className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-bold">
                    Showing{" "}
                    <span className="text-black">
                      {Math.min(
                        (currentPage - 1) * PRODUCTS_PER_PAGE + 1,
                        filteredProducts.length,
                      )}
                      -
                      {Math.min(
                        currentPage * PRODUCTS_PER_PAGE,
                        filteredProducts.length,
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="text-black">
                      {filteredProducts.length}
                    </span>
                  </div>
                </div>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  key={`${activeFilter}-${currentPage}`}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
                >
                  <AnimatePresence mode="popLayout">
                    {paginatedProducts.map((product) => (
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
                {totalPages > 1 && (
                  <div className="mt-20 flex flex-col items-center gap-6">
                    {/* Page information */}
                    <p className="text-[10px] uppercase tracking-[0.25em] text-black/40 font-bold">
                      Page <span className="text-black">{currentPage}</span> of{" "}
                      <span className="text-black">{totalPages}</span>
                    </p>

                    <div className="flex items-center justify-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="h-11 w-11 rounded-full border-black/10 text-black hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black transition-all"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <div className="flex items-center gap-2">
                        {paginationItems.map((item, index) => {
                          if (
                            item === "ellipsis-left" ||
                            item === "ellipsis-right"
                          ) {
                            return (
                              <span
                                key={`${item}-${index}`}
                                className="w-8 text-center text-black/30 text-sm"
                              >
                                ...
                              </span>
                            );
                          }

                          const isActive = currentPage === item;

                          return (
                            <Button
                              key={item}
                              type="button"
                              variant="ghost"
                              onClick={() => handlePageChange(item)}
                              className={cn(
                                "h-11 w-11 rounded-full text-xs font-bold transition-all duration-300",
                                isActive
                                  ? "bg-black text-white hover:bg-black hover:text-white shadow-lg"
                                  : "text-black/50 hover:bg-black/5 hover:text-black",
                              )}
                              aria-label={`Go to page ${item}`}
                              aria-current={isActive ? "page" : undefined}
                            >
                              {item}
                            </Button>
                          );
                        })}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="h-11 w-11 rounded-full border-black/10 text-black hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black transition-all"
                        aria-label="Next page"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-40">
                <ShoppingBag className="w-16 h-16 text-black/5 mx-auto mb-6" />

                <h3 className="text-3xl font-display font-medium mb-2 uppercase tracking-tight text-black/80">
                  Archives empty
                </h3>

                <p className="text-black/40 font-light">
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

export default CollectionShirting;
