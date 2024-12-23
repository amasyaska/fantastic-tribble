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
	AuthRegistrationFormFields,
	authRegistrationSchema,
} from '@ctypes/auth.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/auth/useAuth'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { PiGithubLogoBold, PiGoogleLogoBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'

type RegistrationPageProps = {}

export const RegistrationPage = ({}: RegistrationPageProps) => {
	const form = useForm<AuthRegistrationFormFields>({
		resolver: zodResolver(authRegistrationSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const { register, registerIsLoading } = useAuth({
		setError: form.setError,
	})

	const onSubmit = useCallback(
		(data: AuthRegistrationFormFields) => {
			register(data)
		},
		[register]
	)

	return (
		<div className='w-full h-full flex justify-center items-center'>
			<div className='px-3 w-full max-w-[25rem] flex flex-col gap-3'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-3'
					>
						<div className='flex gap-2'>
							<FormField
								control={form.control}
								name='firstName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>First name</FormLabel>
										<FormControl>
											<Input placeholder='First name' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='lastName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last name</FormLabel>
										<FormControl>
											<Input placeholder='Last name' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder='Username' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='my-email@gmail.com' {...field} />
									</FormControl>
									<FormDescription>Need verifications</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder='***' type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm password</FormLabel>
									<FormControl>
										<Input placeholder='***' type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' isLoading={registerIsLoading}>
							Registration
						</Button>
					</form>
				</Form>
				<hr />
				<Button variant='secondary'>
					<PiGoogleLogoBold />
					Google
				</Button>
				<Button variant='secondary'>
					<PiGithubLogoBold />
					Github
				</Button>
				<hr />
				<Button asChild variant='link'>
					<Link to={ROUTES.AUTH.LOGIN}>Do you have an account?</Link>
				</Button>
				<Button asChild variant='link'>
					<Link to={ROUTES.AUTH.FORGOT_PASSWORD}>Forgot password?</Link>
				</Button>
			</div>
		</div>
	)
}
