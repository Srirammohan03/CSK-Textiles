import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, ExternalLink } from "lucide-react";

const InstagramReels = () => {
  const reels = [
    {
      id: 1,
      thumbnail: "/placeholder.svg",
      title: "Premium Suiting Collection"
    },
    {
      id: 2,
      thumbnail: "/placeholder.svg",
      title: "Wedding Sherwani Fabrics"
    },
    {
      id: 3,
      thumbnail: "/placeholder.svg",
      title: "Executive Shirting"
    },
    {
      id: 4,
      thumbnail: "/placeholder.svg",
      title: "Behind The Scenes"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Instagram className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Follow Us on Instagram
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            See our latest fabrics, styling tips, and customer stories
          </p>
          <a 
            href="https://www.instagram.com/csktextiles" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2">
              @csktextiles
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {reels.map((reel) => (
            <a
              key={reel.id}
              href="https://www.instagram.com/csktextiles"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="overflow-hidden border-border hover:shadow-lg transition-all duration-300">
                <div className="aspect-[9/16] bg-muted relative overflow-hidden">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <Instagram className="h-6 w-6 mb-2" />
                      <p className="text-sm font-medium">{reel.title}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramReels;
