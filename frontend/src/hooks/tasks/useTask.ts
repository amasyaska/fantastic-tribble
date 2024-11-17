import { taskService } from '@services/tasks.service'
import { useQuery } from '@tanstack/react-query'

export type UseTaskOptions = {
	projectId: number | undefined
}

export const useTask = ({ projectId }: UseTaskOptions) => {
	const {
		data,
		isPending: tasksIsLoading,
		isSuccess: tasksIsSuccess,
	} = useQuery({
		queryKey: [`get projects ${projectId}`],
		queryFn: () => taskService.getAll(projectId!),
		enabled: () => projectId != undefined,
	})

	return {
		tasks: data,
		tasksIsLoading,
		tasksIsSuccess,
	}
}
