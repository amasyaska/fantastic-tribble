import { Button } from '@components/ui/button/Button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@components/ui/dialog/Dialog'
import { useTaskActions } from '@hooks/tasks/useTaskActions'
import { DialogClose } from '@radix-ui/react-dialog'
import { useState } from 'react'

type RemoveTaskDialogProps = {
	taskId: number
	children: any
}

export const RemoveTaskDialog = ({
	taskId,
	children,
}: RemoveTaskDialogProps) => {
	const [open, setOpen] = useState(false)
	const { removeTask, removeTaskIsLoading } = useTaskActions({
		onRemoveSuccess: () => setOpen(false),
	})

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Remove task?</DialogTitle>
					<DialogDescription className='pt-1'>
						This is an irreversible action
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='secondary'>Cancel</Button>
					</DialogClose>
					<Button
						variant='destructive'
						onClick={() => removeTask(taskId)}
						isLoading={removeTaskIsLoading}
					>
						Remove
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
