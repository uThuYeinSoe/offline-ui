import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgencyTransitionService {
  private transitionCreateURL = '/api/v1/transactions';

  constructor(private http: HttpClient) {}

  createTransition(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.transitionCreateURL, { headers });
  }
}
