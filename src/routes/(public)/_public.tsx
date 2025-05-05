import { useAuth } from "@/features/auth/hooks/use-auth";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { Loader } from "lucide-react";

export const Route = createFileRoute("/(public)/_public")({
  component: PublicLayout,
});

function PublicLayout() {
  const { data: user, isLoading } = useAuth();
  if (isLoading) return <Loader className="size-4 animate-spin" />;
  if (user) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Outlet />
    </div>
  );
}
