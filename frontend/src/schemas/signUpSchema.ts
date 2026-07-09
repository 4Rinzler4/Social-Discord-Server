import { z } from "zod";

export const SignUpFormSchema = () => {
  return z
    .object({
      nickname: z.string().min(4).max(20).nonempty({ message: "" }),
      fullname: z.string().min(5).max(50).nonempty({ message: "" }),
      email: z.email({ message: "Invalid email" }).nonempty({ message: "" }),
      password: z
        .string()
        .nonempty({ message: "" })
        .refine((val) => !/\s/.test(val), {
          message: "",
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
};

export type SignUpFormData = z.infer<ReturnType<typeof SignUpFormSchema>>;
