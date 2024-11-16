import { SelectCompany } from '@components/company/select-company/SelectCompany'
import { Button } from '@components/ui/button/Button'
import { ROUTES } from '@configs/routes.config'
import { useTheme } from '@hooks/common/useTheme'
import { GrMoon, GrSun } from 'react-icons/gr'
import { HomeHeaderLink } from './HomeHeaderLink'
import { HomeHeaderProfile } from './HomeHeaderProfile'
type HomeHeaderProps = {}

export const HomeHeader = ({}: HomeHeaderProps) => {
	const { toggleTheme } = useTheme()

	return (
		<div className='flex p-3 gap-10 items-center'>
			<div className='mr-2'>Logo</div>
			<div className='flex'>
				<HomeHeaderLink href={ROUTES.AUTH.LOGIN}>Auth</HomeHeaderLink>
				<HomeHeaderLink href={ROUTES.PROJECTS.HOME}>Projects</HomeHeaderLink>
			</div>
			<div className='ml-auto flex gap-2'>
				<HomeHeaderProfile />
				<SelectCompany />
				<Button variant='outline' size='icon' onClick={toggleTheme}>
					<GrMoon className='hidden dark:block' />
					<GrSun className='block dark:hidden' />
				</Button>
			</div>
		</div>
	)
}
