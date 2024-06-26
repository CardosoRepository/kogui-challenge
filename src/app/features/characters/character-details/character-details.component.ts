import { CommonModule } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '@core/models/character.model';
import { DateLocaleService } from '@core/services/date-locale.service';
import { CharactersService } from '@core/services/characters.service';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';

@Component({
	selector: 'app-character-details',
	standalone: true,
	imports: [CommonModule, LoadingSpinnerComponent],
	providers: [
		{
			provide: LOCALE_ID,
			useFactory: provideLocaleId,
			deps: [DateLocaleService],
		},
	],
	templateUrl: './character-details.component.html',
	styleUrl: './character-details.component.scss',
})
export class CharacterDetailsComponent implements OnInit {
	character: Character = {} as Character;
	id: number = -1;
	error: string | null = null;
	isLoading: boolean = false;

	constructor(
		private _dateLocaleService: DateLocaleService,
		private _charactersService: CharactersService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this._activatedRoute.params.subscribe((params) => {
			this.id = params['id'];
			this._getCharacterDetails(this.id);
		});
	}

	private _getCharacterDetails(id: number) {
		this.isLoading = true;
		this._charactersService.getItemById(id).subscribe({
			next: (data) => {
				this.character = data as Character;
				this.error = null;
				this.isLoading = false;
			},
			error: (error) => {
				this.error = error.message;
				this.isLoading = false;
			},
		});
	}

	goToCharacterList() {
		this._router.navigate(['/characters']);
	}

	formatDate(date: string): string {
		return new Date(date).toLocaleDateString(
			this._dateLocaleService.getLocale()
		);
	}

	getBadgeClass(status: string) {
		return this._charactersService.badgeClass(status);
	}

	getTranslateStatus(status: string) {
		return this._charactersService.translateStatus(status);
	}
}

export function provideLocaleId(DateLocaleService: DateLocaleService) {
	return DateLocaleService.getLocale();
}
