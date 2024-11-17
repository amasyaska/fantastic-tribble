import { ROUTES } from '@configs/routes.config'
import { useAuth } from '@hooks/auth/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export const LoggedOnlyGuard = () => {
	const { isLogged } = useAuth()

	return isLogged ? <Outlet /> : <Navigate to={ROUTES.AUTH.LOGIN} />
}
