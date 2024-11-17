import { SelectCompany } from '@components/company/select-company/SelectCompany'
import { Button } from '@components/ui/button/Button'
import { ROUTES } from '@configs/routes.config'
import { useAuth } from '@hooks/auth/useAuth'
import { useTheme } from '@hooks/common/useTheme'
import { GrMoon, GrSun } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { HomeHeaderLink } from './HomeHeaderLink'
import { HomeHeaderProfile } from './HomeHeaderProfile'
type HomeHeaderProps = {}

export const HomeHeader = ({}: HomeHeaderProps) => {
	const { toggleTheme } = useTheme()
	const { isLogged } = useAuth()

	return (
		<div className='flex p-3 gap-10 items-center'>
			<div className='mr-2'>Logo</div>
			<div className='flex'>
				<HomeHeaderLink href={ROUTES.PROJECTS.HOME}>Projects</HomeHeaderLink>
			</div>
			<div className='ml-auto flex gap-2'>
				{isLogged ? (
					<>
						<HomeHeaderProfile />
						<SelectCompany />
					</>
				) : (
					<>
						<Button variant='secondary' withOneChild asChild>
							<Link to={ROUTES.AUTH.LOGIN}>Login</Link>
						</Button>
						<Button withOneChild asChild>
							<Link to={ROUTES.AUTH.REGISTRATION}>Registration</Link>
						</Button>
					</>
				)}
				<Button variant='outline' size='icon' onClick={toggleTheme}>
					<GrMoon className='hidden dark:block' />
					<GrSun className='block dark:hidden' />
				</Button>
			</div>
		</div>
	)
}
