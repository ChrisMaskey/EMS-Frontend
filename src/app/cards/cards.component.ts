import { Component, inject, Renderer2, ElementRef } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Employee } from '../Model/employee.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  private searchService = inject(SearchService);
  visible = false;
  employees: Employee[] = [];
  filteredEmployees: any[] = [];
  
  // filteredDepartment: any[] = this.employe;
  // filteredCountry: any[] = this.employees;

  isModalOpen = false;
  selectedEmployee: any;
  selectedCountry: any;
  selectedDepartment: any;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.searchService.getEmployeeData().subscribe((data:any) => {
      this.employees = data;
      this.filteredEmployees = data;
    })
    this.searchService.searchTerm$.subscribe((searchedTerm) => {

      this.filteredEmployees = this.employees.filter((employee) =>{
        return employee.firstName.includes(searchedTerm) || String(employee.address).includes(searchedTerm) || employee.country.includes(searchedTerm) || employee.jobDepartment.includes(searchedTerm)
       } );

      
      


    });
  }

 

  showDialog(employee: any) {
    this.visible = true;
    this.selectedEmployee = employee;
    this.renderer.addClass(
      this.el.nativeElement.querySelector('.card-holder'),
      'blur-background'
    );
  }

  hideDialog() {
    this.visible = false;
    this.selectedEmployee = null;
    this.renderer.removeClass(
      this.el.nativeElement.querySelector('.card-holder'),
      'blur-background'
    );
  }
}
