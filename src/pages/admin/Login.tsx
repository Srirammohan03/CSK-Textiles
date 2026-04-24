import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/AuthProvider";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isAuthorized } = useAuth();

  if (isAuthorized) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email || !password) {
        toast.error("Please enter both email and password.");
        setIsLoading(false);
        return;
      }

      await login(email, password);
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Connection Error", {
        description:
          "Could not reach the server. Make sure the backend is running.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fbf9f6] relative overflow-hidden font-body">
      {/* Premium Background Textures */}
      <div className="absolute inset-0 mesh-bg opacity-30 pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/10 blur-[150px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 w-full max-w-lg px-6"
      >
        <div className="bg-white/80 backdrop-blur-2xl border border-white shadow-elegant rounded-[2rem] p-10 md:p-14 relative overflow-hidden">
          {/* Decorative Accent */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

          <div className="flex flex-col items-center mb-10 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mb-6 border border-primary/10 shadow-inner"
            >
              <ShieldCheck className="w-10 h-10 text-primary" />
            </motion.div>
            <h1 className="editorial-heading text-4xl font-bold mb-3 tracking-tight">
              CSK <span className="text-primary">Tailored</span>
            </h1>
            <p className="editorial-caps text-[12px] opacity-60">
              Admin Access Control
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70 ml-1"
              >
                Security Identifier
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary/40 group-focus-within:text-primary transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@csk-tailored.com"
                  className="bg-[#f8f9fa] border-slate-200 text-slate-800 pl-12 h-14 focus:border-primary focus:ring-primary/5 transition-all rounded-2xl placeholder:text-slate-400 font-medium"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between ml-1">
                <Label
                  htmlFor="password"
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70"
                >
                  Authentication Key
                </Label>
                <a
                  href="#"
                  className="text-[11px] font-bold uppercase tracking-[0.1em] text-accent hover:text-accent/80 transition-colors"
                >
                  Reset Link
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary/40 group-focus-within:text-primary transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  className="bg-[#f8f9fa] border-slate-200 text-slate-800 pl-12 pr-12 h-14 focus:border-primary focus:ring-primary/5 transition-all rounded-2xl placeholder:text-slate-400 font-medium"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-elegant hover:shadow-primary/20 transition-all active:scale-[0.98] mt-4 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="uppercase tracking-[0.1em]">
                    Validating...
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-3">
                  <span className="uppercase tracking-[0.2em]">
                    Authorize Session
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center">
            <div className="flex items-center space-x-3 opacity-40">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Legacy Infrastructure
              </div>
              <div className="w-1 h-1 bg-primary rounded-full" />
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                v2.4.0-STABLE
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 text-[11px] font-bold uppercase tracking-[0.5em] text-primary/20">
        CSK Tailored Legacy • Est. 1995
      </div>
    </div>
  );
};

export default AdminLogin;
