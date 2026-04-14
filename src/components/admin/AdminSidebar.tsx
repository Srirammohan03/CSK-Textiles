import {
  ShoppingBag,
  Package,
  Briefcase,
  Settings,
  LogOut,
  ChevronLeft,
  Grip,
  Mail
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
    path: "/admin/enquiries"
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
  const { state, toggleSidebar } = useSidebar();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-[#EAEAEA] bg-white text-black font-body"
    >
      <SidebarHeader className="border-b border-[#EAEAEA] px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 overflow-hidden md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-black  text-sm italic text-white shadow-xl">
              C
            </div>

            {state === "expanded" && (
              <div className="flex flex-col">
                <span className=" text-sm font-semibold tracking-wide text-black">
                  CSK Tailored
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-black/40 font-bold">
                  Admin Console
                </span>
              </div>
            )}
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={toggleSidebar}
            className="hidden text-black/40 hover:bg-[#F5F5F5] hover:text-black md:flex"
          >
            <ChevronLeft
              className={`h-4 w-4 transition-transform ${
                state === "collapsed" ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6">
        <SidebarMenu className="gap-2">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={active}
                  onClick={() => navigate(item.path)}
                  className={`
                    h-11 rounded-lg px-4 text-xs font-semibold tracking-wide transition-all duration-300
                    ${
                      active
                        ? "bg-black text-white hover:bg-black/90 shadow-sm"
                        : "text-black/50 hover:bg-[#F5F5F5] hover:text-black"
                    }
                  `}
                >
                  <item.icon className={`h-[18px] w-[18px] ${active ? "opacity-100" : "opacity-50"}`} strokeWidth={active ? 2.5 : 2} />
                  {state === "expanded" && <span>{item.title}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-[#EAEAEA] p-4">
        <SidebarMenuButton
          tooltip="Logout"
          onClick={handleLogout}
          className="h-11 rounded-lg px-4 text-xs font-bold tracking-wide text-[#E33D3D] transition-all hover:bg-[#FFF0F0] hover:text-[#C22828]"
        >
          <LogOut className="h-[18px] w-[18px]" strokeWidth={2.5} />
          {state === "expanded" && <span>Terminate Session</span>}
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
