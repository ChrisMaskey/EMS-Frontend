export interface Hierarchy {
     id: string;
     firstName: string;
     lastName:string;
     reportsToId: string | null;
     jobLevel: string;
     jobDepartment: string;
     reportsTo: string | null;
     children?: Hierarchy[];

   }
   