import { Routes } from '@angular/router';
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
			{
				path: 'characters',
				loadChildren: () => import('@feature/characters/characters-routing.routes').then(m => m.CharactersRoutingModule)
			},
			{
				path: 'locations',
				loadChildren: () => import('@feature/locations/locations-routing.routes').then(m => m.LocationsRoutingModule)
			},
			{
				path: 'episodes',
				loadChildren: () => import('@feature/episodes/episodes-routing.routes').then(m => m.EpisodesRoutingModule)
			},
			{ path: 'profile', component: ProfileComponent},
			{ path: '', redirectTo: 'characters', pathMatch: 'full'},
		]
	},
	{ path: 'login', component: LoginComponent},
	{ path: '**', component: NotFoundComponent},
];
