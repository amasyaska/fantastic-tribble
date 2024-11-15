import { Input } from '@components/ui/input/Input'
import { Button } from '@ui/button/Button'
import { toast } from 'sonner'

export const ComponentsPage = () => {
	return (
		<div className='flex flex-col items-start gap-3 p-3'>
			<Button onClick={() => toast('hello sonner!')}>Run sonner</Button>
			<Button isLoading>Button</Button>
			<Button variant='destructive'>Button</Button>
			<Button variant='ghost'>Button</Button>
			<Button variant='link'>Button</Button>
			<Button variant='outline'>Button</Button>
			<Button variant='secondary'>Button</Button>
			<Input placeholder='input' />
		</div>
	)
}
