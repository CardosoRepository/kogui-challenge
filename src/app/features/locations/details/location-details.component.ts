import { CommonModule } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@core/models/location.model';
import { DateLocaleService } from '@core/services/date-locale.service';
import { LocationsService } from '@core/services/locations.service';

@Component({
	selector: 'app-location-details',
	standalone: true,
	imports: [CommonModule],
	providers: [
		{
			provide: LOCALE_ID,
			useFactory: provideLocaleId,
			deps: [DateLocaleService],
		},
	],
	templateUrl: './location-details.component.html',
	styleUrl: './location-details.component.scss',
})
export class LocationDetailsComponent implements OnInit {
	location: Location = {} as Location;
	id: number = -1;
	error: string | null = null;

	constructor(
		private _dateLocaleService: DateLocaleService,
		private _locationsService: LocationsService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this._activatedRoute.params.subscribe((params) => {
			this.id = params['id'];
			this._getLocationDetails(this.id);
		});
	}

	private _getLocationDetails(id: number) {
		this._locationsService.getItemById(id).subscribe({
			next: (data) => {
				this.location = data;
				this.error = null;
			},
			error: (error) => {
				this.error = error.message;
			},
		});
	}

	goToLocationList() {
		this._router.navigate(['/locations']);
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
