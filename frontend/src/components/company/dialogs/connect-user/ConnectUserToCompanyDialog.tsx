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
	ConnectUserToCompanyFormFields,
	connectUserToCompanyScheme,
} from '@ctypes/company.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCompanyActions } from '@hooks/company/useCompanyActions'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

type ConnectUserToCompanyDialogProps = {
	companyId: number
}

export const ConnectUserToCompanyDialog = ({
	companyId,
}: ConnectUserToCompanyDialogProps) => {
	const [open, setOpen] = useState(false)

	const form = useForm({
		resolver: zodResolver(connectUserToCompanyScheme),
		defaultValues: {
			email: '',
		},
	})

	const { connectUserToCompany, connectUserToCompanyIsLoading } =
		useCompanyActions({
			onConnectUserSuccess: () => setOpen(false),
		})

	const onSubmit = useCallback(
		(data: ConnectUserToCompanyFormFields) => {
			connectUserToCompany({ id: companyId, data })
		},
		[connectUserToCompany]
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
						<Button type='submit' isLoading={connectUserToCompanyIsLoading}>
							Connect
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
