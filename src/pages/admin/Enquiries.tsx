import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Settings,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
  Package,
  Trash2,
  ChevronRight,
  Mail,
  User,
  Phone,
  Clock,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { cn } from "@/lib/utils";

const AdminEnquiries = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  const token = localStorage.getItem("admin_token");
  const API_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  const categories = [
    "All",
    "suiting",
    "contact",
    "customize",
    "General",
    "kurta-pyjama",
    "ready-to-wear",
  ];

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchEnquiries = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_URL}/inquiries`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (Array.isArray(data)) {
          setEnquiries(data);
        } else {
          setEnquiries([]);
          console.error("Inquiries data is not an array:", data);
        }
      } catch (error) {
        toast.error("Failed to fetch enquiries");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnquiries();
  }, [navigate, token, API_URL]);

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this enquiry record?")) return;

    try {
      const res = await fetch(`${API_URL}/inquiries/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setEnquiries(enquiries.filter((e) => e.id !== id));
        toast.success("Enquiry removed successfully");
      } else {
        toast.error("Failed to remove enquiry");
      }
    } catch (error) {
      toast.error("Error removing enquiry");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (activeTab === "All") return true;
    if (activeTab === "General") return e.type === "contact";
    return e.productCategory?.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-1">
            Lead Management
          </p>
          <h2 className="text-2xl  text-black tracking-tight">
            Live Enquiries
          </h2>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto space-x-1 mb-6 no-scrollbar border-b border-[#EAEAEA] pb-px">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={cn(
              "px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] transition-all whitespace-nowrap border-b-2",
              activeTab === cat
                ? "border-black text-black"
                : "border-transparent text-black/40 hover:text-black hover:border-black/20",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-48 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg animate-pulse"
              />
            ))
        ) : filteredEnquiries.length > 0 ? (
          filteredEnquiries.map((enquiry) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={enquiry.id}
              className="group bg-white rounded-lg border border-[#EAEAEA] shadow-sm p-6 hover:shadow-md transition-all relative"
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => handleDelete(enquiry.id)}
                  className="p-2 text-black/40 hover:text-[#E33D3D] transition-colors"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex flex-col gap-6 pr-10">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "px-2 py-1 rounded-sm text-[9px] font-bold uppercase tracking-[0.15em] border border-[#EAEAEA]",
                      enquiry.type === "contact"
                        ? "bg-[#F5F5F5] text-black"
                        : "bg-black text-white border-transparent",
                    )}
                  >
                    {enquiry.type === "contact"
                      ? "General Enquiry"
                      : `${enquiry.productCategory} Inquiry`}
                  </span>
                  <span className="text-[10px] text-black/50 font-medium uppercase tracking-widest flex items-center">
                    <Clock className="w-3 h-3 mr-1.5" strokeWidth={1.5} />
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 border-b border-[#EAEAEA] pb-6">
                  <div>
                    <h3 className="text-xl  text-black mb-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded border border-[#EAEAEA] bg-[#FAFAFA] flex items-center justify-center">
                        <User
                          className="w-4 h-4 text-black/60"
                          strokeWidth={1.5}
                        />
                      </div>
                      {enquiry.name}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-xs font-medium text-black/60">
                        <Mail
                          className="w-4 h-4 mr-3 text-black/40"
                          strokeWidth={1.5}
                        />
                        {enquiry.email || "No Email Provided"}
                      </div>
                      <div className="flex items-center text-xs font-medium text-black/60">
                        <Phone
                          className="w-4 h-4 mr-3 text-black/40"
                          strokeWidth={1.5}
                        />
                        {enquiry.phone}
                      </div>
                    </div>
                  </div>

                  <div>
                    {enquiry.productName && (
                      <div className="bg-[#FAFAFA] border border-[#EAEAEA] rounded p-4 mb-4">
                        <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-black/60 mb-2">
                          <Package
                            className="w-3.5 h-3.5 mr-2"
                            strokeWidth={1.5}
                          />
                          Subject of Interest
                        </div>
                        <p className=" text-sm text-black truncate">
                          {enquiry.productName}
                        </p>
                      </div>
                    )}
                    <div className="relative pl-4 border-l-2 border-black/10">
                      <p className="text-sm font-light leading-relaxed text-black/80 italic">
                        "{enquiry.message}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-32 bg-white rounded-lg border border-dashed border-[#CCCCCC]">
            <Mail
              className="w-8 h-8 text-black/20 mx-auto mb-4"
              strokeWidth={1}
            />
            <h3 className="text-sm font-bold uppercase tracking-wider text-black/60">
              Quiet Reception
            </h3>
            <p className="text-black/40 text-xs mt-2 italic ">
              New customer enquiries will appear here in real-time.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEnquiries;
