import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@core/models/api-response.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CharactersService {
	private API_URL = 'https://rickandmortyapi.com/api';

	constructor(private _http: HttpClient) {}

	getCharacters(page: number = 1): Observable<ApiResponse | any> {
		return this._http
			.get(`${this.API_URL}/character/?page=${page}`)
			.pipe(catchError((error) => this._handleError(error)));
	}

	getCharacter(id: number): Observable<any> {
		return this._http
			.get(`${this.API_URL}/character/${id}`)
			.pipe(catchError((error) => this._handleError(error)));
	}

	private _handleError(error: any) {
		console.error(error);
		return throwError(
			() =>
				new Error(
					'Algo deu errado; por favor, tente novamente mais tarde.'
				)
		);
	}
}
