import HomeLayout from '@components/layouts/home/HomeLayout'
import { AppRouter } from 'AppRouter'
import './App.css'

function App() {
	return (
		<>
			<HomeLayout>
				<AppRouter />
			</HomeLayout>
		</>
	)
}

export default App
