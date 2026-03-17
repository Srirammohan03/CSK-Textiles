"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EthosSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([line1Ref.current, line2Ref.current], {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%", // 30% visible
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div>
          {/* Top label */}
          <div className="flex items-center gap-6 mb-6">
            <p className="text-xs tracking-[4px] uppercase text-gray-700">
              THE CSK TEXTILES ETHOS
            </p>

            <div className="flex-1 h-[1px] bg-gray-400"></div>
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-display leading-tight text-gray-900 mb-6 overflow-hidden">
            <span ref={line1Ref} className="block">
              WHERE DESIGN
            </span>

            <span ref={line2Ref} className="block text-yellow-400">
              MEETS INNOVATION
            </span>
          </h2>

          {/* Paragraph */}
          <p className="text-gray-700 leading-7 max-w-xl mb-10">
            CSK Textiles, based in Hyderabad, is built on a strong foundation of
            quality, craftsmanship, and innovation in the textile industry. With
            years of experience in fabric production and modern printing
            technology, we combine traditional textile expertise with advanced
            manufacturing techniques.
            <br />
            <br />
            By adopting high-precision machinery and sustainable production
            methods, CSK Textiles delivers premium fabrics that meet the demands
            of modern fashion, uniforms, and industrial textile needs while
            maintaining the reliability and trust our customers expect.
          </p>

          {/* Bottom line */}
          <div className="h-[1px] bg-gray-400 w-full"></div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src="/images/ethos.jpg"
            alt="Textile Machine"
            className="w-[380px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default EthosSection;
