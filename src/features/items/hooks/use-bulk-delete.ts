import { axiosInstance } from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useBulkDeleteItems = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemIds: number[]) => {
      const response = await axiosInstance.request({
        url: "/api/items",
        method: "DELETE",
        data: itemIds, // ✅ send the array directly
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Selected items deleted.");
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete selected items.");
    },
  });
};
