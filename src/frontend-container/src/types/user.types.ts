import { FORM_MESSAGES } from '@configs/validationMessages.config'
import { z } from 'zod'

export type UserType = {
	username: string
	email: string
	firstName: string
	lastName: string
}

export const updateProfileDataSchema = z.object({
	username: z.string().min(1, FORM_MESSAGES.REQUIRED),
	firstName: z.string().min(1, FORM_MESSAGES.REQUIRED),
	lastName: z.string().min(1, FORM_MESSAGES.REQUIRED),
})

export type UpdateProfileDataFormFields = z.infer<
	typeof updateProfileDataSchema
>
