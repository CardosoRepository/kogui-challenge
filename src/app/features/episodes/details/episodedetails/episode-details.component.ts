import { CommonModule } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode } from '@core/models/episode.model';
import { DateLocaleService } from '@core/services/date-locale.service';
import { EpisodesService } from '@core/services/episodes.service';

@Component({
	selector: 'app-episode-details',
	standalone: true,
	imports: [CommonModule],
	providers: [
		{
			provide: LOCALE_ID,
			useFactory: provideLocaleId,
			deps: [DateLocaleService],
		},
	],
	templateUrl: './episode-details.component.html',
	styleUrl: './episode-details.component.scss',
})
export class EpisodeDetailsComponent implements OnInit {
	episode: Episode = {} as Episode;
	id: number = -1;
	error: string | null = null;

	constructor(
		private _dateLocaleService: DateLocaleService,
		private _episodesService: EpisodesService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this._activatedRoute.params.subscribe((params) => {
			this.id = params['id'];
			this._getEpisodeDetails(this.id);
		});
	}

	private _getEpisodeDetails(id: number) {
		this._episodesService.getItemById(id).subscribe({
			next: (data) => {
				this.episode = data;
				this.error = null;
			},
			error: (error) => {
				this.error = error.message;
			},
		});
	}

	goToEpisodeList() {
		this._router.navigate(['/episodes']);
	}

	formatDate(date: string): string {
		return new Date(date).toLocaleDateString(
			this._dateLocaleService.getLocale()
		);
	}
}

export function provideLocaleId(DateLocaleService: DateLocaleService) {
	return DateLocaleService.getLocale();
}
