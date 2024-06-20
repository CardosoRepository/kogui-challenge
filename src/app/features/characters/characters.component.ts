import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateLocaleService } from '@core/services/date-locale.service';
import { LOCALE_ID } from '@angular/core';
import { CharactersService } from './services/characters.service';

@Component({
	selector: 'app-characters',
	standalone: true,
	imports: [CommonModule],
	providers: [
		{
			provide: LOCALE_ID,
			useFactory: provideLocaleId,
			deps: [DateLocaleService],
		},
	],
	templateUrl: './characters.component.html',
	styleUrl: './characters.component.scss',
})
export class CharactersComponent implements OnInit{
	characters: any[] = [];
	error: string | null = null;

	constructor(
		private _dateLocaleService: DateLocaleService,
		private _charactersService: CharactersService
	) {}

	ngOnInit(): void {
		this._charactersService.getCharacters().subscribe(
			data => {
				this.characters = data.results;
			},
			error => {
				this.error = error.message;
			}
		)
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
