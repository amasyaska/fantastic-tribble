import { Button } from '@components/ui/button/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@components/ui/dropdown-menu/DropdownMenu'
import { Skeleton } from '@components/ui/skeleton/Skeleton'
import { CompanyType } from '@ctypes/company.types'
import { useCompanySelect } from '@hooks/company/useCompanySelect'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ConnectUserToCompanyDialog } from '../dialogs/connect-user/ConnectUserToCompanyDialog'
import { EditCompanyDialog } from '../dialogs/edit/EditCompanyDialog'
import { RemoveCompanyAlertDialog } from '../dialogs/remove/RemoveCompanyAlertDialog'

type CompanyListItemProps = CompanyType

export const CompanyListItem = ({
	id,
	name,
	description,
}: CompanyListItemProps) => {
	const { selectCompany } = useCompanySelect()

	return (
		<div className='bg-zinc-100 dark:bg-zinc-900/50 p-3 rounded-[.4rem] flex justify-between items-start'>
			<div>
				<h3>{name}</h3>
				<p>{description}</p>
			</div>
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' size='icon' className='hover:bg-zinc-200'>
							<BsThreeDotsVertical />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent side='right' align='start'>
						<DropdownMenuItem onClick={() => selectCompany(id)}>
							Select
						</DropdownMenuItem>

						<EditCompanyDialog
							name={name}
							description={description}
							companyId={0}
						/>

						<ConnectUserToCompanyDialog companyId={0} />

						<DropdownMenuSeparator />

						<RemoveCompanyAlertDialog id={0} />
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}

export const CompanyListItemSkeleton = () => {
	return <Skeleton className='w-full h-[5rem]' />
}
