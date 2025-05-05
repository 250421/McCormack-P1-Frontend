import { axiosInstance } from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/logout");
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
      toast.success("You've logged out. See you soon!");
      navigate({ to: "/login" });
    },
    onError: (error) => {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "An error occurred");
      }
    },
  });
};
