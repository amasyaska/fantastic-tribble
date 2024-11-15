import { Toaster } from '@components/ui/sonner/Sonner'
import type { PropsWithChildren } from 'react'
import { HomeFooter } from './footer/HomeFooter'
import { HomeHeader } from './header/HomeHeader'

const HomeLayout = ({ children }: PropsWithChildren<any>) => {
	return (
		<div className='flex flex-col h-full'>
			<HomeHeader />
			<main className='flex-1 h-full'>{children}</main>
			<Toaster position='top-right' />
			<HomeFooter />
		</div>
	)
}

export default HomeLayout
