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
import { Textarea } from '@components/ui/textarea/Textarea'
import { EditProjectFormFields, editProjectScheme } from '@ctypes/project.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProjectsActions } from '@hooks/projects/useProjectsActions'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

type EditProjectDialogProps = EditProjectFormFields & {
	projectId: number
}

export const EditProjectDialog = ({
	projectId,
	...props
}: EditProjectDialogProps) => {
	const [open, setOpen] = useState(false)

	const form = useForm({
		resolver: zodResolver(editProjectScheme),
		defaultValues: props,
	})

	const { editProject, editProjectIsLoading } = useProjectsActions({
		onConnectUserSuccess: () => setOpen(false),
	})

	const onSubmit = useCallback(
		(data: EditProjectFormFields) => {
			editProject({ projectId, ...data })
		},
		[editProject]
	)

	return (
		<Dialog open={open} onOpenChange={(open) => setOpen(open)}>
			<DialogTrigger asChild>
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					Edit
				</DropdownMenuItem>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit project info</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-3'
					>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder='user-email@gmail.com' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea placeholder='user-email@gmail.com' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' isLoading={editProjectIsLoading}>
							Connect
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
