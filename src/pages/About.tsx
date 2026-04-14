import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star } from "lucide-react";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const offerings = [
    {
      title: "Premium Suiting",
      description:
        "Italian wool, merino blends, and executive fabrics for corporate professionals",
      icon: Star,
    },
    {
      title: "Fine Shirting",
      description:
        "Egyptian cotton, oxford weaves, and linen blends for everyday elegance",
      icon: Star,
    },
    {
      title: "Wedding & Groomwear",
      description:
        "Luxurious brocade, silk, and embroidered fabrics for your special day",
      icon: Star,
    },
    {
      title: "Custom Tailoring",
      description: "Expert guidance and recommendations for bespoke garments",
      icon: Star,
    },
  ];

  const editorialJourney = [
    {
      year: "1991",
      title: "The Vision Begins",
      description:
        "Chimanlal Suresh Kumar establishes CSK Textiles in the historic Rikabgunj market, bringing a new standard of luxury to Hyderabad.",
      image: "/images/ethos.jpg",
    },
    {
      year: "2005",
      title: "A Groom's Sanctuary",
      description:
        "Recognizing the need for unparalleled elegance, we expanded into bespoke wedding and groomwear collections, becoming the city's preferred destination for special occasions.",
      image: "/images/banner.jpg",
    },
    {
      year: "2015",
      title: "The Executive Standard",
      description:
        "We launched our curated executive suiting line, partnering with international mills to bring world-class fabrics to the modern professional.",
      image: "/images/aboutPreview.jpg",
    },
    {
      year: "Today",
      title: "A Timeless Legacy",
      description:
        "With over 25 years of sartorial mastery, we continue to serve a community of discerning gentlemen who value quality, heritage, and the art of fine dressing.",
      image: "/images/services.png",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col bg-[#fbf9f6] text-foreground selection:bg-primary/20 overflow-x-hidden"
      ref={containerRef}
    >
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        {/* Editorial Hero Section */}
        <section className="relative h-[70vh] md:h-[85vh] min-h-[500px] flex items-center overflow-hidden">
          {/* Main Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/aboutB.png"
              alt="Luxury Tailoring"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/30" />
            <div className="absolute inset-0 mesh-bg opacity-30" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="max-w-5xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="mb-4 md:mb-8"
              >
                <span className="editorial-caps text-white/80">
                  Established 1991
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="text-3xl md:text-6xl font-display font-bold text-white mb-6 md:mb-10 leading-[1] tracking-tighter"
              >
                The Art of <br />
                <span className="italic text-yellow-400 drop-shadow-2xl">
                  Excellence
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-sm md:text-xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto uppercase tracking-[0.2em]"
              >
                Twenty-Five Years of Sartorial Mastery
              </motion.p>
            </motion.div>
          </div>

          {/* Scroll Indicator - Hidden on Mobile */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
            className="absolute bottom-10 left-10 hidden md:flex flex-col items-start gap-4 z-20"
          >
            <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 origin-left rotate-90 translate-y-12">
              Scroll
            </span>
          </motion.div>
        </section>

        {/* Narrative Section - The Ethos */}
        <section className="py-16 md:py-32 relative bg-[#fbf9f6] overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="grid lg:grid-cols-12 gap-12 md:gap-16 items-center"
              >
                <div className="lg:col-span-1 border-l border-primary/20 h-full hidden lg:block" />
                <div className="lg:col-span-6">
                  <span className="editorial-caps mb-4 md:mb-6 block">
                    Our Ethos
                  </span>
                  <h2 className="editorial-heading text-3xl md:text-6xl mb-6 md:mb-8">
                    Where Heritage Meets <br />
                    <span className="text-yellow-400 italic">
                      Contemporary Style
                    </span>
                  </h2>
                  <div className="space-y-4 md:space-y-6 text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                    <p>
                      CSK Textiles is more than a showroom; it is a repository
                      of Hyderabad's sartorial heritage. Founded by Chimanlal
                      Suresh Kumar, we have dedicated over two decades to the
                      pursuit of the perfect fabric.
                    </p>
                    <p>
                      In the bustling heart of Rikabgunj, we offer a sanctuary
                      for the discerning gentleman. Our collection is a curated
                      dialogue between tradition and innovation, featuring the
                      world's most prestigious mills.
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-elegant rotate-1 md:rotate-3 max-w-md mx-auto lg:max-w-none">
                    <img
                      src="/images/choose.jpeg"
                      alt="Fine Fabrics"
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Editorial Storytelling Layout - The Journey */}
        <section className="bg-white overflow-hidden">
          {editorialJourney.map((step, index) => (
            <div
              key={index}
              className="relative py-16 md:py-16 border-b border-muted/30 last:border-0"
            >
              <div className="container mx-auto px-4">
                <div
                  className={`flex flex-col md:flex-row items-center gap-12 md:gap-32 ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2"
                  >
                    <div className="relative group overflow-visible">
                      <div className="aspect-[4/5] rounded-tl-[3rem] md:rounded-tl-[8rem] border border-muted/50 overflow-hidden shadow-2xl relative z-10">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                      </div>
                      <div
                        className={`absolute -bottom-6 md:-bottom-10 ${index % 2 === 0 ? "-right-6 md:-right-10" : "-left-6 md:-left-10"} text-6xl md:text-[10rem] font-display font-bold text-yellow-400/5 select-none z-0`}
                      >
                        {step.year}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full md:w-1/2 space-y-4 md:space-y-8"
                  >
                    <span className="editorial-caps text-lg">{step.year}</span>
                    <h3 className="editorial-heading text-3xl md:text-5xl">
                      {step.title}
                    </h3>
                    <p className="text-base md:text-xl text-muted-foreground font-light leading-relaxed italic">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* What We Offer - Refined Grid */}
        <section className="py-20 md:py-32 bg-[#fbf9f6] overflow-hidden">
          <div className="container mx-auto px-4 text-center mb-16 md:mb-24">
            <span className="editorial-caps mb-4 block">The Collections</span>
            <h2 className="editorial-heading text-3xl md:text-7xl">
              Curated <span className="text-yellow-400 italic">Selections</span>
            </h2>
          </div>

          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {offerings.map((offering, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="group relative p-8 md:p-12 glass-card rounded-[2rem] text-center hover:bg-white transition-all duration-700 shadow-elegant"
                >
                  <div className="mb-6 md:mb-8 inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-50 border border-muted group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <offering.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold mb-3 md:mb-4">
                    {offering.title}
                  </h3>
                  <p className="text-muted-foreground font-light text-xs md:text-sm leading-relaxed">
                    {offering.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Banner */}
        <section className="h-[60vh] relative flex items-center overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/banner.jpg"
              className="w-full h-full object-cover opacity-20 grayscale"
              alt="Heritage"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-white text-3xl md:text-8xl font-display font-bold mb-8 md:mb-12 opacity-90 italic">
                Redefining Elegance
              </h2>
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-24">
                {[
                  { label: "Quality", value: "Premium" },
                  { label: "Expertise", value: "Masters" },
                  { label: "Legacy", value: "25+ Years" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-white/60 editorial-caps mb-1 md:mb-2 text-[8px] md:text-[10px]">
                      {stat.label}
                    </div>
                    <div className="text-white text-lg md:text-2xl font-bold tracking-widest uppercase">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
