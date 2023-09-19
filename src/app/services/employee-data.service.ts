import { Injectable } from '@angular/core';
import { Employee } from '../Model/employee.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDataService {
  private employees: Employee[] = [];
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  //CRUD

  getEmployeeData(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + '/lists');
  }

  // getEmployeeDataId(id: number): Employee | undefined {
  //   return this.employeeData.find((emp) => emp.id === id);
  // }

  // addEmployeeData(employee: Employee) {
  //   employee.id = this.idCounter++;
  //   this.employeeData.push(employee);
  // }

  // deleteEmployeeData(id: number) {
  //   let index = this.employeeData.findIndex((emp) => emp.id === id);
  //   if (index !== -1) {
  //     this.employeeData.splice(index, 1);
  //   }
  // }

  // updateEmployeeData(id: number, updatedEmployeeData: Employee) {
  //   let index = this.employeeData.findIndex((emp) => emp.id === id);
  //   if (index !== -1) this.employeeData[index] = updatedEmployeeData;
  // }
}
