import { Button } from '@components/ui/button/Button'
import { GroupedTasksItem } from '@ctypes/task.types'
import { PiPlusBold } from 'react-icons/pi'
import { CreateTaskDialog } from '../dialogs/create/CreateTaskDialog'
import { TaskItem } from '../item/TaskItem'

type TaskColumnProps = GroupedTasksItem & {
	projectId: number
}

export const TaskColumn = ({ projectId, status, tasks }: TaskColumnProps) => {
	return (
		<div className='space-y-3 bg-zinc-100/50 dark:bg-zinc-900/30 p-3 rounded-[.4rem] w-[25rem] max-w-full'>
			<h2>{status}</h2>

			{tasks?.map((item, index) => (
				<TaskItem {...item} key={index} />
			))}

			{tasks?.length === 0 && (
				<span className='text-zinc-500'>No projects found</span>
			)}

			<CreateTaskDialog projectId={projectId} defaultStatus={status}>
				<Button variant='outline' className='w-full bg-transparent'>
					<PiPlusBold />
					Create a task
				</Button>
			</CreateTaskDialog>
		</div>
	)
}
