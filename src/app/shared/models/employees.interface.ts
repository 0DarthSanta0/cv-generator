import { CurrentUserInterface } from './current-user.interface';

export type EmployeesInterface = Omit<CurrentUserInterface, 'jwt'>

export interface IEmployeesWithSkills {
    employees: EmployeesInterface,
    skills: string[]
}