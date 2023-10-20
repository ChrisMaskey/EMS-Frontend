import { Component, OnInit } from '@angular/core';
import { changePasswordService } from '../services/changepassword.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: 'change-password.component.html',
  styleUrls: ['change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  userId!: string | null;
  message: string = '';
  messageType: string = '';

  constructor(
    private changePasswordService: changePasswordService,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    console.log(this.userId);
  }

  onSubmit() {
    if (this.currentPassword.trim() === '' || this.newPassword.trim() === '' || this.confirmPassword.trim() === '') {
      this.message = 'All password fields are required.';
      this.messageType = 'error';
      this.clearMessageAfterTimeout(3000);
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match';
      this.messageType = 'error';
      this.clearMessageAfterTimeout(3000);
      return;
    }

    if (this.userId) {
      if (!this.isPasswordValid(this.newPassword)) {
        this.message = 'Password must contain at least one digit, one lowercase character, one special character, one uppercase character, and be at least 8 characters long.';
        this.messageType = 'error';
        this.clearMessageAfterTimeout(3000);
        return;
      }

      this.changePasswordService.changePassword({
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
        userId: this.userId,
      }).subscribe(
        () => {
          console.log('Password Successfully Changed');
          this.message = 'Password Successfully Changed';
          this.messageType = 'success';
          this.clearMessageAfterTimeout(3000);
        },
        (error) => {
          console.log('Invalid password');
          this.message = 'Cureent password is incorrect';
          this.messageType = 'error';
          this.clearMessageAfterTimeout(3000);
        }
      );
    } else {
      this.message = 'User ID not available.';
      this.messageType = 'error';
      this.clearMessageAfterTimeout(3000);
    }
  }

  clearMessageAfterTimeout(timeout: number) {
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, timeout);
  }

  isPasswordValid(password: string): boolean {
    // Password validation logic
    const digitRegex = /\d/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*]/;

    return (
      password.length >= 8 &&
      digitRegex.test(password) &&
      lowercaseRegex.test(password) &&
      uppercaseRegex.test(password) &&
      specialCharRegex.test(password)
    );
  }
}