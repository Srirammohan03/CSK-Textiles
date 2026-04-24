import React from "react";
import { useAuth } from "./AuthProvider";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthorized, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#fbf9f6]">
        <Loader2 className="animate-spin" size={48} />
        <p className="ml-4 text-lg text-red-700 font-medium">Protecting...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
