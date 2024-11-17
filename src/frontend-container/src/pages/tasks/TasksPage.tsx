import { TaskColumn } from '@components/tasks/column/TaskColumn'
import { CreateTaskDialog } from '@components/tasks/dialogs/create/CreateTaskDialog'
import { TaskItemSkeleton } from '@components/tasks/item/TaskItem'
import { Button } from '@components/ui/button/Button'
import { Skeleton } from '@components/ui/skeleton/Skeleton'
import { useGroupedTask } from '@hooks/tasks/useGroupedTask'
import { useTask } from '@hooks/tasks/useTask'
import { PiPlusBold } from 'react-icons/pi'
import { useParams } from 'react-router-dom'

type TasksPageProps = {}

export const TasksPage = ({}: TasksPageProps) => {
	const { projectId } = useParams()

	const { tasks, tasksIsLoading } = useTask({
		projectId: Number(projectId),
	})
	const { groupedTask } = useGroupedTask({
		projectId: Number(projectId),
	})

	if (projectId == undefined)
		return <span className='text-zinc-500'>No found project</span>

	return (
		<div className='p-4 flex flex-col gap-3'>
			{!tasksIsLoading ? (
				<>
					<h2>Tasks ({tasks?.length})</h2>

					<div className='flex gap-2'>
						<CreateTaskDialog projectId={Number(projectId)}>
							<Button variant='secondary'>
								<PiPlusBold />
								Create a task
							</Button>
						</CreateTaskDialog>
					</div>
				</>
			) : (
				<Skeleton className='w-[15rem] h-[2rem]' />
			)}
			<div className='flex gap-3 flex-wrap'>
				{tasksIsLoading &&
					[0, 1, 2].map((_, index) => <TaskItemSkeleton key={index} />)}

				{groupedTask?.map((item, index) => (
					<TaskColumn {...item} key={index} projectId={Number(projectId)} />
				))}

				{tasks?.length === 0 && (
					<span className='text-zinc-500'>No projects found</span>
				)}
			</div>
		</div>
	)
}
