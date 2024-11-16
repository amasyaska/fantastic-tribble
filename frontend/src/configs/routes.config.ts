class Routes {
	private homeScope = '/'
	private authScope = `${this.homeScope}auth/`
	private profileScope = `${this.homeScope}profile/`
	private workspaceScope = `${this.homeScope}workspace/`
	private companiesScope = `${this.homeScope}companies/`

	HOME = this.homeScope
	AUTH = {
		LOGIN: `${this.authScope}login/`,
		REGISTRATION: `${this.authScope}registration/`,
		FORGOT_PASSWORD: `${this.authScope}forgot-password/`,
	}
	PROFILE = {
		SETTINGS: `${this.profileScope}settings/`,
	}
	COMPANIES = {
		MANAGE: `${this.companiesScope}manage/`,
	}
	WORKSPACE = {
		HOME: `${this.workspaceScope}`,
		COMPANY_TASKS: (id: number) => `${this.workspaceScope}company/${id}`,
	}
	COMPONENTS = `${this.homeScope}components/`
}

export const ROUTES = new Routes()
