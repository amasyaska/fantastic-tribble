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
import { CgTrash } from 'react-icons/cg'
import { IoMdClose } from 'react-icons/io'
import { MdOutlineEdit } from 'react-icons/md'

type SettingsPageProps = {}

export const SettingsPage = ({}: SettingsPageProps) => {
	const form = useForm()

	return (
		<div className='flex flex-col gap-3 w-full max-w-[25rem] mx-auto'>
			<Form {...form}>
				<div className='flex flex-col gap-3'>
					<h2>Profile data</h2>
					<FormField
						control={form.control}
						name='name'
						render={() => (
							<FormItem>
								<FormLabel>Name</FormLabel>
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
			<hr />
			<h2>Companies</h2>
			<div className='flex flex-col gap-2'>
				{[0, 1, 2].map((item) => (
					<div className='bg-zinc-100 dark:bg-zinc-900 p-2 rounded-md flex items-center justify-between'>
						<div className='hover:bg-zinc-200 dark:hover:bg-zinc-800 p-2 rounded-md cursor-text flex gap-2 items-center'>
							Company {item}
							<MdOutlineEdit className='opacity-30' />
						</div>
						<Button
							className='opacity-50 hover:opacity-100'
							variant='ghost'
							size='icon'
						>
							<CgTrash className='' />
						</Button>
					</div>
				))}
			</div>
		</div>
	)
}
