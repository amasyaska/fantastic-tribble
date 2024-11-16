import { SelectCompany } from '@components/company/select-company/SelectCompany'
import { Button } from '@components/ui/button/Button'
import { ROUTES } from '@configs/routes.config'
import { useState } from 'react'
import { GrMoon, GrSun } from 'react-icons/gr'
import { HomeHeaderLink } from './HomeHeaderLink'
import { HomeHeaderProfile } from './HomeHeaderProfile'
type HomeHeaderProps = {}

export const HomeHeader = ({}: HomeHeaderProps) => {
	const [theme, setTheme] = useState('light')
	const handleThemeSwitcher = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark'
		setTheme(newTheme)
		document.documentElement.classList.toggle('dark', newTheme === 'dark')
	}

	return (
		<div className='flex p-3 gap-10 items-center'>
			<div className='mr-2'>Logo</div>
			<div className='flex gap-2'>
				<HomeHeaderLink href={ROUTES.AUTH.LOGIN}>Auth</HomeHeaderLink>
			</div>
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
