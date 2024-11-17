import { getTokens } from '@lib/cookieJwtTokens'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const authSlice = createSlice({
	name: 'auth',
	initialState: () => ({
		value: {
			isLogged: getTokens()?.accessToken != undefined,
		},
	}),
	reducers: {
		setIsLogged: (state, { payload }: PayloadAction<boolean>) => {
			state.value.isLogged = payload
		},
	},
})

export const { setIsLogged } = authSlice.actions

export const authReducer = authSlice.reducer
