import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '@core/models/user.model';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
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
