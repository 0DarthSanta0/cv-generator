import {BackendErrorsInterface} from "../../../shared/models/backend-errors.interface";
import { EmployeesInterface } from '../../../shared/models/employees.interface';
import { SkillInterface } from '../../../shared/models/skill.interface';

export interface EmployeesStateInterface {
  isLoading: boolean,
  employeesList: EmployeesInterface[],
  skillsList: SkillInterface[],
  errors: BackendErrorsInterface | null,
}