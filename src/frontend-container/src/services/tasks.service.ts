import {
	CreateTaskFormFields,
	EditTaskFormFields,
	TaskType,
} from '@ctypes/task.types'
import { delay } from '@lib/utils'

class TaskService {
	async getAll(projectId: number): Promise<TaskType[]> {
		await delay(500)
		return (
			JSON.parse(
				localStorage.getItem(`tasks${projectId}`) ?? '[]'
			) as TaskType[]
		).map((item, index) => ({
			...item,
			id: index,
		}))
	}

	async create(projectId: number, data: CreateTaskFormFields) {
		await delay(500)
		const tasks = await this.getAll(projectId)
		localStorage.setItem(`tasks${projectId}`, JSON.stringify([...tasks, data]))
	}

	async remove(id: number) {
		await delay(500)
	}

	async edit(id: number, data: EditTaskFormFields) {
		console.log(data)
		await delay(500)
	}
}

export const taskService = new TaskService()
