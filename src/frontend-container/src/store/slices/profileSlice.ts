import { UserType } from '@ctypes/user.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const profileSlice = createSlice({
	name: 'profile',
	initialState: (): { value: UserType | undefined } => ({
		value: undefined,
	}),
	reducers: {
		setProfile: (state, { payload }: PayloadAction<UserType>) => {
			state.value = payload
		},
	},
})

export const { setProfile } = profileSlice.actions

export const profileReducer = profileSlice.reducer
