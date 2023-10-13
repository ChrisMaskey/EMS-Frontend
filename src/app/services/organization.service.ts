import { Injectable } from '@angular/core';
import { Organization } from '../Model/organization.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {


  private employeesSubject = new BehaviorSubject<Organization[]>([]);
  public employees$ = this.employeesSubject.asObservable();

  private employees: Organization[]= [ {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    jobLevel: 'Manager',
    reportsTo: '2', 
  },
  {
    id: '2',
    firstName: 'Alice',
    lastName: 'Smith',
    jobLevel: 'CEO',
    reportsTo: '', 
  },
  {
    id: '3',
    firstName: 'Mary',
    lastName: 'Johnson',
    jobLevel: 'Supervisor',
    reportsTo: '2', 
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Wilson',
    jobLevel: 'Manager',
    reportsTo: '2', 
  },
  {
    id: '5',
    firstName: 'Emily',
    lastName: 'Brown',
    jobLevel: 'Associate',
    reportsTo: '1', 
  },];
 

  getEmployees(){
    this.employeesSubject.next(this.employees);
  }

}
