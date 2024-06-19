import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DateLocaleService } from '@core/services/date-locale.service';
import { LOCALE_ID } from '@angular/core';

@Component({
	selector: 'app-characters',
	standalone: true,
	imports: [CommonModule],
	providers: [
		{provide: LOCALE_ID, useFactory: provideLocaleId, deps: [DateLocaleService]},
	],
	templateUrl: './characters.component.html',
	styleUrl: './characters.component.scss',
})
export class CharactersComponent {
	characters = [
		{
			id: 1,
			name: 'Rick',
			species: 'Human',
			creation: '2018-09-10T18:20:41.703Z',
			status: 'Alive',
		},
	];

	constructor(private _dateLocaleService: DateLocaleService) {}

	formatDate(date: string): string {
		return new Date(date).toLocaleDateString(this._dateLocaleService.getLocale());
	}
}

export function provideLocaleId(DateLocaleService: DateLocaleService) {
	return DateLocaleService.getLocale();
}
