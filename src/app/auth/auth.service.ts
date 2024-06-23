import { Injectable } from '@angular/core';
import { User } from '@core/models/user.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private currentUser: User | null = null;

	constructor() {
		// Inicia o usuário caso já exista um logado
		const user = localStorage.getItem('currentUser');
		this.currentUser = user ? JSON.parse(user) : null;

		// Inicia a lista com um usuário padrão caso não exista nenhum registrado
		if (!localStorage.getItem('users')) {
			localStorage.setItem('users', JSON.stringify(initialState));
		}
	}

	private getUsers(): User[] {
		const users = localStorage.getItem('users');
		return users ? JSON.parse(users) : [];
	}

	private setUsers(users: User[]): void {
		localStorage.setItem('users', JSON.stringify(users));
	}

	login(loginUser: User): boolean {
		const users = this.getUsers();
		const user = users.find(
			(u) =>
				u.username === loginUser.username &&
				u.password === loginUser.password
		);

		if (user) {
			this.currentUser = user;
			localStorage.setItem('currentUser', JSON.stringify(user));
			return true;
		}

		return false;
	}

	register(newUser: User): boolean {
		const users = this.getUsers();
		if (users.some((u) => u.username === newUser.username)) {
			return false; // Username already exists
		}

		if (!newUser?.image) {
			newUser.image = 'https://github.com/mdo.png';
		}

		users.push(newUser);
		this.setUsers(users);

		return true;
	}

	updateUserImage(imageUrl: string): void {
		if (this.currentUser) {
			this.currentUser.image = imageUrl;

			const users = this.getUsers().map((user) =>
				user.username === this.currentUser!.username
					? this.currentUser
					: user
			);

			this.setUsers(users as User[]);
			localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
		}
	}

	isAuthenticated(): boolean {
		return this.currentUser !== null;
	}

	logout(): void {
		this.currentUser = null;
		localStorage.removeItem('currentUser');
	}

	get user() {
		return this.currentUser;
	}
}

const initialState: User[] = [
	{
		username: 'user',
		password: 'password',
		image: 'https://github.com/mdo.png',
	},
];
