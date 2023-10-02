import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Model/employee.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  // employee: Employee[] = [];

  private apiUrl = 'https://vertex90-001-site1.atempurl.com';

  private employeeSubject = new BehaviorSubject<Employee[] | null>(null);
  public employee$ = this.employeeSubject.asObservable();
  

  constructor(private http: HttpClient) {}

  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      this.apiUrl + '/api/User/get-all-employees'
    );
 
  }

  // getEmployee():Promise<void> {
  //   return new Promise((resolve,reject) => {
  //     return this.http.get<Employee[]>( this.apiUrl + '/api/User/get-all-employees').subscribe((data:Employee[]) => {
  //       this.employeeSubject.next(data)
  //     })
  //   })
  }


// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Employee } from '../Model/employee.model';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class CardService {
//   employee: Employee[] = [];

//   private apiUrl = 'https://vertex90-001-site1.atempurl.com';

//   constructor(private http: HttpClient) {}

//   getEmployee(): Observable<Employee[]> {
//     return this.http.get<Employee[]>(
//       this.apiUrl + '/api/User/get-all-employees'
//     );
//   }
// }