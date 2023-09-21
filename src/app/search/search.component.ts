import { Component, inject } from '@angular/core';
import { SearchService } from '../services/search.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  private searchService = inject(SearchService);

  countries: any[] = [{ name: 'Nepal' }, { name: 'Pakistan' }];

  searchTerm: any = '';

  searchEmployee(value: any) {
    this.searchService.setSearchTerm(value);
  }

  cities = [
    { name: 'Nepal', code: 'Nepal' },
    { name: 'Pakistan', code: 'Pakistan' },
  ];
  selectedCity: any;

  filterByState(country: any) {
    this.searchService.setSearchTerm(country.value.code);
  }


    departments = [
    { name: 'Front-end', code: 'Front-end' },
    { name: '.NET', code: '.NET' },
  ];

  selectedDepartment: any;

  filterByDepartment(department: any) {
    this.searchService.setSearchTerm(department.value.code);
  }
}

