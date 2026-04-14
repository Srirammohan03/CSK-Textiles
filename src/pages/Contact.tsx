import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, MessageCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const stores = [
  {
    name: "Rikab Gunj Showroom",
    address: "Agarwal College Rd, Patel Market, Hyderabad - 500002",
    phone: "+91 40 2456 7139",
    map: "https://www.google.com/maps?q=17.3616,78.4667&z=15&output=embed",
  },
  {
    name: "Mehdipatnam Showroom",
    address: "Gudimalkapur, Mehdipatnam, Hyderabad - 500028",
    phone: "+91 90306 09700",
    map: "https://www.google.com/maps?q=17.3917,78.4344&z=15&output=embed",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const GOOGLE_SCRIPT_URL_3 =
    "https://script.google.com/macros/s/AKfycbwwRo_8d5_VRXVQ2fXPXL3kmOisEEsvHfL4qrVXNRNDRwzP696S8g3TOkl5SJIhqUKE/exec";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      contactSchema.parse(formData);
      setErrors({});

      const payload = new URLSearchParams();
      payload.append("name", formData.name);
      payload.append("phone", formData.phone);
      payload.append("message", formData.message);
      payload.append("type", "contact");

      // Fire backend attempt (optional)
      fetch("http://localhost:5000/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          type: "contact",
          productCategory: "general",
        }),
      }).catch((err) => {
        console.error("Backend Failed:", err);
      });

      // Always submit to Google Sheets
      await fetch(GOOGLE_SCRIPT_URL_3, {
        method: "POST",
        body: payload,
        mode: "no-cors",
      });

      toast({
        title: "Inquiry Received",
        description: "Our master tailors will contact you shortly.",
      });

      setFormData({
        name: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};

        err.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0].toString()] = issue.message;
          }
        });

        setErrors(fieldErrors);
      } else {
        console.error(err);

        toast({
          title: "Error",
          description: "Submission failed",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const contactSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(100, "Max 100 characters"),

    phone: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, "Enter valid 10-digit phone number"),

    message: z
      .string()
      .trim()
      .min(1, "Message is required")
      .max(500, "Max 500 characters"),
  });
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        {/* HERO */}
        <section className="relative py-28 md:py-40 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40">
            <img
              src="/images/premium-banner.png"
              className="w-full h-full object-cover mix-blend-overlay opacity-60"
            />
          </div>

          <div className="relative z-10 container mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-bold text-white"
            >
              Visit Our Showrooms
            </motion.h1>

            <p className="mt-4 text-white/70 max-w-xl mx-auto text-sm md:text-lg">
              Discover premium fabrics crafted for elegance and tradition.
            </p>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-12">
            {/* STORES */}
            <div className="lg:col-span-5 space-y-6">
              {stores.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden border"
                >
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">{s.name}</h3>

                    <div className="flex gap-3 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mt-1" />
                      <p>{s.address}</p>
                    </div>

                    <div className="flex gap-3 text-sm font-medium">
                      <Phone className="w-4 h-4 mt-1" />
                      <p>{s.phone}</p>
                    </div>
                  </div>

                  <iframe
                    src={s.map}
                    className="w-full h-52 border-t"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>

            {/* FORM */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 sticky top-28">
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                  Instant Enquiry
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* NAME */}
                  <div className="space-y-1">
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      className={`h-12 rounded-xl ${
                        errors.name
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* PHONE */}
                  <div className="space-y-1">
                    <Input
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: "" });
                      }}
                      className={`h-12 rounded-xl ${
                        errors.phone
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  {/* MESSAGE */}
                  <div className="space-y-1">
                    <Textarea
                      name="message"
                      placeholder="What are you looking for?"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message)
                          setErrors({ ...errors, message: "" });
                      }}
                      className={`min-h-[120px] rounded-xl ${
                        errors.message
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />

                    <div className="flex justify-between">
                      {errors.message ? (
                        <p className="text-xs text-red-500">{errors.message}</p>
                      ) : (
                        <div />
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formData.message.length}/500
                      </p>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-[#ffd500] hover:bg-[#ffe97c] rounded-xl text-base font-semibold text-gray-900"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </form>

                {/* TRUST */}
                <div className="flex justify-between mt-8 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Trusted Store
                  </div>
                  <div>Premium Fabrics</div>
                  <div>Fast Response</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA STRIP */}
        <section className="bg-black text-white py-12 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold">
            Need Help Choosing Fabric?
          </h3>
          <p className="text-white/60 mt-2 mb-6">
            Talk to our experts instantly on WhatsApp
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
