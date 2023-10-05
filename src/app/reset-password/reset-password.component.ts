import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

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
  ) {
    this.route.queryParams.subscribe(params => {
      this.activationToken = params['activationToken'];
      this.email = params['email'];
      console.log('Token:', this.activationToken);
      console.log('Email:', this.email);
    });
  }

  onSubmit() {
    const data = {
      email: this.email,
      password: this.newPassword,
      confirmPassword: this.confirmPassword,
      token: this.activationToken
    };
  
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
  
    this.http.post(this.apiUrl, data, { headers, responseType: 'text' }).subscribe(
      (response: any) => { // Change the response type to 'any'
        if (response !== null) {
          const responseData = JSON.parse(response);
          if (responseData.code === '200') {
            console.log('Password reset successful.');
            this.messageType = 'success';
            this.message = responseData.description;
          } else {
            console.error('Unexpected response:', responseData);
            this.messageType = 'error';
            this.handleApiError('Unexpected response from the server.');
          }
        } else {
          console.error('Response is null or empty');
          this.messageType = 'error';
          this.handleApiError('Response from the server is null or empty.');
        }
      },
      (error) => {
        console.error('Error resetting password', error);
        this.messageType = 'error';
        this.handleApiError(
          'An error occurred while resetting the password. Please try again later.'
        );
      }
    );
  }
  

  private handleApiError(errorMessage: string) {
    this.messageType = 'error';
    this.message = errorMessage;
  }
}
