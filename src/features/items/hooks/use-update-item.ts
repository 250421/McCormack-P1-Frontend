import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios-config";
import { UpdateItemSchema } from "../schemas/update-item-schema";

export const useUpdateItem = (itemId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: UpdateItemSchema) => {
      const response = await axiosInstance.put(`/api/items/${itemId}`, values);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Item Updated Successfully!");
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
