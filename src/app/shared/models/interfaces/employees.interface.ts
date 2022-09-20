import { CurrentUserInterface } from '../current-user.interface';

export type EmployeesInterface = Omit<CurrentUserInterface, "jwt">