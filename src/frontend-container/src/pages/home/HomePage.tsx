import { Button } from '@components/ui/button/Button'
import { ROUTES } from '@configs/routes.config'
import { Link } from 'react-router-dom'

type HomePageProps = {}

export const HomePage = ({}: HomePageProps) => {
	return (
		<div className='flex flex-col items-center space-y-3 mt-[10vh]'>
			<h1 className='text-[2rem] font-bold max-w-[25rem] text-center leading-none'>
				Welcome to site for your work organisation
			</h1>
			<p>Manage tasks, track progress, and stay organized effortlessly</p>
			<Button asChild withOneChild>
				<Link to={ROUTES.AUTH.REGISTRATION}>Register</Link>
			</Button>
			<h2 className='pt-10'>Why Choose Us?</h2>
			<p className='max-w-[30rem] text-center'>
				Our platform helps you stay on top of your work with tools designed for
				efficiency and simplicity
			</p>
		</div>
	)
}
