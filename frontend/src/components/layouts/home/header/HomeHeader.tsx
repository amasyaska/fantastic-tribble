import { Button } from '@components/ui/button/Button'
import { useCallback, useState } from 'react'
import { GrMoon, GrSun } from 'react-icons/gr'

type HomeHeaderProps = {}

export const HomeHeader = ({}: HomeHeaderProps) => {
	const changeTheme = useCallback(() => {
		if (!document) return

		document.body.classList.toggle('light')
		document.body.classList.toggle('dark')
	}, [document])

	const [theme, setTheme] = useState('dark')
	const handleThemeSwitcher = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark'
		setTheme(newTheme)
		document.documentElement.classList.toggle('dark', newTheme === 'dark')
	}

	return (
		<div className='flex p-3'>
			HomeHeader
			<div className='ml-auto'>
				<Button variant='outline' size='icon' onClick={handleThemeSwitcher}>
					<GrMoon className='hidden dark:block' />
					<GrSun className='block dark:hidden' />
				</Button>
			</div>
		</div>
	)
}
