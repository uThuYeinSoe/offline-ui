import { Component } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'offlineWeb-sttm-cust-accounts',
  templateUrl: './sttm-cust-accounts.component.html',
  styleUrls: ['./sttm-cust-accounts.component.scss'],
})
export class SttmCustAccountsComponent {
  excelData: any[] = [];
  sttmComplete: boolean = false;
  token: string | null = null;

  constructor(
    private excelService: ExcelService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.token = this.authService.getToken();
  }

  changeSttmFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.excelData = []; // Clear the existing data before loading new file data
      this.excelService.readExcelFile(file).then((data) => {
        this.excelData = data;
        console.log('Excel Data:', this.excelData);
      });
    }
  }

  onSttmUpload() {
    if (this.excelData.length > 0) {
      let processedCount = 0;
      // Loop through each record in the excelData array
      this.excelData.forEach((sttm) => {
        console.log('STTM Record:', sttm); // Check the full record here
        const sttmPayload = {
          branchCode: sttm.BRANCH_CODE,
          custAccNo: sttm.CUST_AC_NO,
          acyWithdrawBal: sttm.ACY_WITHDRAWABLE_BAL,
          openingBal: sttm.OPENING_BAL,
          acDesc: sttm.AC_DESC,
          custNo: sttm.CUST_NO,
          ccy: sttm.CCY,
          accountClass: sttm.ACCOUNT_CLASS,
          drGl: sttm.DR_GL,
          crGl: sttm.CR_GL,
          recordStat: sttm.RECORD_STAT,
          acyCurrBalance: sttm.ACY_CURR_BALANCE,
          addressOne: sttm.ADDRESS1,
          addressTwo: sttm.ADDRESS2,
          addressThree: sttm.ADDRESS3,
          addressFour: sttm.ADDRESS4,
          acStatNoDr: sttm.AC_STAT_NO_DR,
          acStatNoCr: sttm.AC_STAT_NO_CR,
          acStatDormant: sttm.AC_STAT_DORMANT,
          acyBlockedAmt: sttm.ACY_BLOCKED_AMT,
          acyEcaBlockedAmt: sttm.ACY_ECA_BLOCKED_AMT,
        };

        console.log('Payload being sent:', sttmPayload); // Check payload before API call

        // Call the API for each user registration
        this.sttmDataUpload(sttmPayload).subscribe(
          (response) => {
            processedCount++;
            if (processedCount === this.excelData.length) {
              this.sttmComplete = true;
            }
          },
          (error) => {
            console.error('Error registering user:', error);
          }
        );
      });
    } else {
      console.error('No data available for STTM');
    }
  }

  sttmDataUpload(sttmPayload: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    const apiUrl = '/api/v1/sttmCustAccounts';
    return this.http.post(apiUrl, sttmPayload, { headers });
  }
}
