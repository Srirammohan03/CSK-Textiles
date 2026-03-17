import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutPreview = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg"
                alt="CSK Textiles Store"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl font-display text-foreground mb-6 flex flex-wrap gap-x-[0.3em]"
            >
              Heritage of Excellence in Rikabgunj
            </h2>
            <p className="text-muted-foreground text-lg mb-4">
              Since 1998, CSK Textiles has been synonymous with premium men's
              fabrics in Hyderabad's historic Rikabgunj market. What started as
              a vision by Chimanlal Suresh Kumar has grown into a trusted
              destination for executives and grooms seeking exceptional quality.
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              Our expertise spans premium suiting for corporate professionals,
              fine shirting for daily elegance, and luxurious wedding fabrics
              for the most important day of your life.
            </p>
            <Link to="/about">
              <Button variant="outline" size="lg" className="group px-8">
                Our Complete Story
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
