import { Button } from '@components/ui/button/Button'
import { ROUTES } from '@configs/routes.config'
import { useCompanySelect } from '@hooks/company/useCompanySelect'
import { LuSettings } from 'react-icons/lu'
import { Link, Outlet } from 'react-router-dom'

export const HaveSelectedCompanyGuard = () => {
	const { selectedCompanyId } = useCompanySelect()

	if (selectedCompanyId == -1)
		return (
			<div className='mx-auto flex flex-col justify-center items-center gap-3 max-w-[25rem] mt-[10vh]'>
				<h2>You don't have a company</h2>
				<p className='text-zinc-500 text-center'>
					Please, before you manage a project you have to create a company!
				</p>
				<Button asChild withOneChild variant='secondary'>
					<Link to={ROUTES.COMPANIES.MANAGE}>
						<LuSettings />
						Manage companies
					</Link>
				</Button>
			</div>
		)

	return <Outlet />
}
