import { useMutation } from "@tanstack/react-query";
import { RegisterSchemaType } from "../schemas/register-schema";
import { axiosInstance } from "@/lib/axios-config";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (values: RegisterSchemaType) => {
      const response = await axiosInstance.post("/auth/signup", values);
      return response.data;
    },
    onSuccess: () => {
      toast.success("User successfully registered!");
      navigate({ to: "/login" });
    },
    onError: (error) => {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });
};
