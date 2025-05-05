import React from "react";

interface SidebarContainerProps {
  children: React.ReactNode;
}
export const SidebarContainer = ({ children }: SidebarContainerProps) => {
  return <div>{children}</div>;
};
