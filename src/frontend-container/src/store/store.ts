import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '@store/slices/authSlice'
import { companyReducer } from '@store/slices/companySlice'
import { profileReducer } from './slices/profileSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		company: companyReducer,
		profile: profileReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
