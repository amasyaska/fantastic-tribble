import { FORM_MESSAGES } from '@configs/validationMessages.config'
import { z } from 'zod'

export type TaskType = {
	id: number
	name: string
	description: string
	status: string
}

export const createTaskScheme = z.object({
	name: z.string().min(1, FORM_MESSAGES.REQUIRED),
	description: z.string().min(1, FORM_MESSAGES.REQUIRED),
	status: z.string().min(1, FORM_MESSAGES.REQUIRED),
})

export const editTaskScheme = z.object({
	name: z.string().min(1, 'required'),
	description: z.string().min(1, 'required'),
	status: z.string().min(1, FORM_MESSAGES.REQUIRED),
})

export type CreateTaskFormFields = z.infer<typeof createTaskScheme>

export type EditTaskFormFields = z.infer<typeof editTaskScheme>

export type GroupedTasksItem = {
	status: string
	tasks: TaskType[]
}
