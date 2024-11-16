import { companyService } from '@services/company.service'
import { useQuery } from '@tanstack/react-query'

export const useCompany = () => {
	const {
		data,
		isPending: companiesIsLoading,
		isSuccess: companiesIsSuccess,
	} = useQuery({
		queryKey: ['get companies'],
		queryFn: () => companyService.getAll(),
	})

	return {
		companies: data?.map((item, index) => ({
			...item,
			id: index,
		})),
		companiesIsLoading,
		companiesIsSuccess,
	}
}
