import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const WhyChooseSection = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section className="h-screen sticky top-0 z-10 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)),
            url("/images/choose.jpeg")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 h-full flex items-center">
        {/* LEFT */}
        <div className="flex flex-col gap-4 absolute left-20">
          <h2
            data-aos="fade-up"
            data-aos-duration="1000"
            className="lg:text-[130px] md:text-7xl text-5xl font-display text-white"
          >
            Textiles
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-xs tracking-[3px] text-neutral-300 ml-5"
          >
            PREMIUM TEXTILES
          </p>
        </div>

        {/* RIGHT */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="absolute right-6 bottom-28 max-w-md text-neutral-200"
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
