import { BackendErrorsInterface } from '@models/backend-errors.interface';
import { IEmployeesWithSkills } from '@models/employees.interface';
import { EmployeeInfoDtoInterface } from '@models/interfaces/employee-info-dto.interface';
import { PositionInterface } from '@models/interfaces/position.interface';

export interface EmployeesStateInterface {
    isLoading: boolean,
    employeesList: IEmployeesWithSkills[],
    positionsList: PositionInterface[],
    employeeDTO: EmployeeInfoDtoInterface | null,
    errors: BackendErrorsInterface | null,
}