import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { LucideIcon } from "lucide-react";
import React from "react";

interface SidebarItemProps {
  label: string;
  icon: LucideIcon;
  href: string;
}
export const SidebarItem = ({ label, icon: Icon, href }: SidebarItemProps) => {
  return (
    <div className="flex">
      <Button asChild className="w-full" variant={"ghost"}>
        <Link to={href}>
          <Icon />
          {label}
        </Link>
      </Button>
    </div>
  );
};
