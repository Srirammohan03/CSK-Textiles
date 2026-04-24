"use client";

import { motion } from "framer-motion";

const IMAGES = [
  "/brand_p/arvind.png",
  "/brand_p/bombay-dyeing.png",
  "/brand_p/Linen-Club.png",
  "/brand_p/RAYMOND.png",
  "/brand_p/Reid & Taylor.png",
  "/brand_p/Siyaram's.webp",
];

export default function ClientsSection() {
  const duplicatedImages = [...IMAGES, ...IMAGES];

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-3 text-slate-500 text-sm md:text-base">
            Brands and organizations that trust our craftsmanship.
          </p>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12 md:gap-16 w-max"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          >
            {duplicatedImages.map((src, index) => (
              <div
                key={index}
                className="
                  flex
                  h-20
                  w-40
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-4
                  shadow-sm
                  transition-all
                  duration-300
                  hover:shadow-md
                "
              >
                <img
                  src={src}
                  alt="client logo"
                  className="max-h-full max-w-full object-contain opacity-80 hover:opacity-100 transition"
                />
              </div>
            ))}
          </motion.div>

          {/* Left Fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent" />

          {/* Right Fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </section>
  );
}
