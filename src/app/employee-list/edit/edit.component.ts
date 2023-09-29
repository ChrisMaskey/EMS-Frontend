import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
import { from } from 'rxjs';
import { editEmployee } from 'src/app/Model/editEmployee.model';
import { Employee } from 'src/app/Model/employee.model';
import { EmployeeDataService } from 'src/app/services/employee-data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @Input() employees: Employee | null = null;
  employee: Employee | null = null;
  date: Date | undefined;
  @Output() visible: EventEmitter<void> = new EventEmitter<void>();
  private service = inject(EmployeeDataService);
  isRegisterButtonClicked: boolean = false;

  editForm: FormGroup;

  ngOnInit() {
    console.log('from employee');
    console.log(this.employees);
    if (this.employees) {
      this.loadUserDataForEdit(this.employees.id);
    }
  }

  constructor(public fb: FormBuilder) {
    this.editForm = this.fb.group({
      employeeNo: [this.employees?.employeeNo || '', Validators.required],
      firstName: [this.employees?.firstName || '', Validators.required],
      middleName: [this.employees?.middleName || ''],
      lastName: [this.employees?.lastName || '', Validators.required],
      phoneNumber: [
        this.employees?.phoneNumber,
        [Validators.required, phoneNumberValidator],
      ],
      email: [
        this.employees?.email,
        [Validators.required, Validators.email, vertexEmailValidator()],
      ],
      password: [this.employees?.password, Validators.required],
      birthDate: [this.employees?.birthDate, Validators.required],
      gender: ['', Validators.required],
      bloodGroup: [this.employees?.bloodGroup, Validators.required],
      jobLevel: [this.employees?.jobLevel, Validators.required],
      jobDepartment: [this.employees?.jobDepartment, Validators.required],
      jobType: [this.employees?.jobType, Validators.required],
      city: [this.employee?.city, Validators.required],
      state: [this.employee?.state, Validators.required],
      country: [this.employee?.country, Validators.required],
    });
  }

  async onSubmit() {
    this.isRegisterButtonClicked = true;
    if (this.editForm.valid) {
      const employeeData: Employee = this.editForm.value;
      if (this.employee) {
        await this.service.updateEmployee(this.employee.id, employeeData);
      }
    }
  }

  onRegisterClick() {
    if (this.editForm.valid) {
      this.visible.emit();
    }
  }

  loadUserDataForEdit(id: string) {
    from(this.service.getEmployeeById(id)).subscribe(
      (user: editEmployee) => {
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
      },
      (error) => {
        console.log(error);
      }
    );
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
