import {
	CompanyType,
	ConnectUserToCompanyFormFields,
	CreateCompanyFormFields,
	EditCompanyFormFields,
} from '@ctypes/company.types'
import { getUserId } from '@lib/cookieTokens'
import { toCamelCase, toSnakeCase } from '@lib/typeConverter'
import { delay } from '@lib/utils'
import { $api } from './api'

class CompanyService {
	async getAll(): Promise<CompanyType[]> {
		return $api
			.get('/api/v1/my_companies/')
			.then((data) => data.data.map((item: any) => toCamelCase(item)))
	}

	async create(data: CreateCompanyFormFields) {
		return $api
			.post(
				'/api/v1/company/',
				toSnakeCase({
					...data,
					creator: getUserId(),
				})
			)
			.then((data) => toCamelCase(data))
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
