import { FORM_MESSAGES } from '@configs/validationMessages.config'
import { z } from 'zod'

export type AuthCredentialsType = {
	email: string
	password: string
}

export type AuthTokensType = {
	accessToken: string
	refreshToken: string
}

export type AuthRegistrationFormFields = Partial<
	z.infer<typeof authRegistrationSchema>
>

export type AuthLoginFormFields = Partial<z.infer<typeof authLoginSchema>>

export type AuthForgotPasswordFormFields = Partial<
	z.infer<typeof authForgotPasswordSchema>
>

const zodPassword = z
	.string()
	.min(8, FORM_MESSAGES.PASSWORD_MUST_BE_LONGER)
	.regex(/\d/, FORM_MESSAGES.PASSWORD_NUMBERS_REQUIRED)
	.regex(/[A-Za-z]/, FORM_MESSAGES.PASSWORD_LETTER_REQUIRED)
	.regex(/[^A-Za-z0-9]/, FORM_MESSAGES.PASSWORD_SPECIAL_SYMBOL_REQUIRED)

export const authLoginSchema = z.object({
	username: z.string().min(1, FORM_MESSAGES.REQUIRED),
	password: zodPassword,
})

export const authRegistrationSchema = z
	.object({
		firstName: z.string().min(1, FORM_MESSAGES.REQUIRED),
		lastName: z.string().min(1, FORM_MESSAGES.REQUIRED),
		username: z.string().min(1, FORM_MESSAGES.REQUIRED),
		email: z.string().email(FORM_MESSAGES.INVALID_EMAIL),
		password: zodPassword,
		confirmPassword: zodPassword,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: FORM_MESSAGES.CONFIRM_PASSWORD_DO_NOT_MATCH,
		path: ['confirmPassword'],
	})

export const authForgotPasswordSchema = z.object({
	email: z.string().email(FORM_MESSAGES.INVALID_EMAIL),
})
