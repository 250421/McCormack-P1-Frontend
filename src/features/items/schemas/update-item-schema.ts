import { z } from "zod";

export const updateItemSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  quantity: z.coerce.number().positive({
    message: "Quantity must be positive",
  }),
  price: z
    .string()
    .regex(/^\d*\.?\d{0,2}$/, { message: "Enter a valid price" }),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  category: z.enum(["EXPENDIBLE", "ASSET"], {
    required_error: "Category is required",
  }),
});

export type UpdateItemSchema = z.infer<typeof updateItemSchema>;
