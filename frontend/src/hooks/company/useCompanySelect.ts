import { setSelectedCompany } from '@store/slices/companySlice'
import { RootState } from '@store/store'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCompany } from './useCompany'

export const useCompanySelect = () => {
	const { companies } = useCompany()

	const selectedCompanyId = useSelector(
		(state: RootState) => state.company.value.selectedCompany
	)
	const dispatch = useDispatch()

	const selectCompany = useCallback(
		(value: number) => {
			dispatch(setSelectedCompany(value))
		},
		[selectedCompanyId]
	)

	return {
		selectedCompanyId,
		selectedCompany: companies?.find(
			(item) => item.id === Number(selectedCompanyId)
		),
		selectCompany,
	}
}
