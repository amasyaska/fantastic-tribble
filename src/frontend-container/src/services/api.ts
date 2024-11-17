import { getTokens } from '@lib/cookieTokens'
import axios from 'axios'
const JWT_EXPIRED = 'jwt expired'
const JWT_MUST_BE_PROVIDED = 'jwt must be provided'

export const $api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
})

$api.interceptors.request.use((config) => {
	const { accessToken } = getTokens()

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

// const refreshAuthLogic = async (failedRequest: any) => {
// 	const accessToken = getAccessToken()

// 	if (!accessToken) return Promise.resolve()

// 	return authService
// 		.refresh()
// 		.then((tokenRefreshResponse) => {
// 			saveAccessTokenToStorage(tokenRefreshResponse.data.accessToken)
// 			failedRequest.response.config.headers['Authorization'] =
// 				'Bearer ' + tokenRefreshResponse.data.accessToken
// 			return Promise.resolve()
// 		})
// 		.catch((e) => {
// 			removeAccessTokenFromStorage()
// 			return Promise.reject(e)
// 		})
// }

// createAuthRefreshInterceptor($api, refreshAuthLogic)
