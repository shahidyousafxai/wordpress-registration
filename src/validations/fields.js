import { z } from 'zod'

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')

export const passwordSchema = z.string().min(1, 'Password is required')

export const registrationPasswordSchema = z
  .string()
  .min(1, 'Password is required')
  .min(6, 'Password must be at least 6 characters')
  .regex(/[0-9]/, "Passwords must have at least one digit (0-9)")
  .regex(/[A-Z]/, "Passwords must have at least one uppercase (A-Z)")
  .regex(/[^a-zA-Z0-9]/, 'Passwords must have at least one non alphanumeric character')

export function requiredString(message = 'This field is required') {
  return z.string().min(1, message)
}
