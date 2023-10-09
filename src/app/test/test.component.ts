import { Component } from '@angular/core';
import { Employee } from '../Model/employee.model';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  employees: Employee[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getEmployee().subscribe(
      (data: Employee[]) => {
        this.employees = data;
      },
      (error) => {
        // Handle error here
        console.error('Error fetching employees:', error);
      }
    );
  }

}
