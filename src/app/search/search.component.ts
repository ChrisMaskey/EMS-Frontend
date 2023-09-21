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

  // searchEmployee(value: any) {
  //   console.log('works');
  //   this.searchService.setSearchTerm(value);
  // }

  cities = [
    { name: 'Nepal', code: 'Nepal' },
    { name: 'Pakistan', code: 'Pakistan' },
  ];
  selectedCity: any;

  filter(value: any, key: string, source: string) {
  let selectedValue;

  if (source === 'input') {
    selectedValue = value;
    this.searchService.setSearchTerm({
      key: key,
      value: String(selectedValue),
      source: source,
    });
  } else if (source === 'dropdown') {
    this.searchService.setSearchTerm({
      key: key,
      value: value.value.code,
      source: source,
    });
    
  } 

  
 
}


  departments = [
    { name: 'Admin', code: 'Admin' },
    { name: '.NET', code: '.NET' },
  ];

  selectedDepartment: any;

  jobLevel = [
    { name: 'Senior', code: 'Senior' },
    { name: 'Junior', code: 'Junior' },
    { name: 'Human Resource', code: 'Human Resource' },
    { name: 'Business Analyst', code: 'Business Analyst' },



  ];

  selectedJobLevel: any;
}
