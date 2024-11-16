import { Button } from '@components/ui/button/Button'
import { PiPlusBold } from 'react-icons/pi'

type AddProjectItemProps = {
	companyId: number
}

export const AddProjectItem = ({ companyId }: AddProjectItemProps) => {
	return (
		<Button variant='secondary'>
			<PiPlusBold />
			Create a project
		</Button>
	)
}
