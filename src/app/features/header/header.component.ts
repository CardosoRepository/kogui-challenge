import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {

	constructor(private _authService: AuthService, private _router: Router) {}

	logout() {
		this._authService.logout();
        this._router.navigate(['/login']);
	}
}
