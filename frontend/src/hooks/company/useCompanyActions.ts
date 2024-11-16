import {
	ConnectUserToCompanyFormFields,
	CreateCompanyFormFields,
	EditCompanyFormFields,
} from '@ctypes/company.types'
import { companyService } from '@services/company.service'
import { useMutation } from '@tanstack/react-query'

type UseCompanyActionsOptions = {
	onCreateSuccess?: () => void
	onRemoveSuccess?: () => void
	onConnectUserSuccess?: () => void
	onEditSuccess?: () => void
}

export const useCompanyActions = ({
	onCreateSuccess,
	onRemoveSuccess,
	onConnectUserSuccess,
	onEditSuccess,
}: UseCompanyActionsOptions) => {
	const { mutate: createCompany, isPending: createCompanyIsLoading } =
		useMutation({
			mutationKey: ['create new company'],
			mutationFn: (data: CreateCompanyFormFields) =>
				companyService.create(data),
			onSuccess(data, variables, context) {
				onCreateSuccess && onCreateSuccess()
			},
		})

	const { mutate: removeCompany, isPending: removeCompanyIsLoading } =
		useMutation({
			mutationKey: ['remove company'],
			mutationFn: (id: number) => companyService.remove(id),
			onSuccess(data, variables, context) {
				onRemoveSuccess && onRemoveSuccess()
			},
		})

	const {
		mutate: connectUserToCompany,
		isPending: connectUserToCompanyIsLoading,
	} = useMutation({
		mutationKey: ['connect user to company'],
		mutationFn: ({
			id,
			data,
		}: {
			id: number
			data: ConnectUserToCompanyFormFields
		}) => companyService.connectUser(id, data),
		onSuccess(data, variables, context) {
			onConnectUserSuccess && onConnectUserSuccess()
		},
	})

	const { mutate: editCompany, isPending: editCompanyIsLoading } = useMutation({
		mutationKey: ['edit company'],
		mutationFn: (data: EditCompanyFormFields) => companyService.edit(data),
		onSuccess(data, variables, context) {
			onEditSuccess && onEditSuccess()
		},
	})

	return {
		createCompany,
		createCompanyIsLoading,
		removeCompany,
		removeCompanyIsLoading,
		connectUserToCompany,
		connectUserToCompanyIsLoading,
		editCompany,
		editCompanyIsLoading,
	}
}
