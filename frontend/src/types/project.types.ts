import { FORM_MESSAGES } from '@configs/validationMessages.config'
import { z } from 'zod'

export type ProjectType = {
	id: number
	name: string
	description: string
}

export const createProjectScheme = z.object({
	name: z.string().min(1, 'required'),
	description: z.string().min(1, 'required'),
})

export const connectUserToProjectScheme = z.object({
	email: z.string().email(FORM_MESSAGES.INVALID_EMAIL),
})

export const editProjectScheme = z.object({
	name: z.string().min(1, 'required'),
	description: z.string().min(1, 'required'),
})

export type CreateProjectFormFields = z.infer<typeof createProjectScheme>

export type ConnectUserToProjectFormFields = z.infer<
	typeof connectUserToProjectScheme
>

export type EditProjectFormFields = z.infer<typeof editProjectScheme>
