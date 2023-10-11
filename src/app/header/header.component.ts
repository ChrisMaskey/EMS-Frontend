import { AfterViewInit, Component } from '@angular/core';
import { LogoutService } from '../services/logout.service';
import { Route, Router } from '@angular/router';

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
  // constructor(private authService: LogoutService, private router: Router) {}
  // logout(): void {
  //   this.authService.clearAuthToken();
  //   this.router.navigate(['/login']);
  // }
}
