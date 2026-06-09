import { z } from 'zod'
import { emailSchema, registrationPasswordSchema } from './fields'

export const registrationSchema = z
  .object({
    email: emailSchema,
    password: registrationPasswordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
