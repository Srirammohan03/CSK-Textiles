import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Users, TrendingUp, Award, Clock, Shirt } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Custom Tailoring",
    description: "Expert bespoke tailoring for perfect-fit suits, shirts, and groomwear"
  },
  {
    icon: Shirt,
    title: "Premium Fabrics",
    description: "Imported Italian wool, Egyptian cotton, and luxury silk collections"
  },
  {
    icon: Users,
    title: "Wedding Consultation",
    description: "Personalized styling sessions for grooms and wedding parties"
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "25+ years of trusted quality and craftsmanship in every fabric"
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Fast service without compromising on quality or attention to detail"
  },
  {
    icon: TrendingUp,
    title: "Latest Trends",
    description: "Seasonal collections featuring the newest patterns and styles"
  }
];

const ServicesGrid = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete fabric and tailoring solutions for the modern gentleman
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
