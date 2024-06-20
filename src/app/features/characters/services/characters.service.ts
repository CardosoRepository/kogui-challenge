import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@core/models/api-response.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CharactersService {
	private API_URL = 'https://rickandmortyapi.com/api';

	constructor(private _http: HttpClient) {}

	getCharacters(page: number = 1, name: string = ''): Observable<ApiResponse | any> {
		let params = new HttpParams().set('page', page.toString());
		if (name) {
            params = params.set('name', name);
        }

		return this._http
			.get(`${this.API_URL}/character/`, { params })
			.pipe(catchError((error) => this._handleError(error)));
	}

	getCharacter(name: number): Observable<any> {
		return this._http
			.get(`${this.API_URL}/character/?name=${name}`)
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
