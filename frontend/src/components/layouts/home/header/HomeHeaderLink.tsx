import { Button } from '@components/ui/button/Button'
import { Link } from 'react-router-dom'

type HomeHeaderLinkProps = {
	href: string
	children: any
}

export const HomeHeaderLink = ({ href, children }: HomeHeaderLinkProps) => {
	return (
		<Button variant='ghost' asChild withOneChild>
			<Link to={href}>{children}</Link>
		</Button>
	)
}
