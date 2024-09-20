import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(4, "Name must be more than 4 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(5, "Password need to be more than 5 chars"),
    confirmPassword: z.string().min(5, "Password need to be more than 5 chars"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type IRegister = z.infer<typeof RegisterSchema>;
