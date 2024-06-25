import { Routes } from '@angular/router';
import { CharactersComponent } from '@feature/characters/characters.component';
import { CharacterDetailsComponent } from '@feature/characters/details/character-details.component';
import { EpisodeDetailsComponent } from '@feature/episodes/details/episode-details.component';
import { EpisodesComponent } from '@feature/episodes/episodes.component';
import { LocationDetailsComponent } from '@feature/locations/details/location-details.component';
import { LocationsComponent } from '@feature/locations/locations.component';
import { NotFoundComponent } from '@feature/not-found/not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { ProfileComponent } from '@feature/profile/profile.component';
import { LayoutComponent } from '@feature/layout/layout.component';

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		canActivate: [authGuard],
		children: [
			{ path: 'characters/:id', component: CharacterDetailsComponent, canActivate: [authGuard] },
			{ path: 'locations/:id', component: LocationDetailsComponent, canActivate: [authGuard] },
			{ path: 'episodes/:id', component: EpisodeDetailsComponent, canActivate: [authGuard] },
			{ path: 'characters', component: CharactersComponent, canActivate: [authGuard] },
			{ path: 'locations', component: LocationsComponent, canActivate: [authGuard] },
			{ path: 'episodes', component: EpisodesComponent, canActivate: [authGuard] },
			{ path: 'profile', component: ProfileComponent},
			{ path: '', redirectTo: 'characters', pathMatch: 'full'},
		]
	},
	{ path: 'login', component: LoginComponent},
	{ path: '**', component: NotFoundComponent},
];
