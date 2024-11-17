import { GroupedTasksItem, TaskType } from '@ctypes/task.types'
import { useMemo } from 'react'
import { useTask, UseTaskOptions } from './useTask'

type UseGroupedTaskOptions = UseTaskOptions

export const useGroupedTask = (props: UseGroupedTaskOptions) => {
	const { tasks, tasksIsLoading, tasksIsSuccess } = useTask(props)

	const groupedTask = useMemo(() => {
		if (!tasks) return

		return groupTasksByStatus(tasks)
	}, [tasks])

	return {
		groupedTask,
		tasksIsLoading,
		tasksIsSuccess,
	}
}

const groupTasksByStatus = (tasks: TaskType[]): GroupedTasksItem[] => {
	const grouped = tasks.reduce((result, task) => {
		if (!result[task.status]) {
			result[task.status] = []
		}
		result[task.status].push(task)
		return result
	}, {} as Record<string, TaskType[]>)

	return Object.keys(grouped).map((status) => ({
		status,
		tasks: grouped[status],
	}))
}
