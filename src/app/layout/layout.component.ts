import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../auth-service.service';
import { SharedService } from '../services/share.service';

@Component({
  selector: 'offlineWeb-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  profileData: any;
  role: string = '';

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private shareService: SharedService
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken(); // Get the token

    if (token) {
      this.profileService.getProfile(token).subscribe(
        (data) => {
          this.profileData = data;
          this.role = this.profileData.role;
          this.shareService.updateRole(this.role);
          this.shareService.updateUsername(this.profileData.username);
          console.log('Profile data:', this.profileData);
          if (this.profileData && this.profileData.username) {
            this.shareService.updateUsername(this.profileData.username);
          }
        },
        (error) => {
          console.error('Error fetching profile:', error);
        }
      );
    } else {
      console.error('No token found, redirect to login!');
    }
  }
}
