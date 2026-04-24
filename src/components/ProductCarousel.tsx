import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/hooks/useProducts";
import { Link } from "react-router-dom";

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

const ProductCarousel = ({
  products,
  title = "New Arrivals",
  subtitle = "Fresh additions to our premium collection",
}: ProductCarouselProps) => {
  return (
    <section className="py-24 bg-[#fbf9f6] border-y border-slate-100">
      <div className="container mx-auto px-6 md:px-10">
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary/50 font-black mb-3">
            Freshly Curated
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-800 tracking-tight leading-none mb-4">
            {title}
          </h2>
          <p className="text-slate-400 font-light text-lg">{subtitle}</p>
        </div>

        <div className="overflow-x-auto pb-8 -mx-10 px-10 scrollbar-hide">
          <div className="flex gap-8" style={{ width: "max-content" }}>
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group w-[300px] md:w-[380px] flex-shrink-0"
              >
                <Card className="overflow-hidden border-slate-100 bg-white shadow-elegant group-hover:shadow-2xl transition-all duration-500 rounded-[2rem] border-none">
                  <div className="aspect-[4/5] bg-slate-50 relative overflow-hidden flex items-center justify-center p-6">
                    {product.isNewArrival && (
                      <Badge className="absolute top-6 right-6 bg-accent text-primary uppercase font-black text-[9px] tracking-widest px-3 py-1 border-none shadow-lg">
                        New
                      </Badge>
                    )}
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-xl"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[9px] uppercase tracking-[0.2em] font-black text-primary/40">
                        {product.category}
                      </span>
                      <div className="h-px flex-1 bg-slate-100" />
                    </div>
                    <h3 className="font-display font-medium text-2xl text-slate-800 mb-2 tracking-tight group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-400 font-medium mb-6 uppercase tracking-widest">
                      {product.fabric}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <span className="text-xl font-bold text-slate-900 tabular-nums">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <div className="flex gap-1">
                        {product.colors?.slice(0, 3).map((color, i) => (
                          <div
                            key={i}
                            style={{
                              backgroundColor: color
                                .toLowerCase()
                                .includes("black")
                                ? "#000"
                                : "#ccc",
                            }}
                            className="w-2.5 h-2.5 rounded-full border border-slate-100"
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
