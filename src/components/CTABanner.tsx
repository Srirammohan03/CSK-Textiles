import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import weddingHero from "@/assets/wedding-sherwani.jpg";
import categoryWedding from "@/assets/category-wedding.jpg";

const CTABanner = () => {
  const targetRef = useRef(null);

  // Vertical Parallax logic
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const yRight = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section
      ref={targetRef}
      className="relative py-24 md:py-32 overflow-hidden bg-transparent"
    >
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 items-center gap-8">
        {/* Left Floating Card - Slides from Left */}
        <motion.div
          initial={{ x: -150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }} // Triggers at 30% visibility
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ y: yLeft }}
          className="hidden md:flex justify-start"
        >
          <div className="w-72 h-[400px] rounded-xl overflow-hidden shadow-xl rotate-[-4deg] border border-black/5 bg-gray-100">
            <img
              src={weddingHero}
              alt="Groom Style Left"
              className="w-full h-full object-cover"
            />
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

        {/* Right Floating Card - Slides from Right */}
        <motion.div
          initial={{ x: 150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ y: yRight }}
          className="hidden md:flex justify-end"
        >
          <div className="w-72 h-[400px] rounded-xl overflow-hidden shadow-xl rotate-[4deg] border border-black/5 bg-gray-100">
            <img
              src={categoryWedding}
              alt="Groom Style Right"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
