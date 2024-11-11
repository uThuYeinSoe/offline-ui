import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

interface TransitionRec {
  transactionType: string;
  branchCode: string;
  trnCode: string;
  amount: number;
  crAccountNumber: string;
  drAccountNumber: string;
  chequeNumber: string;
  instrumentType: string;
  rmNumber: string;
  poNumber: string;
  crGLNumber: string;
  gcNumber: string;
  saveUser: string;
  saveDateTime: string;
  updateUser: string;
  updateDateTime: string;
  status: string;
}

@Component({
  selector: 'offlineWeb-cou-histories',
  templateUrl: './cou-histories.component.html',
  styleUrls: ['./cou-histories.component.scss'],
})
export class CouHistoriesComponent {
  transitionRecArr: TransitionRec[] = [];
  token: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.authService.getToken();

    if (this.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      });

      // First HTTP GET request
      this.http
        .get('/api/v1/transactions?saveStatus=false', { headers })
        .subscribe(
          (response: any) => {
            console.log('First API response:', response);

            // Proceed to the second HTTP GET request
            this.fetchTransactionRecords(headers);
          },
          (error) => {
            console.error('Error in the first API call:', error);
          }
        );
    }
  }

  private fetchTransactionRecords(headers: HttpHeaders) {
    this.http
      .get('/api/v1/transactions?saveStatus=false', { headers })
      .subscribe(
        (response: any) => {
          this.transitionRecArr = response.map((type: any) => ({
            transactionType: type.transactionType,
            branchCode: type.branchCode,
            trnCode: type.trnCode,
            amount: type.amount,
            crAccountNumber: type.crAccountNumber,
            drAccountNumber: type.drAccountNumber,
            chequeNumber: type.chequeNumber,
            instrumentType: type.instrumentType,
            rmNumber: type.rmNumber,
            poNumber: type.poNumber,
            crGLNumber: type.crGLNumber,
            gcNumber: type.gcNumber,
            saveDateTime: type.saveDateTime,
            updateUser: type.updateUser,
            updateDateTime: type.updateDateTime,
            saveUser: type.saveUserName,
            status: type.status,
          }));
          console.log('Second API response:', this.transitionRecArr);
        },
        (error) => {
          console.error('Error in the second API call:', error);
        }
      );
  }
}
