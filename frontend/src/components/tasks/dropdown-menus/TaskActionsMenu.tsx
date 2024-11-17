import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@components/ui/dropdown-menu/DropdownMenu'
import { TaskType } from '@ctypes/task.types'
import { EditTaskDialog } from '../dialogs/edit/EditTaskDialog'
import { OpenTaskDialog } from '../dialogs/open/OpenTaskDialog'
import { RemoveTaskDialog } from '../dialogs/remove/RemoveTaskDialog'

type TaskActionsMenuProps = TaskType & {
	children: any
}

export const TaskActionsMenu = ({
	children,
	...props
}: TaskActionsMenuProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent side='right' align='start'>
				<OpenTaskDialog {...props}>
					<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
						Open
					</DropdownMenuItem>
				</OpenTaskDialog>

				<EditTaskDialog taskId={props.id} {...props}>
					<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
						Edit
					</DropdownMenuItem>
				</EditTaskDialog>

				<DropdownMenuSeparator />

				<RemoveTaskDialog taskId={props.id}>
					<DropdownMenuItem
						onSelect={(e) => e.preventDefault()}
						className='text-rose-500'
					>
						Remove
					</DropdownMenuItem>
				</RemoveTaskDialog>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
