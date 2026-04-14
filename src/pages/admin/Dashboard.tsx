import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  TrendingUp,
  Package,
  Crown,
  Users,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/api/config";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("admin_token");
  const API_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        const statsRes = await fetch(`${API_URL}/products/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const statsData = await statsRes.json();

        const productsRes = await fetch(`${API_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const productsData = await productsRes.json();

        setStats([
          {
            label: "Total Inventory",
            value: statsData.totalProducts || 0,
            icon: Package,
            color: "text-primary",
            bg: "bg-primary/5",
          },
          {
            label: "Active Categories",
            value: statsData.totalCategories || 0,
            icon: Crown,
            color: "text-accent",
            bg: "bg-accent/10",
          },
          {
            label: "Master Tailors",
            value: statsData.adminUsers || 1,
            icon: Users,
            color: "text-primary",
            bg: "bg-primary/5",
          },
          {
            label: "Growth Index",
            value: statsData.trafficGrowth || "+12.5%",
            icon: TrendingUp,
            color: "text-accent",
            bg: "bg-accent/10",
          },
        ]);

        setProducts(productsData.slice(0, 5));
      } catch {
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate, token, API_URL]);

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EAEAEA] pb-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-1">
              Systems Intelligence
            </p>
            <h1 className="text-2xl  tracking-tight text-black">
              Executive Overview
            </h1>
          </div>

          <Button
            onClick={() => navigate("/admin/products")}
            className="bg-black hover:bg-black/90 text-white rounded-md px-6 h-10 font-medium text-xs tracking-wide transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Masterwork
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="h-32 animate-pulse rounded-lg border border-[#EAEAEA] bg-[#FAFAFA]"
                  />
                ))
            : stats?.map((stat: any, idx: number) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-lg border border-[#EAEAEA] bg-white p-6 shadow-sm transition-all hover:border-black/20"
                >
                  <div className="mb-4">
                    <stat.icon
                      className="h-5 w-5 text-black/60"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="mb-1 text-2xl  text-black">{stat.value}</h3>

                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/50">
                    {stat.label}
                  </p>
                </div>
              ))}
        </div>

        {/* Products Table */}
        <div className="rounded-lg border border-[#EAEAEA] bg-white shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[#EAEAEA] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-[#FAFAFA]">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.1em] text-black">
              Signature Inventory
            </h2>

            <button
              onClick={() => navigate("/admin/products")}
              className="flex items-center text-[10px] font-bold uppercase tracking-[0.15em] text-black/50 transition hover:text-black"
            >
              Access Archives
              <ChevronRight className="ml-1 h-3 w-3" />
            </button>
          </div>

          {isLoading ? (
            <div className="p-6 space-y-4">
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="h-12 animate-pulse rounded bg-[#F5F5F5]"
                  />
                ))}
            </div>
          ) : products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#EAEAEA] text-[9px] font-bold uppercase tracking-[0.15em] text-black/40">
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4 text-right">Value</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#EAEAEA]">
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="transition hover:bg-[#FAFAFA] group"
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#F5F5F5] overflow-hidden border border-[#EAEAEA] rounded flex-shrink-0">
                            <img
                              src={getImageUrl(
                                product.image[0] || product.image,
                              )}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>
                            <p className="font-semibold text-[13px] text-black">
                              {product.name}
                            </p>

                            <p className="text-[9px] uppercase tracking-[0.1em] text-black/50 mt-0.5">
                              {product.fabric}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-3">
                        <span className="px-2 py-1 bg-[#F5F5F5] border border-[#EAEAEA] text-black text-[9px] uppercase tracking-[0.1em] font-bold rounded-sm">
                          {product.category}
                        </span>
                      </td>

                      <td className="px-6 py-3 text-right font-medium text-[13px] text-black">
                        ₹{product.price.toLocaleString()}
                      </td>

                      <td className="px-6 py-3 text-center">
                        <span
                          className={`inline-block px-2 py-1 text-[9px] uppercase tracking-[0.1em] font-bold rounded-sm ${
                            product.isNewArrival
                              ? "bg-black text-white"
                              : "bg-[#F5F5F5] text-black/60 border border-[#EAEAEA]"
                          }`}
                        >
                          {product.isNewArrival ? "New Release" : "Archived"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex h-48 flex-col items-center justify-center text-black/40">
              <Package className="mb-3 h-8 w-8 opacity-20" />
              <p className="text-xs  italic">No inventory available</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
