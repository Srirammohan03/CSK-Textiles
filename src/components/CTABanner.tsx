import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import weddingHero from "/images/1.jpeg";
import categoryWedding from "/images/cta3.webp";
import weddingHero2 from "/images/3.png";
import categoryWedding2 from "/images/cta4.webp";

const CTABanner = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const yRight = useTransform(scrollYProgress, [0, 1], [-70, 70]);

  return (
    <section
      ref={targetRef}
      className="relative z-20 overflow-hidden bg-white py-14 sm:py-16 md:py-20 xl:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-10 xl:grid-cols-[1fr_minmax(420px,560px)_1fr] xl:gap-8">
          {/* Left image stack */}
          <motion.div
            style={{ y: yLeft }}
            className="hidden xl:flex justify-start items-center"
          >
            <div className="relative h-[500px] w-[420px]">
              <motion.div
                initial={{ x: -120, opacity: 0, rotate: -10 }}
                whileInView={{ x: 0, opacity: 1, rotate: -16 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-2 top-10 z-10"
              >
                <div className="h-[390px] w-[240px] overflow-hidden rounded-2xl border border-black/5 bg-gray-100 shadow-xl">
                  <img
                    src={weddingHero}
                    alt="Groom Style Left Back"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -120, opacity: 0, rotate: -10 }}
                whileInView={{ x: 0, opacity: 1, rotate: -24 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.9,
                  delay: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute left-[150px] top-0 z-20"
              >
                <div className="h-[390px] w-[240px] overflow-hidden rounded-2xl border border-black/5 bg-gray-100 shadow-2xl">
                  <img
                    src={weddingHero2}
                    alt="Groom Style Left Front"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Center content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-xl text-center text-black"
          >
            <span className="mb-4 block text-[10px] uppercase tracking-[0.35em] opacity-70 md:mb-6 md:text-xs">
              Striking, Sleek and Stylish
            </span>

            <h2 className="mb-5 text-3xl leading-tight tracking-tight sm:text-4xl md:mb-7 md:text-5xl xl:text-6xl">
              GROOM <span className="block text-yellow-500">STYLING</span>
            </h2>

            <p className="mx-auto mb-8 max-w-xs text-sm font-light leading-relaxed text-black sm:max-w-md sm:text-base md:mb-10 md:text-lg">
              Planning a wedding? Visit us for personalized fabric selection and
              expert styling advice for your special day.
            </p>

            <Link to="/contact">
              <Button
                size="lg"
                className="h-12 rounded-full border border-black bg-transparent px-8 text-[10px] uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-black hover:text-white sm:px-10"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Visit
              </Button>
            </Link>
          </motion.div>

          {/* Right image stack */}
          <motion.div
            style={{ y: yRight }}
            className="hidden xl:flex justify-end items-center"
          >
            <div className="relative h-[500px] w-[420px]">
              <motion.div
                initial={{ x: 120, opacity: 0, rotate: 10 }}
                whileInView={{ x: 0, opacity: 1, rotate: 16 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-2 top-10 z-10"
              >
                <div className="h-[390px] w-[240px] overflow-hidden rounded-2xl border border-black/5 bg-gray-100 shadow-xl">
                  <img
                    src={categoryWedding2}
                    alt="Groom Style Right Back"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 120, opacity: 0, rotate: 10 }}
                whileInView={{ x: 0, opacity: 1, rotate: 24 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.9,
                  delay: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute right-[150px] top-0 z-20"
              >
                <div className="h-[390px] w-[240px] overflow-hidden rounded-2xl border border-black/5 bg-gray-100 shadow-2xl">
                  <img
                    src={categoryWedding}
                    alt="Groom Style Right Front"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
