import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Automatically import all images from the gallery directory
// Adjusted pattern to accurately match Vite's require patterns if needed, but import.meta.glob is standard
const images = import.meta.glob(
  "@/assets/gallery/*.{jpg,JPG,png,PNG,jpeg,JPEG,webp}",
  { eager: true, import: "default" },
);
const allImageUrls = Object.values(images) as string[];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-white">
      <AnnouncementBar />
      <Header />

      <main className="container mx-auto px-4 py-20">
        <div className="text-center py-28 md:py-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-block"
          >
            <span className="px-5 py-2 border border-white/20 rounded-full text-xs uppercase tracking-[0.4em] text-white/60 backdrop-blur-sm">
              The Heritage Collection
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display font-medium mb-6 tracking-tighter"
          >
            Curated <span className="italic font-light">Elegance</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed"
          >
            A visual journey through our finest fabric creations and bespoke
            masterpieces. Explore our complete collection of{" "}
            {allImageUrls.length} meticulously crafted designs.
          </motion.p>
        </div>

        {/* CSS Masonry Layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {allImageUrls.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (index % 10) * 0.05, duration: 0.6 }}
              className="relative overflow-hidden group rounded-xl bg-[#111] border border-white/5 cursor-zoom-in break-inside-avoid"
              onClick={() => setSelectedImage(src)}
            >
              <img
                src={src}
                alt={`Gallery detail ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white backdrop-blur-md bg-black/40 px-4 py-2 rounded-full text-sm tracking-widest uppercase font-medium">
                  View Full Size
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10 cursor-zoom-out"
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-[110]"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>

              <motion.img
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedImage}
                alt="Enlarged gallery view"
                className="relative z-[105] max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button for Contact */}
        <div className="mt-20 text-center">
          <Link to="/contact">
            <Button
              size="lg"
              className="rounded-full px-12 h-16 bg-white text-black hover:bg-white/90 text-lg font-bold shadow-2xl transition-transform hover:scale-105 active:scale-95"
            >
              Book a Consultation
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
