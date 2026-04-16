import { motion, Variants } from "framer-motion";
import { Award, Users, Scissors, Briefcase } from "lucide-react";

const featuresLeft = [
  {
    icon: Award,
    title: "Since 1991",
    description:
      "25+ years of textile expertise in Hyderabad's premium fabric market",
  },
  {
    icon: Users,
    title: "Groomwear Experts",
    description: "Specialized in wedding sherwani and formal occasion fabrics",
  },
];

const featuresRight = [
  {
    icon: Scissors,
    title: "Custom Tailoring",
    description: "Expert guidance for bespoke suits and traditional groomwear",
  },
  {
    icon: Briefcase,
    title: "Executive Fabrics",
    description: "Premium suiting for professionals who value quality",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.2,
      ease: "easeOut",
    },
  }),
};

const AboutPreview = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* TITLE */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl md:text-5xl font-display font-semibold"
          >
            Why Choose CSK Textiles
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-gray-700 mt-4 max-w-xl mx-auto text-base md:text-lg"
          >
            Trusted by Hyderabad's discerning men for over two decades
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12 items-center">
          {/* LEFT */}
          <div className="space-y-8 md:space-y-12">
            {featuresLeft.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={index}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2 bg-yellow-400/10 rounded-lg">
                    <item.icon className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold">
                    {item.title}
                  </h3>
                </div>

                <p className="text-base md:text-xl text-gray-700 mb-4">
                  {item.description}
                </p>

                {index !== featuresLeft.length - 1 && (
                  <div className="border-b border-border/40" />
                )}
              </motion.div>
            ))}
          </div>

          {/* IMAGE */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="flex justify-center"
          >
            <div className="w-full max-w-sm md:max-w-md aspect-[4/4.5] overflow-hidden shadow-2xl rounded-2xl">
              <img
                src="/images/aboutPreview.jpg"
                alt="CSK Textiles"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* RIGHT */}
          <div className="space-y-8 md:space-y-12">
            {featuresRight.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={index}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2 bg-yellow-400/10 rounded-lg">
                    <item.icon className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold">
                    {item.title}
                  </h3>
                </div>

                <p className="text-base md:text-xl text-gray-700 mb-4">
                  {item.description}
                </p>

                {index !== featuresRight.length - 1 && (
                  <div className="border-b border-border/40" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
