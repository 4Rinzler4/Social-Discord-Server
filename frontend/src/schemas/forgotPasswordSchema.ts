import { z } from 'zod'

export const forgotPasswordSchema = () => {
  return z.object({
    email: z.email().nonempty(),
  })
}

export type forgotPasswordData = z.infer<
  ReturnType<typeof forgotPasswordSchema>
>
