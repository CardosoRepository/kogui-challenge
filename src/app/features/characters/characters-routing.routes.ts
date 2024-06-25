import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersListComponent } from '@feature/characters/characters-list/characters-list.component';
import { CharacterDetailsComponent } from '@feature/characters/character-details/character-details.component';
import { authGuard } from 'app/auth/auth.guard';

const routes: Routes = [
	{ path: '', component: CharactersListComponent, canActivate: [authGuard] },
	{ path: ':id', component: CharacterDetailsComponent, canActivate: [authGuard] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CharactersRoutingModule {}
