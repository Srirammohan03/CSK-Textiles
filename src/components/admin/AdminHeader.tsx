import { Search, Menu } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export default function AdminHeader() {
  const { toggleSidebar } = useSidebar();
  
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-[#EAEAEA] bg-white px-6">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-black/50 hover:text-black md:hidden">
           <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-black">Master Tailor</p>
            <p className="text-[10px] text-black/40 tracking-[0.05em]">Administrator</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-black  italic text-white shadow-md">
            M
          </div>
        </div>
      </div>
    </header>
  );
}
