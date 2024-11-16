import { FORM_MESSAGES } from '@configs/validationMessages.config'
import { z } from 'zod'

export type AuthCredentialsType = {
	email: string
	password: string
}

export type AuthRegistrationFormFields = Partial<
	z.infer<typeof authRegistrationSchema>
>

export type AuthLoginFormFields = Partial<z.infer<typeof authLoginSchema>>

export type AuthForgotPasswordFormFields = Partial<
	z.infer<typeof authForgotPasswordSchema>
>

export const authLoginSchema = z.object({
	email: z.string().email(FORM_MESSAGES.INVALID_EMAIL),
	password: z.string().min(6, FORM_MESSAGES.PASSWORD_MUST_BE_LONGER),
})

export const authRegistrationSchema = z
	.object({
		email: z.string().email(FORM_MESSAGES.INVALID_EMAIL),
		password: z.string().min(6, FORM_MESSAGES.PASSWORD_MUST_BE_LONGER),
		confirmPassword: z.string().min(6, FORM_MESSAGES.PASSWORD_MUST_BE_LONGER),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: FORM_MESSAGES.CONFIRM_PASSWORD_DO_NOT_MATCH,
		path: ['confirmPassword'],
	})

export const authForgotPasswordSchema = z.object({
	email: z.string().email(FORM_MESSAGES.INVALID_EMAIL),
})
