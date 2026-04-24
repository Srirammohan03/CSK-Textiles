import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  X,
  Briefcase,
  Users,
  MapPin,
  Clock,
  Trash2,
  Edit,
  Loader2,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Job } from "@/hooks/useJobs";
import AdminLayout from "@/components/admin/AdminLayout";
import { getImageUrl } from "@/api/config";
import axios from "axios";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const AdminCareers = () => {
  const [activeTab, setActiveTab] = useState("opportunities");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deletingJobId, setDeletingJobId] = useState<number | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const client = useQueryClient();

  // Form State for new Job
  const [jobFormData, setJobFormData] = useState({
    title: "",
    category: "",
    description: "",
    requirements: "",
    package: "",
    location: "",
    type: "",
  });

  const { data: applications = [], isLoading: isApplicationsLoading } =
    useQuery({
      queryKey: ["applications", debouncedSearch],
      queryFn: async () => {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/jobs/applications?search=${encodeURIComponent(debouncedSearch)}`,
          {
            withCredentials: true,
          },
        );
        return data;
      },
      enabled: activeTab === "submissions",
      placeholderData: keepPreviousData,
    });

  const { data: jobs = [], isLoading: isJobsLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/jobs/admin`,
        {
          withCredentials: true,
        },
      );
      return data;
    },
  });

  useEffect(() => {
    if (isAddModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAddModalOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const createMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/jobs`,
        jobFormData,
        {
          withCredentials: true,
        },
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Job listing published");

      setIsAddModalOpen(false);
      setIsEditMode(false);
      setEditingJob(null);

      client.invalidateQueries({ queryKey: ["jobs"] });

      setJobFormData({
        title: "",
        category: "Design",
        description: "",
        requirements: "",
        package: "",
        location: "Mumbai, HQ",
        type: "Full-time",
      });
    },
    onError: () => {
      toast.error("Failed to publish job");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${editingJob?.id}`,
        jobFormData,
        {
          withCredentials: true,
        },
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Job updated successfully");
      setIsAddModalOpen(false);
      setIsEditMode(false);
      setEditingJob(null);
      client.invalidateQueries({ queryKey: ["jobs"] });
      setJobFormData({
        title: "",
        category: "Design",
        description: "",
        requirements: "",
        package: "",
        location: "Mumbai, HQ",
        type: "Full-time",
      });
    },
    onError: () => {
      toast.error("Failed to update job");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      if (!id) return;

      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${id}`,
        {
          withCredentials: true,
        },
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Job removed from systems");
      client.invalidateQueries({ queryKey: ["jobs"] });
      setDeletingJobId(null);
      setDeleteOpen(false);
    },
    onError: () => {
      toast.error("Deletion failed");
    },
  });

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      if (!editingJob) return;
      updateMutation.mutate();
    } else {
      createMutation.mutate();
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

  const isSubmitting = isEditMode
    ? updateMutation.isPending
    : createMutation.isPending;

  return (
    <AdminLayout>
      <div className="mb-10 rounded-[32px] border border-[#87CEEB]/20 bg-gradient-to-br from-white via-[#FFF9F0] to-[#F3F4F6] p-6 shadow-[0_20px_60px_rgba(20,112,169,0.08)] md:p-8 font-sans">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#87CEEB]/20 bg-[#87CEEB]/10 px-4 py-2 text-[12px] md:text-[14px] font-bold uppercase tracking-[0.25em] text-[#1470A9]">
              <Briefcase className="h-3.5 w-3.5" />
              Talent Acquisition
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-[#0F172A] md:text-4xl">
              Recruitment Suite
            </h2>

            <p className="mt-2 max-w-xl text-[14px] md:text-[18px] leading-relaxed text-slate-500">
              Manage openings, applications, and premium hiring workflows in one
              place.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex rounded-2xl border border-[#87CEEB]/20 bg-white p-1.5 shadow-sm">
              <button
                onClick={() => setActiveTab("opportunities")}
                className={cn(
                  "rounded-xl px-5 py-3 text-xs font-semibold tracking-wide transition-all duration-300",
                  activeTab === "opportunities"
                    ? "bg-gradient-to-r from-[#1470A9] to-[#5882A5] text-white shadow-md"
                    : "text-slate-500 hover:text-[#1470A9]",
                )}
              >
                Opportunities
              </button>

              <button
                onClick={() => setActiveTab("submissions")}
                className={cn(
                  "rounded-xl px-5 py-3 text-xs font-semibold tracking-wide transition-all duration-300",
                  activeTab === "submissions"
                    ? "bg-gradient-to-r from-[#1470A9] to-[#5882A5] text-white shadow-md"
                    : "text-slate-500 hover:text-[#1470A9]",
                )}
              >
                Submissions
              </button>
            </div>

            {activeTab === "opportunities" && (
              <Button
                onClick={() => {
                  setIsEditMode(false);
                  setEditingJob(null);

                  setJobFormData({
                    title: "",
                    category: "",
                    description: "",
                    requirements: "",
                    package: "",
                    location: "",
                    type: "",
                  });

                  setIsAddModalOpen(true);
                }}
                className="h-12 rounded-2xl bg-gradient-to-r from-[#EF7D05] via-[#1470A9] to-[#5882A5] px-6 text-[14px] md:text-[18px] font-semibold text-white shadow-[0_15px_40px_rgba(20,112,169,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(20,112,169,0.4)]"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Opening
              </Button>
            )}
          </div>
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
            {isJobsLoading ? (
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
                  className="group relative overflow-hidden rounded-[32px] border border-[#87CEEB]/20 bg-gradient-to-br from-white via-[#FFF9F0] to-[#F3F4F6] p-7 shadow-[0_10px_40px_rgba(20,112,169,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#1470A9]/30 hover:shadow-[0_25px_60px_rgba(20,112,169,0.18)]"
                >
                  <div className="flex flex-col h-full justify-between gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="rounded-full border border-[#87CEEB]/20 bg-[#87CEEB]/10 px-3 py-2 text-[12px] md:text-[14px] font-bold uppercase tracking-[0.2em] text-[#1470A9]">
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
                      <h4 className="mb-4 text-[22px] md:text-[30px] font-semibold tracking-tight text-[#0F172A] line-clamp-1">
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-4 text-[14px] md:text-[18px] font-semibold text-black/60 tracking-wide">
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
                        onClick={() => {
                          setDeletingJobId(job.id);
                          setDeleteOpen(true);
                        }}
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.2em] text-black/40">
                <span className="text-black font-sans">
                  {applications.length}
                </span>{" "}
                Submissions
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[12px] md:text-[14px] uppercase tracking-[0.15em] font-bold text-black/50 border-b border-[#EAEAEA]">
                    <th className="px-6 py-4 font-medium">Candidate</th>
                    <th className="px-6 py-4 font-medium">Target Role</th>
                    <th className="px-6 py-4 font-medium">Applied Date</th>
                    <th className="px-6 py-4 text-right font-medium">Resume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA]">
                  {isApplicationsLoading ? (
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
                        className="group hover:bg-[#FAFAFA] transition-colors font-sans"
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
                            {new Date(app.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
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
                            <span className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.1em]">
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
              className="fixed inset-0 z-50 bg-[#0F172A]/50 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 120 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl overflow-hidden font-sans"
            >
              <div className="flex h-full flex-col bg-gradient-to-br from-[#FFF9F0] via-white to-[#F3F4F6] shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
                <div className="relative overflow-hidden border-b border-[#87CEEB]/20 bg-gradient-to-r from-[#1470A9] via-[#5882A5] to-[#0F172A] px-8 py-8">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-[#87CEEB] blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-[#EF7D05] blur-3xl" />
                  </div>

                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[12px] md:text-[14px] font-bold uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm">
                        <Briefcase className="h-3.5 w-3.5" />
                        Recruitment Form
                      </div>

                      <h3 className="text-[28px] md:text-[40px] font-semibold tracking-tight text-white">
                        {isEditMode ? "Edit Position" : "Create New Position"}
                      </h3>

                      <p className="mt-2 text-[14px] md:text-[18px] text-white/70">
                        Add premium job details and attract the best candidates.
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setIsAddModalOpen(false);
                        setIsEditMode(false);
                        setEditingJob(null);
                      }}
                      className="h-12 w-12 rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
                  <form onSubmit={handleCreateJob} className="space-y-6 pb-10">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.25em] text-[#0F172A]/70">
                          Role Title
                        </Label>
                        <Input
                          placeholder="e.g. Master Tailor"
                          required
                          className="h-12 rounded-xl border border-[#87CEEB]/30 bg-white px-5 text-[14px] md:text-[18px] shadow-none focus:border-[#1470A9] focus:ring-0"
                          value={jobFormData.title}
                          onChange={(e) =>
                            setJobFormData({
                              ...jobFormData,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.25em] text-[#0F172A]/70">
                          Classification
                        </Label>
                        <select
                          className="w-full h-12 rounded-xl border border-[#87CEEB]/30 bg-white px-5 text-[14px] md:text-[18px] font-medium shadow-none focus:border-[#1470A9] focus:ring-0"
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

                      <div className="space-y-2">
                        <Label className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.25em] text-[#0F172A]/70">
                          Location
                        </Label>
                        <Input
                          placeholder="City, HQ"
                          required
                          className="h-12 rounded-xl border border-[#87CEEB]/30 bg-white font-body px-5 text-[14px] md:text-[18px] shadow-none focus:border-[#1470A9] focus:ring-0"
                          value={jobFormData.location}
                          onChange={(e) =>
                            setJobFormData({
                              ...jobFormData,
                              location: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.25em] text-[#0F172A]/70">
                          Employment Type
                        </Label>

                        <select
                          className="w-full h-12 rounded-xl border border-[#87CEEB]/30 bg-white px-5 text-[14px] md:text-[18px] font-medium shadow-none focus:border-[#1470A9] focus:ring-0"
                          value={jobFormData.type}
                          onChange={(e) =>
                            setJobFormData({
                              ...jobFormData,
                              type: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                          <option value="Freelance">Freelance</option>
                          <option value="Remote">Remote</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.25em] text-[#0F172A]/70">
                          Package
                        </Label>
                        <Input
                          placeholder="e.g. 5L - 8L PA"
                          required
                          className="h-12 rounded-xl border border-[#87CEEB]/30 bg-white px-5 text-[14px] md:text-[18px] shadow-none focus:border-[#1470A9] focus:ring-0"
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

                    <div className="space-y-2">
                      <Label className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.25em] text-[#0F172A]/70">
                        Role Overview
                      </Label>
                      <Textarea
                        placeholder="Narrate the responsibilities..."
                        required
                        className="min-h-[120px] rounded-xl border border-[#87CEEB]/30 bg-white px-5 py-4 text-[14px] md:text-[18px] shadow-none focus:border-[#1470A9] focus:ring-0 resize-none"
                        value={jobFormData.description}
                        onChange={(e) =>
                          setJobFormData({
                            ...jobFormData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.25em] text-[#0F172A]/70">
                        Requirements
                      </Label>
                      <Textarea
                        placeholder="Key qualifications (one per line)..."
                        required
                        className="min-h-[120px] rounded-xl border border-[#87CEEB]/30 bg-white px-5 py-4 text-[14px] md:text-[18px] shadow-none focus:border-[#1470A9] focus:ring-0 resize-none"
                        value={jobFormData.requirements}
                        onChange={(e) =>
                          setJobFormData({
                            ...jobFormData,
                            requirements: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative h-14 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#1470A9] to-[#0F172A] font-bold uppercase tracking-[0.25em] text-[14px] md:text-[18px] text-white shadow-lg transition-all hover:shadow-[0_10px_30px_rgba(20,112,169,0.4)]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#1470A9] opacity-0 transition-opacity group-hover:opacity-100" />

                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Saving...
                          </>
                        ) : isEditMode ? (
                          "Update Position"
                        ) : (
                          "Publish Position"
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <DeleteConfirmDialog
        open={deleteOpen}
        title="Confirm Deletion"
        description="Are you sure you want to delete this job? This action cannot be undone and will remove all associated applications."
        onConfirm={() => {
          if (!deletingJobId) return;
          deleteMutation.mutate(deletingJobId);
        }}
        onOpenChange={setDeleteOpen}
      />
    </AdminLayout>
  );
};

export default AdminCareers;
