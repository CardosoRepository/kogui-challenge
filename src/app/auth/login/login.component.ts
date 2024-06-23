import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	loginForm: FormGroup;
	error: string | null = null;
	isRegistering: boolean = false;

	constructor(
		private _fb: FormBuilder,
		private _authService: AuthService,
		private _router: Router
	) {
		this.loginForm = this._fb.group({
			username: ['user', Validators.required],
			password: ['password', Validators.required],
		});
	}

	onSubmit() {
		if (this.isRegistering) {
			const registered = this._authService.register(this.loginForm.value);
			if (registered) {
				this.toggleMode();
			} else {
				this.error =
					'Nome de usuário já existe. Por favor, escolha outro.';
			}
		} else {
			if (this.loginForm.valid) {
				const loggedIn = this._authService.login(this.loginForm.value);

				if (loggedIn) {
					this._router.navigate(['/characters']);
				} else {
					this.error =
						'Credenciais inválidas. Por favor, tente novamente.';
				}
			}
		}
	}

	toggleMode() {
		this.loginForm.reset();
		this.isRegistering = !this.isRegistering;
		this.error = null;
	}
}
