import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '@core/models/api-response.model';
import { Observable, catchError, throwError } from 'rxjs';

export class BaseService {
	private _API_URL = 'https://rickandmortyapi.com/api';

	constructor(protected _http: HttpClient, private _endpoint: string) {}

	// TODO: remove 'any' from the Observable generic
	getItems(page: number = 1, name: string = ''): Observable<ApiResponse | any> {
		let params = new HttpParams().set('page', page.toString());
		if (name) {
			params = params.set('name', name);
		}

		return this._http
			.get(`${this._API_URL}/${this._endpoint}/`, { params })
			.pipe(catchError((error) => this._handleError(error)));
	}

	getItemById(id: number): Observable<any> {
		return this._http
			.get(`${this._API_URL}/${this._endpoint}/${id}`)
			.pipe(catchError((error) => this._handleError(error)));
	}

	protected _handleError(error: any) {
		console.error(error);
		return throwError(
			() =>
				new Error(
					'Algo deu errado; por favor, tente novamente mais tarde.'
				)
		);
	}
}
