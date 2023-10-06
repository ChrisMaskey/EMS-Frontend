import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

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
  apiUrl = 'https://vertex90-001-site1.atempurl.com/api/Email/reset-password';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
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
        Token: this.activationToken,
        Email: this.email, 
        Password: this.newPassword,
        ConfirmPassword: this.confirmPassword
      };

      const headers = new HttpHeaders();

      this.http.post(this.apiUrl, data, { headers, responseType: 'json' }).subscribe(
        (response: any) => { 
          console.log(response);

          if (response.code === 'Error') {
            console.error('Error resetting password:', response.description);
            this.message = response.description;
          } else {
            console.log('Password reset response:', response);
            this.message = response.description;
            this.handleApiResponse(response.code);
          }
          
        },
        (error: HttpErrorResponse) => {
          console.error('Error resetting password', error);
          this.message = 'An error occurred while resetting the password. Please try again later.';
        }
      );
    } else {
      this.message = 'Passwords do not match.';
    }
  }

  private handleApiResponse(responseCode: string) {
    if (responseCode === '200') {
      console.log('Password reset successful.');
      this.router.navigate(['/login']);
    } else {
      console.error('Unexpected response:', responseCode);
      this.message = 'Unexpected response from the server.';
    }
  }
}
