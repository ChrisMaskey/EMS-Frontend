import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { login } from '../Model/login.model';
import { LogoutService } from './logout.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  logins: login[] = [];

  readonly apiUrl = 'https://vertex90-001-site1.atempurl.com';

  constructor(private http: HttpClient) {}

  login(credentials: login): Observable<void | undefined> {
    return this.http.post<void>(this.apiUrl + '/api/auth/login', credentials);
  }

  // login(credentials: login): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     return this.http.post<void>(this.apiUrl + '/api/auth/login', credentials).subscribe((response: any) => {
  //       if (response && response.code === '200') {
  //         this.setToken(response.data.token);
  //       }
  //     });
  //   });
  // }
}
