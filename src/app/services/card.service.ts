import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Model/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  employee: Employee[] = [];

  private apiUrl = 'http://vertex90-001-site1.atempurl.com';

  constructor(private http: HttpClient) {}

  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      this.apiUrl + '/api/Employee/get-all-employees'
    );
  }
}
