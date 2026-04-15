import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Mail,
  LogOut,
  Plus,
  Search,
  Bell,
  Menu,
  X,
  ChevronRight,
  Briefcase,
  Users,
  MapPin,
  Clock,
  ExternalLink,
  Trash2,
  Edit,
  Eye,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Job, JobApplication } from "@/hooks/useJobs";
import AdminLayout from "@/components/admin/AdminLayout";
import { getImageUrl } from "@/api/config";

const AdminCareers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("opportunities"); // 'opportunities' or 'submissions'
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("admin_token");
  const API_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  // Form State for new Job
  const [jobFormData, setJobFormData] = useState({
    title: "",
    category: "Design",
    description: "",
    requirements: "",
    package: "",
    location: "Mumbai, HQ",
    type: "Full-time",
  });

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [jobsRes, appsRes] = await Promise.all([
        fetch(`${API_URL}/jobs/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/jobs/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (jobsRes.ok && appsRes.ok) {
        setJobs(await jobsRes.json());
        setApplications(await appsRes.json());
      }
    } catch (error) {
      toast.error("Failed to fetch recruitment data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = isEditMode
        ? `${API_URL}/jobs/${editingJob?.id}`
        : `${API_URL}/jobs`;

      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobFormData),
      });

      if (res.ok) {
        toast.success(
          isEditMode ? "Job updated successfully" : "Job listing published",
        );

        setIsAddModalOpen(false);
        setIsEditMode(false);
        setEditingJob(null);

        fetchData();

        setJobFormData({
          title: "",
          category: "Design",
          description: "",
          requirements: "",
          package: "",
          location: "Mumbai, HQ",
          type: "Full-time",
        });
      }
    } catch (error) {
      toast.error(
        isEditMode ? "Failed to update job" : "Failed to publish job",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (
      !confirm(
        "Are you sure? This will also remove all candidate submissions for this role.",
      )
    )
      return;
    try {
      const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Job removed from systems");
        fetchData();
      }
    } catch (error) {
      toast.error("Deletion failed");
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsEditMode(true);
    setIsAddModalOpen(true);

    setJobFormData({
      title: job.title,
      category: job.category,
      description: job.description,
      requirements: job.requirements,
      package: job.package,
      location: job.location,
      type: job.type,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-1">
            Talent Acquisition
          </p>
          <h2 className="text-2xl  text-black tracking-tight">
            Recruitment Suite
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-[#F5F5F5] p-1 rounded-md border border-[#EAEAEA]">
            <button
              onClick={() => setActiveTab("opportunities")}
              className={cn(
                "px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] transition-all rounded-sm",
                activeTab === "opportunities"
                  ? "bg-white text-black shadow-sm"
                  : "text-black/50 hover:text-black",
              )}
            >
              Opportunities
            </button>
            <button
              onClick={() => setActiveTab("submissions")}
              className={cn(
                "px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] transition-all rounded-sm",
                activeTab === "submissions"
                  ? "bg-white text-black shadow-sm"
                  : "text-black/50 hover:text-black",
              )}
            >
              Submissions
            </button>
          </div>
          {activeTab === "opportunities" && (
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-black hover:bg-black/90 text-white rounded-md px-6 h-10 font-medium text-xs tracking-wide transition-all shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Opening
            </Button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "opportunities" ? (
          <motion.div
            key="opps"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {isLoading ? (
              Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-48 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg animate-pulse"
                  />
                ))
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-6 rounded-lg border border-[#EAEAEA] shadow-sm hover:border-black/20 transition-all group"
                >
                  <div className="flex flex-col h-full justify-between gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-[#F5F5F5] border border-[#EAEAEA] text-black text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-1.5 rounded-sm">
                          {job.category}
                        </span>
                        <span
                          className={cn(
                            "text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-1.5 rounded-sm",
                            job.status === "Open"
                              ? "text-emerald-700 bg-emerald-50 border border-emerald-100"
                              : "text-red-700 bg-red-50 border border-red-100",
                          )}
                        >
                          {job.status}
                        </span>
                      </div>
                      <h4 className="text-xl  text-black mb-3 truncate">
                        {job.title}
                      </h4>
                      <div className="flex items-center gap-4 text-[10px] font-medium text-black/50 tracking-wide">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> {job.type}
                        </span>
                        <span className="flex items-center gap-1.5 text-black">
                          <Users className="w-3.5 h-3.5" />
                          {
                            applications.filter((a) => a.jobId === job.id)
                              .length
                          }{" "}
                          Applicants
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#EAEAEA]">
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 text-black/40 hover:text-[#E33D3D] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => handleEditJob(job)}
                        className="p-2 text-black/40 hover:text-black transition-colors"
                      >
                        <Edit className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="lg:col-span-2 h-64 flex flex-col items-center justify-center bg-white rounded-lg border border-dashed border-[#CCCCCC] text-black/40">
                <Briefcase
                  className="w-8 h-8 mb-4 opacity-50"
                  strokeWidth={1}
                />
                <p className=" italic text-xs">
                  No active recruitment campaigns
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="apps"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white border border-[#EAEAEA] rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-[#EAEAEA] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAFAFA]">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
                <Input
                  placeholder="Filter submissions..."
                  className="bg-white border-[#EAEAEA] pl-9 h-9 rounded-md focus:ring-0 focus:border-black transition-all w-full text-xs"
                />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                {applications.length} Submissions
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] uppercase tracking-[0.15em] font-bold text-black/50 border-b border-[#EAEAEA]">
                    <th className="px-6 py-4 font-medium">Candidate</th>
                    <th className="px-6 py-4 font-medium">Target Role</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 text-right font-medium">Resume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA]">
                  {isLoading ? (
                    Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan={4} className="px-6 py-6">
                            <div className="h-12 bg-[#F5F5F5] rounded w-full" />
                          </td>
                        </tr>
                      ))
                  ) : applications.length > 0 ? (
                    applications.map((app) => (
                      <tr
                        key={app.id}
                        className="group hover:bg-[#FAFAFA] transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded border border-[#EAEAEA] bg-[#F5F5F5] flex items-center justify-center  text-lg text-black">
                              {app.name.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-black text-[13px] tracking-wide">
                                {app.name}
                              </span>
                              <span className="text-[11px] text-black/50 mt-0.5">
                                {app.email}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-medium text-black">
                            {app.job?.title || "Deleted Role"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-[#F5F5F5] border border-[#EAEAEA] text-black text-[9px] uppercase tracking-[0.1em] font-bold rounded-sm">
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <a
                            href={getImageUrl(app.resumeUrl) || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 p-2 text-black/50 hover:text-black transition-colors"
                          >
                            <FileText className="w-4 h-4" strokeWidth={1.5} />
                            <span className="text-[10px] font-bold uppercase tracking-[0.1em]">
                              View CV
                            </span>
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-20 text-center text-[13px] text-black/40  italic"
                      >
                        No candidates in system.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Job Modal */}
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
                    Publish New Opportunity
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditMode(false);
                    setEditingJob(null);
                  }}
                  className="rounded hover:bg-[#F5F5F5] text-black/50 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-6">
                <form onSubmit={handleCreateJob} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                          Role Title
                        </Label>
                        <Input
                          placeholder="e.g. Master Tailor"
                          required
                          className="h-10 rounded border-[#EAEAEA] focus:border-black focus:ring-0 text-xs shadow-none"
                          value={jobFormData.title}
                          onChange={(e) =>
                            setJobFormData({
                              ...jobFormData,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                          Classification
                        </Label>
                        <select
                          className="w-full h-10 rounded border border-[#EAEAEA] focus:border-black focus:ring-0 text-xs font-medium px-3 bg-white shadow-none"
                          value={jobFormData.category}
                          onChange={(e) =>
                            setJobFormData({
                              ...jobFormData,
                              category: e.target.value,
                            })
                          }
                        >
                          <option value="Production">
                            Production & Tailoring
                          </option>
                          <option value="Retail">Retail & Store</option>
                          <option value="Design">Fashion Design</option>
                          <option value="Operations">Operations</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                          Location
                        </Label>
                        <Input
                          placeholder="City, HQ"
                          required
                          className="h-10 rounded border-[#EAEAEA] focus:border-black focus:ring-0 text-xs shadow-none"
                          value={jobFormData.location}
                          onChange={(e) =>
                            setJobFormData({
                              ...jobFormData,
                              location: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                          Compensation
                        </Label>
                        <Input
                          placeholder="e.g. 5L - 8L PA"
                          required
                          className="h-10 rounded border-[#EAEAEA] focus:border-black focus:ring-0 text-xs shadow-none"
                          value={jobFormData.package}
                          onChange={(e) =>
                            setJobFormData({
                              ...jobFormData,
                              package: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                        Role Overview
                      </Label>
                      <Textarea
                        placeholder="Narrate the responsibilities..."
                        required
                        className="min-h-[100px] rounded border-[#EAEAEA] focus:border-black focus:ring-0 text-xs resize-none shadow-none"
                        value={jobFormData.description}
                        onChange={(e) =>
                          setJobFormData({
                            ...jobFormData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/60">
                        Requirements
                      </Label>
                      <Textarea
                        placeholder="Key qualifications (one per line)..."
                        required
                        className="min-h-[100px] rounded border-[#EAEAEA] focus:border-black focus:ring-0 text-xs resize-none shadow-none"
                        value={jobFormData.requirements}
                        onChange={(e) =>
                          setJobFormData({
                            ...jobFormData,
                            requirements: e.target.value,
                          })
                        }
                      />
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
                        Saving...
                      </>
                    ) : isEditMode ? (
                      "Update Position"
                    ) : (
                      "Publish Position"
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

export default AdminCareers;
