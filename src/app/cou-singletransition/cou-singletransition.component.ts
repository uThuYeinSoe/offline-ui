import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleTranstionRecourdService } from '../services/single-transtion-recourd.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth-service.service';

interface UpdateTranstionRecourd {
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

interface CheckUserInfo {
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
  selector: 'offlineWeb-cou-singletransition',
  templateUrl: './cou-singletransition.component.html',
  styleUrls: ['./cou-singletransition.component.scss'],
})
export class CouSingletransitionComponent {
  singleTransitionObj: any = '';
  updateTransitionRecord: Partial<UpdateTranstionRecourd> = {};
  token: string | null = null;
  isModalVisible: boolean = false;
  checkInfoObj: any = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CouSingletransitionComponent>,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.singleTransitionObj = this.data;
    console.log(this.singleTransitionObj);
  }

  // hold data to check
  selectedData = {
    drAccountNumber: '',
    crAccountNumber: '',
    amount: 0,
  };

  checkDRAccNum() {
    this.selectedData.drAccountNumber =
      this.singleTransitionObj.drAccountNumber;
    this.selectedData.crAccountNumber =
      this.singleTransitionObj.crAccountNumber;
    this.selectedData.amount = this.singleTransitionObj.amount;

    this.isModalVisible = true;

    console.log(this.selectedData);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    this.http
      .put(`/api/v1/sttmCustAccounts`, { headers })
      .subscribe((response: any) => {
        console.log(response);
        // Append new data to the existing array
        this.checkInfoObj = {
          branchCode: response.branchCode,
          custAccNo: response.custAccNo,
          acyWithdrawBal: response.acyBlockedAmt,
          openingBal: response.openingBal,
          acDesc: response.acDesc,
          custNo: response.custAccNo,
          ccy: response.ccy,
          accountClass: response.accountClass,
          drGl: response.drGl,
          crGl: response.crGl,
          recordStat: response.recordStat,
          acyCurrBalance: response.acyCurrBalance,
          addressOne: response.addressOne,
          addressTwo: response.addressTwo,
          addressThree: response.addressThree,
          addressFour: response.addressFour,
          acStatNoDr: response.acStatNoDr,
          acStatNoCr: response.acStatNoCr,
          acStatDormant: response.acStatDormant,
          acyBlockedAmt: response.acyBlockedAmt,
          acyEcaBlockedAmt: response.acyEcaBlockedAmt,
          status: response.status,
          amountStatus: response.amountStatus,
        };
      });
  }
  checkCrAccNum() {
    this.isModalVisible = true;
  }
  checkCrGLNum() {
    this.isModalVisible = true;
  }
  checkRmNum() {
    this.isModalVisible = true;
  }
  checkPoNum() {
    this.isModalVisible = true;
  }
  checkGCNum() {
    this.isModalVisible = true;
  }
  checkChequeNum() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  onAcceptData() {
    this.token = this.authService.getToken();
    let transtionId: string = this.singleTransitionObj.transitionId;
    if (this.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      });

      const payload = {
        transitionId: transtionId,
        transactionType: this.singleTransitionObj.transactionType,
        branchCode: this.singleTransitionObj.branchCode,
        trnCode: this.singleTransitionObj.trnCode,
        amount: this.singleTransitionObj.amount,
        crAccountNumber: this.singleTransitionObj.crAccountNumber,
        drAccountNumber: this.singleTransitionObj.drAccountNumber,
        chequeNumber: this.singleTransitionObj.chequeNumber,
        instrumentType: this.singleTransitionObj.instrumentType,
        rmNumber: this.singleTransitionObj.rmNumber,
        poNumber: this.singleTransitionObj.poNumber,
        crGLNumber: this.singleTransitionObj.crGLNumber,
        gcNumber: this.singleTransitionObj.gcNumber,
        saveUser: this.singleTransitionObj.saveUser,
        saveDateTime: this.singleTransitionObj.saveDateTime,
        status: 'Accept',
      };

      this.http
        .put('/api/v1/transactions/' + transtionId, payload, { headers })
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.status === true) {
              this.dialogRef.close(true);
            }
          },
          (error) => {
            console.error('Error updating the transaction:', error);
          }
        );
    }
  }

  onRejectData() {
    this.token = this.authService.getToken();
    let transtionId: string = this.singleTransitionObj.transitionId;
    if (this.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      });

      const payload = {
        transitionId: transtionId,
        transactionType: this.singleTransitionObj.transactionType,
        branchCode: this.singleTransitionObj.branchCode,
        trnCode: this.singleTransitionObj.trnCode,
        amount: this.singleTransitionObj.amount,
        crAccountNumber: this.singleTransitionObj.crAccountNumber,
        drAccountNumber: this.singleTransitionObj.drAccountNumber,
        chequeNumber: this.singleTransitionObj.chequeNumber,
        instrumentType: this.singleTransitionObj.instrumentType,
        rmNumber: this.singleTransitionObj.rmNumber,
        poNumber: this.singleTransitionObj.poNumber,
        crGLNumber: this.singleTransitionObj.crGLNumber,
        gcNumber: this.singleTransitionObj.gcNumber,
        saveUser: this.singleTransitionObj.saveUser,
        saveDateTime: this.singleTransitionObj.saveDateTime,
        status: 'Reject',
      };

      this.http
        .put('/api/v1/transactions/' + transtionId, payload, { headers })
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.status === true) {
              this.dialogRef.close(true);
            }
          },
          (error) => {
            console.error('Error updating the transaction:', error);
          }
        );
    }
  }
}
