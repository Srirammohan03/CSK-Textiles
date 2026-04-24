import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { ArrowRight } from "lucide-react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const CategoryGrid = ({ categories }) => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const centerTextRef = useRef(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useLayoutEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1000",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        leftRef.current,
        {
          y: () => {
            const overflow = leftRef.current.scrollHeight - window.innerHeight;
            return overflow > 0 ? -(overflow + 100) : 0;
          },
          ease: "none",
        },
        0,
      );

      tl.fromTo(
        rightRef.current,
        {
          y: () => {
            const overflow = rightRef.current.scrollHeight - window.innerHeight;
            return overflow > 0 ? -(overflow + 100) : 0;
          },
        },
        {
          y: 0,
          ease: "none",
        },
        0,
      );

      tl.fromTo(centerTextRef.current, { y: 0 }, { y: 200, ease: "none" }, 0);
    });

    return () => ctx.revert();
  }, [categories, isMobile]);

  const mid = Math.ceil(categories.length / 2);
  const left = categories.slice(0, mid);
  const right = categories.slice(mid);

  // ================= MOBILE LAYOUT =================

  if (isMobile) {
    return (
      <section
        className="py-16 px-6 "
        style={{
          backgroundImage: "url('/images/2151914997.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-6xl mx-auto space-y-10">
          {/* TITLE */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Our collections </h2>
            <p className="text-black">
              Why customers choose us. Technology depth and unmatched
              flexibility.
            </p>
          </div>

          {/* CARDS */}
          {categories.slice(0, 6).map((c, index) => (
            <Link key={`${c.id}-${index}`} to={c.link} className="block">
              <Card className="overflow-hidden rounded-2xl shadow-md">
                <div className="relative w-full h-[320px] bg-white flex items-center justify-center">
                  {/* IMAGE */}
                  <img
                    src={c.image}
                    alt={c.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* TEXT */}
                  <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                    <h3 className="text-lg font-semibold flex justify-between items-center">
                      {c.name}
                      <ArrowRight className="h-4 w-4" />
                    </h3>

                    <p className="text-sm text-white/80">{c.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  // ================= DESKTOP LAYOUT (UNCHANGED) =================

  return (
    <section
      ref={sectionRef}
      className="h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/21519.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative w-full max-w-7xl h-full flex items-start justify-between px-6 pt-10">
        {/* LEFT */}
        <div ref={leftRef} className="space-y-10 w-72">
          {left.map((c, index) => (
            <div key={`${c.id}-${index}`}>
              <Link to={c.link} className="group block">
                <Card className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500">
                  <div className="relative w-full h-[420px] overflow-hidden">
                    {/* IMAGE */}
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* GRADIENT */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* TEXT */}
                    <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                      <h3 className="text-lg font-semibold flex justify-between items-center">
                        {c.name}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                      </h3>

                      <p className="text-sm text-white/80 mt-1">
                        {c.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>

        {/* CENTER */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div ref={centerTextRef} className="text-center pointer-events-auto">
            <h2 className="text-5xl font-bold mb-6">Our collections </h2>

            <p className="text-lg text-black max-w-md">
              Why customers choose us. Technology depth and unmatched
              flexibility.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div ref={rightRef} className="space-y-10 w-72 pb-10">
          {right.map((c, index) => (
            <div key={`${c.id}-${index}`}>
              <Link to={c.link} className="group block">
                <Card className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500">
                  <div className="relative w-full h-[420px] overflow-hidden">
                    {/* IMAGE */}
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* GRADIENT */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* TEXT */}
                    <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                      <h3 className="text-lg font-semibold flex justify-between items-center">
                        {c.name}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                      </h3>

                      <p className="text-sm text-white/80 mt-1">
                        {c.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
