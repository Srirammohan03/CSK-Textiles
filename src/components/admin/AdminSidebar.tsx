import {
  ShoppingBag,
  Package,
  Briefcase,
  LogOut,
  ChevronLeft,
  Grip,
  Mail,
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

const menuItems = [
  {
    title: "Executive Summary",
    icon: Grip,
    path: "/admin/dashboard",
  },
  {
    title: "Master Collection",
    icon: ShoppingBag,
    path: "/admin/products",
  },
  {
    title: "Fabric Archives",
    icon: Package,
    path: "/admin/fabrics",
  },
  {
    title: "Enquiries",
    icon: Mail,
    path: "/admin/enquiries",
  },
  {
    title: "Human Capital",
    icon: Briefcase,
    path: "/admin/careers",
  },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, toggleSidebar, isMobile } = useSidebar();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  const isExpanded = isMobile || state === "expanded";

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-[#EAEAEA] bg-white text-black font-body"
    >
      {/* Header */}
      <SidebarHeader className="border-b border-[#EAEAEA] px-5 py-7">
        <div className="flex items-center justify-between gap-3 overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black text-lg font-bold italic text-white shadow-xl">
              C
            </div>

            {isExpanded && (
              <div className="flex flex-col">
                <div className="text-[15px] font-semibold tracking-tight text-black">
                  CSK Tailored
                </div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-black/40 font-bold">
                  Admin Console
                </div>
              </div>
            )}
          </div>

          {/* Collapse Button - Visible only on desktop */}
          {!isMobile && (
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleSidebar}
              className="h-8 w-8 text-black/40 hover:bg-[#F5F5F5] hover:text-black"
            >
              <ChevronLeft
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  state === "collapsed" && "rotate-180",
                )}
              />
            </Button>
          )}
        </div>
      </SidebarHeader>

      {/* Menu Content */}
      <SidebarContent className="px-3 py-6">
        <SidebarMenu className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "h-12 w-full rounded-xl px-4 text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-black text-white shadow-md"
                      : "text-black/60 hover:bg-[#F8F8F8] hover:text-black",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      isActive ? "bg-white/20" : "bg-black/5",
                    )}
                  >
                    <item.icon
                      className="h-4.5 w-4.5"
                      strokeWidth={isActive ? 2.8 : 2.3}
                    />
                  </div>

                  {isExpanded && (
                    <span className="ml-3 truncate font-semibold tracking-wide">
                      {item.title}
                    </span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Logout Footer */}
      <SidebarFooter className="mt-auto border-t border-[#EAEAEA] p-4">
        <SidebarMenuButton
          tooltip="Logout"
          onClick={handleLogout}
          className="h-12 w-full rounded-xl border border-red-500/10 bg-red-50 px-4 text-sm font-bold tracking-wide text-red-600 transition-all hover:bg-red-100 hover:text-red-700"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
            <LogOut className="h-4.5 w-4.5" strokeWidth={2.5} />
          </div>

          {isExpanded && <span className="ml-3">LogOut</span>}
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
