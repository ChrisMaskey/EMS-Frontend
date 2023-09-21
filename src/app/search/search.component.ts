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
    console.log("works");
    this.searchService.setSearchTerm(value);
  }

  cities = [
    { name: 'Nepal', code: 'Nepal' },
    { name: 'Pakistan', code: 'Pakistan' },
  ];
  selectedCity: any;

  
  filter(value: any, key: string, source: string) {
console.log(value)
    this.searchService.setSearchTerm({ key: key, value: String(value), source: source });
  }
  


    departments = [
    { name: 'Admin', code: 'Admin' },
    { name: '.NET', code: '.NET' },
  ];

  selectedDepartment: any;


  jobLevel= [
    { name: 'Senior', code: 'Senior' },
    { name: 'Junior', code: 'Junior' },
  ];

  selectedJobLevel: any;

  
}

