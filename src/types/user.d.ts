export interface User extends CreateUserPayload {
	id: string;
	profileImageURL?: string;
}

export interface CreateUserPayload {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export type GetUserTokenPayload = Pick<CreateUserPayload, "email" | "password">;
