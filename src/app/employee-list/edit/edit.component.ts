import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Employee } from 'src/app/Model/employee.model';
import { EmployeeDataService } from 'src/app/services/employee-data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  employee: Employee | null = null;
  date: Date | undefined;
  @Output() visible: EventEmitter<void> = new EventEmitter<void>();
  private service = inject(EmployeeDataService);
  isRegisterButtonClicked: boolean = false;

  editForm: FormGroup;

  constructor(public fb: FormBuilder) {
    this.editForm = this.fb.group({
      employeeNo: [this.employee?.employeeNo, Validators.required],
      firstName: [this.employee?.firstName, Validators.required],
      middleName: [this.employee?.middleName],
      lastName: [this.employee?.lastName, Validators.required],
      phoneNumber: [
        this.employee?.phoneNumber,
        [Validators.required, phoneNumberValidator],
      ],
      email: [
        this.employee?.email,
        [Validators.required, Validators.email, vertexEmailValidator()],
      ],
      password: [this.employee?.password, Validators.required],
      birthDate: [this.employee?.birthDate, Validators.required],
      gender: ['', Validators.required],
      bloodGroup: [this.employee?.bloodGroup, Validators.required],
      jobLevel: [this.employee?.jobLevel, Validators.required],
      jobDepartment: [this.employee?.jobDepartment, Validators.required],
      jobType: [this.employee?.jobType, Validators.required],
      city: [this.employee?.city, Validators.required],
      state: [this.employee?.state, Validators.required],
      country: [this.employee?.country, Validators.required],
    });
  }

  async onSubmit() {
    this.isRegisterButtonClicked = true;
    if (this.editForm.valid) {
      const employee: Employee = {
        employeeNo: this.editForm.get('employeeNo')?.value,
        firstName: this.editForm.get('firstName')?.value,
        middleName: this.editForm.get('middleName')?.value,
        lastName: this.editForm.get('lastName')?.value,
        phoneNumber: this.editForm.get('phoneNumber')?.value,
        email: this.editForm.get('email')?.value,
        password: this.editForm.get('password')?.value,
        birthDate: this.editForm.get('birthDate')?.value,
        gender: this.editForm.get('gender')?.value,
        bloodGroup: this.editForm.get('bloodGroup')?.value,
        jobLevel: this.editForm.get('jobLevel')?.value,
        jobDepartment: this.editForm.get('jobDepartment')?.value,
        jobType: this.editForm.get('jobType')?.value,
        city: this.editForm.get('city')?.value,
        state: this.editForm.get('state')?.value,
        country: this.editForm.get('country')?.value,
        id: '',
      };
      await this.service.updateEmployee(employee.id, employee);
    }
  }

  onRegisterClick() {
    if (this.editForm.valid) {
      this.visible.emit();
    }
  }

  getPhoneNumberErrors() {
    const phoneNumberControl = this.editForm.get('phoneNumber');

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
