import { Component, HostListener } from '@angular/core';
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
  saveDateTime: string;
}

@Component({
  selector: 'offlineWeb-branch-manager-record-table',
  templateUrl: './branch-manager-record-table.component.html',
  styleUrls: ['./branch-manager-record-table.component.scss'],
})
export class BranchManagerRecordTableComponent {
  errorMessage: string | null = null;
  transitionRecArr: TransitionRec[] = [];
  token: string | null = null;
  currentPage: number = 0;
  pageSize: number = 20;
  isLoading: boolean = false;
  isLastPage: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.authService.getToken();
    if (this.token) {
      this.loadTransactions();
    } else {
      this.errorMessage = 'Token not found';
    }
  }

  loadTransactions() {
    if (this.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      });

      this.isLoading = true; // Set loading state to true

      // Make an HTTP call to fetch transactions with pagination
      this.http.get(`/api/v1/transactions`, { headers }).subscribe(
        (response: any) => {
          console.log(response);
          // Check if it's the last page
          if (response.length < this.pageSize) {
            this.isLastPage = true;
          }

          // Append new data to the existing array
          this.transitionRecArr = [
            ...this.transitionRecArr,
            ...response.map((type: any) => ({
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
            })),
          ];

          this.isLoading = false;
          this.currentPage++;
        },
        (error) => {
          this.errorMessage = 'Failed to fetch transaction types';
          this.isLoading = false;
        }
      );
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !this.isLoading &&
      !this.isLastPage
    ) {
      this.loadTransactions();
    }
  }
}
