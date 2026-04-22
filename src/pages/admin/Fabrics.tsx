import React, { useEffect, useMemo, useState } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import {
  Plus,
  Search,
  Loader2,
  Trash2,
  Pencil,
  Shirt,
  Gem,
  Briefcase,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getImageUrl } from "@/api/config";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { en } from "zod/v4/locales";

type OutfitType = "Suit" | "Shirt" | "Wedding_outfit";

type FabricItem = {
  id?: string;
  _id?: string;
  outfit: OutfitType;
  name: string;
  family: string;
  subLabel: string;
  pattern?: string;
  premium?: boolean;
  lightweight?: boolean;
  textureImage?: string;
};

const API = import.meta.env.VITE_API_BASE_URL;

const tabs: OutfitType[] = ["Suit", "Shirt", "Wedding_outfit"];

const initialForm = {
  id: "",
  outfit: "Suit" as OutfitType,
  name: "",
  family: "",
  subLabel: "",
  pattern: "solid",
  premium: false,
  lightweight: false,
  textureImage: null as File | null,
};

const AdminFabrics = () => {
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<OutfitType>("Suit");
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data: fabrics = [], isLoading } = useQuery<FabricItem[]>({
    queryKey: ["admin-fabrics", debouncedSearch],
    queryFn: async () => {
      const res = await axios.get(
        `${API}/customize?search=${encodeURIComponent(debouncedSearch)}`,
      );
      return res.data.customizes || [];
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const resetForm = () => {
    setForm({ ...initialForm, outfit: activeTab });
    setOpenForm(false);
  };

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("image", file);

    const res = await axios.post(`${API}/upload/unauth`, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  };

  const createPayload = async () => {
    let imageUrl = form.textureImage as any;

    if (form.textureImage instanceof File) {
      imageUrl = await uploadImage(form.textureImage);
    }

    if (!form.textureImage && form.id) {
      const oldItem = fabrics.find(
        (item) => String(item.id || item._id) === String(form.id),
      );

      imageUrl = oldItem?.textureImage || "";
    }

    return {
      outfit: form.outfit,
      name: form.name,
      family: form.family,
      subLabel: form.subLabel,
      pattern: form.pattern,
      premium: form.premium,
      lightweight: form.lightweight,
      textureImage: imageUrl,
    };
  };

  const addMutation = useMutation({
    mutationFn: async () => {
      const payload = await createPayload();
      return axios.post(`${API}/customize/add`, payload);
    },
    onSuccess: () => {
      toast.success("Fabric added successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-fabrics"] });
      resetForm();
    },
    onError: () => toast.error("Failed to add fabric"),
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      const payload = await createPayload();
      return axios.put(`${API}/customize/${form.id}`, payload);
    },
    onSuccess: () => {
      toast.success("Fabric updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-fabrics"] });
      resetForm();
    },
    onError: () => toast.error("Failed to update fabric"),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!deleteId) return;
      return axios.delete(`${API}/customize/delete/${deleteId}`);
    },
    onSuccess: () => {
      toast.success("Fabric deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-fabrics"] });
      setDeleteId(null);
      setDeleteOpen(false);
    },
    onError: () => toast.error("Failed to delete"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.family || !form.subLabel) {
      toast.error("Please fill required fields");
      return;
    }

    if (form.id) {
      updateMutation.mutate();
    } else {
      addMutation.mutate();
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleEdit = (item: FabricItem) => {
    setForm({
      id: item.id || item._id || "",
      outfit: item.outfit,
      name: item.name,
      family: item.family,
      subLabel: item.subLabel,
      pattern: item.pattern || "solid",
      premium: !!item.premium,
      lightweight: !!item.lightweight,
      textureImage: item.textureImage as any,
    });

    setOpenForm(true);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAEAEA] pb-6 mb-8 font-sans">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-1">
            Customize Inventory
          </p>
          <h2 className="text-2xl text-black tracking-tight">Admin Fabrics</h2>
        </div>

        <Button
          onClick={() => {
            setForm({ ...initialForm, outfit: activeTab });
            setOpenForm(true);
          }}
          className="h-11 px-5 rounded-xl bg-black text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Fabric
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6 font-sans">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setForm((prev) => ({ ...prev, outfit: tab }));
            }}
            className={`h-11 px-5 rounded-xl border flex items-center gap-2 transition ${
              activeTab === tab
                ? "bg-black text-white border-black"
                : "bg-white text-black border-[#E5E7EB]"
            }`}
          >
            {tab === "Suit" && <Briefcase className="w-4 h-4" />}
            {tab === "Shirt" && <Shirt className="w-4 h-4" />}
            {tab === "Wedding_outfit" && <Gem className="w-4 h-4" />}
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-4 mb-6 font-sans">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fabrics..."
            className="w-full h-11 rounded-xl border border-[#E5E7EB] pl-11 pr-4 outline-none"
          />
        </div>
      </div>

      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="max-w-3xl rounded-2xl p-0 overflow-hidden font-sans">
          <div className="p-6">
            <DialogHeader className="mb-5">
              <DialogTitle className="text-xl font-semibold">
                {form.id ? "Update Fabric" : "Add Fabric"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="Fabric Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-11 px-4 rounded-xl border"
              />

              <input
                placeholder="Family"
                value={form.family}
                onChange={(e) => setForm({ ...form, family: e.target.value })}
                className="h-11 px-4 rounded-xl border"
              />

              <input
                placeholder="Sub Label"
                value={form.subLabel}
                onChange={(e) => setForm({ ...form, subLabel: e.target.value })}
                className="h-11 px-4 rounded-xl border"
              />

              <input
                placeholder="Pattern"
                value={form.pattern}
                onChange={(e) => setForm({ ...form, pattern: e.target.value })}
                className="h-11 px-4 rounded-xl border"
              />

              <div className="md:col-span-2 space-y-3">
                <label className="h-11 px-4 rounded-xl border flex items-center gap-3 cursor-pointer w-full">
                  <ImageIcon className="w-4 h-4" />
                  <span className="text-sm truncate">
                    {form.textureImage instanceof File
                      ? form.textureImage.name
                      : form.textureImage
                        ? "Current Image"
                        : "Upload Fabric Image"}
                  </span>

                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        textureImage: e.target.files?.[0] || null,
                      })
                    }
                  />
                </label>
                <p className="text-[12px] text-gray-500 px-1 italic">
                  * Please upload flat fabric images only; ensure there are no
                  shadows or folds.
                </p>
                {form.textureImage && (
                  <div className="md:col-span-2">
                    <img
                      src={
                        form.textureImage instanceof File
                          ? URL.createObjectURL(form.textureImage)
                          : getImageUrl(form.textureImage as string)
                      }
                      alt="Preview"
                      className="w-28 h-28 rounded-xl object-cover border"
                    />
                  </div>
                )}
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.premium}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      premium: e.target.checked,
                    })
                  }
                />
                Premium
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.lightweight}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      lightweight: e.target.checked,
                    })
                  }
                />
                Lightweight
              </label>

              <div className="md:col-span-2 flex gap-3 pt-3">
                <Button
                  type="submit"
                  className="bg-black text-white rounded-xl h-11 px-6"
                  disabled={addMutation.isPending || updateMutation.isPending}
                >
                  {addMutation.isPending || updateMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : form.id ? (
                    "Update Fabric"
                  ) : (
                    "Add Fabric"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="rounded-xl h-11 px-6"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <div className="bg-white rounded-2xl border border-[#EAEAEA] overflow-hidden font-sans">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-[#EAEAEA] bg-[#FAFAFA] text-left">
                <th className="px-4 py-3 text-xs">Image</th>
                <th className="px-4 py-3 text-xs">Name</th>
                <th className="px-4 py-3 text-xs">Family</th>
                <th className="px-4 py-3 text-xs">Sub Label</th>
                <th className="px-4 py-3 text-xs">Pattern</th>
                <th className="px-4 py-3 text-xs">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : Array.isArray(fabrics) && fabrics.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-black/50">
                    No fabrics found
                  </td>
                </tr>
              ) : (
                (Array.isArray(fabrics) ? fabrics : []).map((item) => {
                  const id = item.id || item._id || "";

                  return (
                    <tr
                      key={id}
                      className="border-b border-[#F1F1F1] hover:bg-[#FAFAFA]"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={getImageUrl(item.textureImage)}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover border"
                        />
                      </td>

                      <td className="px-4 py-3 text-sm">{item.name}</td>
                      <td className="px-4 py-3 text-sm">{item.family}</td>
                      <td className="px-4 py-3 text-sm">{item.subLabel}</td>
                      <td className="px-4 py-3 text-sm">{item.pattern}</td>

                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="w-9 h-9 rounded-lg border flex items-center justify-center"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(id)}
                            className="w-9 h-9 rounded-lg border flex items-center justify-center text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmDialog
        title="Delete Fabric?"
        description="This action cannot be undone."
        onConfirm={() => deleteMutation.mutate()}
        onOpenChange={setDeleteOpen}
        open={deleteOpen}
      />
    </AdminLayout>
  );
};

export default AdminFabrics;
