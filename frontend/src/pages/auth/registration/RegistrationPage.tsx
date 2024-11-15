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
import { useForm } from 'react-hook-form'
import { PiGithubLogoBold, PiGoogleLogoBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'

type RegistrationPageProps = {}

export const RegistrationPage = ({}: RegistrationPageProps) => {
	const form = useForm()

	return (
		<div className='w-full h-full flex justify-center items-center'>
			<div className='px-3 w-full max-w-[25rem] flex flex-col gap-3'>
				<Form {...form}>
					<div className='flex flex-col gap-3'>
						<FormField
							control={form.control}
							name='email'
							render={() => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='my-email@gmail.com' />
									</FormControl>
									<FormDescription>Need verifications</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={() => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder='***' type='password' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={() => (
								<FormItem>
									<FormLabel>Confirm password</FormLabel>
									<FormControl>
										<Input placeholder='***' type='password' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button>Registration</Button>
					</div>
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
