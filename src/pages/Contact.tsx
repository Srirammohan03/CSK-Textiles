import { useState } from "react";
import { z } from "zod";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be less than 15 digits"),
  message: z.string().trim().min(1, "Message is required").max(500, "Message must be less than 500 characters")
});

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      contactSchema.parse(formData);
      
      // Clear any previous errors
      setErrors({});
      
      // Format WhatsApp message
      const whatsappNumber = "919876543210"; // Replace with actual number
      const message = `Hello CSK Textiles!

*Name:* ${formData.name}
*Phone:* ${formData.phone}

*Message:*
${formData.message}

Looking forward to hearing from you!`;
      
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Opening WhatsApp...",
        description: "Your message is ready to send via WhatsApp.",
      });
      
      // Reset form
      setFormData({ name: "", phone: "", message: "" });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0].toString()] = issue.message;
          }
        });
        setErrors(fieldErrors);
        
        toast({
          title: "Validation Error",
          description: "Please check the form for errors.",
          variant: "destructive"
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
  };

  const stores = [
    {
      name: "Patel Market Store",
      address: "21-1-821, Patel Market, Rikabgunj",
      city: "Hyderabad 500002",
      phone: "+91 XXX XXX XXXX",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.9825!2d78.4667!3d17.3616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIxJzQxLjgiTiA3OMKwMjgnMDAuMSJF!5e0!3m2!1sen!2sin!4v1234567890"
    },
    {
      name: "Mehdipatnam Store",
      address: "MIG-44, Road No. 2, APHB Colony",
      city: "Mehdipatnam, Hyderabad 500028",
      phone: "+91 XXX XXX XXXX",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.5!2d78.4344!3d17.3917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzMwLjEiTiA3OMKwMjYnMDMuOCJF!5e0!3m2!1sen!2sin!4v1234567891"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                Visit CSK Textiles Hyderabad
              </h1>
              <p className="text-lg text-muted-foreground">
                Experience premium men's fabrics in person at our Rikabgunj showroom
              </p>
            </div>
          </div>
        </section>

        {/* Store Hours Info */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-display font-semibold">Store Hours</h3>
              </div>
              <p className="text-muted-foreground">
                Monday - Saturday: 10:00 AM - 8:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </section>

        {/* Two Store Locations with Maps */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
              Visit Our Stores
            </h2>
            
            <div className="space-y-16 max-w-6xl mx-auto">
              {stores.map((store, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-8 items-start">
                  {/* Store Info */}
                  <Card className="border-border">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-2xl font-display font-bold text-primary mb-4">
                        {store.name}
                      </h3>
                      
                      <div className="flex items-start gap-4">
                        <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">Address</h4>
                          <p className="text-muted-foreground text-sm">
                            {store.address}<br />
                            {store.city}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">Phone</h4>
                          <p className="text-muted-foreground text-sm">{store.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <MessageCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">WhatsApp Enquiry</h4>
                          <p className="text-muted-foreground text-sm mb-2">
                            Quick response for fabric queries
                          </p>
                          <Button 
                            onClick={() => {
                              const whatsappNumber = "919876543210";
                              const message = `Hello! I would like to know more about your fabric collection at ${store.name}.`;
                              const encodedMessage = encodeURIComponent(message);
                              window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`, '_blank');
                            }}
                            className="bg-[#25D366] hover:bg-[#20BA5A] text-white"
                            size="sm"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Chat on WhatsApp
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Google Map */}
                  <div className="aspect-video md:aspect-square bg-muted rounded-lg overflow-hidden border border-border shadow-md">
                    <iframe
                      src={store.mapEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${store.name} Location`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WhatsApp Enquiry Form */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="border-border shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366]/10 mb-4">
                      <MessageCircle className="h-8 w-8 text-[#25D366]" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                      Quick WhatsApp Enquiry
                    </h2>
                    <p className="text-muted-foreground">
                      Get instant responses to your fabric and tailoring questions
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Your Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements: suiting, shirting, wedding wear, etc."
                        rows={4}
                        className={errors.message ? "border-destructive" : ""}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive mt-1">{errors.message}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Maximum 500 characters
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold"
                      size="lg"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Send via WhatsApp
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
