import { UserInterface } from './user.interface';

export type EmployeesInterface = Omit<UserInterface, 'jwt'>

export interface IEmployeesWithSkills {
    employees: EmployeesInterface,
    skills: (string | undefined)[]
}