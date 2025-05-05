import { SidebarContainer } from "@/components/shared/sidebar/sidebar-container";
import { SidebarContent } from "@/components/shared/sidebar/sidebar-content";
import { SidebarGroup } from "@/components/shared/sidebar/sidebar-group";
import { SidebarItem } from "@/components/shared/sidebar/sidebar-item";
import { Sidebar } from "@/components/shared/sidebar/sidebar";
import { SidebarMainWrapper } from "@/components/shared/sidebar/sidebar-main-wrapper";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { Home, Loader, Settings } from "lucide-react";
import { Navbar } from "@/components/shared/navbar";

export const Route = createFileRoute("/(auth)/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  const { data: user, isLoading } = useAuth();
  if (isLoading)
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader className="size-6 animate-spin" />
      </div>
    );
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <SidebarContainer>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarItem label={"Dashboard"} icon={Home} href={"/"} />
              <SidebarItem label={"Settings"} icon={Settings} href={"/"} />
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarMainWrapper>
          <main>
            <Navbar />
            <Outlet />
          </main>
          <footer></footer>
        </SidebarMainWrapper>
      </SidebarContainer>
    </>
  );
}
