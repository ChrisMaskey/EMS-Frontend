import { Component, OnInit } from '@angular/core';
import { HierarchyService } from '../services/hierarchy.service';
import { Hierarchy } from '../Model/Hierarchy.model';
import { TreeNode } from 'primeng/api';


@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent implements OnInit {
  hierarchy: Hierarchy[] = [];
  selectedNode: Hierarchy | null = null;

  constructor(private hierarchyService: HierarchyService) {}

  ngOnInit() {
    this.hierarchyService.getHierarchyData().subscribe((response: any) => {
      if (response && response.data) {
        this.hierarchy = this.buildHierarchyTree(response.data, null);
      }
    });
  }



  buildHierarchyTree(data: any[], reportsToId: string | null): any[] {
    const hierarchyTree: any[] = [];

    data.forEach((item: any) => {
      if (item.reportsToId === reportsToId) {
        const hierarchyNode = {
          label: `${item.firstName} ${item.lastName}`,
          type: 'person',
          styleClass: 'ui-person',
          data: {
            firstName: item.firstName,
            lastName: item.lastName,
            jobLevel: item.jobLevel,
            
          },
          children: this.buildHierarchyTree(data, item.id),
        };
        hierarchyTree.push(hierarchyNode);
      }
    });

    return hierarchyTree;
  }
} 