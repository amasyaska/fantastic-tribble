import {
	AuthCredentialsType,
	AuthForgotPasswordFormFields,
	AuthLoginFormFields,
	AuthRegistrationFormFields,
} from '@ctypes/auth.types'
import { delay } from '@lib/utils'

class AuthService {
	async register(data: AuthRegistrationFormFields) {
		console.log(data)
		await delay(500)
	}

	async getTokens(data: AuthLoginFormFields | AuthCredentialsType) {
		console.log(data)
		await delay(500)
	}

	async refreshTokens() {
		await delay(500)
	}

	async recoverPassword(data: AuthForgotPasswordFormFields) {
		console.log(data)
		await delay(500)
	}
}

export const authService = new AuthService()
