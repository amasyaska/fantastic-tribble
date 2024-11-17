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
import {
	UpdateProfileDataFormFields,
	updateProfileDataSchema,
} from '@ctypes/user.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProfile } from '@hooks/user/useProfile'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdClose } from 'react-icons/io'

type SettingsPageProps = {}

export const SettingsPage = ({}: SettingsPageProps) => {
	const { profile } = useProfile()
	const profileDataForm = useForm<UpdateProfileDataFormFields>({
		resolver: zodResolver(updateProfileDataSchema),
		defaultValues: {
			username: '',
			firstName: '',
			lastName: '',
		},
	})

	useEffect(() => {
		if (profile) {
			profileDataForm.reset(profile)
		}
	}, [profile, profileDataForm])

	return (
		<div className='flex flex-col gap-3 w-full max-w-[25rem] mx-auto'>
			<Form {...profileDataForm}>
				<div className='flex flex-col gap-3'>
					<h2>Profile data</h2>
					<div className='flex gap-2'>
						<FormField
							control={profileDataForm.control}
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
							control={profileDataForm.control}
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
						control={profileDataForm.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder='name' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button variant='secondary'>Change data</Button>
				</div>
			</Form>
			<hr />
			<h2>Verification</h2>
			<div className='space-y-1'>
				<div className='text-[.9rem]'>Email</div>
				<Input
					placeholder='my-email@gmail.com'
					value={profile?.email}
					disabled
				/>
				<div className='flex text-red-400 dark:text-red-800 items-center gap-1 text-[.9rem]'>
					<IoMdClose />
					Not verified
				</div>
			</div>
			<Button variant='secondary'>Send confirmation link</Button>
			{/* <hr />
			<h2>Change password</h2>
			<FormField
				control={profileDataForm.control}
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
				control={profileDataForm.control}
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
			<Button variant='secondary'>Change password</Button> */}
		</div>
	)
}
