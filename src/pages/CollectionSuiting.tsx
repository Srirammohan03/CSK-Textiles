import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProductsByCategory } from "@/data/products";

const CollectionSuiting = () => {
  const products = getProductsByCategory("suiting");

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                Premium Suiting Collection
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover our curated selection of premium wool, merino, and
                blended suiting fabrics for the modern executive
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden border-border hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-muted relative">
                    {product.isNew && (
                      <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                        New
                      </Badge>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {product.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Fabric:</span>
                        <span className="font-medium">{product.fabric}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Colors:</span>
                        <span className="font-medium">
                          {product.colors.join(", ")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-2xl font-bold text-primary">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        per meter
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-center mb-8">
                Why Choose Our Suiting Fabrics
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h3 className="font-display font-semibold text-lg mb-2">
                    Premium Quality
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Sourced from Italy and top international mills
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-display font-semibold text-lg mb-2">
                    Expert Guidance
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Personalized recommendations for your needs
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-display font-semibold text-lg mb-2">
                    Tailoring Support
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Advice on cuts, styles, and measurements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default CollectionSuiting;
