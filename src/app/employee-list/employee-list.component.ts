import { Component, OnInit } from '@angular/core';
import { Employee } from '../Model/employee.model';
import { EmployeeDataService } from 'src/app/services/employee-data.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeDataService: EmployeeDataService) {}

  ngOnInit() {
    return this.employeeDataService
      .getEmployeeData()
      .subscribe((res) => (this.employees = res));
    console.log('Create Data Proccessed');
  }

  // deleteEmployeeData(id: number){
  //   this.employeeDataService.deleteEmployeeData(id);
  // }
}
