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

  const left = categories.slice(0, 3);
  const right = categories.slice(3, 6);

  // ================= MOBILE LAYOUT =================

  if (isMobile) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* TITLE */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Our Strengths</h2>
            <p className="text-muted-foreground">
              Why customers choose us. Technology depth and unmatched
              flexibility.
            </p>
          </div>

          {/* CARDS */}
          {[...left, ...right].map((c) => (
            <Link key={c.id} to={c.link} className="block">
              <Card className="overflow-hidden">
                <div className="aspect-square">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold flex justify-between">
                    {c.name}
                    <ArrowRight className="h-4 w-4" />
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {c.description}
                  </p>
                </CardContent>
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
    >
      <div className="relative w-full max-w-7xl h-full flex items-start justify-between px-6 pt-10">
        {/* LEFT */}
        <div ref={leftRef} className="space-y-10 w-72">
          {left.map((c) => (
            <div key={c.id}>
              <Link to={c.link} className="group block">
                <Card className="overflow-hidden">
                  <div className="aspect-square">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold flex justify-between">
                      {c.name}
                      <ArrowRight className="h-5 w-5" />
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {c.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>

        {/* CENTER */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div ref={centerTextRef} className="text-center pointer-events-auto">
            <h2 className="text-5xl font-bold mb-6">Our Strengths</h2>

            <p className="text-lg text-muted-foreground max-w-md">
              Why customers choose us. Technology depth and unmatched
              flexibility.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div ref={rightRef} className="space-y-10 w-72 pb-10">
          {right.map((c) => (
            <div key={c.id}>
              <Link to={c.link} className="group block">
                <Card className="overflow-hidden">
                  <div className="aspect-square">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold flex justify-between">
                      {c.name}
                      <ArrowRight className="h-5 w-5" />
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {c.description}
                    </p>
                  </CardContent>
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
