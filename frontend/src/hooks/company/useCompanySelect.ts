import { setSelectedCompany } from '@store/slices/companySlice'
import { RootState } from '@store/store'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useCompanySelect = () => {
	const selectedCompany = useSelector(
		(state: RootState) => state.company.value.selectedCompany
	)
	const dispatch = useDispatch()

	const selectCompany = useCallback(
		(value: string) => {
			dispatch(setSelectedCompany(value))
		},
		[selectedCompany]
	)

	return {
		selectedCompany,
		selectCompany,
	}
}
