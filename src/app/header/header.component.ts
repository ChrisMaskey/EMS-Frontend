import { AfterViewInit, Component } from '@angular/core';
import { LogoutService } from '../services/logout.service';
import { Route, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // visible: boolean = false;
  // hideDialog() {
  //   this.visible = false;
  // }
  // showDialog() {
  //   this.visible = true;
  // }
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['login']);
    });
  }
}
