import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from '@feature/characters/characters.component';
import { CharacterDetailsComponent } from '@feature/characters/details/character-details.component';
import { authGuard } from 'app/auth/auth.guard';

const routes: Routes = [
	{ path: '', component: CharactersComponent, canActivate: [authGuard] },
	{ path: ':id', component: CharacterDetailsComponent, canActivate: [authGuard] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CharactersRoutingModule {}
