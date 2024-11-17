import {
	AuthForgotPasswordFormFields,
	AuthLoginFormFields,
	AuthRegistrationFormFields,
} from '@ctypes/auth.types'
import { toCamelCase, toSnakeCase } from '@lib/typeConverter'
import { delay } from '@lib/utils'
import { $api } from './api'

class AuthService {
	async register(data: AuthRegistrationFormFields) {
		return $api
			.post(
				'/api/v1/accounts/user/',
				toSnakeCase({
					...data,
					password2: data.confirmPassword,
				})
			)
			.then((data) => toCamelCase(data))
	}

	async login(data: AuthLoginFormFields) {
		return $api
			.post('/api/v1/accounts/login/', toSnakeCase(data))
			.then((data) => toCamelCase(data))
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
