import {
	ConnectUserToProjectFormFields,
	CreateProjectFormFields,
	EditProjectFormFields,
} from '@ctypes/project.types'
import { projectService } from '@services/project.service'
import { useMutation } from '@tanstack/react-query'

type UseProjectsActionsOptions = {
	onCreateSuccess?: () => void
	onRemoveSuccess?: () => void
	onConnectUserSuccess?: () => void
	onEditSuccess?: () => void
}

export const useProjectsActions = ({
	onCreateSuccess,
	onRemoveSuccess,
	onConnectUserSuccess,
	onEditSuccess,
}: UseProjectsActionsOptions) => {
	const { mutate: createProject, isPending: createProjectIsLoading } =
		useMutation({
			mutationKey: ['create new project'],
			mutationFn: ({
				companyId,
				...data
			}: CreateProjectFormFields & { companyId: number }) =>
				projectService.create(companyId, data),
			onSuccess(data, variables, context) {
				onCreateSuccess && onCreateSuccess()
			},
		})

	const { mutate: removeProject, isPending: removeProjectIsLoading } =
		useMutation({
			mutationKey: ['remove Project'],
			mutationFn: (id: number) => projectService.remove(id),
			onSuccess(data, variables, context) {
				onRemoveSuccess && onRemoveSuccess()
			},
		})

	const {
		mutate: connectUserToProject,
		isPending: connectUserToProjectIsLoading,
	} = useMutation({
		mutationKey: ['connect user to project'],
		mutationFn: ({
			id,
			data,
		}: {
			id: number
			data: ConnectUserToProjectFormFields
		}) => projectService.connectUser(id, data),
		onSuccess(data, variables, context) {
			onConnectUserSuccess && onConnectUserSuccess()
		},
	})

	const { mutate: editProject, isPending: editProjectIsLoading } = useMutation({
		mutationKey: ['edit project'],
		mutationFn: ({
			projectId,
			...data
		}: EditProjectFormFields & { projectId: number }) =>
			projectService.edit(projectId, data),
		onSuccess(data, variables, context) {
			onEditSuccess && onEditSuccess()
		},
	})

	return {
		createProject,
		createProjectIsLoading,
		removeProject,
		removeProjectIsLoading,
		connectUserToProject,
		connectUserToProjectIsLoading,
		editProject,
		editProjectIsLoading,
	}
}
