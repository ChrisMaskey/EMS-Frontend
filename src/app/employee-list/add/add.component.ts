import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { addEmployee } from 'src/app/Model/addEmployee.model';
import { EmployeeDataService } from 'src/app/services/employee-data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  employees: addEmployee[] = [];
  date: Date | undefined;
  @Output() visible: EventEmitter<void> = new EventEmitter<void>();
  private service = inject(EmployeeDataService);
  isRegisterButtonClicked: boolean = false;
  @Output() addSuccess = new EventEmitter<boolean>();

  addForm: FormGroup;

  constructor(public fb: FormBuilder) {
    this.addForm = this.fb.group({
      employeeNo: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, phoneNumberValidator]],
      email: [
        '',
        [Validators.required, Validators.email, vertexEmailValidator()],
      ],
      password: ['', [Validators.required, passwordValidator]],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      jobLevel: ['', Validators.required],
      jobDepartment: ['', Validators.required],
      jobType: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isRegisterButtonClicked = true;
    if (this.addForm.valid) {
      var date = new Date(this.addForm.get('birthDate')?.value);
      var year = date.getFullYear();
      var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      var day = date.getDate().toString().padStart(2, '0');
      var dateFormat = year + '-' + month + '-' + day;

      const employee: addEmployee = {
        employeeNo: this.addForm.get('employeeNo')?.value,
        firstName: this.addForm.get('firstName')?.value,
        middleName: this.addForm.get('middleName')?.value,
        lastName: this.addForm.get('lastName')?.value,
        phoneNumber: this.addForm.get('phoneNumber')?.value,
        email: this.addForm.get('email')?.value,
        password: this.addForm.get('password')?.value,
        birthDate: dateFormat,
        gender: this.addForm.get('gender')?.value,
        bloodGroup: this.addForm.get('bloodGroup')?.value,
        jobLevel: this.addForm.get('jobLevel')?.value,
        jobDepartment: this.addForm.get('jobDepartment')?.value,
        jobType: this.addForm.get('jobType')?.value,
        city: this.addForm.get('city')?.value,
        state: this.addForm.get('state')?.value,
        country: this.addForm.get('country')?.value,
      };
      this.service
        .addEmployee(employee)
        .then(() => {
          this.addSuccess.emit(true);
          this.addForm.reset();
          this.addForm.get('employeeNo')?.setValue('');
          this.addForm.get('firstName')?.setValue('');
          this.addForm.get('middleName')?.setValue('');
          this.addForm.get('lastName')?.setValue('');
          this.addForm.get('phoneNumber')?.setValue('');
          this.addForm.get('email')?.setValue('');
          this.addForm.get('password')?.setValue('');
          this.addForm.get('birthdate')?.setValue('');
          this.addForm.get('gender')?.setValue('');
          this.addForm.get('bloodGroup')?.setValue('');
          this.addForm.get('jobLevel')?.setValue('');
          this.addForm.get('jobDepartment')?.setValue('');
          this.addForm.get('jobType')?.setValue('');
          this.addForm.get('city')?.setValue('');
          this.addForm.get('state')?.setValue('');
          this.addForm.get('country')?.setValue('');
          this.isRegisterButtonClicked = false;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  onRegisterClick() {
    if (this.addForm.valid) {
      this.visible.emit();
    }
  }

  getPhoneNumberErrors() {
    const phoneNumberControl = this.addForm.get('phoneNumber');

    if (phoneNumberControl?.hasError('required')) {
      return 'Phone Number is required.';
    }

    if (phoneNumberControl?.hasError('invalidPhoneNumber')) {
      return 'Phone Number must be exactly 10 digits.';
    }

    return '';
  }
}

// function vertexEmailValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const email = control.value as string;
//     if (!email.endsWith('@vertexspecial.com')) {
//       return { vertexSpecialEmail: true };
//     }
//     return null;
//   };
// }

function vertexEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value as string;
    if (email && !email.endsWith('@vertexspecial.com')) {
      return { vertexSpecialEmail: true };
    }

    return null;
  };
}

function phoneNumberValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const phoneNumber = control.value;
  const isValid = /^\d{10}$/.test(phoneNumber);

  return isValid ? null : { invalidPhoneNumber: true };
}

function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.value;

  // Regular expressions for password criteria
  const lengthRegex = /.{8,}/;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

  // Check if the password meets all criteria
  const isValid =
    lengthRegex.test(password) &&
    uppercaseRegex.test(password) &&
    lowercaseRegex.test(password) &&
    digitRegex.test(password) &&
    specialCharRegex.test(password);

  // Return an error object if the password is not valid
  return isValid ? null : { invalidPassword: true };
}
