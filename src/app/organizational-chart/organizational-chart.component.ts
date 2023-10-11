import { Component, OnInit, inject } from '@angular/core';
import { Organization } from '../Model/organization.model';
import { OrganizationService } from '../services/organization.service';
import { TreeNode } from 'primeng/api';
@Component({
  selector: 'app-organizational-chart',
  templateUrl: './organizational-chart.component.html',
  styleUrls: ['./organizational-chart.component.css']
})
export class OrganizationalChartComponent implements OnInit{

  employees: Organization[]=[];

  
  private organizationService: OrganizationService = inject(OrganizationService);
  protected employees$ = this.organizationService.employees$;


 ngOnInit() {

  this.organizationService.getEmployees();
  
   
 }

}
