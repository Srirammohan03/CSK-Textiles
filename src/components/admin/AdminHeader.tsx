import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/AuthProvider";
import { getImageUrl } from "@/api/config";

export default function AdminHeader() {
  const { toggleSidebar } = useSidebar();
  const { user } = useAuth();

  const userName = user?.name || "Admin User";
  const userRole = user?.role || "Administrator";

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";

  const profileImage = user?.profileImage
    ? getImageUrl(user.profileImage)
    : null;

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center border-b border-[#EAEAEA] bg-white px-4 md:px-6">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-all hover:bg-gray-100 hover:text-black md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Spacer for mobile */}
      <div className="flex-1 md:hidden" />

      {/* Right Side - User Info */}
      <div className="ml-auto flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold capitalize text-gray-900">
            {userName}
          </p>
          <p className="text-[10px] uppercase tracking-[2px] text-gray-400">
            {userRole}
          </p>
        </div>

        {/* Avatar */}
        {profileImage ? (
          <img
            src={profileImage}
            alt={userName}
            className="h-10 w-10 rounded-2xl object-cover border border-gray-200 shadow"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-black to-zinc-800 text-lg font-semibold text-white shadow">
            {firstLetter}
          </div>
        )}
      </div>
    </header>
  );
}
