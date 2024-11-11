import { Component } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'offlineWeb-catm-check-details',
  templateUrl: './catm-check-details.component.html',
  styleUrls: ['./catm-check-details.component.scss'],
})
export class CatmCheckDetailsComponent {
  excelData: any[] = [];
  catmComplete: boolean = false;
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
      this.excelData.forEach((catm) => {
        console.log('CATM Record:', catm); // Check the full record here
        const catmPayload = {
          branch: catm.BRANCH,
          account: catm.ACCOUNT,
          checkBookNo: catm.CHECK_BOOK_NO,
          checkNo: catm.CHECK_NO,
          modNo: catm.MOD_NO,
          status: catm.STATUS,
          amount: catm.AMOUNT,
          beneficiary: catm.BENEFICIARY,
          presentationDate: catm.PRESENTATION_DATE,
          valueDate: catm.VALUE_DATE,
          makerId: catm.MAKER_ID,
          makerDtStamp: catm.MAKER_DT_STAMP,
          checkerId: catm.CHECKER_ID,
          checkDtStamp: catm.CHECKER_DT_STAMP,
          onceAuth: catm.ONCE_AUTH,
          authStat: catm.AUTH_STAT,
          recordStat: catm.RECORD_STAT,
          remarks: catm.REMARKS,
          checkDigit: catm.CHECK_DIGIT,
          rejectCode: catm.REJECT_CODE,
          updateMode: catm.UPDATE_MODE,
          claimAmount: catm.CLAIM_AMOUNT,
        };

        console.log('Payload being sent:', catmPayload); // Check payload before API call

        // Call the API for each user registration
        this.sttmDataUpload(catmPayload).subscribe(
          (response) => {
            processedCount++;
            if (processedCount === this.excelData.length) {
              this.catmComplete = true;
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

  sttmDataUpload(catmPayload: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    const apiUrl = '/api/v1/catmCheckDetails';
    return this.http.post(apiUrl, catmPayload, { headers });
  }
}
