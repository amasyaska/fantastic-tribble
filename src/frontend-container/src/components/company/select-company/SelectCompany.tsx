import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@components/ui/select/Select'
import { useCompany } from '@hooks/company/useCompany'
import { useCompanySelect } from '@hooks/company/useCompanySelect'

type SelectCompanyProps = {}

export const SelectCompany = ({}: SelectCompanyProps) => {
	const { selectCompany, selectedCompanyId: selectedCompany } =
		useCompanySelect()
	const { companies } = useCompany()

	return (
		<Select
			onValueChange={(value) => selectCompany(Number(value))}
			value={selectedCompany?.toString() ?? ''}
		>
			<SelectTrigger className='w-auto flex gap-2'>
				<SelectValue placeholder='No company found' />
			</SelectTrigger>
			<SelectContent>
				{companies?.length == 0 && (
					<div className='p-2 text-zinc-500 text-[.9rem]'>No company found</div>
				)}
				{companies?.map((item, index) => (
					<SelectItem value={index.toString()} key={index}>
						{item.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
