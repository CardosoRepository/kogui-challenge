import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from '@feature/locations/locations.component';
import { LocationDetailsComponent } from './details/location-details.component';
import { authGuard } from 'app/auth/auth.guard';

const routes: Routes = [
	{ path: '', component: LocationsComponent, canActivate: [authGuard] },
	{ path: ':id', component: LocationDetailsComponent, canActivate: [authGuard] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LocationsRoutingModule {}
