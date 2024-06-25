import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '@feature/sidebar/sidebar.component';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { AuthService } from 'app/auth/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, SearchBarComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
	showSearchBar: boolean = false;

	constructor(private _router: Router, private _authService: AuthService) {}

	ngOnInit(): void {
		this.showSearchBar = this._isListRoute(this._router.url);

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
