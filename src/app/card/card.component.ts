import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  inject,
} from '@angular/core';
import { CardService } from '../services/card.service';
import { Employee } from '../Model/employee.model';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  visible: boolean = false;
  selectedEmployee: Employee | null = null;
  employees: Employee[] = [];
  searchTerm: string = '';
  items: Employee[] = [];
  searchResults: Employee[] = [];

  constructor(
    private service: CardService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.service.getEmployee().subscribe((res) => (this.employees = res));
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
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
