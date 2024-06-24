import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
	providedIn: 'root',
})
export class CharactersService extends BaseService {
	constructor(_http: HttpClient) {
		super(_http, 'character');
	}

	badgeClass(status: string) {
		switch (status) {
			case 'Alive':
				return 'bg-success';
			case 'Dead':
				return 'bg-danger';
			case 'unknown':
				return 'bg-warning';
			default:
				return 'bg-warning';
		}
	}

	translateStatus(status: string) {
		switch (status) {
			case 'Alive':
				return 'Vivo';
			case 'Dead':
				return 'Morto';
			case 'unknown':
				return 'Desconhecido';
			default:
				return status;
		}
	}
}
