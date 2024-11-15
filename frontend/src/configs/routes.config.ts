class Routes {
	private homeScope = '/'
	private authScope = `${this.homeScope}auth/`

	HOME = this.homeScope
	AUTH = {
		LOGIN: `${this.authScope}login`,
		REGISTRATION: `${this.authScope}registration`,
	}
	COMPONENTS = `${this.homeScope}components`
}

export const ROUTES = new Routes()
