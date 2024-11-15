export type AuthCredentialsType = {
	email: string
	password: string
}

export type AuthRegistrationFormFields = Partial<AuthCredentialsType>
export type AuthLoginFormFields = Partial<AuthCredentialsType>
