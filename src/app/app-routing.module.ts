import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LoginComponent } from './login/login.component';
import { CardComponent } from './card/card.component';
import { AddComponent } from './employee-list/add/add.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { SuperadminComponent } from './employee-list/superadmin/superadmin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from './guard/authguard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'list', component: EmployeeListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add', component: AddComponent },
  { path: 'card', component: CardComponent, canActivate: [AuthGuard] },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'hierarchy', component: HierarchyComponent, canActivate: [AuthGuard] },
  { path: 'superadmin', component: SuperadminComponent },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
