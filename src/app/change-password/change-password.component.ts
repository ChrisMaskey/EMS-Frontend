import { Component, OnInit } from '@angular/core';
import { changePassword } from '../Model/changePassword.model';
import { changePasswordService } from '../services/changepassword.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: 'change-password.component.html',
  styleUrls: ['change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePassword: changePassword[] = [];
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
    console.log(this.userId)
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match';
      this.messageType = 'error';
      this.clearMessageAfterTimeout(3000); 
      return;
    }

    if (this.userId) {
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
          this.message = 'Invalid password';
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
}
