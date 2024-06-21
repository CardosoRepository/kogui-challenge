import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { DateLocaleService } from '@core/services/date-locale.service';
import { LOCALE_ID } from '@angular/core';
import { EpisodesService } from '@core/services/episodes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode } from '@core/models/episode.model';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { Subscription } from 'rxjs';
import { SearchBarService } from '@shared/services/search-bar/search-bar.service';

@Component({
	selector: 'app-episodes',
	standalone: true,
	imports: [CommonModule, PaginationComponent],
	providers: [
		{
			provide: LOCALE_ID,
			useFactory: provideLocaleId,
			deps: [DateLocaleService],
		},
	],
	templateUrl: './episodes.component.html',
	styleUrl: './episodes.component.scss',
})
export class EpisodesComponent implements OnDestroy {
	episodes: Episode[] = [];
	error: string | null = null;
	page: number = 1;
	totalPages: number = 0;
	searchTerm: string = '';

	private _searchSubscription: Subscription;

	constructor(
		private _dateLocaleService: DateLocaleService,
		private _episodesService: EpisodesService,
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
				this._getEpisodes(this.page, this.searchTerm);
			});
	}

	ngOnDestroy(): void {
		this._searchSubscription.unsubscribe();
	}

	private _getEpisodes(page: number, name: string) {
		this._episodesService.getItems(page, name).subscribe({
			next: (data) => {
				if (data.results) {
					this.episodes = data.results;
					this.page = page;
					this.totalPages = data.info.pages;
					this.error = null;
				} else {
					this.error = 'Falha ao buscar os personagens.';
				}
			},
			error: (error) => {
				this.error = error.message;
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
		this._getEpisodes(page, this.searchTerm);
	}

	formatDate(date: string): string {
		return new Date(date).toLocaleDateString(
			this._dateLocaleService.getLocale()
		);
	}

	getEpisodeDetails(id: number) {
		this._router.navigate(['/episodes', id]);
	}
}

export function provideLocaleId(DateLocaleService: DateLocaleService) {
	return DateLocaleService.getLocale();
}
