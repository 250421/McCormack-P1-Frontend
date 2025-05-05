import { axiosInstance } from "@/lib/axios-config";
import { useQuery } from "@tanstack/react-query";
import { Item } from "../models/Item";

export const useGetItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async (): Promise<Item[]> => {
      try {
        const response = await axiosInstance.get("/api/items");
        return response.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });
};
