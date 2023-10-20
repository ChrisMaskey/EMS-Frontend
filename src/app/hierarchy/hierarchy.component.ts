import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HierarchyService } from '../services/hierarchy.service';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css'],
})
export class HierarchyComponent implements OnInit {
  hierarchy: TreeNode[] = [];
  selectedEmployeeId: string | null = null;

  constructor(
    private hierarchyService: HierarchyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.selectedEmployeeId = params['id'] || null;
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
      expanded: this.isInitiallyExpanded(item),
      type: 'person',
      data: item,
      children: this.buildChildNodes(item.id, filteredHierarchy),
    }));
  }

  isInitiallyExpanded(item: any): boolean {
    if (this.selectedEmployeeId) {
      if (item && item.id) {
        if (item.id === this.selectedEmployeeId) {
          return true; // Expand the selected employee
        }
        if (item.reportsToId === this.selectedEmployeeId) {
          return true; // Expand the immediate parent
        }
      }

      return false;
    } else {
      return false; // Collapse all nodes if no selected employee
    }
  }

  buildChildNodes(parentId: string, filteredHierarchy: any[]): TreeNode[] {
    const children = filteredHierarchy.filter((item) => item.reportsToId === parentId);

    return children.map((child) => ({
      label: child.firstName,
      expanded: false, // Direct children are initially collapsed
      type: 'person',
      data: child,
      children: this.buildChildNodes(child.id, filteredHierarchy),
    }));
  }

  buildHierarchy(data: any[], selectedId: string | null): any[] {
    const hierarchy: any[] = [];
    const selectedEmployee = data.find((item) => item.id === selectedId);

    if (selectedEmployee) {
      hierarchy.push(selectedEmployee);

      this.addParentNodes(data, hierarchy, selectedEmployee.reportsToId, selectedEmployee.id);

      this.addChildrenAndSiblings(data, hierarchy, selectedId);
    }

    return hierarchy;
  }

  addParentNodes(data: any[], hierarchy: any[], parentId: string | null, excludeSiblingId: string) {
    if (parentId) {
      const parent = data.find((item) => item.id === parentId);
      if (parent) {
        hierarchy.unshift(parent);
        this.addParentNodes(data, hierarchy, parent.reportsToId, excludeSiblingId);
      }
    }
  }

  addChildrenAndSiblings(data: any[], hierarchy: any[], employeeId: string | null) {
    if (employeeId) {
      const childrenAndSiblings = data.filter(
        (item) => item.reportsToId === employeeId && item.id !== employeeId
      );
      for (const childOrSibling of childrenAndSiblings) {
        hierarchy.push(childOrSibling);

        this.addChildrenAndSiblings(data, hierarchy, childOrSibling.id);
      }
    }
  }
}
