import { Component, inject } from '@angular/core';
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
  private service = inject(EmployeeDataService);

  addForm: FormGroup;

  constructor(public fb: FormBuilder, private router: Router) {
    this.addForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
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
    if (this.addForm.valid) {
      const employee: Employee = {
        firstName: this.addForm.get('firstName')?.value,
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
        employeeNo: '',
        middleName: '',
      };
      this.service.addEmployee(employee);
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
