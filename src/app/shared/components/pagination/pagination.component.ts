import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-pagination',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
	@Input() page: number = 1;
	@Input() totalPages: number = 1;
	@Output() pageChange = new EventEmitter<number>();

	get pages(): (number | string)[] {
		const pages: (number | string)[] = [];
		const startPage = Math.max(2, this.page - 2);
		const endPage = Math.min(this.totalPages - 1, this.page + 2);

		pages.push(1); // Always include the first page

		if (startPage > 2) {
			pages.push('...'); // Indicate gap before the current page range
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		if (endPage < this.totalPages - 1) {
			pages.push('...'); // Indicate gap after the current page range
		}

		if (this.totalPages > 1) {
			pages.push(this.totalPages); // Always include the last page
		}

		return pages;
	}

	onPageChange(page: number): void {
		if (page !== this.page && page >= 1 && page <= this.totalPages) {
			this.pageChange.emit(page);
		}
	}

	nextPage(): void {
		if (this.page < this.totalPages) {
			this.pageChange.emit(this.page + 1);
		}
	}

	previousPage(): void {
		if (this.page > 1) {
			this.pageChange.emit(this.page - 1);
		}
	}
}
