import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import weddingHero from "@/assets/wedding-sherwani.jpg";
import categoryWedding from "@/assets/category-wedding.jpg";

// Add 2 more images here
import weddingHero2 from "@/assets/wedding-sherwani.jpg";
import categoryWedding2 from "@/assets/category-wedding.jpg";

const cardWidth = 320;
const visibleBackPortion = cardWidth * 0.4; // 40% visible
const overlapOffset = cardWidth - visibleBackPortion; // amount covered by front card

const CTABanner = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const yRight = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section
      ref={targetRef}
      className="py-16 md:py-24 overflow-hidden absolute inset-0 z-20 bg-white md:h-[100vh] h-[60vh]"
    >
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 items-center gap-8 h-full">
        {/* Left Stacked Images */}
        <motion.div
          style={{ y: yLeft }}
          className="hidden md:flex justify-start items-center"
        >
          <div className="relative w-[520px] h-[540px]">
            {/* Back Image - animates first */}
            <motion.div
              initial={{ x: -180, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute left-0 top-6 z-10"
            >
              <div className="w-80 h-[500px] rounded-xl overflow-hidden shadow-xl rotate-[-18deg] border border-black/5 bg-gray-100">
                <img
                  src={weddingHero2}
                  alt="Groom Style Left Back"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Front Image - animates after back image */}
            <motion.div
              initial={{ x: -180, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.85, ease: "easeOut" }}
              className="absolute top-0 z-20"
              style={{ left: `${overlapOffset}px` }}
            >
              <div className="w-80 h-[500px] rounded-xl overflow-hidden shadow-xl rotate-[-25deg] border border-black/5 bg-gray-100">
                <img
                  src={weddingHero}
                  alt="Groom Style Left Front"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Center Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-black"
        >
          <span className="block text-xs uppercase tracking-[0.4em] mb-4 opacity-70">
            Striking, Sleek and Stylish
          </span>

          <h2 className="text-5xl md:text-6xl font-display mb-6 leading-tight tracking-tight">
            GROOM <span className="block text-yellow-400">STYLING</span>
          </h2>

          <p className="text-base mb-10 text-gray-700 max-w-xs mx-auto font-light leading-relaxed">
            Planning a wedding? Visit us for personalized fabric selection and
            expert styling advice for your special day.
          </p>

          <Link to="/contact">
            <Button
              size="lg"
              className="rounded-full px-8 border border-black bg-transparent hover:bg-black hover:text-white text-black transition-all duration-300 uppercase tracking-widest text-[10px] h-12"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Visit
            </Button>
          </Link>
        </motion.div>

        {/* Right Stacked Images */}
        <motion.div
          style={{ y: yRight }}
          className="hidden md:flex justify-end items-center"
        >
          <div className="relative w-[520px] h-[540px]">
            {/* Back Image - animates first */}
            <motion.div
              initial={{ x: 180, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute right-0 top-6 z-10"
            >
              <div className="w-80 h-[500px] rounded-xl overflow-hidden shadow-xl rotate-[18deg] border border-black/5 bg-gray-100">
                <img
                  src={categoryWedding2}
                  alt="Groom Style Right Back"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Front Image - animates after back image */}
            <motion.div
              initial={{ x: 180, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.85, ease: "easeOut" }}
              className="absolute top-0 z-20"
              style={{ right: `${overlapOffset}px` }}
            >
              <div className="w-80 h-[500px] rounded-xl overflow-hidden shadow-xl rotate-[25deg] border border-black/5 bg-gray-100">
                <img
                  src={categoryWedding}
                  alt="Groom Style Right Front"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
