import {
	CompanyListItem,
	CompanyListItemSkeleton,
} from '@components/company/list-item/CompanyListItem'
import { useCompany } from '@hooks/company/useCompany'

type UserConnectedCompanyListProps = {}

export const UserConnectedCompanyList = ({}: UserConnectedCompanyListProps) => {
	const { companies, companiesIsLoading } = useCompany()

	return (
		<div className='flex flex-col gap-3'>
			<h2>You are connected to</h2>

			{companiesIsLoading &&
				[0, 0, 0].map((_, index) => <CompanyListItemSkeleton key={index} />)}

			{companies?.length === 0 && (
				<span className='text-black/50 dark:text-white/50'>
					No companies found
				</span>
			)}

			{companies?.map((item, index) => (
				<CompanyListItem {...item} id={index} key={index} />
			))}
		</div>
	)
}
