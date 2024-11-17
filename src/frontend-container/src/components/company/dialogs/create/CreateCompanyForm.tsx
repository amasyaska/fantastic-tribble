import { Button } from '@components/ui/button/Button'
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
	CreateCompanyFormFields,
	createCompanyScheme,
} from '@ctypes/company.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCompanyActions } from '@hooks/company/useCompanyActions'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

type CreateCompanyFormProps = {
	onCreated: () => void
}

export const CreateCompanyForm = ({ onCreated }: CreateCompanyFormProps) => {
	const form = useForm({
		resolver: zodResolver(createCompanyScheme),
		defaultValues: {
			name: '',
			description: '',
		},
	})

	const { createCompany, createCompanyIsLoading } = useCompanyActions({
		onCreateSuccess: onCreated,
	})

	const onSubmit = useCallback(
		(data: CreateCompanyFormFields) => {
			createCompany(data)
		},
		[createCompany]
	)

	return (
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
								<Input placeholder='Acme.inc' {...field} />
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
								<Textarea placeholder='This company is ...' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' isLoading={createCompanyIsLoading}>
					Create
				</Button>
			</form>
		</Form>
	)
}
