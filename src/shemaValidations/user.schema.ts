import z from "zod";

export const UpdateUserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(50, { message: "Username must be at most 50 characters" }).optional(),
  email: z.email().regex(/^\S+@\S+\.\S+$/, { message: "Invalid email address" }).optional(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" }).optional(),
  gender: z.enum(["male", "female"]).optional(),
  description: z.string().max(500, { message: "Description must be at most 500 characters" }).optional(),
})

export type UpdateUserType = z.infer<typeof UpdateUserSchema>;