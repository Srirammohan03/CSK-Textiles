import {
  ShoppingBag,
  Package,
  Briefcase,
  LogOut,
  ChevronLeft,
  Grip,
  Mail,
  Users,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/AuthProvider";
import { DeleteConfirmDialog } from "../DeleteConfirmDialog";
import { useState } from "react";

const menuItems = [
  { title: "Executive Summary", icon: Grip, path: "/admin/dashboard" },
  { title: "Master Collection", icon: ShoppingBag, path: "/admin/products" },
  { title: "Fabric Archives", icon: Package, path: "/admin/fabrics" },
  { title: "Enquiries", icon: Mail, path: "/admin/enquiries" },
  { title: "Recruitments", icon: Briefcase, path: "/admin/careers" },
  { title: "User Management", icon: Users, path: "/admin/user-management" },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const { state, toggleSidebar, isMobile, openMobile, setOpenMobile } =
    useSidebar();

  const collapsed = !isMobile && state === "collapsed";
  const isExpanded = !collapsed;

  const handleNavigate = (path: string) => {
    navigate(path);

    if (isMobile && openMobile) {
      setOpenMobile(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");

    if (isMobile && openMobile) {
      setOpenMobile(false);
    }
    setIsOpen(false);
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-[#EAEAEA] bg-white text-black"
    >
      {/* HEADER */}
      <SidebarHeader
        className={cn(
          "border-b border-[#EAEAEA] transition-all duration-300",
          collapsed ? "px-2 py-5" : "px-5 py-5",
        )}
      >
        <div
          className={cn(
            "flex items-center",
            collapsed ? "flex-col gap-4" : "justify-between gap-3",
          )}
        >
          {/* Logo */}
          <div
            className={cn(
              "flex items-center",
              collapsed ? "justify-center" : "gap-4",
            )}
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center ">
              <img
                src="/favicon.ico"
                alt="CSK Tailored Logo"
                className="h-full w-full object-contain p-1"
              />
            </div>

            {!collapsed && (
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40">
                  Admin Panel
                </span>
              </div>
            )}
          </div>

          {/* Toggle Button */}
          {!isMobile && (
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleSidebar}
              className="h-8 w-8 shrink-0 rounded-lg text-black/50 hover:bg-[#F5F5F5]"
            >
              <ChevronLeft
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  collapsed && "rotate-180",
                )}
              />
            </Button>
          )}
        </div>
      </SidebarHeader>

      {/* MENU */}
      <SidebarContent className="px-2 py-5">
        <SidebarMenu className="space-y-2">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  tooltip={collapsed ? item.title : undefined}
                  isActive={active}
                  onClick={() => handleNavigate(item.path)}
                  className={cn(
                    "w-full rounded-xl transition-all duration-300",
                    collapsed
                      ? "h-12 px-0 justify-center"
                      : "h-12 px-4 justify-start",
                    active
                      ? "bg-black text-white border-primary border-2 "
                      : "text-black/65 hover:bg-[#F8F8F8] hover:text-black",
                  )}
                >
                  <item.icon
                    className="h-5 w-5 shrink-0"
                    strokeWidth={active ? 2.5 : 2.2}
                  />

                  {!collapsed && (
                    <span className="ml-3 truncate text-sm font-medium font-sans">
                      {item.title}
                    </span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="mt-auto border-t border-[#EAEAEA] p-3">
        <SidebarMenuButton
          tooltip={collapsed ? "Logout" : undefined}
          onClick={() => setIsOpen(true)}
          className={cn(
            "w-full rounded-xl border border-red-500/10 bg-red-50 text-red-600 transition-all duration-300 hover:bg-red-100",
            collapsed ? "h-12 px-0 justify-center" : "h-12 px-4 justify-start",
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" strokeWidth={2.4} />

          {!collapsed && (
            <span className="ml-3 text-sm font-semibold">LogOut</span>
          )}
        </SidebarMenuButton>
      </SidebarFooter>

      <DeleteConfirmDialog
        title="Confirm Logout"
        description="Are you sure you want to logout?"
        open={isOpen}
        onOpenChange={setIsOpen}
        onConfirm={handleLogout}
        buttonTxt="logout"
      />
    </Sidebar>
  );
}
