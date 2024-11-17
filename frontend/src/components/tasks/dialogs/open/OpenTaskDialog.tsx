import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@components/ui/dialog/Dialog'
import { TaskType } from '@ctypes/task.types'
import { useState } from 'react'

type OpenTaskDialogProps = TaskType & {
	children: any
}

export const OpenTaskDialog = ({ children, ...props }: OpenTaskDialogProps) => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader className='flex flex-row items-center gap-3 space-y-0'>
					<DialogTitle className=''>{props.name}</DialogTitle>
					<div className='text-[.8rem] bg-zinc-500/30 px-3 rounded-[.3rem]'>
						{props.status}
					</div>
				</DialogHeader>
				<div className='pt-1 flex flex-col gap-1'>
					<span className='text-zinc-500'>Description</span>
					<span className='text-black dark:text-white'>
						{props.description}
					</span>
				</div>
				<div className=''>
					<div className='text-zinc-500'>Assigned to</div>
					<span>No one</span>
				</div>
			</DialogContent>
		</Dialog>
	)
}
