import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddItemSchema } from "../schemas/add-item-schema";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios-config";

export const useAddItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: AddItemSchema) => {
      const response = await axiosInstance.post("/api/items", values);
      return response.data;
    },
    onSuccess: () => {
      toast.success("New Item Added");
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
