import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Username must not be empty.",
    })
    .max(20, {
      message: "Username cannot be more than 20 characters.",
    }),
  password: z.string().min(1, {
    message: "You must include your password to login.",
  }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
