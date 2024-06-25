import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'app/auth/auth.guard';
import { EpisodeDetailsComponent } from '@feature/episodes/episode-details/episode-details.component';
import { EpisodesListComponent } from '@feature/episodes/episodes-list/episodes-list.component';

const routes: Routes = [
	{ path: '', component: EpisodesListComponent, canActivate: [authGuard] },
	{ path: ':id', component: EpisodeDetailsComponent, canActivate: [authGuard] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EpisodesRoutingModule {}
