import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { addEmployee } from 'src/app/Model/addEmployee.model';
import { Employee } from 'src/app/Model/employee.model';
import { EmployeeDataService } from 'src/app/services/employee-data.service';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css'],
  providers: [MessageService],
})
export class SuperadminComponent {
  employees: Employee[] = [];
  private employeeDataService = inject(EmployeeDataService);
  protected employeeList$ = this.employeeDataService.employeeList$;
  protected employee$ = this.employeeDataService.employee$;
  protected addEmployee$ = this.employeeDataService.employee$;
  protected assignRole$ = this.employeeDataService.assignRole$;

  visible: boolean = false;
  editDialogVisible: boolean = false;
  visibleDeleteDialog: boolean = false;
  assignDialogVisible: boolean = false;
  addSuccessful: boolean = false;
  deleteSuccessful: boolean = false;
  editSuccessful: boolean = false;
  hideSuccessful: boolean = false;
  assignSuccessful: boolean = false;

  deleteId: string = '';

  assignForm: FormGroup;

  constructor(private messageService: MessageService, private fb: FormBuilder) {
    this.assignForm = this.fb.group({
      employee: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  async ngOnInit() {
    await this.employeeDataService.getEmployeeData();
  }

  async getEmployeeById(id: string) {
    await this.employeeDataService.getEmployeeById(id);
  }

  async addEmployee(employee: addEmployee) {
    await this.employeeDataService.addEmployee(employee);
  }

  async updateEmployee(id: string, employee: Employee) {
    await this.employeeDataService.updateEmployee(id, employee);
  }

  async assignRole(id: string, role: string) {
    const hello = this.assignForm.get('employee')?.value;
    const bye = this.assignForm.get('role')?.value;
    console.log('ID:', hello);
    console.log('Role:', bye);
    await this.employeeDataService.assignRole(id, role);
    if (this.assignForm.valid) {
      this.assignForm.reset();
      this.hideAssignDialog();
    }
    this.messageService.add({
      severity: 'success',
      summary: 'Info',
      detail: 'Role Successfully Assigned.',
    });
    setTimeout(() => {
      this.assignSuccessful = false;
    }, 3500);

    // if (this.assignForm.valid) {
    //   await this.employeeDataService
    //     .assignRole(id, role)
    //     .then(() => {
    //       this.assignForm.reset();
    //       this.hideAssignDialog();
    //       this.assignSuccessful = true;
    //       this.messageService.add({
    //         severity: 'success',
    //         summary: 'Info',
    //         detail: 'Role Successfully Assigned.',
    //       });
    //       setTimeout(() => {
    //         this.assignSuccessful = false;
    //       }, 3500);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  }

  deleteEmployeeData(id: string) {
    this.employeeDataService.deleteEmployee(id);
    this.deleteSuccessful = true;
    this.messageService.add({
      severity: 'error',
      summary: 'Info',
      detail: 'Employee Successfully Deleted.',
    });
    setTimeout(() => {
      this.deleteSuccessful = false;
    }, 3500);
  }

  // deleteEmployeeData(id: string) {
  //   this.employeeDataService
  //     .deleteEmployee(id)
  //     .then(() => {
  //       this.deleteSuccessful = true;
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Info',
  //         detail: 'Employee Successfully Deleted.',
  //       });
  //       setTimeout(() => {
  //         this.deleteSuccessful = false;
  //       }, 3500);
  //     })
  //     .catch((error) => {
  //       // Handle the error here, e.g., display an error message.
  //       console.error('Error deleting employee:', error);
  //     });
  // }

  showDialog() {
    this.visible = true;
  }

  showDialogEdit(id: string) {
    this.employeeDataService.getEmployeeById(id);
    this.editDialogVisible = true;
  }

  showDialogDelete(id: string) {
    this.deleteId = id;
    this.visibleDeleteDialog = true;
  }

  showDialogAssign() {
    this.assignDialogVisible = true;
  }

  hideDialog() {
    this.visible = false;
  }

  hideEditDialog() {
    this.editDialogVisible = false;
  }

  hideDeleteDialog() {
    this.visibleDeleteDialog = false;
  }

  hideAssignDialog() {
    this.assignDialogVisible = false;
  }

  onAddSuccess(event: boolean) {
    if (event) {
      this.addSuccessful = true;
      this.messageService.add({
        severity: 'success',
        summary: 'Info',
        detail: 'Employee Successfully Added.',
      });
      setTimeout(() => {
        this.addSuccessful = false;
      }, 3500);
    }
  }

  onEditSuccess(event: boolean) {
    if (event) {
      this.editSuccessful = true;
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Employee Successfully Edited.',
      });
      setTimeout(() => {
        this.editSuccessful = false;
      }, 3500);
    }
  }

  onHideSuccess(event: boolean) {
    if (event) {
      this.hideSuccessful = true;
      this.messageService.add({
        severity: 'warn',
        summary: 'Info',
        detail: 'Employee Successfully Inactivated.',
      });
      setTimeout(() => {
        this.hideSuccessful = false;
      }, 3500);
    }
  }
}
