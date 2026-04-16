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
      <div className="flex h-[100dvh] w-full  bg-[#FAFAFA]">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Area */}
        <SidebarInset className="flex flex-1 flex-col  min-w-0">
          {/* Header - Fixed at top */}
          <AdminHeader />

          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto bg-white p-6 md:p-8 lg:p-10">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
