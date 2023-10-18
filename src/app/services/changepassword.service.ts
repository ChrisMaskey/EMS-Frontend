import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { changePassword } from '../Model/changePassword.model';

@Injectable({
  providedIn: 'root',
})
export class changePasswordService {
  inputFields: changePassword[] = [];

  readonly apiUrl = 'https://vertex90-001-site1.atempurl.com';

  constructor(private http: HttpClient) {}

  changePassword(credentials: changePassword): Observable<void | undefined> {
    const url = `${this.apiUrl}/api/Auth/change-password?userId=${credentials.userId}`;
    return this.http.post<void>(url, credentials);
  }
}
