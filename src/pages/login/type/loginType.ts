import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(5, "Password need to be more than 5 chars"),
  rememberme: z.boolean(),
});

export type ILogin = z.infer<typeof LoginSchema>;
