import { FORM_MESSAGES } from '@configs/validationMessages.config'
import { z } from 'zod'

export type CompanyType = {
	id: number
	name: string
	description: string
}

export const createCompanyScheme = z.object({
	name: z.string().min(1, 'required'),
	description: z.string().min(1, 'required'),
})

export const connectUserToCompanyScheme = z.object({
	email: z.string().email(FORM_MESSAGES.INVALID_EMAIL),
})

export const editCompanyScheme = z.object({
	name: z.string().min(1, 'required'),
	description: z.string().min(1, 'required'),
})

export type CreateCompanyFormFields = z.infer<typeof createCompanyScheme>

export type ConnectUserToCompanyFormFields = z.infer<
	typeof connectUserToCompanyScheme
>

export type EditCompanyFormFields = z.infer<typeof editCompanyScheme>
