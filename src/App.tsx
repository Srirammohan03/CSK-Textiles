import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
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
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminProducts = lazy(() => import("./pages/admin/Products"));
const AdminEnquiries = lazy(() => import("./pages/admin/Enquiries"));
const AdminFabrics = lazy(() => import("./pages/admin/Fabrics"));
const AdminCareers = lazy(() => import("./pages/admin/Careers"));
// import AdminDashboard from "./pages/admin/Dashboard";
// import AdminProducts from "./pages/admin/Products";
// import AdminEnquiries from "./pages/admin/Enquiries";
// import AdminFabrics from "./pages/admin/Fabrics";
// import AdminCareers from "./pages/admin/Careers";
import AuthProvider, { useAuth } from "./AuthProvider";
import { Loader2 } from "lucide-react";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import Fallback from "./Fallback";
import UserManagement from "./pages/UserManagement";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
    },
  },
});

function AppRoutes() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  const { isLoading, user } = useAuth();

  if (isLoading && isAdminRoute) return <Fallback />;

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

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <Suspense fallback={<Fallback />}>
                <AdminDashboard />
              </Suspense>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedAdminRoute>
              <Suspense fallback={<Fallback />}>
                <AdminProducts />
              </Suspense>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/enquiries"
          element={
            <ProtectedAdminRoute>
              <Suspense fallback={<Fallback />}>
                <AdminEnquiries />
              </Suspense>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/fabrics"
          element={
            <ProtectedAdminRoute>
              <Suspense fallback={<Fallback />}>
                <AdminFabrics />
              </Suspense>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/careers"
          element={
            <ProtectedAdminRoute>
              <Suspense fallback={<Fallback />}>
                <AdminCareers />
              </Suspense>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/user-management"
          element={
            <ProtectedAdminRoute>
              <Suspense fallback={<Fallback />}>
                <UserManagement />
              </Suspense>
            </ProtectedAdminRoute>
          }
        />

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
        <AuthProvider>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
