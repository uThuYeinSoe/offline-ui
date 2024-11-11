import { Component } from '@angular/core';
import { SharedService } from '../services/share.service';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'offlineWeb-user-sidenav',
  templateUrl: './user-sidenav.component.html',
  styleUrls: ['./user-sidenav.component.scss'],
})
export class UserSidenavComponent {
  userRole: string = '';

  constructor(
    private sharedService: SharedService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.sharedService.currentUsername.subscribe((role: string) => {
      this.userRole = role;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
