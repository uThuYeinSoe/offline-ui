import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiServiceService } from './api-service.service';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  // constructor(private) {}
  // login(credentials: any): Observable<LoginResponse> {
  //   return this.httpClient.post<LoginResponse>(this.apiUrl, credentials);
  // }
}
