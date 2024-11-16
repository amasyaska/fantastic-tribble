import { SelectCompany } from '@components/company/select-company/SelectCompany'
import { Button } from '@components/ui/button/Button'
import { useState } from 'react'
import { GrMoon, GrSun } from 'react-icons/gr'
import { HomeHeaderProfile } from './HomeHeaderProfile'
type HomeHeaderProps = {}

export const HomeHeader = ({}: HomeHeaderProps) => {
	const [theme, setTheme] = useState('dark')
	const handleThemeSwitcher = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark'
		setTheme(newTheme)
		document.documentElement.classList.toggle('dark', newTheme === 'dark')
	}

	return (
		<div className='flex p-3'>
			HomeHeader
			<div className='ml-auto flex gap-2'>
				<HomeHeaderProfile />
				<SelectCompany />
				<Button variant='outline' size='icon' onClick={handleThemeSwitcher}>
					<GrMoon className='hidden dark:block' />
					<GrSun className='block dark:hidden' />
				</Button>
			</div>
		</div>
	)
}
