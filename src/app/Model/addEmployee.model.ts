export class addEmployee {
  constructor(
    public employeeNo: string,
    public firstName: string,
    public middleName: string,
    public lastName: string,
    public phoneNumber: string,
    public email: string,
    public password: string,
    public birthDate: Date = new Date('2023-01-01'),
    public gender: string,
    public bloodGroup: string,
    public jobLevel: string,
    public jobDepartment: string,
    public jobType: string,
    public city: string,
    public state: string,
    public country: string
  ) {}
}
