import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '@core/models/api-response.model';
import { Character } from '@core/models/character.model';
import { Episode } from '@core/models/episode.model';
import { Location } from '@core/models/location.model';
import { Observable, catchError, throwError } from 'rxjs';

export class BaseService {
	private _API_URL = 'https://rickandmortyapi.com/api';

	constructor(protected _http: HttpClient, private _endpoint: string) {}

	getItems(page: number = 1, name: string = ''): Observable<ApiResponse> {
		let params = new HttpParams().set('page', page.toString());
		if (name) {
			params = params.set('name', name);
		}

		return this._http
			.get<ApiResponse>(`${this._API_URL}/${this._endpoint}/`, { params })
			.pipe(catchError((error) => this._handleError(error)));
	}

	getItemById(id: number): Observable<Character | Episode | Location> {
		return this._http
			.get<Character | Episode | Location>(
				`${this._API_URL}/${this._endpoint}/${id}`
			)
			.pipe(catchError((error) => this._handleError(error)));
	}

	protected _handleError(error: any) {
		if (error.status === 404) {
			return throwError(() => new Error('Nenhum item encontrado.'));
		}

		return throwError(
			() =>
				new Error(
					'Algo deu errado; por favor, tente novamente mais tarde.'
				)
		);
	}
}
