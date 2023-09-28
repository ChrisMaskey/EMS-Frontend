import { Injectable } from '@angular/core';
import { Employee } from '../Model/employee.model';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { addEmployee } from '../Model/addEmployee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDataService {
  // private employees: Employee[] = [];
  private apiUrl = 'https://vertex90-001-site1.atempurl.com';

  private employeeListSubject = new BehaviorSubject<Employee[]>([]);
  private employeeSubject = new BehaviorSubject<Employee | null>(null);
  private addEmployeeSubject = new BehaviorSubject<addEmployee | null>(null);
  readonly employeeList$ = this.employeeListSubject.asObservable();
  readonly employee$ = this.employeeSubject.asObservable();
  readonly addEmployee$ = this.employeeSubject.asObservable();

  constructor(private http: HttpClient) {}

  //CRUD

  getEmployeeData(): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.http
        .get<Employee[]>(this.apiUrl + '/api/User/get-all-employees')
        .subscribe((data) => {
          this.employeeListSubject.next(data);
        });
    });
  }

  getEmployeeById(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.http
        .get<Employee>(this.apiUrl + '/api/User/get-employee/' + id)
        .subscribe((data) => {
          this.employeeSubject.next(data);
          resolve();
        });
    });
  }

  addEmployee(employee: addEmployee): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.http
        .post<addEmployee>(this.apiUrl + '/api/User/add-employee', employee)
        .subscribe((data) => {
          this.addEmployeeSubject.next(data);
          resolve();
        });
    });
  }

  updateEmployee(id: string, employee: Employee): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.http
        .put<Employee>(
          this.apiUrl + '/api/User/update-employee/' + id,
          employee
        )
        .subscribe((data) => {
          this.employeeSubject.next(data);
          resolve();
        });
    });
  }

  deleteEmployee(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.http
        .delete<void>(this.apiUrl + '/api/User/remove-user/' + id)
        .subscribe();
    });
  }
}
