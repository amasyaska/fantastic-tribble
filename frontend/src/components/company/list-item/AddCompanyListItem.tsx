import { Button } from '@components/ui/button/Button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@components/ui/dialog/Dialog'
import { useState } from 'react'
import { PiPlusBold } from 'react-icons/pi'
import { CreateCompanyForm } from '../dialogs/create/CreateCompanyForm'

type AddCompanyListItemProps = {}

export const AddCompanyListItem = ({}: AddCompanyListItemProps) => {
	const [isDialogOpened, setIsDialogOpened] = useState(false)

	return (
		<Dialog
			open={isDialogOpened}
			onOpenChange={(open) => setIsDialogOpened(open)}
		>
			<DialogTrigger asChild>
				<Button variant='outline'>
					<PiPlusBold />
					Add new company
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create new company</DialogTitle>
				</DialogHeader>

				<CreateCompanyForm onCreated={() => setIsDialogOpened(false)} />
			</DialogContent>
		</Dialog>
	)
}
