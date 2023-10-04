import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  activationToken: string = '';
  email: string = ''; // Extracted email
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  apiUrl = 'https://vertex90-001-site1.atempurl.com/api/Email/reset-password';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.route.queryParams.subscribe(params => {
      this.activationToken = params['activationToken'];
      this.email = params['email'];
      console.log('Token:', this.activationToken);
      console.log('Email:', this.email);
    });
  }

  onSubmit() {
    if (this.newPassword === this.confirmPassword) {
      const data = {
        Token: this.activationToken.replaceAll(" ", "+"),
        Email: this.email, 
        Password: this.newPassword,
        ConfirmPassword: this.confirmPassword
      };

      console.log(this.activationToken, this.email)
      console.log(this.activationToken.replaceAll(" ", "+"));

      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

      this.http.post(this.apiUrl, data, { headers, responseType: 'text' }).subscribe(
        (response: string) => {
          console.log('API Response:', response);

          if (response === 'Password has been reset.') {
            console.log('Password reset successful.');
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
      this.message = 'Passwords do not match.';
    }
  }

  private handleApiError(errorMessage: string) {
    this.message = errorMessage;
  }
}
