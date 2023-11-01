import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HierarchyService } from '../services/hierarchy.service';
import { TreeNode } from 'primeng/api';
import { Input } from '@angular/core';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css'],
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

  setExpandedProperty(node: TreeNode) {
    if (node.data.id === this.selectedEmployeeId) {
      node.expanded = true;
      console.log(`Expanded: ${node.label} (${node.data.id})`);
    } else {
      node.expanded = false;
      console.log(`Collapsed: ${node.label} (${node.data.id})`);
    }
  
    if (node.children) {
      node.children.forEach(child => this.setExpandedProperty(child));
    }
    
    if (node.children && node.children.some(child => child.expanded)) {
      node.expanded = true;
      console.log(`Expanded (due to children): ${node.label} (${node.data.id})`);
    }
  }
  
  

  transformToTreeNode(filteredHierarchy: any[]): TreeNode[] {
    const treeNodes = filteredHierarchy.map((item) => ({
      label: item.firstName,
      expanded: true,
      type: 'person',
      data: item,
      children: this.buildChildNodes(item.id, filteredHierarchy),
    }));

    treeNodes.forEach(node => this.setExpandedProperty(node));

    return treeNodes;
  }
  buildChildNodes(parentId: string, filteredHierarchy: any[]): TreeNode[] {
    const children = filteredHierarchy.filter((item) => item.reportsToId === parentId);
    
    if (children.length > 0) {
      return children.map((child) => ({
        label: child.firstName,
        expanded: true,
        type: 'person',
        data: child,
        children: this.buildChildNodes(child.id, filteredHierarchy),
      }));
    } else {
      return [];
    }
  }

  buildHierarchy(data: any[], selectedId: string): any[] {
    const hierarchy: any[] = [];
    const selectedEmployee = data.find(item => item.id === selectedId);

    if (selectedEmployee) {
      this.addParentNodes(data, hierarchy, selectedEmployee.reportsToId, selectedEmployee.id);

      hierarchy.push(selectedEmployee);

      this.addChildrenAndSiblings(data, hierarchy, selectedId);
    }

    return hierarchy;
  }

  addParentNodes(data: any[], hierarchy: any[], parentId: string | null, excludeSiblingId: string) {
    if (parentId) {
      const parent = data.find(item => item.id === parentId);
      if (parent) {
        this.addParentNodes(data, hierarchy, parent.reportsToId, excludeSiblingId);
        hierarchy.push(parent);
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
  onNodeExpand(event: any) {
    const expandedNodeId = event.node.data.id;
    console.log(`Expanded Node ID: ${expandedNodeId}`);
    this.loadHierarchyForNode(expandedNodeId);


}
loadHierarchyForNode(nodeId: string) {
  this.selectedEmployeeId = nodeId; // Update the selected employee ID
  this.loadHierarchy();
}




}
