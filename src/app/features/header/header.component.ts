import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '@core/models/user.model';
import { AuthService } from 'app/auth/auth.service';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
	currentUser: User | null = null;

	constructor(private _authService: AuthService, private _router: Router) {}

	ngOnInit(): void {
		this.currentUser = this._authService.user;
	}

	logout() {
		this._authService.logout();
        this._router.navigate(['/login']);
	}

	goToProfile() {
		this._router.navigate(['/profile']);
	}
}
