import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  activationToken: string = '';
  email: string = ''; 
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  messageType: string = '';
  apiUrl = 'https://vertex90-001-site1.atempurl.com/api/Email/reset-password';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.activationToken = params['activationToken'];
      this.email = params['email'];
    });
  }

  onSubmit() {
    if (this.newPassword === this.confirmPassword) {
      const data = {
        Token: this.activationToken,
        Email: this.email, 
        Password: this.newPassword,
        ConfirmPassword: this.confirmPassword
      };

      const headers = new HttpHeaders();

      this.http.post(this.apiUrl, data, { headers, observe: 'response', responseType: 'json' }).subscribe(
        (response: HttpResponse<any>) => {
          const responseData = response.body;

          if (responseData.code === '200') {
            console.log('Password reset successful.');
            this.messageType = 'success';
            this.message = 'Password was reset.'; 
          } else {
            console.error('Unexpected response:', responseData);
            this.messageType = 'error';
            this.handleApiError('Unexpected response from the server.');
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error resetting password', error);
          this.messageType = 'error';
          this.handleApiError('An error occurred while resetting the password. Please try again later.');
        }
      );
    } else {
      this.messageType = 'error';
      this.message = 'Passwords do not match.';
    }
  }

  private handleApiError(errorMessage: string) {
    this.messageType = 'error';
    this.message = errorMessage;
  }
}
