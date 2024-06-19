import { Routes } from '@angular/router';
import { CharactersComponent } from '@feature/characters/characters.component';
import { NotFoundComponent } from '@feature/not-found/not-found.component';

export const routes: Routes = [
	{ path: 'characters', component: CharactersComponent },
	{ path: '', redirectTo: 'characters', pathMatch: 'full'},
	{ path: '**', component: NotFoundComponent},
];
