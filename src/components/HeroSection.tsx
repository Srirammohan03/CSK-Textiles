import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-suiting.jpg";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(SplitText);

const HeroSection = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Background parallax
    tl.to(
      bgRef.current,
      {
        y: -200,
        scale: 1.3,
        ease: "none",
      },
      0,
    );

    // Text animations
    tl.to(line1Ref.current, { y: 150 }, 0);
    tl.to(line2Ref.current, { y: 200 }, 0);

    tl.to(pRef.current, { y: 120, opacity: 0 }, 0);
    tl.to(btnRef.current, { y: 140, opacity: 0 }, 0);
  }, []);

  return (
    <section className="sticky top-0 md:h-screen h-[80dvh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)), url("/images/banner.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* CENTER TEXT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <div className="md:w-[60%] w-full text-center md:leading-[0.9] leading-[1.1]">
          <div className="overflow-hidden">
            <span
              ref={line1Ref}
              className="block text-yellow-400 font-display italic text-[40px] lg:text-[80px] xl:text-[100px]"
            >
              Fabric for Men
            </span>
          </div>

          <div className="overflow-hidden">
            <span
              ref={line2Ref}
              className="block text-white font-display italic text-[40px] lg:text-[80px] xl:text-[100px]"
            >
              Who Lead.
            </span>
          </div>
        </div>
        <div className="overflow-hidden">
          <p ref={pRef} className="text-white/90 text-center mt-6 max-w-xl">
            Premium suiting, shirting, and groomwear fabrics curated in
            Hyderabad since 1998.
          </p>
        </div>
        <div className="overflow-hidden">
          <div ref={btnRef} className="flex gap-4 mt-6">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-300">
              Explore Suiting
            </Button>
            <Button variant="outline">Wedding Collection</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
