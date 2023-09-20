export interface Employee {
  employeeNo: string;
  firstName: string;
  lastName: string;
  address: string ;
  position: string ;
  employmentStatus: string;
  profileIMG: string;
  birthDate: string;
  gender: string;
  bloodGroup: string;
  jobLevel: string;
  jobDepartment: string;
  jobType: string;
  city: string;
  state: string;
  country: string;
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string ;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}
export class Employee {
  constructor() {}
}
