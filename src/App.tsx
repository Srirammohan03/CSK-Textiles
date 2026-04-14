import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import ScrollToTop from "./components/ScrollToTop";
import WhatsAppIcon from "./components/WhatsAppIcon";

import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CollectionSuiting from "./pages/CollectionSuiting";
import CollectionShirting from "./pages/CollectionShirting";
import CollectionWedding from "./pages/CollectionWedding";
import CollectionKurta from "./pages/CollectionKurta";
import CollectionReadyToWear from "./pages/CollectionReadyToWear";
import Careers from "./pages/Careers";
import ProductDetails from "./pages/ProductDetails";
import Customize from "./pages/Customize";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import TermsPage from "./pages/Terms";
import PrivacyPage from "./pages/Privacy";

import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminEnquiries from "./pages/admin/Enquiries";
import AdminFabrics from "./pages/admin/Fabrics";
import AdminCareers from "./pages/admin/Careers";

const queryClient = new QueryClient();

function AppRoutes() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />

      {!isAdminRoute && <WhatsAppIcon />}

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collections/suiting" element={<CollectionSuiting />} />
        <Route path="/collections/shirting" element={<CollectionShirting />} />
        <Route path="/collections/wedding" element={<CollectionWedding />} />
        <Route path="/collections/kurta-pyjama" element={<CollectionKurta />} />
        <Route
          path="/collections/ready-to-wear"
          element={<CollectionReadyToWear />}
        />
        <Route path="/careers" element={<Careers />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/gallery" element={<Gallery />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/enquiries" element={<AdminEnquiries />} />
        <Route path="/admin/fabrics" element={<AdminFabrics />} />
        <Route path="/admin/careers" element={<AdminCareers />} />

        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
