import { HaveSelectedCompanyGuard } from '@components/guards/HaveSelectedCompanyGuard'
import { LoggedOnlyGuard } from '@components/guards/LoggedOnlyGuard'
import { UnloggedOnlyGuard } from '@components/guards/UnloggedOnlyGuard'
import { ROUTES } from '@configs/routes.config'
import { ForgotPasswordPage } from '@pages/auth/forgot-password/ForgotPasswordPage'
import { LoginPage } from '@pages/auth/login/LoginPage'
import { RegistrationPage } from '@pages/auth/registration/RegistrationPage'
import { CompaniesManagePage } from '@pages/companies/manage/CompaniesManagePage'
import { ComponentsPage } from '@pages/components/ComponentsPage'
import { HomePage } from '@pages/home/HomePage'
import { CompanyProjectsPage } from '@pages/projects/CompanyProjectsPage'
import { TasksPage } from '@pages/tasks/TasksPage'
import { SettingsPage } from '@pages/user/settings/SettingsPage'
import { Navigate, Route, Routes } from 'react-router-dom'

export const AppRouter = () => {
	return (
		<Routes>
			<Route path={ROUTES.HOME} element={<HomePage />} />

			<Route path={ROUTES.COMPONENTS} element={<ComponentsPage />} />

			<Route element={<UnloggedOnlyGuard />}>
				<Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
				<Route path={ROUTES.AUTH.REGISTRATION} element={<RegistrationPage />} />
				<Route
					path={ROUTES.AUTH.FORGOT_PASSWORD}
					element={<ForgotPasswordPage />}
				/>
			</Route>

			<Route element={<LoggedOnlyGuard />}>
				<Route path={ROUTES.PROFILE.SETTINGS} element={<SettingsPage />} />

				<Route
					path={ROUTES.COMPANIES.MANAGE}
					element={<CompaniesManagePage />}
				/>

				<Route element={<HaveSelectedCompanyGuard />}>
					<Route
						path={ROUTES.PROJECTS.HOME}
						element={<CompanyProjectsPage />}
					/>

					<Route
						path={ROUTES.TASKS.OF_PROJECT(':projectId')}
						element={<TasksPage />}
					/>
				</Route>
			</Route>

			<Route path='*' element={<Navigate to={ROUTES.HOME} replace />} />
		</Routes>
	)
}
