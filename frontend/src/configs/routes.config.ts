class Routes {
	private homeScope = '/'
	private authScope = `${this.homeScope}auth/`
	private profileScope = `${this.homeScope}profile/`

	HOME = this.homeScope
	AUTH = {
		LOGIN: `${this.authScope}login/`,
		REGISTRATION: `${this.authScope}registration/`,
		FORGOT_PASSWORD: `${this.authScope}forgot-password/`,
	}
	PROFILE = {
		SETTINGS: `${this.profileScope}settings/`,
	}
	COMPONENTS = `${this.homeScope}components/`
}

export const ROUTES = new Routes()
