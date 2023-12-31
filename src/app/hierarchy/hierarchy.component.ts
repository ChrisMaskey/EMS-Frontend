
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HierarchyService } from '../services/hierarchy.service'; 
import { TreeNode } from 'primeng/api';
import { Input } from '@angular/core';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent implements OnInit {
  @Input() hierarchy: TreeNode[] = [];
  selectedEmployeeId!: string;

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
        const filteredHierarchy = this.buildHierarchy(response.data, this.selectedEmployeeId);
        this.hierarchy = this.transformToTreeNode(filteredHierarchy);
      }
    });
  }

  transformToTreeNode(filteredHierarchy: any[]): TreeNode[] {
    return filteredHierarchy.map((item) => ({
      label: item.firstName, 
      expanded: true,
      type: 'person',
      data: item,
      children: this.buildChildNodes(item.id, filteredHierarchy),
    }));
  }

  buildChildNodes(parentId: string, filteredHierarchy: any[]): TreeNode[] {
    const children = filteredHierarchy.filter((item) => item.reportsToId === parentId);

    return children.map((child) => ({
      label: child.firstName, 
      expanded: true,
      type: 'person', 
      data: child,
      children: this.buildChildNodes(child.id, filteredHierarchy),
    }));
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
