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
import { useForm } from 'react-hook-form'
import { IoMdClose } from 'react-icons/io'

type SettingsPageProps = {}

export const SettingsPage = ({}: SettingsPageProps) => {
	const form = useForm()

	return (
		<div className='flex flex-col gap-3 w-full max-w-[25rem] mx-auto'>
			<Form {...form}>
				<div className='flex flex-col gap-3'>
					<h2>Profile data</h2>
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
						render={() => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder='name' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button variant='secondary'>Change data</Button>
					<hr />
					<h2>Verification</h2>
					<FormField
						control={form.control}
						name='email'
						render={() => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder='my-email@gmail.com'
										defaultValue='your.email@gmail.com'
										disabled
									/>
								</FormControl>
								<FormDescription className='flex text-red-400 dark:text-red-800 items-center gap-1'>
									<IoMdClose />
									Not verified
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button variant='secondary'>Send confirmation link</Button>
					<hr />
					<h2>Change password</h2>
					<FormField
						control={form.control}
						name='old-password'
						render={() => (
							<FormItem>
								<FormLabel>Old password</FormLabel>
								<FormControl>
									<Input placeholder='***' type='password' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='new-password'
						render={() => (
							<FormItem>
								<FormLabel>New password</FormLabel>
								<FormControl>
									<Input placeholder='***' type='password' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button variant='secondary'>Change password</Button>
				</div>
			</Form>
		</div>
	)
}
