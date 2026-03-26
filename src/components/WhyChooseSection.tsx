import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const WhyChooseSection = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section className="min-h-screen md:h-screen relative md:sticky top-0 z-10 overflow-hidden bg-[#1a1a1a]">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,.65), rgba(0,0,0,.65)),
            url("/images/choose.jpeg")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-center md:items-center px-6 py-20 md:py-0">
        {/* LEFT / TOP */}
        <div className="flex flex-col gap-4 md:absolute md:left-20 text-center md:text-left mb-10 md:mb-0">
          <h2
            data-aos="fade-up"
            data-aos-duration="1000"
            className="text-6xl md:text-7xl lg:text-[130px] font-display text-white leading-none"
          >
            Textiles
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-xs tracking-[3px] text-yellow-400 uppercase font-medium"
          >
            PREMIUM TEXTILES
          </p>
        </div>

        {/* RIGHT / BOTTOM */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="md:absolute md:right-10 md:bottom-48 max-w-md text-center md:text-left text-neutral-200 text-sm md:text-base leading-relaxed bg-black/20 md:bg-transparent p-6 md:p-0 rounded-lg backdrop-blur-sm md:backdrop-blur-none"
        >
          At CSK Textiles, fabric is not just material — it is identity. Our
          premium suiting, sherwani, and traditional fabrics are crafted for
          elegance, comfort, and lasting impression. From wedding collections to
          executive wear, every textile reflects quality, heritage, and fine
          craftsmanship trusted for generations.
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
