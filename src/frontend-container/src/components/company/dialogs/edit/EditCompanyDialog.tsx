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
import { EditCompanyFormFields, editCompanyScheme } from '@ctypes/company.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCompanyActions } from '@hooks/company/useCompanyActions'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

type EditCompanyDialogProps = EditCompanyFormFields & {
	companyId: number
}

export const EditCompanyDialog = ({
	companyId,
	...props
}: EditCompanyDialogProps) => {
	const [open, setOpen] = useState(false)

	const form = useForm({
		resolver: zodResolver(editCompanyScheme),
		defaultValues: props,
	})

	const { editCompany, editCompanyIsLoading } = useCompanyActions({
		onConnectUserSuccess: () => setOpen(false),
	})

	const onSubmit = useCallback(
		(data: EditCompanyFormFields) => {
			editCompany(data)
		},
		[editCompany]
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
					<DialogTitle>Edit company info</DialogTitle>
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
						<Button type='submit' isLoading={editCompanyIsLoading}>
							Edit
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
