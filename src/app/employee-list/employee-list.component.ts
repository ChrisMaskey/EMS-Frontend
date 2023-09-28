import { Component, OnInit, inject } from '@angular/core';
import { Employee } from '../Model/employee.model';
import { EmployeeDataService } from 'src/app/services/employee-data.service';
import { addEmployee } from '../Model/addEmployee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  private employeeDataService = inject(EmployeeDataService);
  protected employeeList$ = this.employeeDataService.employeeList$;
  protected employee$ = this.employeeDataService.employee$;
  protected addEmployee$ = this.employeeDataService.employee$;

  visible: boolean = false;
  visibleEdit: boolean = false;

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

  async deleteEmployeeData(id: string) {
    await this.employeeDataService.deleteEmployee(id);
  }

  showDialog() {
    this.visible = true;
  }

  showDialogEdit() {
    this.visibleEdit = true;
  }

  hideDialog() {
    this.visible = false;
  }

  hideDialogEdit() {
    this.visibleEdit = false;
  }
}
