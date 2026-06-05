import { z } from 'zod'
import { requiredString } from './fields'

export const creatorApplicationSchema = z.object({
  firstName: requiredString('First name is required'),
  instagramUsername: requiredString('Instagram username is required')
    .transform((value) => value.replace(/^@/, '').trim())
    .refine((value) => value.length > 0, 'Instagram username is required'),
})
