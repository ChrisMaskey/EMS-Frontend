import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from '../Model/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private apiUrl = 'http://vertex90-001-site1.atempurl.com';

  loginForm: FormGroup;

  showInvalidMessage = '';

  constructor(
    public fb: FormBuilder,
    private service: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, vertexEmailValidator()],
      ],
      password: ['', Validators.required],
    });
  }

  //Custom Error Message
  errorMessage = {
    email: {
      required: 'Email is required.',
    },
    password: {
      required: 'Password is required.',
    },
  };

  // onLogin() {
  //   this.showInvalidMessage = '';
  //   let login: login = this.loginForm.value;
  //   this.service.login(login).subscribe(
  //     (res) => {
  //       this.router.navigate(['/card']);
  //     },
  //     (err) => {
  //       //Handle Login Credentials
  //       this.showInvalidMessage = 'Invalid Login Credentials.';
  //     }
  //   );
  // }

  onLogin() {
    // Get the username and password from the form
    const login: login = this.loginForm.value;
    const email = login.email;
    const password = login.password;

    // Check if both the username and password are non-empty
    if (email.trim() !== '' && password.trim() !== '') {
      // If both fields are non-empty, attempt to log in
      this.service.login(login).subscribe(
        (res) => {
          this.router.navigate(['/list']); // Successful login
        },
        (err) => {
          // Handle invalid login credentials
          this.showInvalidMessage = 'Invalid Login Credentials.';
        }
      );
    } else {
      // If either the username or password is empty, display a message
      this.showInvalidMessage = '';
    }
  }
}

function vertexEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value as string;
    if (!email.endsWith('@vertexspecial.com')) {
      return { vertexSpecialEmail: true };
    }
    return null;
  };
}
