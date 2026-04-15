import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-[100dvh] w-full overflow-hidden bg-[#FAFAFA] font-body selection:bg-black selection:text-white">
        <AdminSidebar />
        <SidebarInset className="flex flex-1 flex-col overflow-hidden bg-transparent">
          <AdminHeader />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent md:p-10 p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
