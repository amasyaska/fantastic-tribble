import { ROUTES } from '@configs/routes.config'
import { ForgotPasswordPage } from '@pages/auth/forgot-password/ForgotPasswordPage'
import { LoginPage } from '@pages/auth/login/LoginPage'
import { RegistrationPage } from '@pages/auth/registration/RegistrationPage'
import { ComponentsPage } from '@pages/components/ComponentsPage'
import { HomePage } from '@pages/home/HomePage'
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom'

export const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route path={ROUTES.HOME} element={<HomePage />} />
				<Route path={ROUTES.COMPONENTS} element={<ComponentsPage />} />
				<Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
				<Route path={ROUTES.AUTH.REGISTRATION} element={<RegistrationPage />} />
				<Route
					path={ROUTES.AUTH.FORGOT_PASSWORD}
					element={<ForgotPasswordPage />}
				/>
				<Route path='*' element={<Navigate to={ROUTES.HOME} replace />} />
			</Routes>
		</Router>
	)
}
