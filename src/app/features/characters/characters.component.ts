import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateLocaleService } from '@core/services/date-locale.service';
import { LOCALE_ID } from '@angular/core';
import { CharactersService } from './services/characters.service';
import { Router } from '@angular/router';
import { Character } from '@core/models/character.model';
import { PaginationComponent } from 'app/shared/pagination.component';

@Component({
	selector: 'app-characters',
	standalone: true,
	imports: [CommonModule, PaginationComponent],
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
	characters: Character[] = [];
	error: string | null = null;
	page: number = 1;
	totalPages: number = 0;

	constructor(
		private _dateLocaleService: DateLocaleService,
		private _charactersService: CharactersService,
		private _router: Router
	) {}

	ngOnInit(): void {
		this._getCharacters(this.page);
	}

	private _getCharacters(page: number) {
		this._charactersService.getCharacters(page).subscribe({
			next: (data) => {
				if (data.results) {
					this.characters = data.results;
					this.page = page;
					this.totalPages = data.info.pages;
					this.error = null;
				} else {
					this.error = 'Falha ao buscar os personagens.';
				}
            },
            error: (error) => {
                this.error = error.message;
            }
		})
	}

	goToPage(page: number) {
		this._getCharacters(page);
	}

	formatDate(date: string): string {
		return new Date(date).toLocaleDateString(
			this._dateLocaleService.getLocale()
		);
	}

	getCharacterDetails(id: number) {
		this._router.navigate(['/characters', id]);
	}
}

export function provideLocaleId(DateLocaleService: DateLocaleService) {
	return DateLocaleService.getLocale();
}
