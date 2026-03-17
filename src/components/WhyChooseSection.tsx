import { Award, Users, Scissors, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Award,
    title: "Since 1998",
    description:
      "25+ years of textile expertise in Hyderabad's premium fabric market",
  },
  {
    icon: Users,
    title: "Groomwear Experts",
    description: "Specialized in wedding sherwani and formal occasion fabrics",
  },
  {
    icon: Scissors,
    title: "Custom Tailoring",
    description: "Expert guidance for bespoke suits and traditional groomwear",
  },
  {
    icon: Briefcase,
    title: "Executive Fabrics",
    description: "Premium suiting for professionals who value quality",
  },
];

const WhyChooseSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-display text-foreground mb-4"
          >
            Why Choose CSK Textiles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Trusted by Hyderabad's discerning men for over two decades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
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

export default WhyChooseSection;
