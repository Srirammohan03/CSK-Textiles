import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useJobs, Job } from "@/hooks/useJobs";
import {
  Briefcase,
  MapPin,
  IndianRupee,
  ChevronRight,
  Search,
  Upload,
  CheckCircle2,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Careers = () => {
  const { data: jobs = [], isLoading } = useJobs();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedJob ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedJob]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [jobs, searchTerm]);

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwwRo_8d5_VRXVQ2fXPXL3kmOisEEsvHfL4qrVXNRNDRwzP696S8g3TOkl5SJIhqUKE/exec";

const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!selectedJob || !resumeFile) {
    toast.error("Please upload resume");
    return;
  }

  setSubmitting(true);

  try {
    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("type", "job_application");
    formData.append("jobTitle", selectedJob.title);
    formData.append("jobId", String(selectedJob.id));
    formData.append("resume", resumeFile);

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });

    toast.success("Application submitted successfully.");

    setSelectedJob(null);
    setIsApplying(false);
    setResumeFile(null);
    form.reset();
  } catch (err) {
    console.error(err);
    toast.error("Failed to submit application");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <Header />

      <main>
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),transparent_35%),radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.12),transparent_30%)]" />
          <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Join Our Team
              </Badge>
              <h1 className="text-xl md:text-5xl font-bold leading-tight tracking-tight text-white">
                Build Your Future With Our Team
              </h1>
              <p className="mt-6  text-lg text-slate-300 leading-relaxed">
                Join a high-performing team shaping the future of luxury textile
                and bespoke fashion craftsmanship.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 md:p-6 mb-10 sticky top-4 z-20">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, category, or location"
                className="h-14 rounded-2xl border-black  pl-12 text-black  placeholder:text-slate-500"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="w-10 h-10 animate-spin text-amber-400" />
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group rounded-[2.5rem] border border-[#eadfcd] bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500"
                >
                  <Badge className="mb-5 rounded-full border border-[#f4d7a1] bg-[#fff7e8] px-4 py-1 text-[#d49a1f] font-semibold">
                    {job.category}
                  </Badge>

                  <h3 className="text-[2rem] leading-tight font-bold text-[#111827] mb-6">
                    {job.title}
                  </h3>

                  <div className="space-y-4 text-[15px] text-slate-400 mb-8">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#d49a1f]" />
                      {job.location}
                    </div>

                    <div className="flex items-center gap-3">
                      <IndianRupee className="w-4 h-4 text-[#d49a1f]" />
                      {job.package}
                    </div>

                    <div className="flex items-center gap-3">
                      <Briefcase className="w-4 h-4 text-[#d49a1f]" />
                      {job.type}
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedJob(job)}
                    className="w-full h-14 rounded-2xl bg-[#f4b400] text-black hover:bg-[#e8ab00] font-semibold text-base shadow-md"
                  >
                    View Opportunity
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedJob(null);
                setIsApplying(false);
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              className="
          relative
          z-10
          w-full
          max-w-6xl
          max-h-[94vh]
          overflow-y-auto
          rounded-[2rem]
          border border-white/10
          bg-slate-950
          shadow-[0_30px_100px_rgba(0,0,0,0.45)]
        "
            >
              {/* Sticky Header */}
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-slate-950/90 px-5 sm:px-8 py-4 backdrop-blur-xl">
                <Badge className="bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  {selectedJob.category}
                </Badge>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setSelectedJob(null);
                    setIsApplying(false);
                  }}
                  className="rounded-full text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid lg:grid-cols-2">
                {/* LEFT SIDE */}
                <div className="p-5 sm:p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/10">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
                    {selectedJob.title}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    <InfoCard label="Location" value={selectedJob.location} />
                    <InfoCard label="Package" value={selectedJob.package} />
                    <InfoCard label="Type" value={selectedJob.type} />
                    <InfoCard
                      label="Posted"
                      value={new Date(
                        selectedJob.createdAt,
                      ).toLocaleDateString()}
                    />
                  </div>

                  <Section
                    title="Job Description"
                    content={selectedJob.description}
                  />

                  <div className="mt-8">
                    <Section
                      title="Requirements"
                      content={selectedJob.requirements}
                    />
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="p-5 sm:p-8 md:p-10 bg-slate-900/40">
                  {!isApplying ? (
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
                      <h3 className="text-2xl font-bold text-white mb-3">
                        Ready to Apply?
                      </h3>

                      <p className="text-slate-400 mb-6 leading-relaxed">
                        Submit your application and our team will review it
                        shortly.
                      </p>

                      <Button
                        onClick={() => setIsApplying(true)}
                        className="
                    w-full
                    h-14
                    rounded-2xl
                    bg-amber-400
                    text-slate-950
                    hover:bg-amber-300
                    font-semibold
                  "
                      >
                        Apply Now
                      </Button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleApply}
                      className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                  sm:p-8
                  space-y-5
                "
                    >
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Application Form
                      </h3>

                      <FormField label="Full Name" name="name" />
                      <FormField label="Email" name="email" type="email" />
                      <FormField label="Phone" name="phone" />

                      <div>
                        <Label className="mb-2 block text-slate-300">
                          Message
                        </Label>
                        <Textarea
                          name="message"
                          className="
                      min-h-[140px]
                      rounded-2xl
                      border-white/10
                      bg-slate-950
                      text-white
                      focus-visible:ring-amber-400
                    "
                        />
                      </div>

                      <div>
                        <Label className="mb-2 block text-slate-300">
                          Resume
                        </Label>

                        <label
                          className="
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-3
                      rounded-2xl
                      border
                      border-dashed
                      border-white/20
                      bg-slate-950
                      px-4
                      py-6
                      hover:bg-slate-900
                      transition-colors
                      cursor-pointer
                      text-center
                    "
                        >
                          {resumeFile ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Upload className="w-5 h-5 text-slate-400" />
                          )}

                          <span className="text-sm text-slate-300 break-all">
                            {resumeFile?.name ||
                              "Upload Resume (.pdf, .doc, .docx)"}
                          </span>

                          <input
                            hidden
                            type="file"
                            accept=".pdf,.doc,.docx"
                            required
                            onChange={(e) =>
                              setResumeFile(e.target.files?.[0] || null)
                            }
                          />
                        </label>
                      </div>

                      <Button
                        type="submit"
                        disabled={submitting}
                        className="
                    w-full
                    h-14
                    rounded-2xl
                    bg-amber-400
                    text-slate-950
                    hover:bg-amber-300
                    font-semibold
                  "
                      >
                        {submitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">
      {label}
    </p>
    <p className="font-medium text-white">{value}</p>
  </div>
);

const Section = ({ title, content }: { title: string; content: string }) => (
  <div>
    <h4 className="text-lg font-semibold mb-3">{title}</h4>
    <p className="text-slate-300 whitespace-pre-line leading-8">{content}</p>
  </div>
);

const FormField = ({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) => (
  <div>
    <Label className="mb-2 block text-slate-300">{label}</Label>
    <Input
      required
      name={name}
      type={type}
      className="h-12 rounded-2xl border-white/10 bg-slate-950 text-white"
    />
  </div>
);

export default Careers;
