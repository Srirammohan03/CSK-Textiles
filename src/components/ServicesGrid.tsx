import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Users, TrendingUp, Award, Clock, Shirt } from "lucide-react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Scissors,
    title: "Custom Tailoring",
    description:
      "Expert bespoke tailoring for perfect-fit suits, shirts, and groomwear",
  },
  {
    icon: Shirt,
    title: "Premium Fabrics",
    description:
      "Imported Italian wool, Egyptian cotton, and luxury silk collections",
  },
  {
    icon: Users,
    title: "Wedding Consultation",
    description: "Personalized styling sessions for grooms and wedding parties",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description:
      "25+ years of trusted quality and craftsmanship in every fabric",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description:
      "Fast service without compromising on quality or attention to detail",
  },
  {
    icon: TrendingUp,
    title: "Latest Trends",
    description:
      "Seasonal collections featuring the newest patterns and styles",
  },
];

const ServicesGrid = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const wordOurRef = useRef(null);
  const wordServicesRef = useRef(null);
  const cardsRef = useRef(null);
  const introRef = useRef(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useLayoutEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 0.5,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        introRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
      );

      tl.to(
        wordOurRef.current,
        { x: "-100%", opacity: 0, duration: 2 },
        "split",
      );
      tl.to(
        wordServicesRef.current,
        { x: "100%", opacity: 0, duration: 2 },
        "split",
      );

      tl.fromTo(
        bgRef.current,
        { scale: 0, opacity: 0, borderRadius: "100%" },
        {
          scale: 1,
          opacity: 1,
          borderRadius: "0%",
          duration: 2,
          ease: "none",
        },
        "split",
      );

      tl.fromTo(
        cardsRef.current.children,
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 2, ease: "none" },
        "split+=0.8",
      );
    });

    return () => ctx.revert();
  }, [isMobile]);

  // ================= MOBILE LAYOUT =================
  if (isMobile) {
    return (
      <section className="py-16 px-6 bg-background">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold mb-3">
              Our Services
            </h2>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              From bespoke tailoring to expert consultations, we provide a
              complete textile experience.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="bg-background border-border/50 shadow-lg"
                >
                  <CardContent className="p-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-sm text-foreground mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // ================= DESKTOP LAYOUT (UNCHANGED) =================
  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center origin-center"
        style={{ backgroundImage: 'url("/images/2151914997.jpg")' }}
      />

      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <h2
          ref={introRef}
          className="text-6xl md:text-9xl font-display font-bold text-foreground flex gap-8"
        >
          <span ref={wordOurRef} className="inline-block">
            Our
          </span>
          <span ref={wordServicesRef} className="inline-block">
            Services
          </span>
        </h2>
      </div>

      <div className="relative z-30 container mx-auto px-4 h-full flex flex-col justify-center">
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="bg-background border-border/50 shadow-2xl"
              >
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
