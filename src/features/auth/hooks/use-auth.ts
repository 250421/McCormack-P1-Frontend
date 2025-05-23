import { axiosInstance } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async (): Promise<{
      id: number;
      username: string;
      role: "USER" | "ADMIN";
    } | null> => {
      try {
        const response = await axiosInstance.get("/auth/me");
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });
};
