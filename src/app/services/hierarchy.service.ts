import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hierarchy } from '../Model/Hierarchy.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HierarchyService {
  // private employeeSubject = new BehaviorSubject<Hierarchy[]>([]);
  // public employee$ = this.employeeSubject.asObservable();

  // private employees: Hierarchy[]= [

  //   { id: '1', name: 'CEO' },
  //   { id: '2', name: 'Manager 1', reportsTo: '1' },
  //   { id: '3', name: 'Manager 2', reportsTo: '1' },
  //   { id: '4', name: 'Employee 1A', reportsTo: '2' },
  //   { id: '5', name: 'Employee 1B', reportsTo: '2' },
  //   { id: '6', name: 'Employee 2A', reportsTo: '3' },
  //   { id: '7', name: 'Employee 2B', reportsTo: '3' },
  // ];


  // getEmployees(){
  //   this.employeeSubject.next(this.employees);
  // }
  

  // constructor() { }

//   private apiUrl = 'https://vertex90-001-site1.atempurl.com/api/User/get-all-employees';

//   private hierarchySubject = new BehaviorSubject<Hierarchy[]>([]);
//   hierarchy$: Observable<Hierarchy[]> = this.hierarchySubject.asObservable();

//   constructor(private http: HttpClient) {
//     this.getHierarchy(); 
//   }

//   getHierarchy() {
//     this.http.get<Hierarchy[]>(this.apiUrl).subscribe((data) => {
//       this.hierarchySubject.next(data);
//     });
//   }
// }

private apiUrl = 'https://vertex90-001-site1.atempurl.com/api/User/get-all-employees';

constructor(private http: HttpClient) {}

getHierarchyData(): Observable<Hierarchy[]> {
  return this.http.get<Hierarchy[]>(this.apiUrl);
}
} 
