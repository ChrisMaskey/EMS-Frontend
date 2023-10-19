import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { Employee } from '../Model/employee.model';
import { SearchService } from '../services/search.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  isAuthenticated = false;
  visible: boolean = false;

  employees: Employee[] = [];
  searchTerm: string = '';
  searchResults: Employee[] = [];
  filteredEmployees: Employee[] = [];
  fullTimeEmployeesCount: number = 0;
  partTimeEmployeesCount: number = 0;
  internsCount: number = 0;
  total: number = 0;

  selectedEmployee: Employee | null = null;
  selectedCountry: string = '';
  selectedDepartment: string = '';
  selectedJobLevel: string = '';
  selectedJobType: string = '';

  constructor(
    private service: CardService,
    private searchService: SearchService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe((status) => {
      this.isAuthenticated = status;
    });

    this.service.getEmployee().subscribe((response: any) => {
      this.employees = response.data;
      this.filteredEmployees = this.employees;
      this.calculateEmployeeCounts();
    });

    this.searchService.searchTerm$.subscribe((searchedTerm) => {
      this.selectedCountry = searchedTerm.key === 'country' ? searchedTerm.value : this.selectedCountry;
      this.selectedDepartment = searchedTerm.key === 'department' ? searchedTerm.value : this.selectedDepartment;
      this.selectedJobLevel = searchedTerm.key === 'jobLevel' ? searchedTerm.value : this.selectedJobLevel;
      this.selectedJobType = searchedTerm.key === 'jobType' ? searchedTerm.value : this.selectedJobType;

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
        this.applyFilters();
      }

      this.calculateEmployeeCounts();
    });
  }

  resetFilters() {
    this.selectedCountry = '';
    this.selectedDepartment = '';
    this.selectedJobLevel = '';
    this.selectedJobType = '';
    this.applyFilters();
  }

  applyFilters() {
    this.filteredEmployees = this.employees.filter((employee) => {
      return (
        (this.selectedCountry === '' || employee.country === this.selectedCountry) &&
        (this.selectedDepartment === '' || employee.jobDepartment === this.selectedDepartment) &&
        (this.selectedJobLevel === '' || employee.jobLevel === this.selectedJobLevel) &&
        (this.selectedJobType === '' || employee.jobType === this.selectedJobType)
      );
    });

    this.calculateEmployeeCounts();
  }

  private calculateEmployeeCounts(): void {
    this.fullTimeEmployeesCount = this.filteredEmployees.filter(
      (employee) => employee.jobType === 'Full-time'
    ).length;
    this.partTimeEmployeesCount = this.filteredEmployees.filter(
      (employee) => employee.jobType === 'Part-time'
    ).length;
    this.internsCount = this.filteredEmployees.filter(
      (employee) => employee.jobLevel === 'Intern'
    ).length;
    this.total = this.filteredEmployees.length;
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
    this.searchResults = this.filteredEmployees.filter((employee) =>
      employee.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
