import {
	CompanyType,
	ConnectUserToCompanyFormFields,
	CreateCompanyFormFields,
	EditCompanyFormFields,
} from '@ctypes/company.types'
import { delay } from '@lib/utils'

class CompanyService {
	async getAll(): Promise<CompanyType[]> {
		await delay(500)
		return (
			JSON.parse(localStorage.getItem('companies') ?? '[]') as CompanyType[]
		).map((item, index) => ({
			...item,
			id: index,
		}))
	}

	async create(data: CreateCompanyFormFields) {
		await delay(500)
		const companies = await this.getAll()
		localStorage.setItem('companies', JSON.stringify([...companies, data]))
		return companies.length
	}

	async remove(id: number) {
		await delay(500)
	}

	async connectUser(id: number, data: ConnectUserToCompanyFormFields) {
		console.log(id, data)
		await delay(500)
	}

	async edit(data: EditCompanyFormFields) {
		console.log(data)
		await delay(500)
	}
}

export const companyService = new CompanyService()
