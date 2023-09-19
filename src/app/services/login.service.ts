import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { login } from '../Model/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  logins: login[] = [];

  readonly apiUrl = 'http://vertex90-001-site1.atempurl.com';

  constructor(private http: HttpClient) {}

  login(credentials: login): Observable<void | undefined> {
    return this.http.post<void>(this.apiUrl + '/api/auth/login', credentials);
  }
}
