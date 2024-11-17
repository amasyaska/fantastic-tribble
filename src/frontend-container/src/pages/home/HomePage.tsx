import { Button } from '@components/ui/button/Button'

type HomePageProps = {}

export const HomePage = ({}: HomePageProps) => {
	return (
		<div className='flex flex-col items-center'>
			<h1>Welcome to site for your work organisation</h1>
			<p>Manage tasks, track progress, and stay organized effortlessly</p>
			<Button>Register</Button>
			<h2>Why Choose Us?</h2>
			<p>
				Our platform helps you stay on top of your work with tools designed for
				efficiency and simplicity
			</p>
		</div>
	)
}
