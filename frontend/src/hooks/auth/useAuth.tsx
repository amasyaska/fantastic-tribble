import {
	AuthCredentialsType,
	AuthLoginFormFields,
	AuthRegistrationFormFields,
} from '@ctypes/auth.types'
import { authService } from '@services/auth.service'
import { RootState } from '@store/store'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

export const useAuth = () => {
	const value = useSelector((state: RootState) => state.auth.value)

	const { mutate: login, isPending: loginIsLoading } = useMutation({
		mutationKey: ['get tokens'],
		mutationFn: (data: AuthLoginFormFields | AuthCredentialsType) =>
			authService.getTokens(data),
	})

	const { mutate: register, isPending: registerIsLoading } = useMutation({
		mutationKey: ['create new user'],
		mutationFn: (data: AuthRegistrationFormFields) =>
			authService.register(data),
	})

	return {
		isLogged: value != null,
		login,
		loginIsLoading,
		register,
		registerIsLoading,
	}
}
