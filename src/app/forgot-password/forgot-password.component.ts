import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  messageType: string = '';
  url: string = 'https://vertex-ems.netlify.app/#/reset-password';
  apiUrl = 'https://vertex90-001-site1.atempurl.com/api/Email/reset-password-link';

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.isValidEmail(this.email)) {
      const url = `${this.apiUrl}?email=${this.email}&url=${encodeURIComponent(this.url)}`;
      this.http.post(url, null, { observe: 'response', responseType: 'text' }).subscribe(
        (response) => {
          if (response.status === 200) {
            if (response.body === 'Email has been proceeded.') {
              console.log('Email has been proceeded.');
              this.messageType = 'success'; // Set messageType to 'success'
              this.message = 'Password Change request is sent. Please open your email.';
              this.hideMessageAfterDelay(3000);
            } else {
              console.error('Unexpected response:', response.body);
              this.messageType = 'error'; // Set messageType to 'error'
              this.handleApiError('Unexpected response from the server.');
            }
          } else {
            this.messageType = 'error'; // Set messageType to 'error'
            this.handleApiError('Password Change request failed. Please try again later.');
          }
        },
        (error) => {
          console.error('Error sending email', error);
          this.messageType = 'error'; // Set messageType to 'error'
          this.handleApiError('An error occurred while sending the email. Please try again later.');
        }
      );
    } else {
      this.messageType = 'error'; // Set messageType to 'error'
      this.message = 'Invalid email';
      this.hideMessageAfterDelay(3000);
    }
  }
  private handleApiError(errorMessage: string) {
    this.message = errorMessage;
    this.hideMessageAfterDelay(3000); // Hide the message after 3 seconds
  }

  private hideMessageAfterDelay(delay: number) {
    setTimeout(() => {
      this.message = '';
      this.messageType = ''; // Clear the message and message type after the specified delay
    }, delay);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email) && email.endsWith('vertexspecial.com');
  }
}
