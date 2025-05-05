import { useMutation } from "@tanstack/react-query";
import { RegisterSchemaType } from "../schemas/register-schema";
import { axiosInstance } from "@/lib/axios-config";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (values: RegisterSchemaType) => {
      const response = await axiosInstance.post("/auth/login", values);
      return response.data;
    },
    onSuccess: () => {
      toast.success("User successfully logged in!");
      navigate({ to: "/" });
    },
    onError: (error) => {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });
};
