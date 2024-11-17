import { ROUTES } from '@configs/routes.config'
import {
	AuthForgotPasswordFormFields,
	AuthLoginFormFields,
	AuthRegistrationFormFields,
} from '@ctypes/auth.types'
import { useProfile } from '@hooks/user/useProfile'
import {
	removeTokens,
	removeUserId,
	setTokens,
	setUserId,
} from '@lib/cookieTokens'
import { authService } from '@services/auth.service'
import { setIsLogged } from '@store/slices/authSlice'
import { removeProfile } from '@store/slices/profileSlice'
import { RootState } from '@store/store'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useCallback } from 'react'
import { UseFormSetError } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type UseAuthOptions = {
	setError?: UseFormSetError<any>
}

export const useAuth = (options?: UseAuthOptions | undefined) => {
	const isLogged = useSelector((state: RootState) => state.auth.value.isLogged)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { setProfile, updateProfileFromServerWithId } = useProfile()

	const { mutate: login, isPending: loginIsLoading } = useMutation({
		mutationKey: ['get tokens'],
		mutationFn: (data: AuthLoginFormFields) => authService.login(data),
		onSuccess(data, variables, context) {
			console.log(data.data.userId, data.data.data)
			setTokens(data.data.data)
			updateProfileFromServerWithId(data.data.userId)
			dispatch(setIsLogged(true))
			toast.success('Successfully!')
			navigate(ROUTES.PROJECTS.HOME)
		},
		onError(error: AxiosError<AuthLoginFormFields>, variables, context) {
			console.log(error.status)
			if (error.status == 400 && error.response?.data && options?.setError) {
				setErrors(error.response?.data, options.setError)
				return
			}

			if (error.status == 401 || error.status == 404) {
				toast.error('Email or password incorrect')
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
			setUserId(data.data.userId)
			setProfile(data.data.userData)
			login(variables)
		},
		onError(error: AxiosError<AuthRegistrationFormFields>, variables, context) {
			if (error.status == 400 && error.response?.data && options?.setError) {
				setErrors(error.response?.data, options.setError)
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

	const logout = useCallback(() => {
		removeUserId()
		removeTokens()
		dispatch(removeProfile())
		dispatch(setIsLogged(false))
	}, [])

	return {
		isLogged,
		login,
		loginIsLoading,
		register,
		registerIsLoading: registerIsLoading || loginIsLoading,
		recoverPassword,
		recoverPasswordIsLoading,
		logout,
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
