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
import { AuthLoginFormFields, authLoginSchema } from '@ctypes/auth.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@hooks/auth/useAuth'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { PiGithubLogoBold, PiGoogleLogoBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'

export const LoginPage = () => {
	const form = useForm<AuthLoginFormFields>({
		resolver: zodResolver(authLoginSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	})
	const { login, loginIsLoading } = useAuth({
		setError: form.setError,
	})

	const onSubmit = useCallback(
		(data: AuthLoginFormFields) => {
			login(data)
		},
		[login]
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
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder='my-username' {...field} />
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
						<Button type='submit' isLoading={loginIsLoading}>
							Login
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
					<Link to={ROUTES.AUTH.REGISTRATION}>Don't have an account yet?</Link>
				</Button>
				<Button asChild variant='link'>
					<Link to={ROUTES.AUTH.FORGOT_PASSWORD}>Forgot password?</Link>
				</Button>
			</div>
		</div>
	)
}
