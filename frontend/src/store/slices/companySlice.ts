import { COMPANY_SELECT_STORAGE_KEY } from '@configs/company.config'
import { CompanyType } from '@ctypes/company.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CompanyState {
	selectedCompany: number | null
	companies: CompanyType[]
	companiesIsPending: boolean
}

const companySlice = createSlice({
	name: 'company',
	initialState: (): { value: CompanyState } => ({
		value: {
			selectedCompany: Number(localStorage.getItem(COMPANY_SELECT_STORAGE_KEY)),
			companies: [],
			companiesIsPending: false,
		},
	}),
	reducers: {
		setSelectedCompany(state, { payload }: PayloadAction<number | null>) {
			state.value.selectedCompany = payload
			localStorage.setItem(
				COMPANY_SELECT_STORAGE_KEY,
				payload?.toString() ?? ''
			)
		},
		setCompanies(state, { payload }: PayloadAction<CompanyType[]>) {
			state.value.companies = payload
			state.value.companiesIsPending = false
		},
		addCompany(state, { payload }: PayloadAction<CompanyType>) {
			state.value.companies = [...state.value.companies, payload]
		},
	},
})

export const { setSelectedCompany, setCompanies, addCompany } =
	companySlice.actions

export const companyReducer = companySlice.reducer
