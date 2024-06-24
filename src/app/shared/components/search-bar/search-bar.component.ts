import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchBarService } from '@shared/services/search-bar/search-bar.service';

@Component({
	selector: 'app-search-bar',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
	searchTerm: string = '';

	constructor(private _searchService: SearchBarService) {
		this._searchService.currentSearchTerm.subscribe((term) => {
			this.searchTerm = term;
		});
	}

	onSearch(term: EventTarget | null) {
		const searchTerm = term as HTMLInputElement;

		if (!!searchTerm.value.trim()) {
			this._searchService.updateSearchTerm(searchTerm.value);
		}
	}

	clearButton() {
		this.searchTerm = '';
		this._searchService.updateSearchTerm(this.searchTerm);
	}
}
