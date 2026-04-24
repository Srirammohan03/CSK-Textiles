import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export interface AuthContextType {
  isAuthorized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
  isLoading?: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor";
  products?: string[];
  profileImage?: string;
}

export const AuthContext = createContext<AuthContextType>({
  login: async () => {},
  logout: async () => {},
  user: null,
  isLoading: false,
  isAuthorized: false,
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      if (!email || !password) {
        toast.error("Email and password are required.");
        return;
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("Login successful");
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";

      toast.error(message);
    },
  });

  const {
    data: user = null,
    isLoading: userLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],

    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/auth/user`,
        {
          withCredentials: true,
        },
      );

      return data.dbUser as User;
    },

    retry: false,
  });

  if (userLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-24 w-24 items-center justify-center overflow-hidden"
          >
            {/* Shimmer effect inside the logo container */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
              className="absolute inset-0 z-10 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12"
            />
            <div className="relative z-20 flex h-24 w-24 items-center justify-center rounded-xl">
              <img
                src="/favicon.ico"
                alt="CSK Tailored Logo"
                className="h-full w-full object-contain"
              />
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-[11px] font-medium tracking-[0.3em] text-neutral-400 uppercase"
            >
              System Initialization
            </motion.div>

            {/* Minimalist Animated Loading Bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "120px", opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              className="h-[2px] rounded-full overflow-hidden bg-neutral-100"
            >
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
                className="h-full w-1/3 bg-black rounded-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  const login = async (email: string, password: string) => {
    loginMutation.mutateAsync({ email, password });
  };

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      queryClient.setQueryData(["user"], null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthorized: !!user,
        login,
        logout,
        user,
        isLoading: loginMutation.isPending || userLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
