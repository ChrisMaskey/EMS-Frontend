import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
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
import { Employee } from 'src/app/Model/employee.model';
import { EmployeeDataService } from 'src/app/services/employee-data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnChanges {
  @Input() employees: Employee | null = null;
  // employee: Employee | null = null;
  date: Date | undefined;
  @Output() visible: EventEmitter<void> = new EventEmitter<void>();
  private service = inject(EmployeeDataService);
  isRegisterButtonClicked: boolean = false;
  protected employee$ = this.service.employee$;
  visibleDialog: boolean = false;

  editForm: FormGroup;

  ngOnChanges() {
    if (this.employees) {
      console.log(this.employees);
      this.loadUserDataForEdit(this.employees);
    }
  }

  constructor(public fb: FormBuilder) {
    this.editForm = this.fb.group({
      employeeNo: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, phoneNumberValidator]],
      email: [
        '',
        [Validators.required, Validators.email, vertexEmailValidator()],
      ],
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

  async onEdit() {
    this.isRegisterButtonClicked = true;
    if (this.editForm.valid && this.employees) {
      const employeeData: Employee = this.editForm.value;
      await this.service.updateEmployee(this.employees.id, employeeData);
    }
  }

  // async onEdit() {
  //   this.isRegisterButtonClicked = true;
  //   if (this.editForm.valid) {
  //     if (this.employee) {
  //       await this.service.updateEmployee(
  //         this.employee.id,
  //         this.editForm.value
  //       );
  //     }
  //   }
  // }

  onRegisterClick() {
    if (this.editForm.valid) {
      this.visible.emit();
    }
  }

  loadUserDataForEdit(user: Employee) {
    this.editForm.patchValue({
      employeeNo: user.employeeNo,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password,
      birthDate: user.birthDate,
      gender: user.gender,
      bloodGroup: user.bloodGroup,
      jobLevel: user.jobLevel,
      jobDepartment: user.jobDepartment,
      jobType: user.jobType,
      city: user.city,
      state: user.state,
      country: user.country,
    });
  }

  hideEmployee(id: string, employees: Employee) {
    if (this.employees) {
      id = this.employees?.id;
      employees = this.employees;
      this.service.hideEmployee(id, employees);
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

  showDialog() {
    this.visibleDialog = true;
  }

  hideDialog() {
    this.visibleDialog = false;
  }
}

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
