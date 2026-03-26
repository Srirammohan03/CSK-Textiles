import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ChevronLeft,
  Ruler,
  ShieldCheck,
  Truck,
  Mail,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(product?.image[0] || "");

  useEffect(() => {
    if (product) setActiveImage(product.image[0]);
  }, [product]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display mb-4">Product not found</h2>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "Inquiry sent successfully! Our stylist will contact you soon.",
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Product Hero Banner */}
        <section className="relative h-[40vh] overflow-hidden bg-black">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover blur-sm scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-white" />
          </motion.div>

          <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Badge
                variant="outline"
                className="mb-4 border-white/30 text-white/70 uppercase tracking-[0.3em] py-1 px-4 rounded-full backdrop-blur-sm"
              >
                Product Details
              </Badge>
              <h1 className="text-4xl md:text-6xl font-display font-medium text-white tracking-tight lowercase first-letter:uppercase">
                {product.name}
              </h1>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 pt-12 pb-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-black transition-colors mb-12 group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm uppercase tracking-widest font-medium">
              Back to Collection
            </span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Product Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-muted shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
              <div className="grid grid-cols-5 gap-4">
                {product.image.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={cn(
                      "aspect-square rounded-2xl overflow-hidden bg-muted cursor-pointer transition-all duration-300 border-2",
                      activeImage === img
                        ? "border-black scale-105"
                        : "border-transparent opacity-60 hover:opacity-100",
                    )}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  {product.isNew && (
                    <Badge className="rounded-full px-4 py-1 bg-black text-white uppercase tracking-widest text-[10px]">
                      New Release
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className="rounded-full px-4 py-1 border-black/10 text-muted-foreground uppercase tracking-widest text-[10px]"
                  >
                    Standard Fitting
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground tracking-tight mb-4 lowercase first-letter:uppercase">
                  {product.name}
                </h1>
                <p className="text-xl text-muted-foreground font-light leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 py-8 border-y border-black/5 mb-12">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Fabric Selection
                  </p>
                  <p className="font-medium">{product.fabric}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Style Recommended
                  </p>
                  <p className="font-medium">
                    {product.style || "Tailored Fit"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Available Colors
                  </p>
                  <div className="flex gap-2 items-center">
                    {product.colors.map((color, idx) => (
                      <span
                        key={idx}
                        className="w-4 h-4 rounded-full border border-black/5"
                        style={{
                          backgroundColor: color.toLowerCase().includes("black")
                            ? "#000"
                            : color.toLowerCase().includes("navy")
                              ? "#000080"
                              : color.toLowerCase().includes("charcoal")
                                ? "#36454F"
                                : "#ccc",
                        }}
                      />
                    ))}
                    <span className="text-sm ml-1">
                      {product.colors.length} options
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Lead Time
                  </p>
                  <p className="font-medium">10 - 14 Business Days</p>
                </div>
                <div>
                  {" "}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      const outfitType =
                        product.category === "suiting"
                          ? "Suit"
                          : product.category === "shirting"
                            ? "Shirt"
                            : "Wedding outfit";
                      navigate("/customize", { state: { outfit: outfitType } });
                    }}
                    className="w-full h-12 rounded-xl border-black text-black font-medium shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    Customize Design
                  </Button>
                </div>
              </div>

              <div className="prose prose-sm text-muted-foreground mb-12">
                <h4 className="text-black font-medium mb-4 uppercase tracking-widest text-xs">
                  Exquisite Details
                </h4>
                <p className="leading-relaxed">
                  {product.longDescription ||
                    "This premium fabric is meticulously selected and curated for the modern gentleman. Every strand of thread represents our commitment to legacy and fine tailoring."}
                </p>
              </div>

              {/* Inquiry Form */}
              <div className="bg-muted/30 p-8 rounded-3xl border border-black/5">
                <h3 className="text-lg font-display font-medium mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Inquire About This Design
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-[10px] uppercase tracking-widest ml-1"
                      >
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your Name"
                        className="bg-white border-none rounded-xl focus-visible:ring-1 focus-visible:ring-primary shadow-sm"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-[10px] uppercase tracking-widest ml-1"
                      >
                        Contact Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your Email"
                        className="bg-white border-none rounded-xl focus-visible:ring-1 focus-visible:ring-primary shadow-sm"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-[10px] uppercase tracking-widest ml-1"
                    >
                      Preferred Style / Measurements
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="I am interested in a 3-piece suit with peak lapels..."
                      className="bg-white border-none rounded-xl focus-visible:ring-1 focus-visible:ring-primary shadow-sm min-h-[100px]"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                      type="submit"
                      className="w-full h-12 rounded-xl bg-black hover:bg-black/90 text-white font-medium shadow-lg transition-transform hover:scale-[1.02]"
                    >
                      Book Consultation
                    </Button>
                  </div>
                </form>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-black/5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span className="text-[10px] uppercase tracking-widest font-medium">
                    Lifetime Guarantee
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Ruler className="w-5 h-5 text-blue-600" />
                  <span className="text-[10px] uppercase tracking-widest font-medium">
                    Custom Fitting
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-amber-600" />
                  <span className="text-[10px] uppercase tracking-widest font-medium">
                    Private Delivery
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
