import { Component, inject, Renderer2, ElementRef } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Employee } from '../Model/employee.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  private searchService = inject(SearchService);
  visible = false;
  employees: Employee[] = [];
  filteredEmployees: any[] = [];



  isModalOpen = false;
  selectedEmployee: any ='';
  selectedCountry: any ='';
  selectedDepartment: any='';
  selectedJobLevel: any='';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.searchService.getEmployeeData().subscribe((data: any) => {
      this.employees = data;
      this.filteredEmployees = data;
    });

    this.searchService.searchTerm$.subscribe((searchedTerm) => {

      if (searchedTerm.key === 'country') {
        this.selectedCountry = searchedTerm.value;
      } else if (searchedTerm.key === 'jobLevel') {
        this.selectedJobLevel = searchedTerm.value;
      } else if (searchedTerm.key === 'department') {
        this.selectedDepartment = searchedTerm.value;
      }

      if (searchedTerm.source === 'input') {
        this.filteredEmployees = this.employees.filter((employee) => {
          const searchTermLowerCase = searchedTerm.value.toLowerCase();
          const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
          
          const searchTermWithoutSpaces = searchTermLowerCase.replace(/\s/g, '');
          const fullNameWithoutSpaces = fullName.replace(/\s/g, '');
          
          return (
            fullNameWithoutSpaces.includes(searchTermWithoutSpaces) ||
            String(employee.address).toLowerCase().includes(searchTermLowerCase) ||
            String(employee.employeeNo).toLowerCase().includes(searchTermLowerCase)
          );
        });
      }
      
      else{
        this.filteredEmployees = this.employees.filter((employee) => {
      
          return (
            String(employee.country).includes(this.selectedCountry) &&
            String(employee.jobDepartment).includes(this.selectedDepartment) &&
            String(employee.jobLevel).includes(this.selectedJobLevel) 
          );
        });
      }
  
    
      
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


