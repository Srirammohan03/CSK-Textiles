import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  LogOut, 
  Search,
  ChevronRight,
  Package,
  Layers,
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminFabrics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const fabricCategories = [
    { name: "Egyptian Cotton", type: "Shirting", count: 24, description: "Premium long-staple cotton for luxury shirts." },
    { name: "Pure Silk", type: "Suiting/Wedding", count: 12, description: "Hand-loomed silk for royal ceremonial wear." },
    { name: "Italian Wool", type: "Suiting", count: 18, description: "Fine wool for executive-class bespoke suits." },
    { name: "Linen Master", type: "Summer Wear", count: 15, description: "Breathable linen for casual elegance." },
  ];

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-[#EAEAEA] pb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-1">
            Material Archive
          </p>
          <h2 className="text-2xl  text-black tracking-tight">
            Premium Fabrics
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {fabricCategories.map((cat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={cat.name}
            className="group relative bg-white p-6 rounded-lg border border-[#EAEAEA] shadow-sm hover:border-black/20 transition-all overflow-hidden"
          >
            <div className="mb-6">
              <Package className="w-5 h-5 text-black/60" strokeWidth={1.5} />
            </div>
            
            <h3 className="text-xl  text-black mb-1">{cat.name}</h3>
            <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-black/50 mb-4 block">
              {cat.type}
            </span>
            
            <p className="text-xs text-black/60 leading-relaxed mb-6">
              {cat.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-[#EAEAEA]">
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-black">
                {cat.count} Variants
              </span>
              <button className="text-black/40 group-hover:text-black transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 bg-[#FAFAFA] rounded-lg p-8 border border-[#EAEAEA] text-center flex flex-col items-center">
        <Layers className="w-8 h-8 text-black/20 mb-4" strokeWidth={1.5} />
        <h3 className="text-sm font-bold uppercase tracking-wider text-black/60">
          Advanced Inventory Control
        </h3>
        <p className="text-black/40 text-xs mt-2 max-w-sm italic ">
          Fabric categorization allows for high-precision filtering in the Signature Collection gallery.
        </p>
      </div>
    </AdminLayout>
  );
};

export default AdminFabrics;
