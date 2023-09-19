import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  inject,
} from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  private searchService = inject(SearchService);
  visible = false;
  employees: any[] = [];

  filteredEmployees: any[] = [];
  filteredCountry: any[] = this.employees;

  isModalOpen = false;
  selectedEmployee: any;
  selectedCountry: any;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.searchService.getEmployeeData().subscribe((data: any) => {
      this.employees = data;
      this.filteredEmployees = data;
    });
    this.searchService.searchTerm$.subscribe((searchedTerm) => {
      this.filteredEmployees = this.employees.filter((employee) => {
        return (
          employee.firstName.includes(searchedTerm) ||
          String(employee.address).includes(searchedTerm) ||
          employee.country.includes(searchedTerm)
        );
      });
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
