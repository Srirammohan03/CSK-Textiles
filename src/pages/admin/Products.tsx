import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  LogOut,
  Plus,
  Search,
  Bell,
  Menu,
  X,
  Package,
  Trash2,
  Edit2,
  ChevronRight,
  Briefcase,
  Mail,
  Crown,
  Upload,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/api/config";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminProducts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "suiting",
    price: "",
    description: "",
    fabric: "",
    isNewArrival: false,
    image: [] as string[],
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("admin_token");
  const API_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  const tabs = [
    "All",
    "Suiting",
    "Shirting",
    "Wedding",
    "Kurta Pyjama",
    "Ready To Wear",
  ];

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchProducts();
  }, [navigate, token, API_URL]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      let imageUrls = [...formData.image];

      // 1. Upload Image first if selected
      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append("image", selectedFile);

        const uploadRes = await fetch(`${API_URL}/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: uploadData,
        });

        if (uploadRes.status === 401) {
          toast.error("Session expired. Please log in again.");
          handleLogout();
          return;
        }

        if (!uploadRes.ok) throw new Error("Upload failed");
        const path = await uploadRes.text();
        imageUrls = [path]; // Use only the newly uploaded image for now
      }

      // 2. Create Product
      const productRes = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, image: imageUrls }),
      });

      if (productRes.status === 401) {
        toast.error("Session expired. Please log in again.");
        handleLogout();
        return;
      }

      if (productRes.ok) {
        toast.success("Signature piece added to collection");
        setIsAddModalOpen(false);
        resetForm();
        fetchProducts();
      } else {
        toast.error("Failed to create product");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during creation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "suiting",
      price: "",
      description: "",
      fabric: "",
      isNewArrival: false,
      image: [],
    });
    setSelectedFile(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        toast.error("Session expired. Please log in again.");
        handleLogout();
        return;
      }

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const filteredProducts = products.filter(
    (p) =>
      activeTab === "All" ||
      p.category.toLowerCase() === activeTab.toLowerCase(),
  );

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-1">
            Inventory Management
          </p>
          <h2 className="text-2xl  text-black tracking-tight">
            Master Collection
          </h2>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-black hover:bg-black/90 text-white rounded-md px-6 h-10 font-medium text-xs tracking-wide transition-all shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Signature Piece
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto space-x-1 mb-6 no-scrollbar border-b border-[#EAEAEA] pb-px">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] transition-all whitespace-nowrap border-b-2",
              activeTab === tab
                ? "border-black text-black"
                : "border-transparent text-black/40 hover:text-black hover:border-black/20",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#EAEAEA] rounded-lg overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#EAEAEA] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
            <Input
              placeholder="Search masterworks..."
              className="bg-transparent border-[#EAEAEA] pl-9 h-9 rounded-md focus:ring-0 focus:border-black transition-all w-full text-xs"
            />
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
            {filteredProducts.length} Records
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.15em] font-bold text-black/50 border-b border-[#EAEAEA] bg-[#FAFAFA]">
                <th className="px-6 py-4 font-medium">Masterwork</th>
                <th className="px-6 py-4 font-medium">Classification</th>
                <th className="px-6 py-4 font-medium text-right">Value</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEAEA]">
              {isLoading ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td
                        colSpan={4}
                        className="px-6 py-6 border-b border-[#EAEAEA]"
                      >
                        <div className="h-12 bg-[#F5F5F5] rounded w-full" />
                      </td>
                    </tr>
                  ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="group hover:bg-[#FAFAFA] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[#F5F5F5] overflow-hidden border border-[#EAEAEA] rounded flex-shrink-0">
                          <img
                            src={getImageUrl(product?.image)}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-black text-[13px] tracking-wide">
                            {product.name}
                          </span>
                          <span className="text-[10px] text-black/50 uppercase tracking-[0.1em] mt-0.5">
                            {product.fabric || "Premium"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-[#F5F5F5] border border-[#EAEAEA] text-black text-[9px] uppercase tracking-[0.1em] font-bold rounded-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-black text-[13px]">
                      ₹{product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-black/40 hover:text-black transition-colors">
                          <Edit2 className="w-4 h-4" strokeWidth={2} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-black/40 hover:text-[#E33D3D] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-20 text-center text-[13px] text-black/40  italic"
                  >
                    No records found in {activeTab}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-[#EAEAEA]"
            >
              <div className="px-8 py-6 border-b border-[#EAEAEA] flex items-center justify-between">
                <div>
                  <h3 className="text-lg  tracking-tight text-black">
                    New Signature Piece
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded hover:bg-[#F5F5F5] text-black/50 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-6">
                <form onSubmit={handleCreateProduct} className="space-y-6">
                  {/* Image Upload Area */}
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                      Featured Imaging
                    </Label>
                    <div
                      onClick={() =>
                        document.getElementById("file-upload")?.click()
                      }
                      className="border border-dashed border-[#CCCCCC] rounded bg-[#FAFAFA] h-32 flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors group overflow-hidden"
                    >
                      {selectedFile ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <p className="text-xs font-medium text-black">
                            {selectedFile.name}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute bottom-2 right-2 text-[10px] h-6 text-black/50 hover:text-[#E33D3D]"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFile(null);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 text-black/30 mb-2 group-hover:text-black transition-colors" />
                          <p className="text-[11px] font-medium text-black/50">
                            Select visual asset
                          </p>
                        </>
                      )}
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                        Collection Name
                      </Label>
                      <Input
                        placeholder="e.g. Imperial Silk Suit"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="h-10 rounded border-[#EAEAEA] focus:border-black focus:ring-0 text-xs shadow-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                        Category
                      </Label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full h-10 rounded border border-[#EAEAEA] focus:border-black focus:ring-0 text-xs font-medium px-3 bg-white shadow-none"
                      >
                        <option value="suiting">Suiting</option>
                        <option value="shirting">Shirting</option>
                        <option value="wedding">Wedding</option>
                        <option value="kurta-pyjama">Kurta Pyjama</option>
                        <option value="ready-to-wear">Ready To Wear</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                          Market Value (₹)
                        </Label>
                        <Input
                          type="number"
                          placeholder="Price"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                          required
                          className="h-10 rounded border-[#EAEAEA] focus:border-black focus:ring-0 text-xs shadow-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                          Fabric Quality
                        </Label>
                        <Input
                          placeholder="e.g. Wool"
                          value={formData.fabric}
                          onChange={(e) =>
                            setFormData({ ...formData, fabric: e.target.value })
                          }
                          required
                          className="h-10 rounded border-[#EAEAEA] focus:border-black focus:ring-0 text-xs shadow-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                        Detailed Description
                      </Label>
                      <Textarea
                        placeholder="Craftsmanship details..."
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        required
                        className="min-h-[100px] rounded border-[#EAEAEA] focus:border-black focus:ring-0 text-xs resize-none shadow-none"
                      />
                    </div>

                    <div className="flex items-center space-x-3 bg-[#FAFAFA] border border-[#EAEAEA] p-4 rounded">
                      <input
                        type="checkbox"
                        id="new-arrival"
                        checked={formData.isNewArrival}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isNewArrival: e.target.checked,
                          })
                        }
                        className="w-4 h-4 rounded-sm border-[#CCCCCC] text-black focus:ring-0"
                      />
                      <label
                        htmlFor="new-arrival"
                        className="text-xs font-semibold text-black tracking-wide"
                      >
                        Feature as New Arrival
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-black hover:bg-black/90 text-white rounded font-bold uppercase tracking-[0.15em] text-[10px] transition-all disabled:opacity-50 mt-6"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin mr-2" />
                        Transmitting...
                      </>
                    ) : (
                      "Ratify Signature Piece"
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

const Label = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <label className={cn("block text-xs font-medium text-black", className)}>
    {children}
  </label>
);

export default AdminProducts;
