import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor() {}

  private authToken = '';

  setAuthToken(token: string) {
    localStorage.setItem(this.authToken, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authToken);
  }

  clearAuthToken(): void {
    localStorage.removeItem(this.authToken);
  }
}
