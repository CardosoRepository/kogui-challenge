import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
	providedIn: 'root',
})
export class LocationsService extends BaseService {
	constructor(_http: HttpClient) {
		super(_http, 'location');
	}
}
