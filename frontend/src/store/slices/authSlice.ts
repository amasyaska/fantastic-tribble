import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
	accessToken: string
	refreshToken: string
}

const initialStateValue: Partial<AuthState> = {
	accessToken: undefined,
	refreshToken: undefined,
}

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		value: initialStateValue,
	},
	reducers: {
		setTokens(state, { payload }: PayloadAction<AuthState>) {
			state.value = payload
		},
		clearTokens(state) {
			state.value = initialStateValue
		},
	},
})

export const { setTokens, clearTokens } = authSlice.actions

export default authSlice.reducer
