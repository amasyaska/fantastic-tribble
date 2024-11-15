import type { PropsWithChildren } from 'react'
import { HomeFooter } from './footer/HomeFooter'
import { HomeHeader } from './header/HomeHeader'

const HomeLayout = ({ children }: PropsWithChildren<any>) => {
	return (
		<>
			<HomeHeader />
			<main>{children}</main>
			<HomeFooter />
		</>
	)
}

export default HomeLayout
