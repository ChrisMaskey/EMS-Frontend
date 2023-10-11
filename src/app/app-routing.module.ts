import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LoginComponent } from './login/login.component';
import { CardComponent } from './card/card.component';
import { AddComponent } from './employee-list/add/add.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TestComponent } from './test/test.component';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { OrganizationalChartComponent } from './organizational-chart/organizational-chart.component';
import { SuperadminComponent } from './employee-list/superadmin/superadmin.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'list', component: EmployeeListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add', component: AddComponent },
  { path: 'home', component: CardComponent },
  { path: 'card', component: CardComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'test', component: TestComponent},
  {path: 'hierarchy', component: HierarchyComponent},
  {path:'organizational-chart', component: OrganizationalChartComponent },
  { path: 'test', component: TestComponent },
  { path: 'superadmin', component: SuperadminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
