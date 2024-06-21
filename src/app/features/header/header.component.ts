import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { filter } from 'rxjs';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, RouterModule, SearchBarComponent],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
	showSearchBar: boolean = false;

	constructor(private _router: Router) {}

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
}
