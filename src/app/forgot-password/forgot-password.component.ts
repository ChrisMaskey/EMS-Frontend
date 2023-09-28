import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  apiUrl = 'https://vertex90-001-site1.atempurl.com/api/Auth/forgot-password';

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.isValidEmail(this.email)) {
      const url = `${this.apiUrl}?email=${this.email}`;

      this.http.post(url, null).subscribe(
        (response: any) => {
          // Handle the API response (e.g., show a success message)
          console.log(response);
          if (response.status === 'Success') {
            alert('Password Change request is sent. Please open your email.');
          }
        },
        (error) => {
          console.error('Error sending email', error);
        }
      );
    } else {
      console.error('Invalid email format');
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email) && email.endsWith('vertexspecial.com');
  }
}
