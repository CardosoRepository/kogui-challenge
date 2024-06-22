import { Routes } from '@angular/router';
import { CharactersComponent } from '@feature/characters/characters.component';
import { CharacterDetailsComponent } from '@feature/characters/details/character-details.component';
import { EpisodeDetailsComponent } from '@feature/episodes/details/episode-details.component';
import { EpisodesComponent } from '@feature/episodes/episodes.component';
import { LocationDetailsComponent } from '@feature/locations/details/location-details.component';
import { LocationsComponent } from '@feature/locations/locations.component';
import { NotFoundComponent } from '@feature/not-found/not-found.component';

export const routes: Routes = [
	{ path: 'characters/:id', component: CharacterDetailsComponent },
	{ path: 'characters', component: CharactersComponent },
	{ path: 'locations/:id', component: LocationDetailsComponent },
	{ path: 'locations', component: LocationsComponent },
	{ path: 'episodes/:id', component: EpisodeDetailsComponent },
	{ path: 'episodes', component: EpisodesComponent },
	{ path: '', redirectTo: 'characters', pathMatch: 'full'},
	{ path: '**', component: NotFoundComponent},
];
