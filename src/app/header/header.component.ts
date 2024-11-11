import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/share.service';

@Component({
  selector: 'offlineWeb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  logoUrl: string = 'assets/img/mab_logo.png';
  username: string = '';
  firstCharacter: string = '';

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.currentUsername.subscribe((username: string) => {
      this.username = username;

      if (this.username && this.username.length > 0) {
        this.firstCharacter = this.username.charAt(0).toUpperCase();
      }
    });
  }
}
