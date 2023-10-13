import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HierarchyService } from '../services/hierarchy.service'; // Adjust the import as per your project structure
import { Hierarchy } from '../Model/Hierarchy.model'; // Adjust the import as per your project structure
import { Input } from '@angular/core';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent implements OnInit {


  @Input()  hierarchy: any[] = [];
  selectedEmployeeId!: string;
  selectedNode: any

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

        // Build the hierarchy based on the selected employee's ID
        this.hierarchy = this.buildHierarchy(response.data, this.selectedEmployeeId);
        console.log('Filtered Hierarchy:', this.hierarchy); // Check the filtered data here
        
      }
    });
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
        hierarchy.unshift(parent); // Add parent at the beginning of the array
        // Exclude the sibling of the selected employee's parent
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

      // Recursively add the children of this child or sibling
      this.addChildrenAndSiblings(data, hierarchy, childOrSibling.id);
    }
  }
}
