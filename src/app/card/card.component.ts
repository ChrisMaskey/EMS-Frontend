import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { CardService } from '../services/card.service';
import { Employee } from '../Model/employee.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  visible: boolean = false;
  selectedEmployee: Employee | null = null;
  employees: Employee[] = [];

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
  }

  constructor(
    private service: CardService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.service.getEmployee().subscribe((res) => (this.employees = res));
  }

  // showDialog(employee: Employee) {
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
