import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

@Injectable({
	providedIn: 'root',
})
export class DateLocaleService {
	constructor() {
		registerLocaleData(localePt);
	}

	getLocale(): string {
		return 'pt-br';
	}
}
