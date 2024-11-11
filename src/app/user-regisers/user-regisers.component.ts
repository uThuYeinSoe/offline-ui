import { Component } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'offlineWeb-user-regisers',
  templateUrl: './user-regisers.component.html',
  styleUrls: ['./user-regisers.component.scss'],
})
export class UserRegisersComponent {
  excelData: any[] = [];
  registrationComplete: boolean = false;

  constructor(private excelService: ExcelService, private http: HttpClient) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.excelData = []; // Clear the existing data
      this.excelService.readExcelFile(file).then((data) => {
        this.excelData = data;
        console.log('Excel Data:', this.excelData);
      });
    }
  }

  onRegisterUpload() {
    if (this.excelData.length > 0) {
      let processedCount = 0;
      // Loop through each record in the excelData array
      this.excelData.forEach((user) => {
        const userPayload = {
          username: user.username,
          password: user.password,
          role: user.role,
        };

        // Call the API for each user registration
        this.registerUser(userPayload).subscribe(
          (response) => {
            processedCount++;
            if (processedCount === this.excelData.length) {
              this.registrationComplete = true;
              console.log('All users registered successfully');
            }
          },
          (error) => {
            console.error('Error registering user:', error);
          }
        );
      });
    } else {
      console.error('No data available for registration');
    }
  }

  registerUser(user: { username: string; password: string; role: string }) {
    const apiUrl = '/api/v1/auth/register';
    return this.http.post(apiUrl, user);
  }
}
