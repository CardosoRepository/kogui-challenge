import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsListComponent } from '@feature/locations/locations-list/locations-list.component';
import { LocationDetailsComponent } from '@feature/locations/location-details/location-details.component';
import { authGuard } from 'app/auth/auth.guard';

const routes: Routes = [
	{ path: '', component: LocationsListComponent, canActivate: [authGuard] },
	{ path: ':id', component: LocationDetailsComponent, canActivate: [authGuard] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LocationsRoutingModule {}
