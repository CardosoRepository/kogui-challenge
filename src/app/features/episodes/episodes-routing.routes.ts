import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'app/auth/auth.guard';
import { EpisodesComponent } from './episodes.component';
import { EpisodeDetailsComponent } from './details/episode-details.component';

const routes: Routes = [
	{ path: '', component: EpisodesComponent, canActivate: [authGuard] },
	{ path: ':id', component: EpisodeDetailsComponent, canActivate: [authGuard] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EpisodesRoutingModule {}
