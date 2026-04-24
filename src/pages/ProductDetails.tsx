import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProduct } from "@/hooks/useProducts";
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
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(id);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (product?.image?.length) {
      setActiveImage(
        Array.isArray(product.image) ? product.image[0] : product.image,
      );
    }
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">
          Retrieving Masterpiece Details
        </p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <AlertCircle className="w-12 h-12 text-red-500/20 mx-auto mb-6" />
          <h2 className="text-2xl font-display mb-2">
            Heritage Record Not Found
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            The requested collection piece might have been moved or archived.
          </p>
          <Button onClick={() => navigate(-1)} className="rounded-full px-8">
            Return to Collection
          </Button>
        </div>
      </div>
    );
  }

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwwRo_8d5_VRXVQ2fXPXL3kmOisEEsvHfL4qrVXNRNDRwzP696S8g3TOkl5SJIhqUKE/exec";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const form = e.currentTarget;
    const formValues = new FormData(form);

    try {
      // -------------------------
      // 1. Save to Backend
      // -------------------------
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formValues.get("name"),
          phone: formValues.get("phone"),
          email: formValues.get("email"),
          message: formValues.get("message"),
          type: "product",
          productCategory: product?.category || "general",
          productName: product?.name || "",
        }),
      });

      // -------------------------
      // 2. Save to Google Sheets
      // -------------------------
      const payload = new URLSearchParams();

      payload.append("name", formValues.get("name") as string);
      payload.append("phone", formValues.get("phone") as string);
      payload.append("email", formValues.get("email") as string);
      payload.append("message", formValues.get("message") as string);
      payload.append("type", "product");
      payload.append("product", product?.name || "");
      payload.append("productCategory", product?.category || "general");

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: payload,
        mode: "no-cors",
      });

      toast.success("Enquiry sent successfully");

      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const productImages = Array.isArray(product.image)
    ? product.image
    : [product.image];

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-body">
      <Header />

      <main className="flex-grow">
        {/* Product Hero Banner */}
        <section className="relative h-[60vh] overflow-hidden bg-black">
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
                className="mb-4 border-white/30 text-white/70 uppercase tracking-[0.3em] py-1 px-4 rounded-full backdrop-blur-sm font-bold"
              >
                Collection Details
              </Badge>
              <h1 className="text-4xl md:text-6xl font-display font-medium text-white tracking-tight leading-none">
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
            <span className="text-[10px] uppercase tracking-widest font-bold">
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
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#fbf9f6] border border-slate-100 shadow-2xl flex items-center justify-center p-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="max-w-full max-h-full object-contain drop-shadow-2xl"
                  />
                </AnimatePresence>
              </div>

              {productImages.length > 1 && (
                <div className="grid grid-cols-5 gap-4 px-2">
                  {productImages.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={cn(
                        "aspect-square rounded-2xl overflow-hidden bg-slate-50 cursor-pointer transition-all duration-300 border-2 p-1",
                        activeImage === img
                          ? "border-primary scale-105 shadow-lg shadow-primary/10"
                          : "border-transparent opacity-60 hover:opacity-100",
                      )}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                  {product.isNewArrival && (
                    <Badge className="rounded-full px-4 py-1.5 bg-primary text-white uppercase tracking-widest text-[9px] font-black border-none shadow-elegant">
                      New Release
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className="rounded-full px-4 py-1.5 border-slate-200 text-slate-400 uppercase tracking-widest text-[9px] font-bold"
                  >
                    Standard Fitting
                  </Badge>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-800 tracking-tight mb-6 leading-tight">
                  {product.name}
                </h2>
                <div className="h-1 w-20 bg-accent mb-8" />
                <p className="text-xl text-slate-500 font-light leading-relaxed max-w-lg">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-y-10 py-10 border-y border-slate-100 mb-12">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-3 font-bold">
                    Fabric Selection
                  </p>
                  <p className="font-bold text-slate-700">{product.fabric}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-3 font-bold">
                    Style Recommended
                  </p>
                  <p className="font-bold text-slate-700">
                    {product.style || "Signature Tailored Fit"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-3 font-bold">
                    Available Palette
                  </p>
                  <div className="flex gap-2.5 items-center">
                    {(product.colors || []).map((color, idx) => (
                      <span
                        key={idx}
                        title={color}
                        className="w-5 h-5 rounded-full border border-slate-100 shadow-sm"
                        style={{
                          backgroundColor: color.toLowerCase().includes("black")
                            ? "#000"
                            : color.toLowerCase().includes("navy")
                              ? "#1a2a44"
                              : color.toLowerCase().includes("charcoal")
                                ? "#36454F"
                                : color.toLowerCase().includes("gold")
                                  ? "#D4AF37"
                                  : "#f0f0f0",
                        }}
                      />
                    ))}
                    <span className="text-xs font-bold text-slate-400 ml-1">
                      {product.colors?.length || 0} Professional Options
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-3 font-bold">
                    Operational Lead Time
                  </p>
                  <p className="font-bold text-slate-700">
                    10-14 Business Days
                  </p>
                </div>
                <div className="col-span-2 pt-4">
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
                            : "Wedding_outfit";
                      navigate("/customize", { state: { outfit: outfitType } });
                    }}
                    className="w-full h-14 rounded-2xl border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-[0.1em] text-[11px] shadow-sm transition-all hover:shadow-lg"
                  >
                    Configure Custom Design
                  </Button>
                </div>
              </div>

              <div className="prose prose-sm text-slate-500 mb-12">
                <h4 className="text-slate-800 font-bold mb-5 uppercase tracking-widest text-[10px]">
                  Legacy Craftsmanship
                </h4>
                <p className="leading-relaxed font-light">
                  {product.longDescription ||
                    "Each thread is curated for the modern connoisseur. Our master tailors ensure that every piece reflecting the CSK heritage is executed with mathematical precision and artistic flair."}
                </p>
              </div>

              {/* Inquiry Form - Premium Card */}
              <div className="bg-[#fbf9f6] p-10 rounded-[2.5rem] border border-slate-100 shadow-elegant">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-800">
                      Bespoke Inquiry
                    </h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">
                      Consultation Request
                    </p>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2.5">
                      <Label
                        htmlFor="name"
                        className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1"
                      >
                        Identifier
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Full Name"
                        required
                        className="bg-white border-slate-100 h-12 rounded-xl focus:ring-primary/5 focus:border-primary transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label
                        htmlFor="phone"
                        className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1"
                      >
                        Contact Channel
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="number"
                        placeholder="Mobile Number"
                        required
                        maxLength={10}
                        className="bg-white border-slate-100 h-12 rounded-xl focus:ring-primary/5 focus:border-primary transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label
                        htmlFor="phone"
                        className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email"
                        required
                        className="bg-white border-slate-100 h-12 rounded-xl focus:ring-primary/5 focus:border-primary transition-all font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <Label
                      htmlFor="message"
                      className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1"
                    >
                      Specifications / Objectives
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your desired fit and occasion..."
                      className="bg-white border-slate-100 rounded-xl focus:ring-primary/5 focus:border-primary transition-all min-h-[120px] font-medium p-4"
                      required
                      name="message"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/95 text-white font-bold uppercase tracking-[0.2em] text-[11px] shadow-elegant transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      "Secure Consultation"
                    )}
                  </Button>
                </form>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-10 mt-14 pt-10 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                    <Ruler className="w-5 h-5 text-primary/40" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                    Precision Fitting
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-primary/40" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                    Secure Logistics
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
