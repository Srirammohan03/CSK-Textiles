import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

type OutfitType = "Suit" | "Shirt" | "Wedding outfit";

type FabricItem = {
  id?: string;
  _id?: string;
  outfit: OutfitType;
  name: string;
  family: string;
  subLabel: string;
  defaultColor: string;
  colors: string[];
  pattern?: string;
  premium?: boolean;
  lightweight?: boolean;
  textureImage?: string;
};

const API = import.meta.env.VITE_API_BASE_URL;

const tabs: OutfitType[] = ["Suit", "Shirt", "Wedding outfit"];

const initialForm = {
  id: "",
  outfit: "Suit" as OutfitType,
  name: "",
  family: "",
  subLabel: "",
  defaultColor: "#111827",
  colors: "",
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

  const { data: fabrics = [], isLoading } = useQuery<FabricItem[]>({
    queryKey: ["admin-fabrics"],
    queryFn: async () => {
      const res = await axios.get(`${API}/customize`);
      return res.data.data || [];
    },
  });

  const filteredData = useMemo(() => {
    return fabrics.filter((item) => {
      const matchTab = item.outfit === activeTab;

      const term = search.toLowerCase();

      const matchSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.family.toLowerCase().includes(term) ||
        item.subLabel.toLowerCase().includes(term);

      return matchTab && matchSearch;
    });
  }, [fabrics, activeTab, search]);

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
    let imageUrl = "";

    if (form.textureImage) {
      imageUrl = await uploadImage(form.textureImage);
    }

    return {
      outfit: form.outfit,
      name: form.name,
      family: form.family,
      subLabel: form.subLabel,
      defaultColor: form.defaultColor,
      colors: form.colors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
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
    mutationFn: async (id: string) => {
      return axios.delete(`${API}/customize/${id}`);
    },
    onSuccess: () => {
      toast.success("Fabric deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-fabrics"] });
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

  const handleEdit = (item: FabricItem) => {
    setForm({
      id: item.id || item._id || "",
      outfit: item.outfit,
      name: item.name,
      family: item.family,
      subLabel: item.subLabel,
      defaultColor: item.defaultColor,
      colors: item.colors?.join(", ") || "",
      pattern: item.pattern || "solid",
      premium: !!item.premium,
      lightweight: !!item.lightweight,
      textureImage: null,
    });

    setOpenForm(true);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAEAEA] pb-6 mb-8">
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

      <div className="flex flex-wrap gap-3 mb-6">
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
            {tab === "Wedding outfit" && <Gem className="w-4 h-4" />}
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-4 mb-6">
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

      {openForm && (
        <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 mb-6">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Fabric Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="h-11 px-4 rounded-xl border border-[#E5E7EB]"
            />

            <input
              placeholder="Family"
              value={form.family}
              onChange={(e) => setForm({ ...form, family: e.target.value })}
              className="h-11 px-4 rounded-xl border border-[#E5E7EB]"
            />

            <input
              placeholder="Sub Label"
              value={form.subLabel}
              onChange={(e) => setForm({ ...form, subLabel: e.target.value })}
              className="h-11 px-4 rounded-xl border border-[#E5E7EB]"
            />

            <input
              placeholder="Colors comma separated"
              value={form.colors}
              onChange={(e) => setForm({ ...form, colors: e.target.value })}
              className="h-11 px-4 rounded-xl border border-[#E5E7EB]"
            />

            <input
              placeholder="Pattern"
              value={form.pattern}
              onChange={(e) => setForm({ ...form, pattern: e.target.value })}
              className="h-11 px-4 rounded-xl border border-[#E5E7EB]"
            />

            <input
              type="color"
              value={form.defaultColor}
              onChange={(e) =>
                setForm({ ...form, defaultColor: e.target.value })
              }
              className="h-11 px-2 rounded-xl border border-[#E5E7EB]"
            />

            <label className="h-11 px-4 rounded-xl border border-[#E5E7EB] flex items-center gap-3 cursor-pointer">
              <ImageIcon className="w-4 h-4" />
              <span className="text-sm truncate">
                {form.textureImage
                  ? form.textureImage.name
                  : "Upload Fabric Image"}
              </span>

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  setForm({
                    ...form,
                    textureImage: e.target.files?.[0] || null,
                  })
                }
              />
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.premium}
                onChange={(e) =>
                  setForm({ ...form, premium: e.target.checked })
                }
              />
              Premium
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.lightweight}
                onChange={(e) =>
                  setForm({ ...form, lightweight: e.target.checked })
                }
              />
              Lightweight
            </label>

            <div className="md:col-span-2 flex gap-3 pt-2">
              <Button
                type="submit"
                className="h-11 px-6 rounded-xl bg-black text-white"
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
                className="h-11 px-6 rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-[#EAEAEA] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-[#EAEAEA] bg-[#FAFAFA] text-left">
                <th className="px-4 py-3 text-xs">Image</th>
                <th className="px-4 py-3 text-xs">Name</th>
                <th className="px-4 py-3 text-xs">Family</th>
                <th className="px-4 py-3 text-xs">Sub Label</th>
                <th className="px-4 py-3 text-xs">Pattern</th>
                <th className="px-4 py-3 text-xs">Color</th>
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
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-black/50">
                    No fabrics found
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => {
                  const id = item.id || item._id || "";

                  return (
                    <tr
                      key={id}
                      className="border-b border-[#F1F1F1] hover:bg-[#FAFAFA]"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={`${API}${item.textureImage}`}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover border"
                        />
                      </td>

                      <td className="px-4 py-3 text-sm">{item.name}</td>
                      <td className="px-4 py-3 text-sm">{item.family}</td>
                      <td className="px-4 py-3 text-sm">{item.subLabel}</td>
                      <td className="px-4 py-3 text-sm">{item.pattern}</td>

                      <td className="px-4 py-3">
                        <div
                          className="w-8 h-8 rounded-full border"
                          style={{ background: item.defaultColor }}
                        />
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="w-9 h-9 rounded-lg border flex items-center justify-center"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => deleteMutation.mutate(id)}
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
    </AdminLayout>
  );
};

export default AdminFabrics;
