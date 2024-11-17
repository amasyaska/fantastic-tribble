import { $api } from './api'

class UserService {
	async getProfile(userId: number) {
		return $api.get(`/api/v1/accounts/user/${userId}`)
	}
}

export const userService = new UserService()
