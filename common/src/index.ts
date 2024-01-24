import { z } from "zod";

export const signUpInput = z.object({
  email: z.string().min(1).max(20),
  password: z.string().min(1).max(15),
});

export type SignUpParams = z.infer<typeof signUpInput>;
