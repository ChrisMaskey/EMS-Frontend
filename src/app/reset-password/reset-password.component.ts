import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string = ''; // Add an input field for email in your HTML template
  token: string = ''; // Add an input field for token in your HTML template
  newPassword: string = ''; // Add an input field for newPassword in your HTML template
  confirmPassword: string = ''; // Add an input field for confirmPassword in your HTML template
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

      this.http.post(this.apiUrl, data, { observe: 'response' }).subscribe(
        (response) => {
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
