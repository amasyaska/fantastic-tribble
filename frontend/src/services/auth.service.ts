import {
	AuthCredentialsType,
	AuthLoginFormFields,
	AuthRegistrationFormFields,
} from '@ctypes/auth.types'
import { delay } from '@lib/utils'

class AuthService {
	async register(data: AuthRegistrationFormFields) {
		await delay(500)
	}

	async getTokens(data: AuthLoginFormFields | AuthCredentialsType) {
		await delay(500)
	}

	async refreshTokens() {
		await delay(500)
	}
}

export const authService = new AuthService()
