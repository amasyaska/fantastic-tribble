import { Button } from '@components/ui/button/Button'
import { ROUTES } from '@configs/routes.config'
import { useCompanySelect } from '@hooks/company/useCompanySelect'
import { LuSettings } from 'react-icons/lu'
import { Link } from 'react-router-dom'

type HaveSelectedCompanyGuardProps = {
	children: any
}

export const HaveSelectedCompanyGuard = ({
	children,
}: HaveSelectedCompanyGuardProps) => {
	const { selectedCompanyId } = useCompanySelect()

	if (selectedCompanyId == null)
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

	return children
}
