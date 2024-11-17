import { CreateTaskFormFields, EditTaskFormFields } from '@ctypes/task.types'
import { taskService } from '@services/tasks.service'
import { useMutation } from '@tanstack/react-query'

type UseTaskActionsOptions = {
	onCreateSuccess?: () => void
	onRemoveSuccess?: () => void
	onConnectUserSuccess?: () => void
	onEditSuccess?: () => void
}

export const useTaskActions = ({
	onCreateSuccess,
	onRemoveSuccess,
	onConnectUserSuccess,
	onEditSuccess,
}: UseTaskActionsOptions) => {
	const { mutate: createTask, isPending: createTaskIsLoading } = useMutation({
		mutationKey: ['create new task'],
		mutationFn: ({
			companyId,
			...data
		}: CreateTaskFormFields & { companyId: number }) =>
			taskService.create(companyId, data),
		onSuccess(data, variables, context) {
			onCreateSuccess && onCreateSuccess()
		},
	})

	const { mutate: removeTask, isPending: removeTaskIsLoading } = useMutation({
		mutationKey: ['remove task'],
		mutationFn: (id: number) => taskService.remove(id),
		onSuccess(data, variables, context) {
			onRemoveSuccess && onRemoveSuccess()
		},
	})

	const { mutate: editTask, isPending: editTaskIsLoading } = useMutation({
		mutationKey: ['edit task'],
		mutationFn: ({
			taskId,
			...data
		}: EditTaskFormFields & { taskId: number }) =>
			taskService.edit(taskId, data),
		onSuccess(data, variables, context) {
			onEditSuccess && onEditSuccess()
		},
	})

	return {
		createTask,
		createTaskIsLoading,
		removeTask,
		removeTaskIsLoading,
		editTask,
		editTaskIsLoading,
	}
}
