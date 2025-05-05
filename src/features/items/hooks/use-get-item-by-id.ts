import { useQuery } from "@tanstack/react-query";
import { Item } from "../models/Item";
import { axiosInstance } from "@/lib/axios-config";

interface GetItemByIdProps {
  id: string;
}
export const useGetItemById = ({ id }: GetItemByIdProps) => {
  return useQuery({
    queryKey: ["item"],
    queryFn: async (): Promise<Item | null> => {
      try {
        const response = await axiosInstance.get(`/api/items/${id}`);
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });
};
