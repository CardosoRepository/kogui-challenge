import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private authenticated = false;

	constructor() {
		const savedAuthState = localStorage.getItem('isAuthenticated');
		this.authenticated = savedAuthState === 'true';
	}

	login(username: string, password: string) {
		if (username === 'user' && password === 'password') {
			this.authenticated = true;
			localStorage.setItem('isAuthenticated', 'true');
			return true;
		}
		return false;
	}

	isAuthenticated() {
		return this.authenticated;
	}

	logout(): void {
		this.authenticated = false;
		localStorage.removeItem('isAuthenticated');
	}
}
