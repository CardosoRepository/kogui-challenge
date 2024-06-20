import { Routes } from '@angular/router';
import { CharactersComponent } from '@feature/characters/characters.component';
import { CharacterDetailsComponent } from '@feature/characters/details/characterdetails/character-details.component';
import { NotFoundComponent } from '@feature/not-found/not-found.component';

export const routes: Routes = [
	{ path: 'characters/:id', component: CharacterDetailsComponent },
	{ path: 'characters', component: CharactersComponent },
	{ path: '', redirectTo: 'characters', pathMatch: 'full'},
	{ path: '**', component: NotFoundComponent},
];
