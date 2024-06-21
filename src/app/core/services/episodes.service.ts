import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@core/models/api-response.model';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
	providedIn: 'root',
})
export class EpisodesService extends BaseService {
	constructor(_http: HttpClient) {
		super(_http, 'episode');
	}
}
