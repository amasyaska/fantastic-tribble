import {
	ConnectUserToProjectFormFields,
	CreateProjectFormFields,
	EditProjectFormFields,
	ProjectType,
} from '@ctypes/project.types'
import { delay } from '@lib/utils'

class ProjectService {
	async getAll(companyId: number): Promise<ProjectType[]> {
		await delay(500)
		return (
			JSON.parse(
				localStorage.getItem(`projects${companyId}`) ?? '[]'
			) as ProjectType[]
		).map((item, index) => ({
			...item,
			id: index,
		}))
	}

	async create(companyId: number, data: CreateProjectFormFields) {
		await delay(500)
		const projects = await this.getAll(companyId)
		localStorage.setItem(
			`projects${companyId}`,
			JSON.stringify([...projects, data])
		)
	}

	async remove(id: number) {
		await delay(500)
	}

	async connectUser(id: number, data: ConnectUserToProjectFormFields) {
		console.log(id, data)
		await delay(500)
	}

	async edit(id: number, data: EditProjectFormFields) {
		console.log(data)
		await delay(500)
	}
}

export const projectService = new ProjectService()
