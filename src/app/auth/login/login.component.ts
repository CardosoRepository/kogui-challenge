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

	constructor(
		private _fb: FormBuilder,
		private _authService: AuthService,
		private _router: Router
	) {
		this.loginForm = this._fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	onSubmit() {
		if (this.loginForm.valid) {
			const { username, password } = this.loginForm.value;

			if (this._authService.login(username, password)) {
				this._router.navigate(['/characters']);
			} else {
				this.error = 'Usuário ou senha inválidos';
			}
		}
	}
}
