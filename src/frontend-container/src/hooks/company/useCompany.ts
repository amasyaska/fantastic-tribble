import { companyService } from '@services/company.service'
import { setCompanies } from '@store/slices/companySlice'
import { RootState } from '@store/store'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useCompany = () => {
	const dispatch = useDispatch()
	const companies = useSelector(
		(state: RootState) => state.company.value.companies
	)

	const {
		data,
		isPending: companiesIsLoading,
		isSuccess: companiesIsSuccess,
	} = useQuery({
		queryKey: ['get companies'],
		queryFn: () => companyService.getAll(),
	})

	useEffect(() => {
		if (!data) return

		dispatch(setCompanies(data))
	}, [data])

	return {
		companies,
		companiesIsLoading,
		companiesIsSuccess,
	}
}
