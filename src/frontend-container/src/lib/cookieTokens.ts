import { AuthTokensType } from '@ctypes/auth.types'
import Cookies from 'js-cookie'

export const setTokens = ({ accessToken, refreshToken }: AuthTokensType) => {
	Cookies.set('accessToken', accessToken, {
		expires: 1,
		secure: true,
		sameSite: 'strict',
	})
	Cookies.set('refreshToken', refreshToken, {
		expires: 7,
		secure: true,
		sameSite: 'strict',
	})
}

export const getTokens = (): Partial<AuthTokensType> => {
	const accessToken = Cookies.get('accessToken')
	const refreshToken = Cookies.get('refreshToken')
	return { accessToken, refreshToken }
}

export const removeTokens = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}

export const setUserId = (id: number) => {
	Cookies.set('userId', id.toString(), {
		expires: 7,
		secure: true,
		sameSite: 'strict',
	})
}

export const removeUserId = () => {
	Cookies.remove('userId')
}

export const getUserId = () => {
	return Cookies.get('userId') ? Number(Cookies.get('userId')) : undefined
}
