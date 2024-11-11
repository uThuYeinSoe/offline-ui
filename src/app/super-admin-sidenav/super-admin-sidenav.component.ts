import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'offlineWeb-super-admin-sidenav',
  templateUrl: './super-admin-sidenav.component.html',
  styleUrls: ['./super-admin-sidenav.component.scss'],
})
export class SuperAdminSidenavComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
