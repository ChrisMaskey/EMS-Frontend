import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Model/employee.model';
import { EmployeeDataService } from 'src/app/services/employee-data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  date: Date | undefined;
  @Output() visible: EventEmitter<void> = new EventEmitter<void>();
  private service = inject(EmployeeDataService);
  isRegisterButtonClicked: boolean = false;

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
      password: ['', Validators.required],
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
      const employee: Employee = {
        employeeNo: this.addForm.get('employeeNo')?.value,
        firstName: this.addForm.get('firstName')?.value,
        middleName: this.addForm.get('middleName')?.value,
        lastName: this.addForm.get('lastName')?.value,
        phoneNumber: this.addForm.get('phoneNumber')?.value,
        email: this.addForm.get('email')?.value,
        password: this.addForm.get('password')?.value,
        birthDate: this.addForm.get('birthDate')?.value,
        gender: this.addForm.get('gender')?.value,
        bloodGroup: this.addForm.get('bloodGroup')?.value,
        jobLevel: this.addForm.get('jobLevel')?.value,
        jobDepartment: this.addForm.get('jobDepartment')?.value,
        jobType: this.addForm.get('jobType')?.value,
        city: this.addForm.get('city')?.value,
        state: this.addForm.get('state')?.value,
        country: this.addForm.get('country')?.value,
        id: '',
      };
      this.service
        .addEmployee(employee)
        .then(() => {
          this.addForm.reset();
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

function vertexEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value as string;
    if (!email.endsWith('@vertexspecial.com')) {
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
