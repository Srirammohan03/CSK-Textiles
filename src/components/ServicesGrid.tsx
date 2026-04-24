import { Card, CardContent } from "./ui/card";
import { Scissors, Shirt, Users, Award, Clock, TrendingUp } from "lucide-react";

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
  return (
    <section className="relative md:py-20 py-10">
      {/* Background Image */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/2151914997.jpg")' }}
      /> */}

      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black/50" /> */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2
            data-aos="fade-up"
            data-aos-duration="1000"
            className="text-4xl md:text-6xl font-bold text-black mb-4"
          >
            Our Services
          </h2>
          <p
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="100"
            className="text-black/80 max-w-2xl mx-auto text-sm md:text-base"
          >
            Premium tailoring solutions crafted with precision, elegance, and
            years of trusted expertise.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Card
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={index * 100}
                key={index}
                className="bg-white/95 backdrop-blur-md border-0 shadow-xl rounded-2xl"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-700 leading-relaxed">
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
