import { Component } from '@angular/core';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent {
  data = [
    {
      label: 'CEO',
      type: 'person',
      styleClass: 'ui-person',
      expanded: true,
      data: { name: 'Ravi Pokhrel', title: 'CEO' },
      children: [
        {
          label: 'VP of Marketing',
          type: 'person',
          styleClass: 'ui-person',
          expanded: true,
          data: { name: 'John Doe', title: 'CEO Nepal' },
          children: [
            
            {
              label: 'VP of Marketing',
              type: 'person',
              styleClass: 'ui-person',
              expanded: true,
              data: { name: 'Suraj Neupane', title: 'Engineering Manager' },
            },

            {
              label: 'VP of Marketing',
              type: 'person',
              styleClass: 'ui-person',
              expanded: true,
              data: { name: 'Suraj Neupane', title: 'Engineering Manager' },
            },
            {
              label: 'VP of Marketing',
              type: 'person',
              styleClass: 'ui-person',
              expanded: true,
              data: { name: 'Suraj Neupane', title: 'Engineering Manager' },
            },
            {
              label: 'VP of Marketing',
              type: 'person',
              styleClass: 'ui-person',
              expanded: true,
              data: { name: 'Suraj Neupane', title: 'Engineering Manager' },
            }
          ]
        },
        // Add more child nodes for the CEO as needed
      ]
    }

  
  ];
}