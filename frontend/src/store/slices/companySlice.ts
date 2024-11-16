import { COMPANY_SELECT_STORAGE_KEY } from '@configs/company.config'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CompanyState {
	selectedCompany: string | null
}

const companySlice = createSlice({
	name: 'company',
	initialState: (): { value: CompanyState } => ({
		value: {
			selectedCompany: localStorage.getItem(COMPANY_SELECT_STORAGE_KEY),
		},
	}),
	reducers: {
		setSelectedCompany(state, { payload }: PayloadAction<string>) {
			state.value.selectedCompany = payload
			localStorage.setItem(COMPANY_SELECT_STORAGE_KEY, payload)
		},
	},
})

export const { setSelectedCompany } = companySlice.actions

export const companyReducer = companySlice.reducer
