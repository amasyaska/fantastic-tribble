import HomeLayout from '@components/layouts/home/HomeLayout'
import { store } from '@store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRouter } from 'AppRouter'
import { useState } from 'react'
import { Provider } from 'react-redux'
import './App.css'

function App() {
	const [client] = useState(new QueryClient())

	return (
		<>
			<QueryClientProvider client={client}>
				<Provider store={store}>
					<HomeLayout>
						<AppRouter />
					</HomeLayout>
				</Provider>
			</QueryClientProvider>
		</>
	)
}

export default App
