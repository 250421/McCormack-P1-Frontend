import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import React from "react";

interface SidebarProps {
  children: React.ReactNode;
}
export const Sidebar = ({ children }: SidebarProps) => {
  const { isOpen, isMounted } = useSidebar();

  if (!isMounted) return null;
  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out",
        isOpen ? "w-64 bg-amber-100 border-r" : "w-0"
      )}
    >
      {children}
    </div>
  );
};
