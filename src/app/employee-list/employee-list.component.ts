import { Component, OnInit, inject } from '@angular/core';
import { Employee } from '../Model/employee.model';
import { EmployeeDataService } from 'src/app/services/employee-data.service';
import { addEmployee } from '../Model/addEmployee.model';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [MessageService],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  private employeeDataService = inject(EmployeeDataService);
  protected employeeList$ = this.employeeDataService.employeeList$;
  protected employee$ = this.employeeDataService.employee$;
  protected addEmployee$ = this.employeeDataService.employee$;

  visible: boolean = false;
  editDialogVisible: boolean = false;
  visibleDeleteDialog: boolean = false;
  addSuccessful: boolean = false;
  deleteSuccessful: boolean = false;
  editSuccessful: boolean = false;
  hideSuccessful: boolean = false;

  deleteId: string = '';

  constructor(private messageService: MessageService) {}

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

  // async deleteEmployeeData(id: string) {
  //   await this.employeeDataService.deleteEmployee(id);
  //   this.deleteSuccessful = true;
  //   setTimeout(() => {
  //     this.deleteSuccessful = false;
  //   }, 3500);
  // }

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

  hideDialog() {
    this.visible = false;
  }

  hideEditDialog() {
    this.editDialogVisible = false;
  }

  hideDeleteDialog() {
    this.visibleDeleteDialog = false;
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
