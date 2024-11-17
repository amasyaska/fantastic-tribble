import { Button } from '@components/ui/button/Button'
import { Skeleton } from '@components/ui/skeleton/Skeleton'
import { TaskType } from '@ctypes/task.types'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { OpenTaskDialog } from '../dialogs/open/OpenTaskDialog'
import { TaskActionsMenu } from '../dropdown-menus/TaskActionsMenu'

type TaskItemProps = TaskType

export const TaskItem = (props: TaskItemProps) => {
	const { id, name, description, status } = props

	return (
		<div className='relative'>
			<OpenTaskDialog {...props}>
				<div className='bg-zinc-200/50 dark:bg-zinc-900 p-2 rounded-[.3rem] flex flex-col gap-2 w-full items-start border border-transparent hover:border-zinc-500 cursor-pointer'>
					<div className=''>{name}</div>
					<div className='text-zinc-500'>{description}</div>
					<div className='text-[.8rem] bg-zinc-500/10 rounded-md px-2 p-1'>
						{status}
					</div>
				</div>
			</OpenTaskDialog>
			<TaskActionsMenu {...props}>
				<Button
					variant='ghost'
					size='icon_sm'
					className='absolute top-0 right-0 m-2'
				>
					<BsThreeDotsVertical />
				</Button>
			</TaskActionsMenu>
		</div>
	)
}

export const TaskItemSkeleton = () => {
	return <Skeleton className='w-[15rem] h-[3rem] rounded-md' />
}
