import { Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
	{ path: 'characters', component: CharactersComponent },
	{ path: '', redirectTo: 'characters', pathMatch: 'full'},
	{ path: '**', component: NotFoundComponent},
];
