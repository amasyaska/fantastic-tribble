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
import { DropdownMenuItem } from '@components/ui/dropdown-menu/DropdownMenu'
import { useProjectsActions } from '@hooks/projects/useProjectsActions'
import { DialogClose } from '@radix-ui/react-dialog'
import { useState } from 'react'

type RemoveProjectDialogProps = {
	projectId: number
}

export const RemoveProjectDialog = ({
	projectId,
}: RemoveProjectDialogProps) => {
	const [open, setOpen] = useState(false)
	const { removeProject, removeProjectIsLoading } = useProjectsActions({
		onRemoveSuccess: () => setOpen(false),
	})

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<DropdownMenuItem
					onSelect={(e) => e.preventDefault()}
					className='text-rose-500'
				>
					Remove
				</DropdownMenuItem>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Remove project?</DialogTitle>
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
						onClick={() => removeProject(projectId)}
						isLoading={removeProjectIsLoading}
					>
						Remove
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
