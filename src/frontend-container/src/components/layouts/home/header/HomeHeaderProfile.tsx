import { Button } from '@components/ui/button/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@components/ui/dropdown-menu/DropdownMenu'
import { ROUTES } from '@configs/routes.config'
import { useProfile } from '@hooks/user/useProfile'
import { LuLogOut, LuSettings } from 'react-icons/lu'
import { PiAddressBookBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'

type HomeHeaderProfileProps = {}

export const HomeHeaderProfile = ({}: HomeHeaderProfileProps) => {
	const { profile } = useProfile()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>Profile</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='max-w-[12rem]'>
				<DropdownMenuLabel className='truncate'>
					@{profile?.username}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link to={ROUTES.PROFILE.SETTINGS}>
						<LuSettings />
						Settings
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link to={ROUTES.COMPANIES.MANAGE}>
						<PiAddressBookBold />
						Manage companies
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LuLogOut />
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
