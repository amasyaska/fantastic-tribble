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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@components/ui/select/Select'
import { Textarea } from '@components/ui/textarea/Textarea'
import { CreateTaskFormFields, createTaskScheme } from '@ctypes/task.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTaskActions } from '@hooks/tasks/useTaskActions'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

type CreateTaskDialogProps = {
	projectId: number
	children: any
	defaultStatus?: string
}

export const CreateTaskDialog = ({
	projectId,
	children,
	defaultStatus,
}: CreateTaskDialogProps) => {
	const [open, setOpen] = useState(false)

	const form = useForm({
		resolver: zodResolver(createTaskScheme),
		defaultValues: {
			name: '',
			description: '',
			status: defaultStatus ?? '',
		},
	})

	const { createTask, createTaskIsLoading } = useTaskActions({
		onCreateSuccess: () => setOpen(false),
	})

	const onSubmit = useCallback(
		(data: CreateTaskFormFields) => {
			createTask({ companyId: projectId, ...data })
		},
		[createTask]
	)

	return (
		<Dialog open={open} onOpenChange={(open) => setOpen(open)}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create new task</DialogTitle>
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
										<Input placeholder='Acme.inc project task 1' {...field} />
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
										<Textarea placeholder='This task is ...' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='status'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger>
												<SelectValue placeholder='Select status' />
											</SelectTrigger>
											<SelectContent>
												{['To do', 'In progress', 'Done'].map((item, index) => (
													<SelectItem value={item} key={index}>
														{item}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' isLoading={createTaskIsLoading}>
							Create
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
