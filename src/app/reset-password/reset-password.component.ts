import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string = '';
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  apiUrl = 'https://vertex90-001-site1.atempurl.com/api/Email/reset-password';

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.isValidEmail(this.email) && this.newPassword === this.confirmPassword) {
      const data = {
        email: this.email,
        token: this.token,
        password: this.newPassword,
        confirmPassword: this.confirmPassword
      };

      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http.post(this.apiUrl, data, { headers, observe: 'response' }).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            console.log('response:', response);
            this.message = 'Password reset successful.';
          } else {
            this.handleApiError('Password reset failed. Please try again later.');
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error resetting password', error);
          this.handleApiError('An error occurred while resetting the password. Please try again later.');
        }
      );
    } else {
      this.message = 'Invalid email format or passwords do not match.';
    }
  }
  
  private handleApiError(errorMessage: string) {
    this.message = errorMessage;
  }
  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
}
