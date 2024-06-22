import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { DateLocaleService } from '@core/services/date-locale.service';
import { LOCALE_ID } from '@angular/core';
import { LocationsService } from '@core/services/locations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@core/models/location.model';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { Subscription } from 'rxjs';
import { SearchBarService } from '@shared/services/search-bar/search-bar.service';

@Component({
	selector: 'app-locations',
	standalone: true,
	imports: [CommonModule, PaginationComponent],
	providers: [
		{
			provide: LOCALE_ID,
			useFactory: provideLocaleId,
			deps: [DateLocaleService],
		},
	],
	templateUrl: './locations.component.html',
	styleUrl: './locations.component.scss',
})
export class LocationsComponent implements OnDestroy {
	locations: Location[] = [];
	error: string | null = null;
	page: number = 1;
	totalPages: number = 0;
	searchTerm: string = '';
	isLoading: boolean = false;

	private _searchSubscription: Subscription;

	constructor(
		private _dateLocaleService: DateLocaleService,
		private _locationsService: LocationsService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _searchService: SearchBarService
	) {
		this._searchSubscription =
			this._searchService.currentSearchTerm.subscribe((term) => {
				this.searchTerm = term;
				this.page = 1;
				this._updateQueryParams({
					page: this.page,
					name: this.searchTerm,
				});
				this._getLocations(this.page, this.searchTerm);
			});
	}

	ngOnDestroy(): void {
		this._searchSubscription.unsubscribe();
	}

	private _getLocations(page: number, name: string) {
		this.isLoading = true;
		this._locationsService.getItems(page, name).subscribe({
			next: (data) => {
				if (data.results) {
					this.locations = data.results;
					this.page = page;
					this.totalPages = data.info.pages;
					this.error = null;
				} else {
					this.error = 'Falha ao buscar os personagens.';
				}
				this.isLoading = false;
			},
			error: (error) => {
				this.error = error.message;
				this.isLoading = false;
			},
		});
	}

	private _updateQueryParams(params: { page: number; name?: string }) {
		if (params.name === '') {
			delete params.name;
		}

		this._router.navigate([], {
			relativeTo: this._activatedRoute,
			queryParams: params,
			replaceUrl: true,
		});
	}

	goToPage(page: number) {
		this._updateQueryParams({ page, name: this.searchTerm });
		this._getLocations(page, this.searchTerm);
	}

	formatDate(date: string): string {
		return new Date(date).toLocaleDateString(
			this._dateLocaleService.getLocale()
		);
	}

	getLocationDetails(id: number) {
		this._router.navigate(['/locations', id]);
	}
}

export function provideLocaleId(DateLocaleService: DateLocaleService) {
	return DateLocaleService.getLocale();
}
