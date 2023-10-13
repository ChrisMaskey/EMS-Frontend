import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HierarchyService } from '../services/hierarchy.service'; // Adjust the import as per your project structure
import { Hierarchy } from '../Model/Hierarchy.model'; // Adjust the import as per your project structure
import { Input } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent implements OnInit {


  @Input()  hierarchy: any[] = [];
  selectedEmployeeId!: string;
  selectedNode!: TreeNode; 

  constructor(
    private hierarchyService: HierarchyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedEmployeeId = params['id'];
      this.loadHierarchy();
    });
  }

  loadHierarchy() {
    this.hierarchyService.getHierarchyData().subscribe((response: any) => {
      if (response && response.data) {
        console.log('Hierarchy Data:', response.data);
        console.log('Selected Employee ID:', this.selectedEmployeeId);

        this.hierarchy = this.buildHierarchy(response.data, this.selectedEmployeeId);
        console.log('hierarchy:', this.hierarchy); 
        
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
            id: item.id,
          },
          children: this.buildHierarchyTree(data, item.id),
        };
        hierarchyTree.push(hierarchyNode);
      }
    });

    return hierarchyTree;
  }

  buildHierarchy(data: any[], selectedId: string): any[] {
    const hierarchy: any[] = [];
    const selectedEmployee = data.find(item => item.id === selectedId);

    if (selectedEmployee) {
      hierarchy.push(selectedEmployee);
      

      this.addParentNodes(data, hierarchy, selectedEmployee.reportsToId, selectedEmployee.id);

      this.addChildrenAndSiblings(data, hierarchy, selectedId);

     
    }

    return hierarchy;
  }

  addParentNodes(data: any[], hierarchy: any[], parentId: string | null, excludeSiblingId: string) {
    if (parentId) {
      const parent = data.find(item => item.id === parentId);
      if (parent) {
        hierarchy.unshift(parent); 
        this.addParentNodes(data, hierarchy, parent.reportsToId, excludeSiblingId);
      }
    }
  }

  addChildrenAndSiblings(data: any[], hierarchy: any[], employeeId: string) {
    const childrenAndSiblings = data.filter(
      item => item.reportsToId === employeeId && item.id !== employeeId
    );
    for (const childOrSibling of childrenAndSiblings) {
      hierarchy.push(childOrSibling);

      this.addChildrenAndSiblings(data, hierarchy, childOrSibling.id);
    }
  }
}
