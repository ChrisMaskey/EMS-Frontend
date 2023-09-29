import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  apiUrl = 'https://vertex90-001-site1.atempurl.com/api/Email/reset-password-link';

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.isValidEmail(this.email)) {
      const url = `${this.apiUrl}?email=${this.email}`;
  
      this.http.post(url, null, { observe: 'response' }).subscribe(
        (response) => {
          if (response.status === 200) { // Check for HTTP 200 OK (or any other success status code)
            console.log('response:', response);
            this.message = 'Password Change request is sent. Please open your email.';
          } else {
            this.handleApiError('Password Change request failed. Please try again later.');
          }
        },
        (error) => {
          console.error('Error sending email', error);
          this.handleApiError('An error occurred while sending the email. Please try again later.');
        }
      );
    } else {
      this.message = 'Invalid email format';
    }
  }
  
  private handleApiError(errorMessage: string) {
    this.message = errorMessage;
  }
  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email) && email.endsWith('vertexspecial.com');
  }
}
