import { z } from 'zod'
import { emailSchema } from './fields'

export const emailStepSchema = z.object({
  email: emailSchema,
  terms: z.boolean().refine((value) => value === true, {
    message: 'You must agree to the terms to continue',
  }),
})
