import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserProfile } from '@core/models/user.model';
import { AuthService } from 'app/auth/auth.service';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
	user: UserProfile | null = null;
	newImageUrl: string = '';

	constructor(private _authService: AuthService) {}

    ngOnInit(): void {
        this.user = this._authService.user;
		this.newImageUrl = this.user?.image || '';
    }

	updateImage(): void {
		if (this.newImageUrl.trim()) {
			this._authService.updateUserImage(this.newImageUrl);
			this.user = this._authService.user;
		}
	}
}
