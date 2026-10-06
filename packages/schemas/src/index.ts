import { z } from 'zod'

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email('Enter a valid email address')

export const otpSchema = z
  .string()
  .regex(/^\d{6}$/, 'Enter the 6-digit verification code')

export const requestOtpSchema = z.object({
  email: emailSchema,
})

export const verifyOtpSchema = z.object({
  email: emailSchema,
  otp: otpSchema,
})

export type RequestOtpInput = z.infer<typeof requestOtpSchema>
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>
