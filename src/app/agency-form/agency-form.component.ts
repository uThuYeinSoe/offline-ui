import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

interface TransactionType {
  value: string;
  label: string;
}

@Component({
  selector: 'offlineWeb-agency-form',
  templateUrl: './agency-form.component.html',
  styleUrls: ['./agency-form.component.scss'],
})
export class AgencyFormComponent implements OnInit {
  transtionRecord: FormGroup;
  errorMessage: string | null = null;
  transactionTypes: TransactionType[] = [];
  selectedTransactionType: string = '';
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.transtionRecord = this.fb.group({
      transactionType: ['', Validators.required],
      instrumentType: ['', Validators.required],
      branchCode: ['', Validators.required],
      trnCode: ['', Validators.required],
      drAccountNumber: ['', Validators.required],
      crAccountNumber: ['', Validators.required],
      crGLNumber: ['', Validators.required],
      rmNumber: ['', Validators.required],
      poNumber: ['', Validators.required],
      gcNumber: ['', Validators.required],
      chequeNumber: ['', Validators.required],
      amount: ['', Validators.required],
      status: 'Save',
    });
  }

  ngOnInit() {
    // Retrieve the token from AuthService when the component initializes
    this.token = this.authService.getToken(); // Store the token in the class property

    if (this.token) {
      // Set up headers with the token
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      });

      // Make an HTTP call to fetch transaction types
      this.http.get('/api/v1/transactionTypes', { headers }).subscribe(
        (response: any) => {
          this.transactionTypes = response.map((type: any) => ({
            value: type.type,
            label: type.type,
          }));
          console.log(response);
        },
        (error) => {
          this.errorMessage = 'Failed to fetch transaction types'; // Handle error
        }
      );
    } else {
      this.errorMessage = 'Token not found';
    }
  }

  onSubmit() {
    console.log('Submit Button');
    if (this.transtionRecord.valid) {
      // Ensure token is available in the onSubmit method
      if (this.token) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`, // Use the class-level token
        });

        console.log(this.transtionRecord.value);

        // Post form data to authenticate (or perform another operation)
        this.http
          .post('/api/v1/transactions', this.transtionRecord.value, {
            headers,
          })
          .subscribe(
            (response: any) => {
              // Handle authentication response

              if (response.status) {
                this.transtionRecord.reset();
              } else {
                this.errorMessage = 'Invalid credentials';
              }
            },
            (error) => {
              this.errorMessage = 'Login failed';
            }
          );
      } else {
        this.errorMessage = 'Token not available. Please log in again.';
      }
    }
  }

  onTransactionTypeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedTransactionType = target.value;

    console.log(this.selectedTransactionType);

    // Logic to show/hide inputs based on the selected transaction type
    if (this.selectedTransactionType === 'MSC') {
      // Show specific inputs and hide others
      this.transtionRecord
        .get('branchCode')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('trnCode')?.setValidators(Validators.required);
      this.transtionRecord
        .get('drAccountNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord
        .get('crGLNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('amount')?.setValidators(Validators.required);

      // Clear or hide other fields
      this.transtionRecord.get('instrumentType')?.clearValidators();
      this.transtionRecord.get('crAccountNumber')?.clearValidators();
      this.transtionRecord.get('rmNumber')?.clearValidators();
      this.transtionRecord.get('poNumber')?.clearValidators();
      this.transtionRecord.get('gcNumber')?.clearValidators();
      this.transtionRecord.get('chequeNumber')?.clearValidators();

      // Optionally reset other fields
      this.transtionRecord.get('instrumentType')?.reset();
      this.transtionRecord.get('crAccountNumber')?.reset();
      this.transtionRecord.get('rmNumber')?.reset();
      this.transtionRecord.get('poNumber')?.reset();
      this.transtionRecord.get('gcNumber')?.reset();
      this.transtionRecord.get('chequeNumber')?.reset();
    }

    if (this.selectedTransactionType === 'CHW') {
      // Show specific inputs and hide others
      this.transtionRecord
        .get('branchCode')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('trnCode')?.setValidators(Validators.required);
      this.transtionRecord
        .get('drAccountNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('amount')?.setValidators(Validators.required);

      // Clear or hide other fields
      this.transtionRecord.get('crGLNumber')?.clearValidators();
      this.transtionRecord.get('instrumentType')?.clearValidators();
      this.transtionRecord.get('crAccountNumber')?.clearValidators();
      this.transtionRecord.get('rmNumber')?.clearValidators();
      this.transtionRecord.get('poNumber')?.clearValidators();
      this.transtionRecord.get('gcNumber')?.clearValidators();
      this.transtionRecord.get('chequeNumber')?.clearValidators();

      // Optionally reset other fields
      this.transtionRecord.get('crGLNumber')?.reset();
      this.transtionRecord.get('instrumentType')?.reset();
      this.transtionRecord.get('crAccountNumber')?.reset();
      this.transtionRecord.get('rmNumber')?.reset();
      this.transtionRecord.get('poNumber')?.reset();
      this.transtionRecord.get('gcNumber')?.reset();
      this.transtionRecord.get('chequeNumber')?.reset();
    }

    if (this.selectedTransactionType === 'CHD') {
      // Show specific inputs and hide others
      this.transtionRecord
        .get('branchCode')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('trnCode')?.setValidators(Validators.required);
      this.transtionRecord
        .get('crAccountNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('amount')?.setValidators(Validators.required);

      // Clear or hide other fields
      this.transtionRecord.get('instrumentType')?.clearValidators();
      this.transtionRecord.get('drAccountNumber')?.clearValidators();
      this.transtionRecord.get('crGLNumber')?.clearValidators();
      this.transtionRecord.get('rmNumber')?.clearValidators();
      this.transtionRecord.get('poNumber')?.clearValidators();
      this.transtionRecord.get('gcNumber')?.clearValidators();
      this.transtionRecord.get('chequeNumber')?.clearValidators();

      // Optionally reset other fields
      this.transtionRecord.get('crGLNumber')?.reset();
      this.transtionRecord.get('instrumentType')?.reset();
      this.transtionRecord.get('drAccountNumber')?.reset();
      this.transtionRecord.get('rmNumber')?.reset();
      this.transtionRecord.get('poNumber')?.reset();
      this.transtionRecord.get('gcNumber')?.reset();
      this.transtionRecord.get('chequeNumber')?.reset();
    }

    if (this.selectedTransactionType === 'CHL') {
      // Show specific inputs and hide others
      this.transtionRecord
        .get('branchCode')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('trnCode')?.setValidators(Validators.required);
      this.transtionRecord
        .get('drAccountNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord
        .get('chequeNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord
        .get('crAccountNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('amount')?.setValidators(Validators.required);

      // Clear or hide other fields
      this.transtionRecord.get('instrumentType')?.clearValidators();
      this.transtionRecord.get('crGLNumber')?.clearValidators();
      this.transtionRecord.get('rmNumber')?.clearValidators();
      this.transtionRecord.get('poNumber')?.clearValidators();
      this.transtionRecord.get('gcNumber')?.clearValidators();

      // Optionally reset other fields
      this.transtionRecord.get('instrumentType')?.reset();
      this.transtionRecord.get('crGLNumber')?.reset();
      this.transtionRecord.get('rmNumber')?.reset();
      this.transtionRecord.get('poNumber')?.reset();
      this.transtionRecord.get('gcNumber')?.reset();
    }

    if (this.selectedTransactionType === 'CQL') {
      // Show specific inputs and hide others
      this.transtionRecord
        .get('branchCode')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('trnCode')?.setValidators(Validators.required);
      this.transtionRecord
        .get('drAccountNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord
        .get('chequeNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('amount')?.setValidators(Validators.required);

      // Clear or hide other fields
      this.transtionRecord.get('instrumentType')?.clearValidators();
      this.transtionRecord.get('crGLNumber')?.clearValidators();
      this.transtionRecord.get('crAccountNumber')?.clearValidators();
      this.transtionRecord.get('rmNumber')?.clearValidators();
      this.transtionRecord.get('poNumber')?.clearValidators();
      this.transtionRecord.get('gcNumber')?.clearValidators();

      // Optionally reset other fields
      this.transtionRecord.get('instrumentType')?.reset();
      this.transtionRecord.get('crGLNumber')?.reset();
      this.transtionRecord.get('crAccountNumber')?.reset();
      this.transtionRecord.get('rmNumber')?.reset();
      this.transtionRecord.get('poNumber')?.reset();
      this.transtionRecord.get('gcNumber')?.reset();
    }

    if (this.selectedTransactionType === 'OEC') {
      // Show specific inputs and hide others
      this.transtionRecord
        .get('branchCode')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('trnCode')?.setValidators(Validators.required);
      this.transtionRecord.get('poNumber')?.setValidators(Validators.required);
      this.transtionRecord.get('amount')?.setValidators(Validators.required);

      // Set instrumentType to 'RO'
      this.transtionRecord.get('instrumentType')?.setValue('RO');

      // Clear or hide other fields
      this.transtionRecord.get('instrumentType')?.clearValidators();
      this.transtionRecord.get('crGLNumber')?.clearValidators();
      this.transtionRecord.get('rmNumber')?.clearValidators();
      this.transtionRecord.get('gcNumber')?.clearValidators();
      this.transtionRecord.get('crAccountNumber')?.clearValidators();
      this.transtionRecord.get('drAccountNumber')?.clearValidators();
      this.transtionRecord.get('chequeNumber')?.clearValidators();

      // Optionally reset other fields
      this.transtionRecord.get('crGLNumber')?.reset();
      this.transtionRecord.get('rmNumber')?.reset();
      this.transtionRecord.get('gcNumber')?.reset();
      this.transtionRecord.get('crAccountNumber')?.reset();
      this.transtionRecord.get('drAccountNumber')?.reset();
      this.transtionRecord.get('chequeNumber')?.reset();
    }

    if (this.selectedTransactionType === 'OET') {
      // Show specific inputs and hide others
      this.transtionRecord
        .get('branchCode')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('trnCode')?.setValidators(Validators.required);
      this.transtionRecord.get('poNumber')?.setValidators(Validators.required);
      this.transtionRecord
        .get('crAccountNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('amount')?.setValidators(Validators.required);

      // Set instrumentType to 'RO'
      this.transtionRecord.get('instrumentType')?.setValue('RO');

      // Clear or hide other fields
      this.transtionRecord.get('crGLNumber')?.clearValidators();
      this.transtionRecord.get('rmNumber')?.clearValidators();
      this.transtionRecord.get('gcNumber')?.clearValidators();
      this.transtionRecord.get('drAccountNumber')?.clearValidators();
      this.transtionRecord.get('chequeNumber')?.clearValidators();

      // Optionally reset other fields
      this.transtionRecord.get('crGLNumber')?.reset();
      this.transtionRecord.get('rmNumber')?.reset();
      this.transtionRecord.get('gcNumber')?.reset();
      this.transtionRecord.get('drAccountNumber')?.reset();
      this.transtionRecord.get('chequeNumber')?.reset();
    }

    if (this.selectedTransactionType === 'FWT') {
      // Show specific inputs and hide others
      this.transtionRecord
        .get('branchCode')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('trnCode')?.setValidators(Validators.required);
      this.transtionRecord
        .get('drAccountNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('amount')?.setValidators(Validators.required);

      // Clear or hide other fields
      this.transtionRecord.get('poNumber')?.clearValidators();
      this.transtionRecord.get('crAccountNumber')?.clearValidators();
      this.transtionRecord.get('instrumentType')?.clearValidators();
      this.transtionRecord.get('crGLNumber')?.clearValidators();
      this.transtionRecord.get('rmNumber')?.clearValidators();
      this.transtionRecord.get('gcNumber')?.clearValidators();
      this.transtionRecord.get('chequeNumber')?.clearValidators();

      // Optionally reset other fields
      this.transtionRecord.get('poNumber')?.reset();
      this.transtionRecord.get('crAccountNumber')?.reset();
      this.transtionRecord.get('instrumentType')?.reset();
      this.transtionRecord.get('crGLNumber')?.reset();
      this.transtionRecord.get('rmNumber')?.reset();
      this.transtionRecord.get('gcNumber')?.reset();
      this.transtionRecord.get('chequeNumber')?.reset();
    }

    if (this.selectedTransactionType === 'CWC') {
      // Show specific inputs and hide others
      this.transtionRecord
        .get('branchCode')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('trnCode')?.setValidators(Validators.required);
      this.transtionRecord
        .get('drAccountNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('amount')?.setValidators(Validators.required);

      // Clear or hide other fields
      this.transtionRecord.get('poNumber')?.clearValidators();
      this.transtionRecord.get('crAccountNumber')?.clearValidators();
      this.transtionRecord.get('instrumentType')?.clearValidators();
      this.transtionRecord.get('crGLNumber')?.clearValidators();
      this.transtionRecord.get('rmNumber')?.clearValidators();
      this.transtionRecord.get('gcNumber')?.clearValidators();
      this.transtionRecord.get('chequeNumber')?.clearValidators();

      // Optionally reset other fields
      this.transtionRecord.get('poNumber')?.reset();
      this.transtionRecord.get('crAccountNumber')?.reset();
      this.transtionRecord.get('instrumentType')?.reset();
      this.transtionRecord.get('crGLNumber')?.reset();
      this.transtionRecord.get('rmNumber')?.reset();
      this.transtionRecord.get('gcNumber')?.reset();
      this.transtionRecord.get('chequeNumber')?.reset();
    }

    if (this.selectedTransactionType === 'CWT') {
      // Show specific inputs and hide others
      this.transtionRecord
        .get('branchCode')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('trnCode')?.setValidators(Validators.required);
      this.transtionRecord
        .get('drAccountNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord
        .get('crAccountNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('amount')?.setValidators(Validators.required);

      // Clear or hide other fields
      this.transtionRecord.get('poNumber')?.clearValidators();
      this.transtionRecord.get('instrumentType')?.clearValidators();
      this.transtionRecord.get('crGLNumber')?.clearValidators();
      this.transtionRecord.get('rmNumber')?.clearValidators();
      this.transtionRecord.get('gcNumber')?.clearValidators();
      this.transtionRecord.get('chequeNumber')?.clearValidators();

      // Optionally reset other fields
      this.transtionRecord.get('poNumber')?.reset();
      this.transtionRecord.get('instrumentType')?.reset();
      this.transtionRecord.get('crGLNumber')?.reset();
      this.transtionRecord.get('rmNumber')?.reset();
      this.transtionRecord.get('gcNumber')?.reset();
      this.transtionRecord.get('chequeNumber')?.reset();
    }

    if (this.selectedTransactionType === 'PLC') {
      // Show specific inputs and hide others
      this.transtionRecord
        .get('branchCode')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('trnCode')?.setValidators(Validators.required);
      this.transtionRecord.get('poNumber')?.setValidators(Validators.required);
      this.transtionRecord.get('amount')?.setValidators(Validators.required);

      // Set instrumentType to 'RO'
      this.transtionRecord.get('instrumentType')?.setValue('MC');

      // Clear or hide other fields
      this.transtionRecord.get('drAccountNumber')?.clearValidators();
      this.transtionRecord.get('crAccountNumber')?.clearValidators();
      this.transtionRecord.get('chequeNumber')?.clearValidators();
      this.transtionRecord.get('crGLNumber')?.clearValidators();
      this.transtionRecord.get('rmNumber')?.clearValidators();
      this.transtionRecord.get('gcNumber')?.clearValidators();

      // Optionally reset other fields
      this.transtionRecord.get('drAccountNumber')?.reset();
      this.transtionRecord.get('crAccountNumber')?.reset();
      this.transtionRecord.get('chequeNumber')?.reset();
      this.transtionRecord.get('crGLNumber')?.reset();
      this.transtionRecord.get('rmNumber')?.reset();
      this.transtionRecord.get('gcNumber')?.reset();
    }

    if (this.selectedTransactionType === 'MGC') {
      // Show specific inputs and hide others
      this.transtionRecord
        .get('branchCode')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('trnCode')?.setValidators(Validators.required);
      this.transtionRecord
        .get('crGLNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('amount')?.setValidators(Validators.required);

      // Clear or hide other fields
      this.transtionRecord.get('drAccountNumber')?.clearValidators();
      this.transtionRecord.get('chequeNumber')?.clearValidators();
      this.transtionRecord.get('instrumentType')?.clearValidators();
      this.transtionRecord.get('rmNumber')?.clearValidators();
      this.transtionRecord.get('poNumber')?.clearValidators();
      this.transtionRecord.get('gcNumber')?.clearValidators();
      this.transtionRecord.get('crAccountNumber')?.clearValidators();

      // Optionally reset other fields
      this.transtionRecord.get('drAccountNumber')?.reset();
      this.transtionRecord.get('chequeNumber')?.reset();
      this.transtionRecord.get('instrumentType')?.reset();
      this.transtionRecord.get('rmNumber')?.reset();
      this.transtionRecord.get('poNumber')?.reset();
      this.transtionRecord.get('gcNumber')?.reset();
      this.transtionRecord.get('crAccountNumber')?.reset();
    }

    if (this.selectedTransactionType === 'GLT') {
      // Show specific inputs and hide others
      this.transtionRecord
        .get('branchCode')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('trnCode')?.setValidators(Validators.required);
      this.transtionRecord.get('gcNumber')?.setValidators(Validators.required);
      this.transtionRecord
        .get('crAccountNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('amount')?.setValidators(Validators.required);

      // Set instrumentType to 'RO'
      this.transtionRecord.get('instrumentType')?.setValue('DD');

      // Clear or hide other fields
      this.transtionRecord.get('drAccountNumber')?.clearValidators();
      this.transtionRecord.get('chequeNumber')?.clearValidators();
      this.transtionRecord.get('rmNumber')?.clearValidators();
      this.transtionRecord.get('poNumber')?.clearValidators();
      this.transtionRecord.get('crGLNumber')?.clearValidators();

      // Optionally reset other fields
      this.transtionRecord.get('drAccountNumber')?.reset();
      this.transtionRecord.get('chequeNumber')?.reset();
      this.transtionRecord.get('crGLNumber')?.reset();
      this.transtionRecord.get('rmNumber')?.reset();
      this.transtionRecord.get('poNumber')?.reset();
    }

    if (this.selectedTransactionType === 'GLC') {
      // Show specific inputs and hide others
      this.transtionRecord
        .get('branchCode')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('trnCode')?.setValidators(Validators.required);
      this.transtionRecord.get('gcNumber')?.setValidators(Validators.required);
      this.transtionRecord.get('amount')?.setValidators(Validators.required);

      // Set instrumentType to 'RO'
      this.transtionRecord.get('instrumentType')?.setValue('DD');

      // Clear or hide other fields
      this.transtionRecord.get('drAccountNumber')?.clearValidators();
      this.transtionRecord.get('chequeNumber')?.clearValidators();
      this.transtionRecord.get('rmNumber')?.clearValidators();
      this.transtionRecord.get('poNumber')?.clearValidators();
      this.transtionRecord.get('crGLNumber')?.clearValidators();
      this.transtionRecord.get('crAccountNumber')?.clearValidators();

      // Optionally reset other fields
      this.transtionRecord.get('drAccountNumber')?.reset();
      this.transtionRecord.get('chequeNumber')?.reset();
      this.transtionRecord.get('crGLNumber')?.reset();
      this.transtionRecord.get('rmNumber')?.reset();
      this.transtionRecord.get('poNumber')?.reset();
      this.transtionRecord.get('crAccountNumber')?.reset();
    }

    if (this.selectedTransactionType === 'BLT') {
      // Show specific inputs and hide others
      this.transtionRecord
        .get('branchCode')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('trnCode')?.setValidators(Validators.required);
      this.transtionRecord.get('gcNumber')?.setValidators(Validators.required);
      this.transtionRecord
        .get('crAccountNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('amount')?.setValidators(Validators.required);

      // Set instrumentType to 'RO'
      this.transtionRecord.get('instrumentType')?.setValue('MC');

      // Clear or hide other fields
      this.transtionRecord.get('drAccountNumber')?.clearValidators();
      this.transtionRecord.get('chequeNumber')?.clearValidators();
      this.transtionRecord.get('rmNumber')?.clearValidators();
      this.transtionRecord.get('poNumber')?.clearValidators();
      this.transtionRecord.get('crGLNumber')?.clearValidators();

      // Optionally reset other fields
      this.transtionRecord.get('drAccountNumber')?.reset();
      this.transtionRecord.get('chequeNumber')?.reset();
      this.transtionRecord.get('crGLNumber')?.reset();
      this.transtionRecord.get('rmNumber')?.reset();
      this.transtionRecord.get('poNumber')?.reset();
    }

    if (this.selectedTransactionType === 'AAT') {
      // Show specific inputs and hide others
      this.transtionRecord
        .get('branchCode')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('trnCode')?.setValidators(Validators.required);
      this.transtionRecord.get('gcNumber')?.setValidators(Validators.required);
      this.transtionRecord
        .get('drAccountNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord
        .get('crAccountNumber')
        ?.setValidators(Validators.required);
      this.transtionRecord.get('amount')?.setValidators(Validators.required);

      // Clear or hide other fields
      this.transtionRecord.get('chequeNumber')?.clearValidators();
      this.transtionRecord.get('instrumentType')?.clearValidators();
      this.transtionRecord.get('rmNumber')?.clearValidators();
      this.transtionRecord.get('poNumber')?.clearValidators();
      this.transtionRecord.get('crGLNumber')?.clearValidators();
      this.transtionRecord.get('gcNumber')?.clearValidators();

      // Optionally reset other fields
      this.transtionRecord.get('chequeNumber')?.reset();
      this.transtionRecord.get('instrumentType')?.reset();
      this.transtionRecord.get('rmNumber')?.reset();
      this.transtionRecord.get('poNumber')?.reset();
      this.transtionRecord.get('crGLNumber')?.reset();
      this.transtionRecord.get('gcNumber')?.reset();
    }

    // Update the form validation state
    else this.transtionRecord.updateValueAndValidity();
  }
}
