import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private usernameSource = new BehaviorSubject<string>('');
  private roleSubject = new BehaviorSubject<string>('');
  currentUsername = this.usernameSource.asObservable();
  currentRole = this.roleSubject.asObservable();

  updateUsername(username: string) {
    this.usernameSource.next(username);
  }
  updateRole(role: string) {
    this.roleSubject.next(role);
  }
}
