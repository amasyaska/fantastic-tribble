import { Button } from '@components/ui/button/Button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@components/ui/dialog/Dialog'
import { DropdownMenuItem } from '@components/ui/dropdown-menu/DropdownMenu'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@components/ui/form/form'
import { Input } from '@components/ui/input/Input'
import {
	ConnectUserToProjectFormFields,
	connectUserToProjectScheme,
} from '@ctypes/project.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProjectsActions } from '@hooks/projects/useProjectsActions'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

type ConnectUserToProjectDialogProps = {
	projectId: number
}

export const ConnectUserToProjectDialog = ({
	projectId,
}: ConnectUserToProjectDialogProps) => {
	const [open, setOpen] = useState(false)

	const form = useForm({
		resolver: zodResolver(connectUserToProjectScheme),
		defaultValues: {
			email: '',
		},
	})

	const { connectUserToProject, connectUserToProjectIsLoading } =
		useProjectsActions({
			onConnectUserSuccess: () => setOpen(false),
		})

	const onSubmit = useCallback(
		(data: ConnectUserToProjectFormFields) => {
			connectUserToProject({ id: projectId, data })
		},
		[connectUserToProject]
	)

	return (
		<Dialog open={open} onOpenChange={(open) => setOpen(open)}>
			<DialogTrigger asChild>
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					Connect a new user
				</DropdownMenuItem>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Connect new user</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-3'
					>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='user-email@gmail.com' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' isLoading={connectUserToProjectIsLoading}>
							Connect
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
