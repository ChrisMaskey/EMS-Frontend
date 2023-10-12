import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { addEmployee } from 'src/app/Model/addEmployee.model';
import { Employee } from 'src/app/Model/employee.model';
import { Role } from 'src/app/Model/role.model';
import { EmployeeDataService } from 'src/app/services/employee-data.service';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css'],
  providers: [MessageService],
})
export class SuperadminComponent {
  employees: Employee[] = [];
  private employeeDataService = inject(EmployeeDataService);
  protected employeeList$ = this.employeeDataService.employeeList$;
  protected employee$ = this.employeeDataService.employee$;
  protected addEmployee$ = this.employeeDataService.employee$;
  protected assignRole$ = this.employeeDataService.assignRole$;

  visible: boolean = false;
  editDialogVisible: boolean = false;
  visibleDeleteDialog: boolean = false;
  assignDialogVisible: boolean = false;
  addSuccessful: boolean = false;
  deleteSuccessful: boolean = false;
  editSuccessful: boolean = false;
  hideSuccessful: boolean = false;
  assignSuccessful: boolean = false;
  isAssignButtonClicked: boolean = false;

  deleteId: string = '';

  assignForm: FormGroup;

  constructor(private messageService: MessageService, private fb: FormBuilder) {
    this.assignForm = this.fb.group({
      employee: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  async ngOnInit() {
    await this.employeeDataService.getEmployeeData();
  }

  async getEmployeeById(id: string) {
    await this.employeeDataService.getEmployeeById(id);
  }

  async addEmployee(employee: addEmployee) {
    await this.employeeDataService.addEmployee(employee);
  }

  async updateEmployee(id: string, employee: Employee) {
    await this.employeeDataService.updateEmployee(id, employee);
  }

  // async assignRole(id: string, role: string) {

  //   this.isAssignButtonClicked = true;
  //   await this.employeeDataService.assignRole(id, role);
  //   if (this.assignForm.valid) {
  //     this.assignForm.reset();
  //     this.assignForm.get('employee')?.setValue('');
  //     this.assignForm.get('role')?.setValue('');
  //     this.hideAssignDialog();
  //   }
  //   this.messageService.add({
  //     severity: 'success',
  //     summary: 'Info',
  //     detail: 'Role Successfully Assigned.',
  //   });
  //   setTimeout(() => {
  //     this.assignSuccessful = false;
  //   }, 3500);
  //   this.isAssignButtonClicked = false;

  //   // if (this.assignForm.valid) {
  //   //   await this.employeeDataService
  //   //     .assignRole(id, role)
  //   //     .then(() => {
  //   //       this.assignForm.reset();
  //   //       this.hideAssignDialog();
  //   //       this.assignSuccessful = true;
  //   //       this.messageService.add({
  //   //         severity: 'success',
  //   //         summary: 'Info',
  //   //         detail: 'Role Successfully Assigned.',
  //   //       });
  //   //       setTimeout(() => {
  //   //         this.assignSuccessful = false;
  //   //       }, 3500);
  //   //     })
  //   //     .catch((error) => {
  //   //       console.log(error);
  //   //     });
  //   // }
  // }

  // async assignRole(id: string, role: string) {
  //   try {
  //     this.isAssignButtonClicked = true;
  //     const existingRoles = await this.employeeDataService.checkRole(id);
  //     console.log(existingRoles);
  //     console.log(role);
  //     if (existingRoles.includes('40a152c9-7e31-4002-995f-4b05528e7c82')) {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Info',
  //         detail: 'Role already assigned to the employee.',
  //       });
  //       console.log('IMWORKING');
  //     } else {
  //       await this.employeeDataService.assignRole(id, role);
  //       this.assignForm.reset();
  //       this.hideAssignDialog();
  //       this.assignForm.get('employee')?.setValue('');
  //       this.assignForm.get('role')?.setValue('');
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Info',
  //         detail: 'Role Successfully Assigned.',
  //       });

  //       setTimeout(() => {
  //         this.assignSuccessful = false;
  //       }, 3500);
  //       this.isAssignButtonClicked = false;
  //     }
  //   } catch (error) {
  //     console.error('Error assigning role:', error);
  //   }
  // await this.employeeDataService.assignRole(id, role);

  // this.assignForm.reset();
  // this.hideAssignDialog();
  // this.assignForm.get('employee')?.setValue('');
  // this.assignForm.get('role')?.setValue('');

  // this.messageService.add({
  //   severity: 'success',
  //   summary: 'Info',
  //   detail: 'Role Successfully Assigned.',
  // });

  // setTimeout(() => {
  //   this.assignSuccessful = false;
  // }, 3500);
  // console.log('ID:' + id, 'ROLE:' + role);
  // }

  // async assignRole(id: string, role: string): Promise<void> {
  //   try {
  //     // Get the current roles of the user
  //     const roles = await this.employeeDataService.checkRole(id);

  //     // Check if the user already has the role
  //     if (roles.includes(role)) {
  //       return Promise.reject('Error: User already has the role');
  //     }

  //     // Assign the new role to the user
  //     await this.employeeDataService.assignRole(id, role);
  //     console.log('DONE');
  //   } catch (error) {
  //     return Promise.reject(`Error: ${error}`);
  //   }
  // }

  async assignRole(id: string, role: string) {
    try {
      this.isAssignButtonClicked = true;
      const existingRoles = await this.employeeDataService.checkRole(id);
      console.log(existingRoles);
      console.log(role);
      const roleMap: { [key: string]: string } = {
        admin: 'a4059c76-9e2e-4e5a-a624-53a87fa96dc0',
        user: '40a152c9-7e31-4002-995f-4b05528e7c82',
      };
      const assignedRole = roleMap[existingRoles[0]];

      if (existingRoles.includes(assignedRole)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Info',
          detail: 'Role already assigned to the employee.',
        });
        console.log('IMWORKING');
      } else {
        await this.employeeDataService.assignRole(id, role);
        this.assignForm.reset();
        this.hideAssignDialog();
        this.assignForm.get('employee')?.setValue('');
        this.assignForm.get('role')?.setValue('');
        this.messageService.add({
          severity: 'success',
          summary: 'Info',
          detail: 'Role Successfully Assigned.',
        });

        setTimeout(() => {}, 3500);
        this.isAssignButtonClicked = false;
      }
    } catch (error) {
      console.error('Error assigning role:', error);
    }
  }

  // async assignRole(id: string, role: string) {
  //   try {
  //     this.isAssignButtonClicked = true;
  //     const existingRoles = await this.employeeDataService.checkRole(id);
  //     console.log(existingRoles);
  //     console.log(role);
  //     const roleMap: { [key: string]: string } = {
  //       admin: 'a4059c76-9e2e-4e5a-a624-53a87fa96dc0',
  //       user: '40a152c9-7e31-4002-995f-4b05528e7c82',
  //     };

  //     let roleAlreadyAssigned = false;
  //     if (existingRoles.length > 0) {
  //       const assignedRole = roleMap[existingRoles[0]];
  //       roleAlreadyAssigned = existingRoles.includes(assignedRole);
  //     }

  //     if (roleAlreadyAssigned) {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Info',
  //         detail: 'Role already assigned to the employee.',
  //       });
  //       console.log('IMWORKING');
  //     } else {
  //       await this.employeeDataService.assignRole(id, role);
  //       this.assignForm.reset();
  //       this.hideAssignDialog();
  //       this.assignForm.get('employee')?.setValue('');
  //       this.assignForm.get('role')?.setValue('');
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Info',
  //         detail: 'Role Successfully Assigned.',
  //       });

  //       setTimeout(() => {
  //         this.isAssignButtonClicked = false;
  //       }, 3500);
  //     }
  //   } catch (error) {
  //     console.error('Error assigning role:', error);
  //   }
  // }

  deleteEmployeeData(id: string) {
    this.employeeDataService.deleteEmployee(id);
    this.deleteSuccessful = true;
    this.messageService.add({
      severity: 'error',
      summary: 'Info',
      detail: 'Employee Successfully Deleted.',
    });
    setTimeout(() => {
      this.deleteSuccessful = false;
    }, 3500);
  }

  // deleteEmployeeData(id: string) {
  //   this.employeeDataService
  //     .deleteEmployee(id)
  //     .then(() => {
  //       this.deleteSuccessful = true;
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Info',
  //         detail: 'Employee Successfully Deleted.',
  //       });
  //       setTimeout(() => {
  //         this.deleteSuccessful = false;
  //       }, 3500);
  //     })
  //     .catch((error) => {
  //       // Handle the error here, e.g., display an error message.
  //       console.error('Error deleting employee:', error);
  //     });
  // }

  showDialog() {
    this.visible = true;
  }

  showDialogEdit(id: string) {
    this.employeeDataService.getEmployeeById(id);
    this.editDialogVisible = true;
  }

  showDialogDelete(id: string) {
    this.deleteId = id;
    this.visibleDeleteDialog = true;
  }

  showDialogAssign() {
    this.assignDialogVisible = true;
  }

  hideDialog() {
    this.visible = false;
  }

  hideEditDialog() {
    this.editDialogVisible = false;
  }

  hideDeleteDialog() {
    this.visibleDeleteDialog = false;
  }

  hideAssignDialog() {
    this.assignDialogVisible = false;
  }

  onAddSuccess(event: boolean) {
    if (event) {
      this.addSuccessful = true;
      this.messageService.add({
        severity: 'success',
        summary: 'Info',
        detail: 'Employee Successfully Added.',
      });
      setTimeout(() => {
        this.addSuccessful = false;
      }, 3500);
    }
  }

  onEditSuccess(event: boolean) {
    if (event) {
      this.editSuccessful = true;
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Employee Successfully Edited.',
      });
      setTimeout(() => {
        this.editSuccessful = false;
      }, 3500);
    }
  }

  onHideSuccess(event: boolean) {
    if (event) {
      this.hideSuccessful = true;
      this.messageService.add({
        severity: 'warn',
        summary: 'Info',
        detail: 'Employee Successfully Inactivated.',
      });
      setTimeout(() => {
        this.hideSuccessful = false;
      }, 3500);
    }
  }
}
