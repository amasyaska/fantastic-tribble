import { Button } from '@components/ui/button/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@components/ui/dropdown-menu/DropdownMenu'
import { Skeleton } from '@components/ui/skeleton/Skeleton'
import { ROUTES } from '@configs/routes.config'
import { ProjectType } from '@ctypes/project.types'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { ConnectUserToProjectDialog } from '../dialogs/connect-user/ConnectUserToProjectDialog'
import { EditProjectDialog } from '../dialogs/edit/EditProjectDialog'
import { RemoveProjectDialog } from '../dialogs/remove/RemoveProjectDialog'

type ProjectItemProps = ProjectType

export const ProjectItem = ({ id, name, description }: ProjectItemProps) => {
	return (
		<div className='relative'>
			<Link
				to={ROUTES.TASKS.OF_PROJECT(id)}
				className='w-[15rem] h-[10rem] bg-zinc-100 dark:bg-zinc-900 rounded-[.4rem] p-2 relative border border-transparent hover:border-zinc-500 block'
			>
				<h3 className='text-[1rem] leading-relaxed'>{name}</h3>
				<p className='text-[.9rem] text-zinc-600 dark:text-zinc-300'>
					{description}
				</p>
			</Link>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						size='icon_sm'
						className='absolute top-0 right-0 m-2'
					>
						<BsThreeDotsVertical />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent side='right' align='start'>
					<EditProjectDialog
						name={name}
						description={description}
						projectId={id}
					/>

					<ConnectUserToProjectDialog projectId={id} />

					<DropdownMenuSeparator />

					<RemoveProjectDialog projectId={id} />
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export const ProjectItemSkeleton = () => {
	return <Skeleton className='w-[15rem] h-[10rem]' />
}
