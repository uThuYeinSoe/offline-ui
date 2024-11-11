import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import { SingleTranstionRecourdService } from '../services/single-transtion-recourd.service';
import { MatDialog } from '@angular/material/dialog';
import { CouSingletransitionComponent } from '../cou-singletransition/cou-singletransition.component';

interface TransitionRec {
  transitionId: string;
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
  status: string;
}

@Component({
  selector: 'offlineWeb-cou-records',
  templateUrl: './cou-records.component.html',
  styleUrls: ['./cou-records.component.scss'],
})
export class CouRecordsComponent {
  transitionRecArr: TransitionRec[] = [];
  token: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private transitionService: SingleTranstionRecourdService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.token = this.authService.getToken();

    if (this.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      });

      // Single HTTP GET request
      this.http
        .get('api/v1/transactions?saveStatus=true', { headers })
        .subscribe(
          (response: any) => {
            console.log('API response:', response);

            // Map response to transitionRecArr
            this.transitionRecArr = response.map((type: any) => ({
              transitionId: type.id,
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
              saveUser: type.saveUserName,
              status: type.status,
            }));

            console.log('Mapped transition records:', this.transitionRecArr);
          },
          (error) => {
            console.error('Error fetching transactions:', error);
          }
        );
    }
  }

  onCallSingleTransition(record: any) {
    console.log(record);
    this.dialog
      .open(CouSingletransitionComponent, {
        width: '50rem',
        data: record,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.ngOnInit();
        } else {
          this.ngOnInit();
        }
      });
  }
}
