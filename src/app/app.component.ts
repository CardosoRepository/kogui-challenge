import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@feature/header/header.component';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { filter } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './auth/login/login.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, HeaderComponent, SearchBarComponent, LoginComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	showSearchBar: boolean = false;
	title = 'rick-and-morty-kogui-challenge';

	constructor(private _router: Router, private _authService: AuthService) {}

	ngOnInit(): void {
		this._router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe((event: any) => {
				this.showSearchBar = this._isListRoute(event.urlAfterRedirects);
			});
	}

	private _isListRoute(url: string): boolean {
		const baseURL = url.split('?')[0];
		return ['/characters', '/locations', '/episodes'].some((route) => baseURL === route);
	}

	isAuthenticated(): boolean {
		return this._authService.isAuthenticated();
	}
}
