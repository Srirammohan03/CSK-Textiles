import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, X, Trash2, Edit2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/api/config";
import AdminLayout from "@/components/admin/AdminLayout";
import { Product } from "@/data/products";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";

const AdminProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    category: "suiting",
    price: "",
    description: "",
    fabric: "",
    isNewArrival: false,
    image: [] as string[],
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const tabs = [
    "All",
    "suiting",
    "shirting",
    "wedding",
    "kurta-pyjama",
    "ready-to-wear",
  ];

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", activeTab, debouncedSearch],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (activeTab !== "All") {
        params.append("category", activeTab.toLowerCase());
      }

      if (debouncedSearch.trim()) {
        params.append("search", debouncedSearch.trim());
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/products?${params.toString()}`,
        {
          withCredentials: true,
        },
      );

      return res.data || [];
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    if (selectedProduct && isAddModalOpen) {
      setFormData({
        name: selectedProduct.name,
        category: selectedProduct.category,
        price: selectedProduct.price.toString(),
        description: selectedProduct.description,
        fabric: selectedProduct.fabric,
        isNewArrival: selectedProduct.isNewArrival,
        image: selectedProduct.image || [],
      });
    } else if (!selectedProduct && isAddModalOpen) {
      resetForm();
    }
  }, [selectedProduct, isAddModalOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
      e.target.value = ""; // Allows the same file to be selected again if needed
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "edit") {
      updateMutation.mutate();
    } else {
      createMutation.mutate();
    }
  };

  const createMutation = useMutation({
    mutationFn: async () => {
      let imageUrls = [...formData.image];

      try {
        if (selectedFiles.length > 0) {
          const uploadedImages = [];

          for (const file of selectedFiles) {
            const uploadData = new FormData();
            uploadData.append("image", file);

            const uploadRes = await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/upload`,
              uploadData,
              {
                withCredentials: true,
              },
            );

            const path = uploadRes.data;
            uploadedImages.push(path);
          }

          imageUrls = uploadedImages;
        }
      } catch (error) {
        toast.error("Failed to upload images");
      }

      // 2. Create Product
      const productRes = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/products`,
        {
          ...formData,
          price: Number(formData.price),
          image: imageUrls,
        },
        {
          withCredentials: true,
        },
      );

      return (await productRes.data) || [];
    },
    onSuccess: () => {
      toast.success("Signature piece added to collection");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      setIsAddModalOpen(false);
      resetForm();
    },
    onError: () => {
      toast.error("Failed to create product");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!selectedProduct) throw new Error("No product selected");

      let imageUrls = [...formData.image];

      try {
        if (selectedFiles.length > 0) {
          const uploadedImages = [];

          for (const file of selectedFiles) {
            const uploadData = new FormData();
            uploadData.append("image", file);

            const uploadRes = await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/upload`,
              uploadData,
              {
                withCredentials: true,
              },
            );

            const path = uploadRes.data;
            uploadedImages.push(path);
          }

          imageUrls = uploadedImages;
        }
      } catch (error) {
        toast.error("Failed to upload images");
      }

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/products/${selectedProduct.id}`,
        {
          ...formData,
          price: Number(formData.price),
          image: imageUrls,
        },
        {
          withCredentials: true,
        },
      );

      return res.data || [];
    },

    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      setSelectedProduct(null);
      setIsAddModalOpen(false);
      resetForm();
    },

    onError: () => {
      toast.error("Failed to update product");
    },
  });

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
    setSelectedFiles([]);
    setSelectedProduct(null);
    setMode("create");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/products/${id}`,
        {
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        toast.success("Product deleted successfully");

        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 font-sans">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-1">
            Inventory Management
          </p>
          <h2 className="text-2xl  text-black tracking-tight">
            Master Collection
          </h2>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setMode("create");
            setIsAddModalOpen(true);
          }}
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

      <div className="bg-white border border-[#EAEAEA] rounded-lg overflow-hidden shadow-sm font-sans">
        <div className="p-4 border-b border-[#EAEAEA] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
            <Input
              placeholder="Search masterworks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-[#EAEAEA] pl-9 h-9 rounded-md focus:ring-0 focus:border-black transition-all w-full text-xs"
            />
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
            {products.length} Records
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
              ) : products?.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="group hover:bg-[#FAFAFA] transition-colors font-sans"
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
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setMode("edit");
                            setIsAddModalOpen(true);
                          }}
                          className="p-2 text-black/40 hover:text-black transition-colors"
                        >
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

      {/* Add Product Dialog */}
      <Dialog
        open={isAddModalOpen}
        onOpenChange={(open) => {
          setIsAddModalOpen(open);

          if (!open) {
            resetForm();
          }
        }}
      >
        <DialogContent className="sm:max-w-md max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden rounded-xl border border-[#EAEAEA] font-sans">
          {/* Header */}
          <DialogHeader className="px-8 py-6 border-b border-[#EAEAEA] flex-none">
            <DialogTitle className="text-lg font-semibold tracking-tight text-black">
              {mode === "edit" ? "Edit Signature Piece" : "New Signature Piece"}
            </DialogTitle>
          </DialogHeader>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <form onSubmit={handleCreateProduct} className="space-y-6">
              {/* Image Upload */}

              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                  Product Images
                </Label>

                <div
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                  className="border border-dashed rounded-lg p-4 cursor-pointer"
                >
                  <p className="text-sm text-center text-muted-foreground">
                    Click to Upload Multiple Images
                  </p>

                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Preview Images */}
                {(selectedFiles.length > 0 ||
                  (mode === "edit" && formData.image?.length > 0)) && (
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {/* Existing Images */}
                    {mode === "edit" &&
                      formData.image?.map((img, index) => (
                        <div
                          key={`existing-${index}`}
                          className="relative h-24 rounded overflow-hidden border"
                        >
                          <img
                            src={getImageUrl(img)}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                image: prev.image.filter((_, i) => i !== index),
                              }));
                            }}
                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-neutral-100 transition-colors"
                          >
                            <X className="w-3 h-3 text-black" />
                          </button>
                        </div>
                      ))}

                    {/* New Upload Files */}
                    {selectedFiles.map((file, index) => (
                      <div
                        key={`new-${index}`}
                        className="relative h-24 rounded overflow-hidden border"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedFiles((prev) =>
                              prev.filter((_, i) => i !== index),
                            )
                          }
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-neutral-100 transition-colors"
                        >
                          <X className="w-3 h-3 text-black" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                  Collection Name
                </Label>

                <Input
                  placeholder="e.g. Imperial Silk Suit"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                  Category
                </Label>

                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="suiting">Suiting</option>
                  <option value="shirting">Shirting</option>
                  <option value="wedding">Wedding</option>
                  <option value="kurta-pyjama">Kurta Pyjama</option>
                  <option value="ready-to-wear">Ready To Wear</option>
                </select>
              </div>

              {/* Price + Fabric */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                    Price (₹)
                  </Label>

                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                    Fabric
                  </Label>

                  <Input
                    value={formData.fabric}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fabric: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                  Detailed Description
                </Label>

                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="min-h-[120px]"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-3 rounded-md border border-[#EAEAEA] bg-[#FAFAFA] p-4">
                <input
                  type="checkbox"
                  checked={formData.isNewArrival}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isNewArrival: e.target.checked,
                    })
                  }
                />

                <span className="text-sm font-medium">
                  Feature as New Arrival
                </span>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="w-full h-11"
              >
                {mode === "edit"
                  ? updateMutation.isPending
                    ? "Updating..."
                    : "Update Product"
                  : createMutation.isPending
                    ? "Creating..."
                    : "Create Product"}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
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
