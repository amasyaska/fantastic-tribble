import { ROUTES } from '@configs/routes.config'
import {
	AuthForgotPasswordFormFields,
	AuthLoginFormFields,
	AuthRegistrationFormFields,
} from '@ctypes/auth.types'
import { setTokens } from '@lib/cookieJwtTokens'
import { authService } from '@services/auth.service'
import { RootState } from '@store/store'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UseFormSetError } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type UseAuthOptions = {
	setError: UseFormSetError<any>
}

export const useAuth = ({ setError }: UseAuthOptions) => {
	const value = useSelector((state: RootState) => state.auth.value)
	const navigate = useNavigate()

	const { mutate: login, isPending: loginIsLoading } = useMutation({
		mutationKey: ['get tokens'],
		mutationFn: (data: AuthLoginFormFields) => authService.login(data),
		onSuccess(data, variables, context) {
			setTokens(data.data)
			toast.success('Successfully!')
			navigate(ROUTES.PROJECTS.HOME)
		},
		onError(error: AxiosError<AuthLoginFormFields>, variables, context) {
			if (error.status == 400 && error.response?.data) {
				setErrors(error.response?.data, setError)
				return
			}

			console.log(error, variables, context)
			toast.error('Unhandled error!')
		},
	})

	const { mutate: register, isPending: registerIsLoading } = useMutation({
		mutationKey: ['create new user'],
		mutationFn: (data: AuthRegistrationFormFields) =>
			authService.register(data),
		onSuccess(data, variables, context) {
			login(variables)
		},
		onError(error: AxiosError<AuthRegistrationFormFields>, variables, context) {
			if (error.status == 400 && error.response?.data) {
				setErrors(error.response?.data, setError)
				return
			}

			console.log(error, variables, context)
			toast.error('Unhandled error!')
		},
	})

	const { mutate: recoverPassword, isPending: recoverPasswordIsLoading } =
		useMutation({
			mutationKey: ['send new generated password'],
			mutationFn: (data: AuthForgotPasswordFormFields) =>
				authService.recoverPassword(data),
			onError(error, variables, context) {
				console.log(error, variables, context)
				toast.error('Unhandled error!')
			},
		})

	return {
		isLogged: value != null,
		login,
		loginIsLoading,
		register,
		registerIsLoading: registerIsLoading || loginIsLoading,
		recoverPassword,
		recoverPasswordIsLoading,
	}
}

const setErrors = (errors: any, setError: any) => {
	Object.keys(errors).forEach((key) => {
		if (errors[key as keyof AuthRegistrationFormFields]) {
			setError(key as keyof FormData, {
				type: 'server',
				message: (errors[key as keyof AuthRegistrationFormFields] ?? [])[0],
			})
		}
	})
}
