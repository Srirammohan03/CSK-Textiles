import { useQuery } from "@tanstack/react-query";
import type { Job } from "@/data/jobs";
import { jobs } from "@/data/jobs";

export type { Job } from "@/data/jobs";

export interface JobApplication {
  id: number;
  jobId: number;
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  message: string;
  status: string;
  createdAt: string;
  job?: { title: string };
}

export const useJobs = () => {
  return useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: async () => jobs,
  });
};

export const useJob = (id: string | undefined) => {
  return useQuery<Job>({
    queryKey: ["job", id],
    queryFn: async () => {
      if (!id) throw new Error("Job ID is required");
      const job = jobs.find((item) => String(item.id) === id);
      if (!job) throw new Error("Job not found");
      return job;
    },
    enabled: !!id,
  });
};
