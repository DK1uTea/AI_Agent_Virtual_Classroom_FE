import z from "zod";

export const UpdateUserSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Phone number must be a valid international format +<country code><number>" }).optional(),
  gender: z.enum(["male", "female"]).optional(),
  description: z.string().max(500, { message: "Description must be at most 500 characters" }).optional(),
})

export type UpdateUserType = z.infer<typeof UpdateUserSchema>;