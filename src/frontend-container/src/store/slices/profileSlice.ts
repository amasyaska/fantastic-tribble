import { UserType } from '@ctypes/user.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const profileSlice = createSlice({
	name: 'profile',
	initialState: (): { value: UserType | undefined; isLoading: boolean } => ({
		value: undefined,
		isLoading: false,
	}),
	reducers: {
		setProfile: (state, { payload }: PayloadAction<UserType>) => {
			state.value = payload
		},
		setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.isLoading = payload
		},
		removeProfile: (state) => {
			state.value = undefined
		},
	},
})

export const { setProfile, setIsLoading, removeProfile } = profileSlice.actions

export const profileReducer = profileSlice.reducer
