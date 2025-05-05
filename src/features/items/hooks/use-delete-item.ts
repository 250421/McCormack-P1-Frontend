import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios-config";

export const useDeleteItem = (itemId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(`/api/items/${itemId}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Item Successfully Removed!");
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
    onError: (error) => {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message ||
            "There was an issue. Please reach out to your admin."
        );
      }
    },
  });
};
