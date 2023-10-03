import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { CardService } from '../services/card.service';
import { Employee } from '../Model/employee.model';
import { SearchService } from '../services/search.service';
import { Filter } from '../Model/filter';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  
  visible: boolean = false;

  employees: Employee[] = [];
  searchTerm: string = '';
  items: Employee[] = [];
  searchResults: Employee[] = [];
  filteredEmployees: Employee[] = [];
  fullTimeEmployeesCount: number = 0;
  partTimeEmployeesCount: number = 0;
  internsCount: number = 0;
  total: number = 0;

  selectedEmployee: any = '';
  selectedCountry: any = '';
  selectedDepartment: any = '';
  selectedJobLevel: any = '';
  selectedJobType: any = '';

  



  constructor(
    private service: CardService,
    private searchService: SearchService // Inject SearchService
  ) {}

  ngOnInit(): void {
    this.service.getEmployee().subscribe((res) => {
      this.employees = res;
      this.filteredEmployees = res;
      this.calculateEmployeeCounts(); // Calculate counts on initialization
    });

    this.searchService.searchTerm$.subscribe((searchedTerm) => {
      if (searchedTerm.key === 'country') {
        this.selectedCountry = searchedTerm.value;
      } else if (searchedTerm.key === 'jobLevel') {
        this.selectedJobLevel = searchedTerm.value;
      } else if (searchedTerm.key === 'department') {
        this.selectedDepartment = searchedTerm.value;
      } else if (searchedTerm.key === 'jobType') {
        this.selectedJobType = searchedTerm.value;
      }

      if (searchedTerm.source === 'input') {
        this.filteredEmployees = this.employees.filter((employee) => {
          const searchTermLowerCase = searchedTerm.value.toLowerCase();
          const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
          const searchTermWithoutSpaces = searchTermLowerCase.replace(/\s/g, '');
          const fullNameWithoutSpaces = fullName.replace(/\s/g, '');

          return (
            fullNameWithoutSpaces.includes(searchTermWithoutSpaces) ||
            String(employee.country).toLowerCase().includes(searchTermLowerCase) ||
            String(employee.employeeNo).toLowerCase().includes(searchTermLowerCase)
          );
        });
      } else {
        this.filteredEmployees = this.employees.filter((employee) => {
          return (
            String(employee.country).includes(this.selectedCountry) &&
            String(employee.jobDepartment).includes(this.selectedDepartment) &&
            String(employee.jobLevel).includes(this.selectedJobLevel) &&
            String(employee.jobType).includes(this.selectedJobType)
          );
        });
      }

      this.calculateEmployeeCounts(); // Recalculate counts when filtered
    });
  }

  private calculateEmployeeCounts(): void {
    this.fullTimeEmployeesCount = this.employees.filter((employee) => employee.jobType === 'Full-time').length;
    this.partTimeEmployeesCount = this.employees.filter((employee) => employee.jobType === 'Part-time').length;
    this.internsCount = this.employees.filter((employee) => employee.jobLevel === 'Intern').length;
    this.total = this.employees.filter((employee) => employee).length;


  }

  showDialog(employee: Employee) {
    this.selectedEmployee = employee;
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.selectedEmployee = null;
  }

  search() {
    this.searchResults = this.items.filter((item) =>
      item.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  // showDialog(employee: any) {
  //   this.visible = true;
  //   this.selectedEmployee = employee;
  //   this.renderer.addClass(
  //     this.el.nativeElement.querySelector('.card-holder'),
  //     'blur-background'
  //   );
  // }

  // hideDialog() {
  //   this.visible = false;
  //   this.selectedEmployee = null;
  //   this.renderer.removeClass(
  //     this.el.nativeElement.querySelector('.card-holder'),
  //     'blur-background'
  //   );
  // }
}
