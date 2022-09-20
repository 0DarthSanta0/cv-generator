import {BackendErrorsInterface} from "../../../shared/models/backend-errors.interface";
import { EmployeesInterface } from '../../../shared/models/interfaces/employees.interface';

export interface EmployeesStateInterface {
  isLoading: boolean,
  employeesList: EmployeesInterface[],
  errors: BackendErrorsInterface | null,
}