import { Toaster } from '@components/ui/sonner/Sonner'
import type { PropsWithChildren } from 'react'
import { HomeFooter } from './footer/HomeFooter'
import { HomeHeader } from './header/HomeHeader'

const HomeLayout = ({ children }: PropsWithChildren<any>) => {
	return (
		<div className='flex flex-col min-h-full h-full'>
			<HomeHeader />
			<main className='flex-1 min-h-full h-full'>{children}</main>
			<Toaster position='top-right' />
			<HomeFooter />
		</div>
	)
}

export default HomeLayout
