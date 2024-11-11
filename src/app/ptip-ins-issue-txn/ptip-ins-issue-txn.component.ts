import { Component } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'offlineWeb-ptip-ins-issue-txn',
  templateUrl: './ptip-ins-issue-txn.component.html',
  styleUrls: ['./ptip-ins-issue-txn.component.scss'],
})
export class PtipInsIssueTxnComponent {
  excelData: any[] = [];
  ptipComplete: boolean = false;
  token: string | null = null;

  constructor(
    private excelService: ExcelService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.token = this.authService.getToken();
  }

  changePtipFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.excelData = []; // Clear the existing data before loading new file data
      this.excelService.readExcelFile(file).then((data) => {
        this.excelData = data;
        console.log('Excel Data:', this.excelData);
      });
    }
  }

  onPiptUpload() {
    if (this.excelData.length > 0) {
      let processedCount = 0;
      // Loop through each record in the excelData array
      this.excelData.forEach((ptip) => {
        console.log('PTIP Record:', ptip); // Check the full record here
        const ptipPayload = {
          txnRefNo: ptip.TXN_REF_NO,
          hostCode: ptip.HOST_CODE,
          instrNo: ptip.INSTR_NO,
          sourceCode: ptip.SOURCE_CODE,
          txnBranch: ptip.TXN_BRANCH,
          paymentType: ptip.PAYMENT_TYPE,
          customerNo: ptip.CUSTOMER_NO,
          customerServiceModel: ptip.CUSTOMER_SERVICE_MODEL,
          drAcNo: ptip.DR_AC_NO,
          drAcIban: ptip.DR_AC_IBAN,
          drAcBranch: ptip.DR_AC_BRANCH,
          drAcCcy: ptip.DR_AC_CCY,
          drName: ptip.DR_NAME,
          drAmount: ptip.DR_AMOUNT,
          benefName: ptip.BENEF_NAME,
          benefAddrOne: ptip.BENEF_ADDR1,
          benefAddrTwo: ptip.BENEF_ADDR2,
          benefId: ptip.BENEF_ID,
          instrumentIssueDate: ptip.INSTRUMENT_ISSUE_DATE,
          instrumentCcy: ptip.INSTRUMENT_CCY,
          instrumentAmount: ptip.INSTRUMENT_AMOUNT,
          bookDate: ptip.BOOK_DATE,
          instructionDate: ptip.INSTRUCTION_DATE,
          txnStatus: ptip.TXN_STATUS,
          remarks: ptip.REMARKS,
          exchRate: ptip.EXCH_RATE,
          payableBrnCode: ptip.PAYABLE_BRN_CODE,
          payableBrnName: ptip.PAYABLE_BRN_NAME,
          authStat: ptip.AUTH_STAT,
          makerId: ptip.MAKER_ID,
          checkerId: ptip.MAKER_DT_STAMP,
          instrumentCode: ptip.INSTRUMENT_CODE,
          instrumentDesc: ptip.INSTRUMENT_DESC,
          instrumentType: ptip.INSTRUMENT_TYPE,
          instrumentStatus: ptip.INSTRUMENT_STATUS,
          sourceRefNo: ptip.SOURCE_REF_NO,
          chgAcNo: ptip.CHG_AC_NO,
          chgAcIban: ptip.CHG_AC_IBAN,
          chgAcBranch: ptip.CHG_AC_BRANCH,
          chgAcCcy: ptip.CHG_AC_CCY,
          fxRefNo: ptip.FX_REF_NO,
          paymentRefNo: ptip.PAYMENT_REF_NO,
          sender: ptip.SENDER,
          senderBankName: ptip.SENDER_BANK_NAME,
          makerDtStamp: ptip.TXN_REF_NO,
          checkerDtStamp: ptip.CHECKER_DT_STAMP,
          txnArchDt: ptip.TXN_ARCH_DT,
          isIntrNoAllocated: ptip.IS_INTR_NO_ALLOCATED,
          clgRefNo: ptip.CLG_REF_NO,
          instrExpiryDate: ptip.TXN_REF_NO,
          isDuplicateIssue: ptip.TXN_REF_NO,
          revRefNo: ptip.TXN_REF_NO,
          revStatus: ptip.TXN_REF_NO,
          oldInstrNo: ptip.TXN_REF_NO,
          oldInstrumentRef: ptip.TXN_REF_NO,
          issuerBankCode: ptip.ISSUER_BANK_CODE,
          issuerBankName: ptip.ISSUER_BANK_NAME,
          issuerBranchCode: ptip.ISSUER_BRANCH_CODE,
          issuerBranchName: ptip.ISSUER_BRANCH_NAME,
          payableBankCode: ptip.PAYABLE_BANK_CODE,
          payableBankName: ptip.PAYABLE_BANK_NAME,
          testKey: ptip.TEST_KEY,
          prefundedGl: ptip.PREFUNDED_GL,
          mt110Upload: ptip.MT110_UPLOAD,
          micrNo: ptip.MICR_NO,
          reissueWithRev: ptip.REISSUE_WITH_REV,
          reIssueDate: ptip.RE_ISSUE_DATE,
          oldTxnRefNo: ptip.OLD_TXN_REF_NO,
          newMicrNo: ptip.NEW_MICR_NO,
          revSqNo: ptip.TXN_REF_NO,
        };

        console.log('Payload being sent:', ptipPayload); // Check payload before API call

        // Call the API for each user registration
        this.sttmDataUpload(ptipPayload).subscribe(
          (response) => {
            processedCount++;
            if (processedCount === this.excelData.length) {
              this.ptipComplete = true;
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

  sttmDataUpload(ptipPayload: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    const apiUrl = '/api/v1/ptipInsIssueTxn';
    return this.http.post(apiUrl, ptipPayload, { headers });
  }
}
