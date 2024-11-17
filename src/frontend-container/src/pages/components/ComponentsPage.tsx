import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@components/ui/form/form'
import { Input } from '@components/ui/input/Input'
import { Button } from '@ui/button/Button'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const ComponentsPage = () => {
	const form = useForm()

	return (
		<div className='flex flex-col items-start gap-3 p-3'>
			<Button onClick={() => toast('hello sonner!')}>Run sonner</Button>
			<Button isLoading>Button</Button>
			<Button variant='destructive'>Button</Button>
			<Button variant='ghost'>Button</Button>
			<Button variant='link'>Button</Button>
			<Button variant='outline'>Button</Button>
			<Button variant='secondary'>Button</Button>
			<Form {...form}>
				<FormField
					control={form.control}
					name={'field'}
					render={() => (
						<FormItem>
							<FormLabel>Label</FormLabel>
							<FormControl>
								<Input placeholder='input' />
							</FormControl>
							<FormDescription>This is input description</FormDescription>
						</FormItem>
					)}
				/>
			</Form>
		</div>
	)
}
