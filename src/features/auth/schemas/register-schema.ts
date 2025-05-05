import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(5, {
      message: "Username must be at least 5 characters.",
    })
    .max(20, {
      message: "Username cannot be more than 20 characters.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Username must be at least 5 characters.",
    })
    .max(30, {
      message: "Username cannot be more than 20 characters.",
    }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
