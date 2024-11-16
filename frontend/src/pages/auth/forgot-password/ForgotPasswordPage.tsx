import { Button } from '@components/ui/button/Button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@components/ui/form/form'
import { Input } from '@components/ui/input/Input'
import { ROUTES } from '@configs/routes.config'
import {
	AuthForgotPasswordFormFields,
	authForgotPasswordSchema,
} from '@ctypes/auth.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/auth/useAuth'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

type ForgotPasswordPageProps = {}

export const ForgotPasswordPage = ({}: ForgotPasswordPageProps) => {
	const form = useForm<AuthForgotPasswordFormFields>({
		resolver: zodResolver(authForgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	})

	const { recoverPassword, recoverPasswordIsLoading } = useAuth()

	const onSubmit = useCallback(
		(data: AuthForgotPasswordFormFields) => {
			recoverPassword(data)
		},
		[recoverPassword]
	)

	return (
		<div className='w-full h-full flex justify-center items-center'>
			<div className='px-3 w-full max-w-[25rem] flex flex-col gap-3'>
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
										<Input placeholder='my-email@gmail.com' {...field} />
									</FormControl>
									<FormDescription>
										You will receive a new automatically generated password to
										your email
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' isLoading={recoverPasswordIsLoading}>
							Recover password
						</Button>
					</form>
				</Form>
				<hr />
				<Button asChild variant='link'>
					<Link to={ROUTES.AUTH.LOGIN}>I remember password</Link>
				</Button>
			</div>
		</div>
	)
}
