import { Button } from '@components/ui/button/Button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@components/ui/dialog/Dialog'
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
import {
	CreateProjectFormFields,
	createProjectScheme,
} from '@ctypes/project.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProjectsActions } from '@hooks/projects/useProjectsActions'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PiPlusBold } from 'react-icons/pi'

type CreateProjectDialogProps = {
	companyId: number
}

export const CreateProjectDialog = ({
	companyId,
}: CreateProjectDialogProps) => {
	const [open, setOpen] = useState(false)

	const form = useForm({
		resolver: zodResolver(createProjectScheme),
		defaultValues: {
			name: '',
			description: '',
		},
	})

	const { createProject, createProjectIsLoading } = useProjectsActions({
		onCreateSuccess: () => setOpen(false),
	})

	const onSubmit = useCallback(
		(data: CreateProjectFormFields) => {
			createProject({ companyId, ...data })
		},
		[createProject]
	)

	return (
		<Dialog open={open} onOpenChange={(open) => setOpen(open)}>
			<DialogTrigger asChild>
				<Button variant='secondary'>
					<PiPlusBold />
					Add a project
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create new project</DialogTitle>
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
										<Input placeholder='Anch.inc project 1' {...field} />
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
										<Textarea placeholder='This project is ...' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' isLoading={createProjectIsLoading}>
							Create
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
