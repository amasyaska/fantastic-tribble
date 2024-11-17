import { UserCompanyList } from '@components/company/list/CompanyList'
import { UserConnectedCompanyList } from '@components/company/list/UserConnectedCompanyList'

type CompaniesManagePageProps = {}

export const CompaniesManagePage = ({}: CompaniesManagePageProps) => {
	return (
		<div className='flex items-start justify-center gap-6 mt-[5vh] flex-wrap'>
			<div className='max-w-[25rem] w-full flex flex-col gap-3'>
				<UserCompanyList />
			</div>
			<div className='max-w-[25rem] w-full'>
				<UserConnectedCompanyList />
			</div>
		</div>
	)
}
