import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { Sidebar } from "lucide-react";
import React from "react";

interface SidebarMainWrapperProps {
  children: React.ReactNode;
}
export const SidebarMainWrapper = ({ children }: SidebarMainWrapperProps) => {
  const { isOpen, toggle } = useSidebar();
  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out",
        isOpen ? "ml-64" : "ml-0"
      )}
    >
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={toggle}
        className="fixed z-50 ml-3 mt-20"
      >
        <Sidebar />
      </Button>
      {children}
    </div>
  );
};
