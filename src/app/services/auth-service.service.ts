import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../Model/login.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'https://vertex90-001-site1.atempurl.com';
  private authToken: string | null = null;
  private authStatus = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  login(credentials: login): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.http
        .post<void>(this.apiUrl + '/api/auth/login', credentials)
        .subscribe(
          (response: any) => {
            if (response && response.code === '200' && response.data.token) {
              this.authToken = response.data.token;
              this.setAuthStatus(true);
              console.log(this.authToken);

              resolve();
            } else {
              reject(response.description);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }
  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.http
        .post<void>(this.apiUrl + '/api/Auth/Logout', {})
        .subscribe(
          (response: any) => {
            console.log('LOGOUT: ' + this.authToken);

            response.tokenValue = this.authToken;
            this.authToken = null;
            this.setAuthStatus(false);
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  setAuthToken(token: string | null) {
    this.authToken = token;
  }

  isAuthenticated(): boolean {
    return !!this.authToken;
  }

  getHeaders() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return { headers: headers };
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  private setAuthStatus(status: boolean) {
    this.authStatus.next(status);
  }
}
