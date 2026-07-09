import { z } from "zod";

export const createSignInSchema = () => {
  return z.object({});
};

export type SignInFormData = z.infer<ReturnType<typeof createSignInSchema>>;
