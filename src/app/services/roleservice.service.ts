import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RoleserviceService {
  private roleSubject = new BehaviorSubject<string>('');
  currentRole = this.roleSubject.asObservable();

  setRole(role: string) {
    this.roleSubject.next(role);
  }

  getRole(): string {
    return this.roleSubject.getValue();
  }
}
