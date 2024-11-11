import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'offlineWeb-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss'],
})
export class AdminSidenavComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
