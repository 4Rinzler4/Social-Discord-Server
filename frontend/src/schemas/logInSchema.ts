import { z } from "zod";

export const LogInFormSchema = () => {
  return z.object({
    nickname: z.string().nonempty({ message: "" }),
    email: z.email().nonempty({ message: "" }),
    password: z.string().nonempty({ message: "" }),
  });
};

export type LogInFormData = z.infer<ReturnType<typeof LogInFormSchema>>;
