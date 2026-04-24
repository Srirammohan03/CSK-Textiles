import { useEffect, useState } from "react";
import {
  Search,
  Package,
  Trash2,
  Mail,
  User,
  Phone,
  Clock,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { cn } from "@/lib/utils";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import axios from "axios";

const AdminEnquiries = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const query = useQueryClient();

  const categories = [
    "All",
    "shirting",
    "suiting",
    "contact",
    "customize",
    "kurta-pyjama",
    "ready-to-wear",
  ];

  const { data: enquiries = [], isLoading } = useQuery({
    queryKey: ["enquiries", debouncedSearch],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/inquiries?search=${encodeURIComponent(debouncedSearch)}`,
        {
          withCredentials: true,
        },
      );
      return data || [];
    },
    placeholderData: keepPreviousData,
  });

  const handleDelete = async (id: number) => {
    if (!id) return;
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!deleteId) return;
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/inquiries/${deleteId}`,
        {
          withCredentials: true,
        },
      );
      return res.data;
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["enquiries"] });
      toast.success("Enquiry removed successfully");
      setDeleteOpen(false);
      setDeleteId(null);
    },
    onError: () => {
      toast.error("Failed to remove enquiry");
      setDeleteOpen(false);
      setDeleteId(null);
    },
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6" />
        </div>
      </AdminLayout>
    );
  }

  const filteredEnquiries = enquiries?.filter((e) => {
    if (activeTab === "All") return true;
    if (activeTab === "General") return e.type === "contact";
    return e.productCategory?.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 font-sans">
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
      <div className="flex overflow-x-auto space-x-1 mb-6 no-scrollbar border-b border-[#EAEAEA] pb-px font-sans">
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

      <div className="grid grid-cols-1 gap-4 font-sans">
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
                    <div className="space-y-3 font-sans">
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
                        <p className="text-sm text-black truncate">
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

      <DeleteConfirmDialog
        title="Delete Enquiry?"
        description="This action cannot be undone."
        onConfirm={() => deleteMutation.mutate()}
        onOpenChange={setDeleteOpen}
        open={deleteOpen}
      />
    </AdminLayout>
  );
};

export default AdminEnquiries;
