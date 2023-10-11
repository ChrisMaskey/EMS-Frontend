import { Injectable } from '@angular/core';
import { Employee } from '../Model/employee.model';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { addEmployee } from '../Model/addEmployee.model';
import { editEmployee } from '../Model/editEmployee.model';
import { Role } from '../Model/role.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDataService {
  private apiUrl = 'https://vertex90-001-site1.atempurl.com';

  private employeeListSubject = new BehaviorSubject<Employee[]>([]);
  private employeeSubject = new BehaviorSubject<Employee | null>(null);
  private addEmployeeSubject = new BehaviorSubject<addEmployee | null>(null);
  private assignRoleSubject = new BehaviorSubject<Role>({ id: '', role: '' });
  readonly employeeList$ = this.employeeListSubject.asObservable();
  readonly employee$ = this.employeeSubject.asObservable();
  readonly addEmployee$ = this.employeeSubject.asObservable();
  readonly assignRole$ = this.assignRoleSubject.asObservable();

  constructor(private http: HttpClient) {}

  //CRUD

  getEmployeeData(): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.http
        .get<Employee[]>(this.apiUrl + '/api/User/get-all-employees')
        .subscribe((data: any) => {
          this.employeeListSubject.next(data.data);
        });
    });
  }

  getEmployeeById(id: string): Promise<editEmployee> {
    return new Promise((resolve, reject) => {
      return this.http
        .get<Employee>(this.apiUrl + '/api/User/get-employee/' + id)
        .subscribe((response: any) => {
          this.employeeSubject.next(response.data);
        });
    });
  }

  addEmployee(employee: addEmployee): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.http
        .post<addEmployee>(this.apiUrl + '/api/User/add-employee', employee)
        .subscribe(
          (response: any) => {
            this.addEmployeeSubject.next(response.employee);
            this.getEmployeeData();
            resolve();
          },
          (error) => {
            console.log(error);
            reject(error);
          }
        );
    });
  }

  updateEmployee(id: string, employee: Employee): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.http
        .put<Employee>(
          this.apiUrl + '/api/User/update-employee?Id=' + id,
          employee
        )
        .subscribe(
          (data: any) => {
            this.getEmployeeData();
          },
          (error) => {}
        );
    });
  }

  deleteEmployee(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.http
        .delete<void>(this.apiUrl + '/api/User/remove-user?Id=' + id)
        .subscribe(
          () => {
            this.getEmployeeData();
          },
          (error) => {}
        );
    });
  }

  hideEmployee(id: string, employee: Employee): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.http
        .put<Employee>(this.apiUrl + '/api/User/hide-user?Id=' + id, employee)
        .subscribe(
          (data: any) => {
            this.employeeSubject.next(data.data);
            this.getEmployeeData();
          },
          (error) => {}
        );
    });
  }

  // assignRole(id: string, role: string): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     return this.http
  //       .post<Role>(this.apiUrl + '/api/User/assign-role', {
  //         Id: id,
  //         Role: role,
  //       })
  //       .subscribe(
  //         (response: any) => {
  //           if (response.code === '200') {
  //             this.assignRoleSubject.next(response.data);
  //             resolve();
  //           } else {
  //             reject(`Error: ${response.description}`);
  //           }
  //         },
  //         (error: any) => {
  //           reject(error);
  //         }
  //       );
  //   });
  // }

  assignRole(id: string, role: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.apiUrl}/api/User/assign-role?Id=${id}&role=${role}`;

      this.http.post(url, null).subscribe(
        (response: any) => {
          if (response.code === '200') {
            this.assignRoleSubject.next(response.data);
            resolve();
          } else {
            reject(`Error: ${response.description}`);
          }
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }
}
