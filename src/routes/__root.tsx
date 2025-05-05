import { createRootRoute, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Provider } from "jotai";

export const Route = createRootRoute({
  component: () => <RootLayout />,
});

const RootLayout = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Outlet />
        <Toaster />
      </Provider>
    </QueryClientProvider>
  );
};
