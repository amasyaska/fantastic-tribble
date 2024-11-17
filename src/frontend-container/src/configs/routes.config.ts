class Routes {
	private homeScope = '/'
	private authScope = `${this.homeScope}auth/`
	private profileScope = `${this.homeScope}profile/`
	private workspaceScope = `${this.homeScope}workspace/`
	private companiesScope = `${this.homeScope}companies/`
	private projectsScope = `${this.homeScope}projects/`
	private tasksScope = (projectId: number | string) =>
		`${this.projectsScope}${projectId}/tasks/`

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
	PROJECTS = {
		HOME: `${this.projectsScope}`,
	}
	TASKS = {
		OF_PROJECT: (projectId: number | string) => `${this.tasksScope(projectId)}`,
	}
	COMPONENTS = `${this.homeScope}components/`
}

export const ROUTES = new Routes()
