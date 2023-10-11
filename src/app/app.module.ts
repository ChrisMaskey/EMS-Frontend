import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { SearchService } from './services/search.service';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './card/card.component';
import { AddComponent } from './employee-list/add/add.component';
import { CalendarModule } from 'primeng/calendar';
import { EditComponent } from './employee-list/edit/edit.component';
import { CardsComponent } from './cards/cards.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmployeeDataService } from './services/employee-data.service';
import { ToastModule } from 'primeng/toast';
import { OrganizationChartModule,OrganizationChartNode} from 'primeng/organizationchart';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TestComponent } from './test/test.component';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { HierarchyService } from './services/hierarchy.service';
import { OrganizationService } from './services/organization.service';
import { SuperadminComponent } from './employee-list/superadmin/superadmin.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeeListComponent,
    FooterComponent,
    SearchComponent,
    CardComponent,
    AddComponent,
    EditComponent,
    CardsComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    TestComponent,
    HierarchyComponent,
    SuperadminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    DropdownModule,
    BrowserAnimationsModule,
    CalendarModule,
    ToastModule,
    OrganizationChartModule,
  ],
  providers: [SearchService, EmployeeDataService, HierarchyService, OrganizationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
