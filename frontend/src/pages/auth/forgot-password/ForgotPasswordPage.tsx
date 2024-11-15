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
import { Link } from 'react-router-dom'

type ForgotPasswordPageProps = {}

export const ForgotPasswordPage = ({}: ForgotPasswordPageProps) => {
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
									<FormDescription>
										You take new auto-generated password on your email
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button>Registration</Button>
					</div>
				</Form>
				<hr />
				<Button asChild variant='link'>
					<Link to={ROUTES.AUTH.LOGIN}>I remember password</Link>
				</Button>
			</div>
		</div>
	)
}
