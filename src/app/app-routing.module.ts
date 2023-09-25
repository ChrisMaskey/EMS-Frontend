import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LoginComponent } from './login/login.component';
import { CardComponent } from './card/card.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'list', component: EmployeeListComponent },
  { path: 'list', component: EmployeeListComponent },
  { path: 'login', component: LoginComponent },
  {path: 'home', component: CardComponent},
  {path: 'card', component: CardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

