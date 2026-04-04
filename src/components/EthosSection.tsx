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
          start: "top 50%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 px-6 md:px-10 relative md:absolute min-h-screen md:h-[100dvh] bg-[#fbf9f6] z-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div>
          <div className="flex items-center gap-6 mb-6">
            <p className="text-xs tracking-[4px] uppercase text-gray-700">
              THE CSK TEXTILES ETHOS
            </p>
            <div className="flex-1 h-[1px] bg-gray-400"></div>
          </div>

          <h2 className="text-3xl md:text-6xl font-display leading-tight text-gray-900 mb-6 overflow-hidden">
            <span ref={line1Ref} className="block">
              WHERE DESIGN
            </span>
            <span ref={line2Ref} className="block text-yellow-400">
              MEETS INNOVATION
            </span>
          </h2>

          <p className="text-gray-700 leading-7 md:text-xl text-[16px] max-w-xl mb-10">
            CSK Textiles, based in Hyderabad, is built on a strong foundation of
            quality in the textile industry. With years of experience in fabric
            sourcing and distribution, we combine traditional textile expertise
            with a deep understanding of market trends.
            <br />
            <br />
            Specializing in the trading and import of high-quality fabrics, CSK
            Textiles delivers premium materials that meet the demands of modern
            fashion, uniforms, and industrial textile needs—while maintaining
            the reliability and trust our customers expect.
          </p>

          <div className="h-[1px] bg-gray-400 w-full"></div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:flex justify-end items-center">
          <img
            src="/images/ethos.png"
            alt="Textile"
            className="w-full max-w-[520px] lg:max-w-[620px] object-cover rounded-2xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default EthosSection;
