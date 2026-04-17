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
      <div className="flex min-h-screen w-full bg-[#FAFAFA]">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Area */}
        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <AdminHeader />

          {/* Content */}
          <main className="flex-1 overflow-y-auto bg-white p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
